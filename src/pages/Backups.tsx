import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, HardDrive } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const backupSchema = z.object({
  type: z.string().min(1, "Type is required"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  size: z.string().trim().min(1, "Size is required").max(50, "Size must be less than 50 characters"),
});

const Backups = () => {
  const [backups, setBackups] = useState([
    { id: "1", type: "Full Backup", location: "AWS S3", lastRun: "2024-01-15 02:00", size: "2.4 TB" },
    { id: "2", type: "Incremental", location: "Azure Blob", lastRun: "2024-01-15 14:00", size: "156 GB" },
    { id: "3", type: "Full Backup", location: "On-premise NAS", lastRun: "2024-01-14 02:00", size: "2.3 TB" },
    { id: "4", type: "Differential", location: "Google Cloud", lastRun: "2024-01-15 08:00", size: "342 GB" },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    size: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = backupSchema.parse(formData);
      
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
      
      const newBackup = {
        id: (backups.length + 1).toString(),
        type: validated.type,
        location: validated.location,
        lastRun: formattedDate,
        size: validated.size,
      };
      
      setBackups([...backups, newBackup]);
      setFormData({ type: "", location: "", size: "" });
      setErrors({});
      setOpen(false);
      toast.success("Backup created successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Data Backups</h1>
          <p className="text-muted-foreground">Backup instances and storage locations</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Data Backup</DialogTitle>
              <DialogDescription>
                Create a new backup instance
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Backup Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select backup type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Backup">Full Backup</SelectItem>
                    <SelectItem value="Incremental">Incremental</SelectItem>
                    <SelectItem value="Differential">Differential</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., AWS S3, Azure Blob"
                  maxLength={100}
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Backup Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 2.4 TB, 156 GB"
                  maxLength={50}
                />
                {errors.size && <p className="text-sm text-destructive">{errors.size}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Backup</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
