import { Home, FileText, Bell, BarChart3, Settings, Users, Pill, Shield, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "Compliance Status", url: "/compliance", icon: Shield },
    ]
  },
  {
    title: "Operations",
    items: [
      { title: "Animal Registry", url: "/animals", icon: Users },
      { title: "Drug Administration", url: "/treatments", icon: Pill },
      { title: "MRL Violations", url: "/violations", icon: AlertTriangle },
    ]
  },
  {
    title: "Reports & Analytics",
    items: [
      { title: "Reports", url: "/reports", icon: FileText },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Notifications", url: "/notifications", icon: Bell },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
    ]
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location === item.url}
                      data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}