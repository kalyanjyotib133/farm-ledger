import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Animals from "@/pages/Animals";
import Treatments from "@/pages/Treatments";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/animals" component={Animals} />
      <Route path="/treatments" component={Treatments} />
      <Route path="/compliance" component={() => <div className="p-6"><h1 className="text-2xl">Compliance Status - Coming Soon</h1></div>} />
      <Route path="/violations" component={() => <div className="p-6"><h1 className="text-2xl">MRL Violations - Coming Soon</h1></div>} />
      <Route path="/reports" component={() => <div className="p-6"><h1 className="text-2xl">Reports - Coming Soon</h1></div>} />
      <Route path="/analytics" component={() => <div className="p-6"><h1 className="text-2xl">Analytics - Coming Soon</h1></div>} />
      <Route path="/notifications" component={() => <div className="p-6"><h1 className="text-2xl">Notifications - Coming Soon</h1></div>} />
      <Route path="/settings" component={() => <div className="p-6"><h1 className="text-2xl">Settings - Coming Soon</h1></div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

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
              <Router />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;