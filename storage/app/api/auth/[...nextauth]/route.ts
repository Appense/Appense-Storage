import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient, User } from "@prisma/client"
import { compare } from "bcrypt"
import db from "@/lib/db"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@asd.asd" },
                password: { label: "Password", type: "password" }
                },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials.password) return null

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) return null

                const isPasswordValid = await compare(credentials.password, user.password)

                if (!isPasswordValid) return null

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    // randomKey: "xd"
                }
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({ token, user }) => {
            console.log('JWT Callback', { token, user });
            if (user) {
                const u = user as unknown as User //should be prisma user type (casting is going on here <-)
                return {
                    ...token,
                    id: u.id,
                    // randomKey: u.randomKey
                }
            }
            return token
            
        },
        session: ({ token, session }) => {
            console.log('Session Callback', { token, session });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    // randomKey: token.randomKey
                }
            }
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }