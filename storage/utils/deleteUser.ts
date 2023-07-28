import db  from "@/lib/db"

export function deleteUser(email: string) {
    //db undefined error
    const user = db.user.delete({
      where: {
        email: email,
      }
    })
    console.log(user)
}