import Navbar from "@/components/dashboard/Navbar"
import SideBar from "@/components/dashboard/SideBar"

export default function DashboardLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="flex ">
      <SideBar/>
      <main className="h-full w-full">
        <Navbar/>
        {children}
      </main>
    </div>
  )
}