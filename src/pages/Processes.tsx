import { DataManager } from "@/components/DataManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialProcesses = [
  { id: "1", name: "Customer Transaction Processing", priority: "Critical", rto: "2 hours" },
  { id: "2", name: "Inventory Management", priority: "High", rto: "4 hours" },
  { id: "3", name: "Email Services", priority: "Medium", rto: "8 hours" },
  { id: "4", name: "Analytics Processing", priority: "Low", rto: "24 hours" },
];

const Processes = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-accent text-accent-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DataManager
      title="Business Processes"
      description="Critical business operations and priority levels"
      fields={[
        { name: "name", label: "Process Name", type: "text", required: true },
        { name: "priority", label: "Priority Level", type: "select", options: ["Critical", "High", "Medium", "Low"], required: true },
        { name: "rto", label: "Recovery Time Objective (RTO)", type: "text", required: true },
      ]}
      initialData={initialProcesses}
      renderCard={(process) => (
        <Card key={process.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{process.name}</CardTitle>
                  <CardDescription>Process ID: {process.id}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Priority Level:</span>
                <Badge className={getPriorityColor(process.priority)}>
                  {process.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recovery Time:</span>
                <span className="text-sm font-medium text-foreground">{process.rto}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
};

export default Processes;
