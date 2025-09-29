import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComplianceStatusCard } from "@/components/ComplianceStatusCard";
import { MRLComplianceChart } from "@/components/MRLComplianceChart";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Plus, FileText, Download, RefreshCw, ArrowRight } from "lucide-react";

// Mock refresh function
async function refreshDashboardData() {
  console.log("Refreshing dashboard data...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Dashboard data refreshed.");
}

export default function Dashboard() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshDashboardData();
      toast({
        title: "Dashboard Updated",
        description: "All compliance data has been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Could not update dashboard data.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="title-dashboard">
            Compliance Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time AMU/MRL compliance monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            data-testid="button-refresh"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button asChild>
            <Link href="/reports">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComplianceStatusCard
          title="Animals in Compliance"
          status="compliant"
          count={247}
          description="All withdrawal periods met"
          lastUpdated="2 mins ago"
        />
        <ComplianceStatusCard
          title="Withdrawal Warnings"
          status="warning"
          count={8}
          description="Approaching withdrawal deadline"
          lastUpdated="5 mins ago"
        />
        <ComplianceStatusCard
          title="MRL Violations"
          status="violation"
          count={2}
          description="Immediate attention required"
          lastUpdated="1 hour ago"
        />
        <ComplianceStatusCard
          title="Pending Tests"
          status="pending"
          count={15}
          description="Awaiting lab results"
          lastUpdated="3 hours ago"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <MRLComplianceChart type="bar" title="Monthly Compliance Trends" />
          <MRLComplianceChart type="pie" title="Current Compliance Status" />
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/treatments">
                  <Plus className="w-4 h-4 mr-2" />
                  Record Treatment
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/animals">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Animal
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/reports">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Link>
              </Button>
            </div>
          </div>
          <NotificationCenter />
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/notifications">
              View All Notifications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}