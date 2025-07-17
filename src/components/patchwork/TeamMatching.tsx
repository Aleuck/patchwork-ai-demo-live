import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, MapPin, Clock, Briefcase, RefreshCw } from "lucide-react";

interface TeamMatchingProps {
  serviceRequest: any;
  onComplete: (data: any) => void;
}

interface Professional {
  id: string;
  name: string;
  role: string;
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  location: string;
  skills: string[];
  avatar: string;
  matchReason: string;
}

const TeamMatching = ({ serviceRequest, onComplete }: TeamMatchingProps) => {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<Professional[]>([]);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [alternatives, setAlternatives] = useState<Professional[]>([]);

  useEffect(() => {
    // Simulate AI team matching
    setTimeout(() => {
      const matchedTeam = generateTeam(serviceRequest);
      const altTeam = generateAlternativeTeam(serviceRequest);
      setTeam(matchedTeam);
      setAlternatives(altTeam);
      setLoading(false);
    }, 4000);
  }, [serviceRequest]);

  const generateTeam = (request: any): Professional[] => {
    const mockProfessionals: Professional[] = [
      {
        id: "1",
        name: "Sarah Chen",
        role: "Lead Designer",
        rating: 4.9,
        completedJobs: 47,
        hourlyRate: 85,
        location: "San Francisco, CA",
        skills: ["UI/UX Design", "Branding", "Web Design"],
        avatar: "/placeholder.svg",
        matchReason: "Specialized in modern web design with 5+ years experience"
      },
      {
        id: "2", 
        name: "Marcus Rodriguez",
        role: "Full-Stack Developer",
        rating: 4.8,
        completedJobs: 32,
        hourlyRate: 95,
        location: "San Francisco, CA",
        skills: ["React", "Node.js", "TypeScript"],
        avatar: "/placeholder.svg", 
        matchReason: "Expert in React development with proven track record"
      },
      {
        id: "3",
        name: "Elena Vasquez",
        role: "Project Manager",
        rating: 4.9,
        completedJobs: 63,
        hourlyRate: 75,
        location: "San Francisco, CA", 
        skills: ["Agile", "Communication", "Quality Assurance"],
        avatar: "/placeholder.svg",
        matchReason: "Excellent at coordinating design-dev teams"
      }
    ];

    // Adjust team based on service type
    if (request.serviceType === "Graphic Design") {
      return mockProfessionals.slice(0, 2);
    } else if (request.serviceType === "Web Development") {
      return [mockProfessionals[1], mockProfessionals[2]];
    }
    
    return mockProfessionals;
  };

  const generateAlternativeTeam = (request: any): Professional[] => {
    return [
      {
        id: "4",
        name: "David Kim",
        role: "Senior Designer",
        rating: 4.7,
        completedJobs: 28,
        hourlyRate: 80,
        location: "San Francisco, CA",
        skills: ["Graphic Design", "Illustration", "Animation"],
        avatar: "/placeholder.svg",
        matchReason: "Creative specialist with unique illustration style"
      },
      {
        id: "5",
        name: "Alex Thompson", 
        role: "Frontend Developer",
        rating: 4.6,
        completedJobs: 19,
        hourlyRate: 70,
        location: "San Francisco, CA",
        skills: ["React", "Vue.js", "CSS"],
        avatar: "/placeholder.svg",
        matchReason: "Fast delivery with attention to detail"
      }
    ];
  };

  const replaceTeamMember = (currentId: string, replacement: Professional) => {
    setTeam(prev => prev.map(member => 
      member.id === currentId ? replacement : member
    ));
    setAlternatives(prev => prev.filter(alt => alt.id !== replacement.id));
    setShowAlternatives(false);
  };

  const handleConfirm = () => {
    onComplete({ selectedTeam: team });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl mx-auto shadow-strong">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-accent border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Finding Your Perfect Team</h3>
            <p className="text-muted-foreground mb-6">Our AI is analyzing thousands of professionals...</p>
            
            <div className="space-y-3">
              {["Analyzing skill compatibility", "Checking availability", "Reviewing past performance", "Optimizing team chemistry"].map((step, index) => (
                <div key={step} className="flex items-center justify-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${index <= Math.floor(Date.now() / 1000) % 4 ? 'bg-primary' : 'bg-muted'} transition-colors`}></div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Your Matched Team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              {team.map((professional) => (
                <Card key={professional.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={professional.avatar} />
                      <AvatarFallback className="bg-primary text-white">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{professional.name}</h4>
                          <p className="text-sm text-muted-foreground">{professional.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">${professional.hourlyRate}/hr</div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-amber-dark text-amber-dark" />
                            <span>{professional.rating}</span>
                            <span className="text-muted-foreground">({professional.completedJobs} jobs)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {professional.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {professional.completedJobs} completed jobs
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {professional.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-teal-light rounded-lg">
                        <p className="text-sm font-medium text-teal-dark">Why this match:</p>
                        <p className="text-sm text-teal-dark">{professional.matchReason}</p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAlternatives(!showAlternatives)}
                          className="text-primary"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          View Alternatives
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {showAlternatives && alternatives.length > 0 && (
              <Card className="p-4 border-accent">
                <h4 className="font-semibold mb-4">Alternative Professionals</h4>
                <div className="space-y-3">
                  {alternatives.map((alt) => (
                    <div key={alt.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-accent text-white">
                            {alt.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{alt.name}</p>
                          <p className="text-sm text-muted-foreground">{alt.role} • ${alt.hourlyRate}/hr</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => replaceTeamMember(team[0].id, alt)}
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Total estimated cost</p>
                <p className="text-2xl font-bold text-primary">
                  ${Math.round(team.reduce((sum, p) => sum + p.hourlyRate, 0) * 0.8)}/hr team rate
                </p>
              </div>
              <Button onClick={handleConfirm} className="bg-primary">
                Confirm Team Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamMatching;