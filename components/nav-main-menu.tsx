"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMainMenu({
  menus,
}: {
  menus: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  // const { isMobile } = useSidebar();
  const path = usePathname();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={` ${
                  path.includes(item.url) &&
                  "bg-[#DCE9FF] text-primary font-semibold"
                }`}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
