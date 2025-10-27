import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const siteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  location: z.string().trim().min(1, "Location is required").max(200, "Location must be less than 200 characters"),
  capacity: z.string().trim().min(1, "Capacity is required").max(100, "Capacity must be less than 100 characters"),
});

const Sites = () => {
  const [sites, setSites] = useState([
    { id: "1", name: "Primary Data Center", location: "New York, NY", capacity: "1000 servers" },
    { id: "2", name: "Secondary Recovery Site", location: "Chicago, IL", capacity: "500 servers" },
    { id: "3", name: "Cloud Backup Site", location: "AWS us-east-1", capacity: "Unlimited" },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = siteSchema.parse(formData);
      
      const newSite = {
        id: (sites.length + 1).toString(),
        name: validated.name,
        location: validated.location,
        capacity: validated.capacity,
      };
      
      setSites([...sites, newSite]);
      setFormData({ name: "", location: "", capacity: "" });
      setErrors({});
      setOpen(false);
      toast.success("Site added successfully");
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Recovery Sites</h1>
          <p className="text-muted-foreground">Physical and cloud recovery locations</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Recovery Site</DialogTitle>
              <DialogDescription>
                Add a new recovery site location
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter site name"
                  maxLength={100}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  maxLength={200}
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="e.g., 1000 servers"
                  maxLength={100}
                />
                {errors.capacity && <p className="text-sm text-destructive">{errors.capacity}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Site</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
