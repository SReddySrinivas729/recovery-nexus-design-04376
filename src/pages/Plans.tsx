import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Shield } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const planSchema = z.object({
  type: z.string().trim().min(1, "Type is required").max(100, "Type must be less than 100 characters"),
  processes: z.string().min(1, "Processes count is required"),
  sites: z.string().min(1, "Sites count is required"),
  status: z.string().min(1, "Status is required"),
});

const Plans = () => {
  const [plans, setPlans] = useState([
    { id: "1", type: "Full Recovery", processes: 5, sites: 2, status: "Active" },
    { id: "2", type: "Partial Recovery", processes: 3, sites: 1, status: "Active" },
    { id: "3", type: "Emergency Failover", processes: 8, sites: 3, status: "Standby" },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    processes: "",
    sites: "",
    status: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = planSchema.parse(formData);
      
      const newPlan = {
        id: (plans.length + 1).toString(),
        type: validated.type,
        processes: parseInt(validated.processes),
        sites: parseInt(validated.sites),
        status: validated.status,
      };
      
      setPlans([...plans, newPlan]);
      setFormData({ type: "", processes: "", sites: "", status: "" });
      setErrors({});
      setOpen(false);
      toast.success("Plan created successfully");
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Recovery Plans</h1>
          <p className="text-muted-foreground">Disaster recovery and business continuity plans</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Recovery Plan</DialogTitle>
              <DialogDescription>
                Create a new disaster recovery plan
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Plan Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Full Recovery"
                  maxLength={100}
                />
                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="processes">Number of Processes</Label>
                <Input
                  id="processes"
                  type="number"
                  min="0"
                  value={formData.processes}
                  onChange={(e) => setFormData({ ...formData, processes: e.target.value })}
                  placeholder="Enter number of processes"
                />
                {errors.processes && <p className="text-sm text-destructive">{errors.processes}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sites">Number of Sites</Label>
                <Input
                  id="sites"
                  type="number"
                  min="0"
                  value={formData.sites}
                  onChange={(e) => setFormData({ ...formData, sites: e.target.value })}
                  placeholder="Enter number of sites"
                />
                {errors.sites && <p className="text-sm text-destructive">{errors.sites}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Standby">Standby</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Plan</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{plan.type}</CardTitle>
                    <CardDescription>Plan ID: {plan.id}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processes:</span>
                  <span className="font-medium text-foreground">{plan.processes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sites:</span>
                  <span className="font-medium text-foreground">{plan.sites}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                    {plan.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plans;
