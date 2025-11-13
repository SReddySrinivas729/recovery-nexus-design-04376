import { DataManager } from "@/components/DataManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const initialPlans: any[] = [];

const Plans = () => {
  return (
    <DataManager
      title="Recovery Plans"
      description="Disaster recovery and business continuity plans"
      fields={[
        { name: "type", label: "Plan Type", type: "text", required: true },
        { name: "processes", label: "Number of Processes", type: "text", required: true },
        { name: "sites", label: "Number of Sites", type: "text", required: true },
        { name: "status", label: "Status", type: "select", options: ["Active", "Standby", "Inactive"], required: true },
      ]}
      initialData={initialPlans}
      renderCard={(plan) => (
        <Card key={plan.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{plan.type}</CardTitle>
                  <CardDescription>Plan ID: {plan.id}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processes:</span>
                <span className="font-medium text-foreground">{plan.processes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sites:</span>
                <span className="font-medium text-foreground">{plan.sites}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                  {plan.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
};

export default Plans;
