import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const style = {
  "--sidebar-width": "16rem",
  "--sidebar-width-icon": "3rem",
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AMU</span>
                </div>
                <div>
                  <h1 className="font-semibold text-sm">AMU/MRL Monitor</h1>
                  <p className="text-xs text-muted-foreground">Enterprise Compliance System</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}