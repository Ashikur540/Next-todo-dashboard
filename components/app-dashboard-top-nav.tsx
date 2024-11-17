"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export const TopNavbar = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {pathParts.map((part, index) => (
            <BreadcrumbItem className="hidden md:block" key={index}>
              <BreadcrumbPage>
                {/*  uppercase and space instead of "-" */}
                {part.charAt(0).toUpperCase() +
                  part.slice(1).replaceAll("-", " ")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
