import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: "text" | "select";
  options?: string[];
  required?: boolean;
}

interface DataManagerProps {
  title: string;
  description: string;
  fields: Field[];
  initialData: any[];
  renderCard: (item: any) => React.ReactNode;
}

export const DataManager = ({ title, description, fields, initialData, renderCard }: DataManagerProps) => {
  const [items, setItems] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setItems([...items, newItem]);
    setFormData({});
    setOpen(false);
    toast({ title: "Success", description: `${title.slice(0, -1)} created successfully` });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add {title.slice(0, -1)}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === "text" ? (
                    <Input
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  ) : (
                    <Select
                      required={field.required}
                      value={formData[field.name]}
                      onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => renderCard(item))}
      </div>
    </div>
  );
};
