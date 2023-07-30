import { HomeIcon, Files, Users, Star, Forward, Trash, LucideIcon } from "lucide-react"

type SidebarItem = {
    name: string,
    url: string,
    icon: LucideIcon
}

export const sidebarItems: SidebarItem[] = [
    {
        name: "Home",
        url: "",
        icon: HomeIcon
    },
    {
        name: "My Files",
        url: "files",
        icon: Files
    },
    {
        name: "Users",
        url: "users",
        icon: Users
    },
    {
        name: "Favorite",
        url: "favourite",
        icon: Star
    },
    {
        name: "Shared",
        url: "shared",
        icon: Forward
    },
    {
        name: "Trash",
        url: "trash",
        icon: Trash
    },
]