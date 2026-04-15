"use client";

import { Header } from "@/components/refine-ui/layout/header";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <main
            className={cn(
              "@container/main",
              "container",
              "mx-auto",
              "relative",
              "w-full",
              "flex",
              "flex-col",
              "flex-1",
              "px-2",
              "pt-4",
              "pb-6",
              "md:p-4",
              "lg:px-6",
              "lg:pt-6",
              "lg:pb-8",
            )}
          >
            <div
              className={cn(
                "flex-1",
                "rounded-2xl",
                "border",
                "border-white/50",
                "bg-card/80",
                "backdrop-blur-md",
                "p-3",
                "md:p-5",
                "shadow-[0_24px_46px_-36px_color-mix(in_oklab,var(--foreground)_45%,transparent)]",
              )}
            >
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
