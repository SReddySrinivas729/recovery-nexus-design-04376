import { DataManager } from "@/components/DataManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive } from "lucide-react";

const initialBackups: any[] = [];

const Backups = () => {
  return (
    <DataManager
      title="Data Backups"
      description="Backup instances and storage locations"
      fields={[
        { name: "type", label: "Backup Type", type: "select", options: ["Full Backup", "Incremental", "Differential"], required: true },
        { name: "location", label: "Storage Location", type: "text", required: true },
        { name: "size", label: "Backup Size", type: "text", required: true },
      ]}
      initialData={initialBackups}
      renderCard={(backup) => (
        <Card key={backup.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <HardDrive className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">{backup.type}</CardTitle>
                <CardDescription>Backup ID: {backup.id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">{backup.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium text-foreground">{backup.size}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
};

export default Backups;
