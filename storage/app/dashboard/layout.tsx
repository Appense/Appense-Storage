import  NavBar  from "@/components/dashboard/Header"
import SideBar from "@/components/dashboard/SideBar"

export default function DashboardLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="flex ">
      <SideBar/>
      <main className="h-full w-full">
        <NavBar/>
        {children}
      </main>
    </div>
  )
}