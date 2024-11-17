"use client";

import * as React from "react";
import { LayoutDashboard, ListChecks } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMainMenu } from "./nav-main-menu";
import Link from "next/link";

const data = {
  user: {
    name: "Ashikur Rahman",
    email: "meashik1000@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mainMenu: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "All Tasks",
      url: "/all-tasks",
      icon: ListChecks,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-100  text-sidebar-primary-foreground">
                  <svg
                    id="logo-35"
                    width="50"
                    height="39"
                    viewBox="0 0 50 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                      className="ccompli1"
                      fill="#007AFF"
                    ></path>{" "}
                    <path
                      d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                      className="ccustom"
                      fill="#312ECB"
                    ></path>{" "}
                  </svg>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Flow Mate</span>
                  <span className="truncate text-xs">
                    Effortless Task Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainMenu menus={data.mainMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
