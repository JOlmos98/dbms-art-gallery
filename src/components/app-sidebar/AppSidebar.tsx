import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
import { Calendar, Database, Github, Home, Inbox, Pencil, Search, Settings } from "lucide-react"
import Link from "next/link";


// Menu items.
const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Buscar",
        url: "#",
        icon: Search,
    },
    {
        title: "Modificar",
        url: "#",
        icon: Pencil,
    },
    {
        title: "SQL",
        url: "/sql",
        icon: Database,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-5">SGBD Galería de Arte</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="text-3xl">
                                        <Link href={item.url} className="p-6">
                                            <item.icon style={{ width: "1.5rem", height: "1.5rem" }} />
                                            <span className="text-xl m-2">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="mt-auto">
                    <Link href="https://github.com/JOlmos98/dbms-art-gallery" className="flex items-center m-2 gap-2 hover:text-blue-600">
                        <Github style={{ width: "1rem", height: "1rem" }} />
                        <span>Proyecto en Github</span>
                    </Link>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}