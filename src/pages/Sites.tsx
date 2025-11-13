import { DataManager } from "@/components/DataManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const initialSites: any[] = [];

const Sites = () => {
  return (
    <DataManager
      title="Recovery Sites"
      description="Physical and cloud recovery locations"
      fields={[
        { name: "name", label: "Site Name", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "capacity", label: "Capacity", type: "text", required: true },
      ]}
      initialData={initialSites}
      renderCard={(site) => (
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
      )}
    />
  );
};

export default Sites;
