import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";

const Sites = () => {
  const sites = [
    { id: "1", name: "Primary Data Center", location: "New York, NY", capacity: "1000 servers" },
    { id: "2", name: "Secondary Recovery Site", location: "Chicago, IL", capacity: "500 servers" },
    { id: "3", name: "Cloud Backup Site", location: "AWS us-east-1", capacity: "Unlimited" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Recovery Sites</h1>
          <p className="text-muted-foreground">Physical and cloud recovery locations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Site
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <CardDescription>Site ID: {site.id}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground font-medium">{site.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="text-foreground font-medium">{site.capacity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sites;
