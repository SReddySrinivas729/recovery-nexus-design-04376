import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Incidents = () => {
  const incidents = [
    { id: "1", type: "Server Outage", date: "2024-01-15", impact: "High", status: "Resolved" },
    { id: "2", type: "Network Failure", date: "2024-01-10", impact: "Critical", status: "Investigating" },
    { id: "3", type: "Data Corruption", date: "2024-01-08", impact: "Medium", status: "Resolved" },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-accent text-accent-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Incidents</h1>
          <p className="text-muted-foreground">Track and manage system incidents</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {incidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{incident.type}</CardTitle>
                    <CardDescription>Incident ID: {incident.id}</CardDescription>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  {incident.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground font-medium">{incident.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Impact Level:</span>
                  <Badge className={getImpactColor(incident.impact)}>
                    {incident.impact}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Incidents;
