import { AppSidebar } from '../Sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-semibold">AMU/MRL Monitoring System</h1>
          <p className="text-muted-foreground mt-2">Navigation sidebar for enterprise animal drug tracking and compliance monitoring.</p>
        </div>
      </div>
    </SidebarProvider>
  );
}