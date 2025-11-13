import { DataManager } from "@/components/DataManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

const initialResources: any[] = [];

const Resources = () => {
  return (
    <DataManager
      title="Resources"
      description="Manage system resources and inventory"
      fields={[
        { name: "name", label: "Resource Name", type: "text", required: true },
        { name: "type", label: "Type", type: "select", options: ["Hardware", "Software", "Network", "Storage"], required: true },
        { name: "status", label: "Status", type: "select", options: ["Active", "Standby", "Maintenance", "Inactive"], required: true },
      ]}
      initialData={initialResources}
      renderCard={(resource) => (
        <Card key={resource.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                  <CardDescription>{resource.type}</CardDescription>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                {resource.status}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resource ID:</span>
                <span className="font-mono text-foreground">{resource.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="text-foreground">{resource.type}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
};

export default Resources;
