import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { z } from "zod";

const incidentSchema = z.object({
  type: z.string().trim().min(1, "Type is required").max(100, "Type must be less than 100 characters"),
  date: z.string().min(1, "Date is required"),
  impact: z.string().min(1, "Impact level is required"),
  status: z.string().min(1, "Status is required"),
});

const Incidents = () => {
  const [incidents, setIncidents] = useState([
    { id: "1", type: "Server Outage", date: "2024-01-15", impact: "High", status: "Resolved" },
    { id: "2", type: "Network Failure", date: "2024-01-10", impact: "Critical", status: "Investigating" },
    { id: "3", type: "Data Corruption", date: "2024-01-08", impact: "Medium", status: "Resolved" },
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    impact: "",
    status: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = incidentSchema.parse(formData);
      
      const newIncident = {
        id: (incidents.length + 1).toString(),
        type: validated.type,
        date: validated.date,
        impact: validated.impact,
        status: validated.status,
      };
      
      setIncidents([...incidents, newIncident]);
      setFormData({ type: "", date: "", impact: "", status: "" });
      setErrors({});
      setOpen(false);
      toast.success("Incident reported successfully");
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Incidents</h1>
          <p className="text-muted-foreground">Track and manage system incidents</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Incident</DialogTitle>
              <DialogDescription>
                Report a new system incident
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Incident Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Server Outage"
                  maxLength={100}
                />
                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Impact Level</Label>
                <Select
                  value={formData.impact}
                  onValueChange={(value) => setFormData({ ...formData, impact: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                {errors.impact && <p className="text-sm text-destructive">{errors.impact}</p>}
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
                    <SelectItem value="Investigating">Investigating</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Report Incident</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {incidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{incident.type}</CardTitle>
                    <CardDescription>Incident ID: {incident.id}</CardDescription>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  {incident.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground font-medium">{incident.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Impact Level:</span>
                  <Badge className={getImpactColor(incident.impact)}>
                    {incident.impact}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Incidents;
