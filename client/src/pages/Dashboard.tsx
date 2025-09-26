import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComplianceStatusCard } from "@/components/ComplianceStatusCard";
import { MRLComplianceChart } from "@/components/MRLComplianceChart";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Plus, FileText, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action); //todo: remove mock functionality
    toast({
      title: "Action Triggered",
      description: `${action} functionality will be implemented in the full application.`,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log('Refreshing dashboard data'); //todo: remove mock functionality
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRefreshing(false);
    toast({
      title: "Dashboard Updated",
      description: "All compliance data has been refreshed.",
    });
  };

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="title-dashboard">
            AMU/MRL Compliance Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor animal drug usage and Maximum Residue Limit compliance across your operation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            data-testid="button-refresh"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => handleQuickAction('Generate Report')} data-testid="button-generate-report">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
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

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MRLComplianceChart 
          type="bar" 
          title="Monthly Compliance Trends"
        />
        <MRLComplianceChart 
          type="pie" 
          title="Current Compliance Status"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2" 
              onClick={() => handleQuickAction('Record New Treatment')}
              data-testid="button-record-treatment"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Record Treatment</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2" 
              onClick={() => handleQuickAction('Add New Animal')}
              data-testid="button-add-animal"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Add Animal</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2" 
              onClick={() => handleQuickAction('View Reports')}
              data-testid="button-view-reports"
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2" 
              onClick={() => handleQuickAction('Export Data')}
              data-testid="button-export-data"
            >
              <Download className="w-6 h-6" />
              <span className="text-sm">Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <NotificationCenter />
    </div>
  );
}