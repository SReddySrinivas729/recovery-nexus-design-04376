import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { z } from "zod";

const processSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  priority: z.string().min(1, "Priority is required"),
  rto: z.string().min(1, "RTO is required").max(50, "RTO must be less than 50 characters"),
});

const Processes = () => {
  const [processes, setProcesses] = useState([
    { id: "1", name: "Customer Transaction Processing", priority: "Critical", rto: "2 hours" },
    { id: "2", name: "Inventory Management", priority: "High", rto: "4 hours" },
    { id: "3", name: "Email Services", priority: "Medium", rto: "8 hours" },
    { id: "4", name: "Analytics Processing", priority: "Low", rto: "24 hours" },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
    rto: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = processSchema.parse(formData);
      
      const newProcess = {
        id: (processes.length + 1).toString(),
        name: validated.name,
        priority: validated.priority,
        rto: validated.rto,
      };
      
      setProcesses([...processes, newProcess]);
      setFormData({ name: "", priority: "", rto: "" });
      setErrors({});
      setOpen(false);
      toast.success("Process added successfully");
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-accent text-accent-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Business Processes</h1>
          <p className="text-muted-foreground">Critical business operations and priority levels</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Process
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Business Process</DialogTitle>
              <DialogDescription>
                Add a new critical business process
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Process Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter process name"
                  maxLength={100}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && <p className="text-sm text-destructive">{errors.priority}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rto">Recovery Time Objective (RTO)</Label>
                <Input
                  id="rto"
                  value={formData.rto}
                  onChange={(e) => setFormData({ ...formData, rto: e.target.value })}
                  placeholder="e.g., 2 hours"
                  maxLength={50}
                />
                {errors.rto && <p className="text-sm text-destructive">{errors.rto}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Process</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processes.map((process) => (
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
        ))}
      </div>
    </div>
  );
};

export default Processes;
