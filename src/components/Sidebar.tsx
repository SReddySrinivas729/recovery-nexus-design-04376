import { Link, useLocation } from "react-router-dom";
import { Database, HardDrive, MapPin, FileText, Shield, AlertTriangle, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Resources", href: "/resources", icon: Database },
  { name: "Business Processes", href: "/processes", icon: FileText },
  { name: "Recovery Sites", href: "/sites", icon: MapPin },
  { name: "Data Backups", href: "/backups", icon: HardDrive },
  { name: "Recovery Plans", href: "/plans", icon: Shield },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            DR System
          </h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            Business Continuity
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
            <p className="text-xs font-semibold text-sidebar-foreground mb-1">
              Team: S. Reddy Srinivas
            </p>
            <p className="text-xs text-sidebar-foreground/70">
              Reg. No: 23BCE2140
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
