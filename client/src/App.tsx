import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

// Layouts
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Pages
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Animals from "@/pages/Animals";
import Treatments from "@/pages/Treatments";

/**
 * @returns The routes for authenticated users.
 */
function AppRoutes() {
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

/**
 * @returns The routes for unauthenticated users.
 */
function AuthRoutes() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      {/* For any other route, we'll just show the landing page.
          This is to prevent 404s on pages that exist in the app but require auth. */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}


function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <AppRoutes />
      </DashboardLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthRoutes />
    </AuthLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppRouter />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;