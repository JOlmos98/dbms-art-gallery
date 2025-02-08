"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
import { CirclePlus, Database, Github, Home, LayoutGrid, Pencil, Search, Settings } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Buscar",
        url: "/buscar",
        icon: Search,
    },
    {
        title: "Insertar",
        url: "/insertar",
        icon: CirclePlus,
    },
    {
        title: "Modificar",
        url: "/modificar",
        icon: Pencil,
    },
    {
        title: "Vista general",
        url: "/vistaGeneral",
        icon: LayoutGrid,
    },
    {
        title: "SQL",
        url: "/sql",
        icon: Database,
    },
    {
        title: "Configuración",
        url: "/configuracion",
        icon: Settings,
    },
]

export function AppSidebar() {

    const pathname=usePathname();

    return (
        <Sidebar className="border-none">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="m-4">SGBD Galería de Arte</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                    <Link href={item.url} className={`p-6 ${ pathname.includes(item.url) ? " text-sidebar-accent" : "" }`}>
                                            <item.icon style={{ width: "1.5rem", height: "1.5rem" }}/>
                                            <span className="text-xl m-2">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="mt-auto">
                    <Link href="https://github.com/JOlmos98/dbms-art-gallery" className="flex items-center m-auto pb-2 gap-2 hover:text-blue-400">
                        <Github style={{ width: "1rem", height: "1rem" }} />
                        <span>Proyecto en Github</span>
                    </Link>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}