import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, HardDrive, MapPin, FileText, Shield, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StatCard = ({ title, value, icon: Icon, description }: any) => (
  <Card className="transition-all hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const getCount = (key: string) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved).length : 0;
  };

  const handleResetAll = () => {
    // Clear all BPR-related localStorage items
    Object.keys(localStorage)
      .filter(key => key.startsWith('bpr_'))
      .forEach(key => localStorage.removeItem(key));
    
    toast({ 
      title: "Data Reset Complete", 
      description: "All data has been cleared. Reloading..." 
    });
    
    // Reload page to show empty state
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Business Process Recovery System
          </h1>
          <p className="text-muted-foreground text-lg">
            Disaster Recovery & Business Continuity Management Platform
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Reset All Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all resources, processes, sites, backups, plans, and incidents. 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetAll}>
                Yes, delete everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Resources"
          value={getCount('bpr_resources')}
          icon={Database}
          description="Active resources tracked"
        />
        <StatCard
          title="Recovery Sites"
          value={getCount('bpr_recovery_sites')}
          icon={MapPin}
          description="Operational sites"
        />
        <StatCard
          title="Data Backups"
          value={getCount('bpr_data_backups')}
          icon={HardDrive}
          description="Backup instances"
        />
        <StatCard
          title="Business Processes"
          value={getCount('bpr_business_processes')}
          icon={FileText}
          description="Critical processes"
        />
        <StatCard
          title="Recovery Plans"
          value={getCount('bpr_recovery_plans')}
          icon={Shield}
          description="Active plans"
        />
        <StatCard
          title="Incidents"
          value={getCount('bpr_incidents')}
          icon={AlertTriangle}
          description="Recorded incidents"
        />
      </div>
    </div>
  );
};

export default Dashboard;
