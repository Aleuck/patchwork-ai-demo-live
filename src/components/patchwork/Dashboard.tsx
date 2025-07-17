import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  Calendar,
  Users,
  BarChart3,
  Plus
} from "lucide-react";

interface DashboardProps {
  serviceRequest: any;
}

const Dashboard = ({ serviceRequest }: DashboardProps) => {
  const currentProject = {
    id: "PRJ-001",
    title: `${serviceRequest.serviceType} Project`,
    status: "submitted",
    createdAt: new Date().toISOString(),
    estimatedCost: serviceRequest.estimate?.average || 2500,
    timeline: serviceRequest.estimate?.timeline || "2-3 weeks",
    team: serviceRequest.selectedTeam || []
  };

  const pastProjects = [
    {
      id: "PRJ-002",
      title: "Logo Design",
      status: "completed",
      completedAt: "2024-01-15",
      finalCost: 1200,
      rating: 5
    },
    {
      id: "PRJ-003", 
      title: "Website Maintenance",
      status: "in-progress",
      startedAt: "2024-01-20",
      estimatedCost: 800,
      progress: 65
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-amber-medium';
      case 'submitted': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress'; 
      case 'submitted': return 'Submitted';
      default: return 'Draft';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Here's what's happening with your projects</p>
          </div>
          <Button 
            className="bg-primary"
            onClick={() => window.location.reload()}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Request Submitted Successfully!</h3>
                <p className="text-green-700">Your {serviceRequest.serviceType} project has been submitted and our team will contact you within 24 hours.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">$8.2k</div>
              <div className="text-sm text-muted-foreground">Total Invested</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-teal-medium rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Professionals Worked With</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-medium rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Project */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Current Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{currentProject.title}</h3>
                  <Badge className={`${getStatusColor(currentProject.status)} text-white`}>
                    {getStatusText(currentProject.status)}
                  </Badge>
                </div>
                <p className="text-muted-foreground">Project ID: {currentProject.id}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Timeline: {currentProject.timeline}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Est. Cost: ${currentProject.estimatedCost.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Team
                </Button>
                <Button size="sm">View Details</Button>
              </div>
            </div>

            {currentProject.team.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Assigned Team</h4>
                <div className="flex flex-wrap gap-3">
                  {currentProject.team.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-white text-xs">
                          {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project History */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Project History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{project.title}</h4>
                      <Badge variant="outline" className={`${getStatusColor(project.status)} text-white border-0`}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.status === 'completed' 
                        ? `Completed on ${new Date(project.completedAt!).toLocaleDateString()}`
                        : `Started on ${new Date(project.startedAt!).toLocaleDateString()}`
                      }
                    </p>
                    {project.status === 'in-progress' && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{project.progress}%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(project.finalCost || project.estimatedCost).toLocaleString()}
                    </p>
                    {project.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <span>★</span>
                        <span>{project.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;