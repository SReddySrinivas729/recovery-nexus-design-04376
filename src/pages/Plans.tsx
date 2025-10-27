import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shield } from "lucide-react";

const Plans = () => {
  const plans = [
    { id: "1", type: "Full Recovery", processes: 5, sites: 2, status: "Active" },
    { id: "2", type: "Partial Recovery", processes: 3, sites: 1, status: "Active" },
    { id: "3", type: "Emergency Failover", processes: 8, sites: 3, status: "Standby" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Recovery Plans</h1>
          <p className="text-muted-foreground">Disaster recovery and business continuity plans</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
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
        ))}
      </div>
    </div>
  );
};

export default Plans;
