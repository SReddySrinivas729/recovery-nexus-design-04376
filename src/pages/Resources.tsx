import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Database } from "lucide-react";

const Resources = () => {
  const resources = [
    { id: "1", name: "Server Cluster A", type: "Hardware", status: "Active" },
    { id: "2", name: "Database Instance 1", type: "Software", status: "Active" },
    { id: "3", name: "Network Equipment", type: "Hardware", status: "Standby" },
    { id: "4", name: "Storage Array", type: "Hardware", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Resources</h1>
          <p className="text-muted-foreground">Manage system resources and inventory</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
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
        ))}
      </div>
    </div>
  );
};

export default Resources;
