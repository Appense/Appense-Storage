"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
export default function Home() {

  return (
    <div className="grid place-items-center h-screen">
      <LoginForm />
    </div>
  )
}

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email."
  }),
  password: z.string()
})

export function LoginForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard"
    })
    
    
    
  }
  const sendEmail = async (email:any) => {
    
    const res = await fetch("/api/email", {
      method:'POST',
      
      body: JSON.stringify({email: email})
    })
    console.log(res)
  }

  
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="root@appense.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="***" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-start ">
            <Button type="submit">Log In</Button>
            <Sheet>
              <SheetTrigger className="text-sm">Forgot password?</SheetTrigger>
              {/* <Button variant="link">Forgot Password?</Button> */}
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Have you forgotten your password? Just Relax</SheetTitle>
                  <SheetDescription>
                    We'll help you reset your password using your email address
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 ">
                    <div className="gap-2 flex flex-col">
                      <Input placeholder="root@appense.com" type="text" onChange={(e) => setEmail(e.target.value)}/>
                      <SheetClose asChild>
                        <Button type="submit" onClick={() => {
                          toast({
                            title: "Check your email",
                            description: "We've sent you a link to reset your password.",
                          }),
                          sendEmail(email)
                        }}
                        >Change password</Button>
                      </SheetClose>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
            
          </div>
          
        </form>
      </Form>
  )
}