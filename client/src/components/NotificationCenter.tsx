import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, AlertTriangle, Info, CheckCircle, Clock, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'violation' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  animalId?: string;
  drugName?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
}

const notificationConfig = {
  violation: {
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    badge: "destructive" as const
  },
  warning: {
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    badge: "destructive" as const
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    badge: "secondary" as const
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    badge: "default" as const
  }
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "violation",
    title: "MRL Violation Detected",
    message: "Animal BOV-001 exceeds MRL limit for Oxytetracycline (150 μg/kg detected, limit: 100 μg/kg)",
    timestamp: "2024-01-22T10:30:00Z",
    read: false,
    animalId: "BOV-001",
    drugName: "Oxytetracycline"
  },
  {
    id: "2",
    type: "warning",
    title: "Withdrawal Period Ending Soon",
    message: "Animal PIG-027 withdrawal period for Penicillin G ends in 2 days (Jan 25, 2024)",
    timestamp: "2024-01-22T09:15:00Z",
    read: false,
    animalId: "PIG-027",
    drugName: "Penicillin G"
  },
  {
    id: "3",
    type: "success",
    title: "Compliance Test Passed",
    message: "Animal SHP-012 cleared for processing - all MRL levels within acceptable limits",
    timestamp: "2024-01-22T08:45:00Z",
    read: true,
    animalId: "SHP-012"
  },
  {
    id: "4",
    type: "info",
    title: "New Drug Database Update",
    message: "Updated MRL limits for 15 substances according to latest FDA guidelines",
    timestamp: "2024-01-21T16:20:00Z",
    read: true
  },
  {
    id: "5",
    type: "warning",
    title: "Missing Veterinarian Approval",
    message: "Treatment record for BOV-045 requires veterinarian verification within 24 hours",
    timestamp: "2024-01-21T14:10:00Z",
    read: false,
    animalId: "BOV-045"
  }
];

export function NotificationCenter({ 
  notifications = mockNotifications, 
  onMarkAsRead, 
  onMarkAllRead, 
  onDismiss 
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'violation' | 'warning'>('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };
  
  const handleMarkAsRead = (id: string) => {
    console.log('Mark as read:', id); //todo: remove mock functionality
    onMarkAsRead?.(id);
  };
  
  const handleMarkAllRead = () => {
    console.log('Mark all as read'); //todo: remove mock functionality
    onMarkAllRead?.();
  };
  
  const handleDismiss = (id: string) => {
    console.log('Dismiss notification:', id); //todo: remove mock functionality
    onDismiss?.(id);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs" data-testid="unread-count">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" data-testid="button-filter">
                  <Filter className="w-4 h-4 mr-2" />
                  {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('all')} data-testid="filter-all">
                  All notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('unread')} data-testid="filter-unread">
                  Unread only
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('violation')} data-testid="filter-violation">
                  Violations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('warning')} data-testid="filter-warning">
                  Warnings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleMarkAllRead}
                data-testid="button-mark-all-read"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications to display'}
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const config = notificationConfig[notification.type];
              const Icon = config.icon;
              
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all hover-elevate",
                    config.bgColor,
                    config.borderColor,
                    !notification.read && "ring-2 ring-primary/20"
                  )}
                  data-testid={`notification-${notification.id}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.color)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            <Badge variant={config.badge} className="text-xs">
                              {notification.type}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" data-testid={`unread-${notification.id}`} />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span data-testid={`timestamp-${notification.id}`}>
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.animalId && (
                              <span data-testid={`animal-${notification.id}`}>
                                Animal: {notification.animalId}
                              </span>
                            )}
                            {notification.drugName && (
                              <span data-testid={`drug-${notification.id}`}>
                                Drug: {notification.drugName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              data-testid={`mark-read-${notification.id}`}
                            >
                              Mark read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDismiss(notification.id)}
                            data-testid={`dismiss-${notification.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}