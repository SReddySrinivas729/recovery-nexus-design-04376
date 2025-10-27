import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, HardDrive } from "lucide-react";

const Backups = () => {
  const backups = [
    { id: "1", type: "Full Backup", location: "AWS S3", lastRun: "2024-01-15 02:00", size: "2.4 TB" },
    { id: "2", type: "Incremental", location: "Azure Blob", lastRun: "2024-01-15 14:00", size: "156 GB" },
    { id: "3", type: "Full Backup", location: "On-premise NAS", lastRun: "2024-01-14 02:00", size: "2.3 TB" },
    { id: "4", type: "Differential", location: "Google Cloud", lastRun: "2024-01-15 08:00", size: "342 GB" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Data Backups</h1>
          <p className="text-muted-foreground">Backup instances and storage locations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Backup
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {backups.map((backup) => (
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
                  <span className="text-muted-foreground">Last Run:</span>
                  <span className="text-foreground">{backup.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium text-foreground">{backup.size}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Backups;
