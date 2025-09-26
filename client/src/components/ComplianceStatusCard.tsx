import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceStatusCardProps {
  title: string;
  status: 'compliant' | 'warning' | 'violation' | 'pending';
  count: number;
  description?: string;
  lastUpdated?: string;
}

const statusConfig = {
  compliant: {
    icon: CheckCircle,
    label: "Compliant",
    badgeVariant: "default" as const,
    iconColor: "text-compliance-good",
    bgColor: "bg-compliance-good/10"
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    badgeVariant: "destructive" as const,
    iconColor: "text-compliance-warning",
    bgColor: "bg-compliance-warning/10"
  },
  violation: {
    icon: XCircle,
    label: "Violation",
    badgeVariant: "destructive" as const,
    iconColor: "text-compliance-violation",
    bgColor: "bg-compliance-violation/10"
  },
  pending: {
    icon: Clock,
    label: "Pending",
    badgeVariant: "secondary" as const,
    iconColor: "text-muted-foreground",
    bgColor: "bg-muted/50"
  }
};

export function ComplianceStatusCard({ title, status, count, description, lastUpdated }: ComplianceStatusCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className="hover-elevate" data-testid={`compliance-card-${status}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-md", config.bgColor)}>
          <Icon className={cn("w-4 h-4", config.iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`count-${status}`}>{count}</div>
        <div className="flex items-center justify-between mt-2">
          <Badge variant={config.badgeVariant} className="text-xs" data-testid={`badge-${status}`}>
            {config.label}
          </Badge>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground" data-testid={`updated-${status}`}>
              Updated {lastUpdated}
            </p>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}