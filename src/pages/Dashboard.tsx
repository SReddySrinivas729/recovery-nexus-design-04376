import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, HardDrive, MapPin, FileText, Shield, AlertTriangle } from "lucide-react";

const ERDiagram = () => (
  <div className="w-full overflow-x-auto bg-card rounded-lg p-6 border border-border">
    <div className="min-w-[800px]">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Entity-Relationship Diagram</h3>
        <p className="text-muted-foreground">Business Process Recovery & Data Backup System</p>
      </div>
      
      <div className="mermaid-container">
        <pre className="mermaid">
{`erDiagram
    RESOURCES ||--o{ BUSINESSPROCESS : requires
    RESOURCES ||--o{ RECOVERYSITE : moves
    RECOVERYSITE ||--o{ DATABACKUP : specifies
    BUSINESSPROCESS ||--o{ PLAN : covers
    PLAN ||--o{ INCIDENT : triggers
    RECOVERYSITE ||--o{ PLAN : includes

    RESOURCES {
        uuid resource_id PK
        string resource_type
        string resource_name
    }

    BUSINESSPROCESS {
        uuid process_id PK
        string process_name
        string priority_level
    }

    RECOVERYSITE {
        uuid site_id PK
        string site_name
        string location
    }

    DATABACKUP {
        uuid data_id PK
        string type
        string location
    }

    PLAN {
        uuid plan_id PK
        string plan_type
    }

    INCIDENT {
        uuid incident_id PK
        date date
        string type
        string impact_level
    }`}
        </pre>
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon: Icon, description }: any) => (
  <Card className="transition-all hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Business Process Recovery System
        </h1>
        <p className="text-muted-foreground text-lg">
          Disaster Recovery & Business Continuity Management Platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Resources"
          value="24"
          icon={Database}
          description="Active resources tracked"
        />
        <StatCard
          title="Recovery Sites"
          value="6"
          icon={MapPin}
          description="Operational sites"
        />
        <StatCard
          title="Data Backups"
          value="156"
          icon={HardDrive}
          description="Backup instances"
        />
        <StatCard
          title="Business Processes"
          value="18"
          icon={FileText}
          description="Critical processes"
        />
        <StatCard
          title="Recovery Plans"
          value="12"
          icon={Shield}
          description="Active plans"
        />
        <StatCard
          title="Incidents"
          value="3"
          icon={AlertTriangle}
          description="Recorded incidents"
        />
      </div>

      <ERDiagram />

      <Card>
        <CardHeader>
          <CardTitle>Project Abstract</CardTitle>
          <CardDescription>System Overview & Technical Specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Title</h4>
            <p className="text-muted-foreground">
              Business Process Recovery Site & Data Backup System
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">Team Member</h4>
            <p className="text-muted-foreground">S. Reddy Srinivas - Reg. No. 23BCE2140</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Technology Stack</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Frontend</p>
                <p className="text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Database</p>
                <p className="text-sm text-muted-foreground">MySQL (Relational Database)</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Functional Requirements</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              <li>Maintain business process details with priority levels</li>
              <li>Track resource inventory and movements to recovery sites</li>
              <li>Store recovery site details (location, site name)</li>
              <li>Maintain data backup records with type and location</li>
              <li>Define recovery plans linked to business processes</li>
              <li>Record incidents with type, date, impact level, and triggered plans</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
