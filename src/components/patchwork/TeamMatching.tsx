import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, MapPin, Clock, Briefcase, RefreshCw, CheckCircle } from "lucide-react";

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
  const [selectedForReplacement, setSelectedForReplacement] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

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
    const professionalPools: Record<string, Professional[]> = {
      "Home Renovation": [
        { id: "hr1", name: "Mike Thompson", role: "General Contractor", rating: 4.9, completedJobs: 65, hourlyRate: 75, location: "San Francisco, CA", skills: ["Renovation", "Project Management", "Electrical"], avatar: "/placeholder.svg", matchReason: "20+ years experience in home renovations" },
        { id: "hr2", name: "Lisa Chen", role: "Interior Designer", rating: 4.8, completedJobs: 43, hourlyRate: 85, location: "San Francisco, CA", skills: ["Interior Design", "3D Modeling", "Color Theory"], avatar: "/placeholder.svg", matchReason: "Award-winning designer with modern aesthetic" },
        { id: "hr3", name: "Carlos Rodriguez", role: "Plumbing Specialist", rating: 4.7, completedJobs: 89, hourlyRate: 65, location: "San Francisco, CA", skills: ["Plumbing", "HVAC", "Permits"], avatar: "/placeholder.svg", matchReason: "Licensed contractor with emergency service" }
      ],
      "Graphic Design": [
        { id: "gd1", name: "Sarah Chen", role: "Lead Designer", rating: 4.9, completedJobs: 47, hourlyRate: 85, location: "San Francisco, CA", skills: ["UI/UX Design", "Branding", "Web Design"], avatar: "/placeholder.svg", matchReason: "Specialized in modern web design with 5+ years experience" },
        { id: "gd2", name: "Alex Kim", role: "Brand Designer", rating: 4.8, completedJobs: 32, hourlyRate: 75, location: "San Francisco, CA", skills: ["Logo Design", "Brand Identity", "Print Design"], avatar: "/placeholder.svg", matchReason: "Creative specialist with unique brand approach" },
        { id: "gd3", name: "Maya Patel", role: "Illustrator", rating: 4.9, completedJobs: 38, hourlyRate: 80, location: "San Francisco, CA", skills: ["Illustration", "Digital Art", "Animation"], avatar: "/placeholder.svg", matchReason: "Award-winning illustrator with versatile style" }
      ],
      "Web Development": [
        { id: "wd1", name: "Marcus Rodriguez", role: "Full-Stack Developer", rating: 4.8, completedJobs: 32, hourlyRate: 95, location: "San Francisco, CA", skills: ["React", "Node.js", "TypeScript"], avatar: "/placeholder.svg", matchReason: "Expert in React development with proven track record" },
        { id: "wd2", name: "Elena Vasquez", role: "Project Manager", rating: 4.9, completedJobs: 63, hourlyRate: 75, location: "San Francisco, CA", skills: ["Agile", "Communication", "Quality Assurance"], avatar: "/placeholder.svg", matchReason: "Excellent at coordinating design-dev teams" },
        { id: "wd3", name: "James Wilson", role: "Backend Developer", rating: 4.7, completedJobs: 28, hourlyRate: 90, location: "San Francisco, CA", skills: ["Python", "PostgreSQL", "API Design"], avatar: "/placeholder.svg", matchReason: "Database optimization expert with scalability focus" }
      ],
      "Content Writing": [
        { id: "cw1", name: "Emma Johnson", role: "Content Strategist", rating: 4.8, completedJobs: 54, hourlyRate: 65, location: "San Francisco, CA", skills: ["Content Strategy", "SEO", "Research"], avatar: "/placeholder.svg", matchReason: "Proven track record in driving organic traffic" },
        { id: "cw2", name: "David Miller", role: "Copywriter", rating: 4.9, completedJobs: 72, hourlyRate: 70, location: "San Francisco, CA", skills: ["Copywriting", "Email Marketing", "Conversion"], avatar: "/placeholder.svg", matchReason: "High-converting copy for SaaS companies" },
        { id: "cw3", name: "Rachel Green", role: "Technical Writer", rating: 4.7, completedJobs: 41, hourlyRate: 75, location: "San Francisco, CA", skills: ["Technical Writing", "Documentation", "API Docs"], avatar: "/placeholder.svg", matchReason: "Clear technical communication specialist" }
      ],
      "Photography": [
        { id: "ph1", name: "Jonathan Lee", role: "Event Photographer", rating: 4.9, completedJobs: 76, hourlyRate: 85, location: "San Francisco, CA", skills: ["Event Photography", "Portrait", "Editing"], avatar: "/placeholder.svg", matchReason: "Capturing memorable moments with artistic vision" },
        { id: "ph2", name: "Sofia Martinez", role: "Product Photographer", rating: 4.8, completedJobs: 45, hourlyRate: 90, location: "San Francisco, CA", skills: ["Product Photography", "Studio Lighting", "Retouching"], avatar: "/placeholder.svg", matchReason: "E-commerce specialist with high conversion rates" },
        { id: "ph3", name: "Kevin Brown", role: "Wedding Photographer", rating: 4.9, completedJobs: 83, hourlyRate: 95, location: "San Francisco, CA", skills: ["Wedding Photography", "Candid", "Albums"], avatar: "/placeholder.svg", matchReason: "Romantic storytelling through photography" }
      ]
    };

    const serviceTeam = professionalPools[request.serviceType] || professionalPools["Graphic Design"];
    return serviceTeam.slice(0, 3); // Return first 3 professionals for the team
  };

  const generateAlternativeTeam = (request: any): Professional[] => {
    const alternativePools: Record<string, Professional[]> = {
      "Home Renovation": [
        { id: "hr4", name: "Tom Johnson", role: "Renovation Expert", rating: 4.6, completedJobs: 52, hourlyRate: 70, location: "San Francisco, CA", skills: ["Renovation", "Carpentry", "Painting"], avatar: "/placeholder.svg", matchReason: "Cost-effective solutions with quality craftsmanship" },
        { id: "hr5", name: "Nina Garcia", role: "Design Consultant", rating: 4.8, completedJobs: 36, hourlyRate: 80, location: "San Francisco, CA", skills: ["Space Planning", "Materials", "Sustainability"], avatar: "/placeholder.svg", matchReason: "Eco-friendly design with modern aesthetics" },
        { id: "hr6", name: "Steve Wilson", role: "Electrical Contractor", rating: 4.7, completedJobs: 94, hourlyRate: 60, location: "San Francisco, CA", skills: ["Electrical", "Smart Home", "Safety"], avatar: "/placeholder.svg", matchReason: "Smart home integration specialist" }
      ],
      "Graphic Design": [
        { id: "gd4", name: "David Kim", role: "Senior Designer", rating: 4.7, completedJobs: 28, hourlyRate: 80, location: "San Francisco, CA", skills: ["Graphic Design", "Illustration", "Animation"], avatar: "/placeholder.svg", matchReason: "Creative specialist with unique illustration style" },
        { id: "gd5", name: "Jennifer Lee", role: "Visual Designer", rating: 4.6, completedJobs: 31, hourlyRate: 70, location: "San Francisco, CA", skills: ["Visual Design", "Typography", "Layout"], avatar: "/placeholder.svg", matchReason: "Typography expert with clean design approach" },
        { id: "gd6", name: "Carlos Silva", role: "Motion Designer", rating: 4.8, completedJobs: 25, hourlyRate: 85, location: "San Francisco, CA", skills: ["Motion Graphics", "Video", "After Effects"], avatar: "/placeholder.svg", matchReason: "Engaging motion graphics for digital platforms" }
      ],
      "Web Development": [
        { id: "wd4", name: "Alex Thompson", role: "Frontend Developer", rating: 4.6, completedJobs: 19, hourlyRate: 70, location: "San Francisco, CA", skills: ["React", "Vue.js", "CSS"], avatar: "/placeholder.svg", matchReason: "Fast delivery with attention to detail" },
        { id: "wd5", name: "Maria Santos", role: "UI Developer", rating: 4.7, completedJobs: 42, hourlyRate: 85, location: "San Francisco, CA", skills: ["JavaScript", "CSS", "Responsive"], avatar: "/placeholder.svg", matchReason: "Mobile-first development with pixel-perfect execution" },
        { id: "wd6", name: "Ryan Chang", role: "DevOps Engineer", rating: 4.8, completedJobs: 33, hourlyRate: 100, location: "San Francisco, CA", skills: ["AWS", "Docker", "CI/CD"], avatar: "/placeholder.svg", matchReason: "Scalable infrastructure with automated deployment" }
      ],
      "Content Writing": [
        { id: "cw4", name: "Lisa Wong", role: "Blog Writer", rating: 4.6, completedJobs: 58, hourlyRate: 55, location: "San Francisco, CA", skills: ["Blog Writing", "Research", "Content Calendar"], avatar: "/placeholder.svg", matchReason: "Engaging blog content with SEO optimization" },
        { id: "cw5", name: "Michael Davis", role: "Social Media Writer", rating: 4.7, completedJobs: 67, hourlyRate: 60, location: "San Francisco, CA", skills: ["Social Media", "Engagement", "Trends"], avatar: "/placeholder.svg", matchReason: "Viral content creator with engagement expertise" },
        { id: "cw6", name: "Amy Taylor", role: "Grant Writer", rating: 4.8, completedJobs: 29, hourlyRate: 80, location: "San Francisco, CA", skills: ["Grant Writing", "Research", "Proposals"], avatar: "/placeholder.svg", matchReason: "Successful grant applications with proven results" }
      ],
      "Photography": [
        { id: "ph4", name: "Daniel Kim", role: "Portrait Photographer", rating: 4.7, completedJobs: 51, hourlyRate: 75, location: "San Francisco, CA", skills: ["Portrait", "Headshots", "Studio"], avatar: "/placeholder.svg", matchReason: "Professional headshots with personal branding focus" },
        { id: "ph5", name: "Olivia Chen", role: "Lifestyle Photographer", rating: 4.8, completedJobs: 62, hourlyRate: 80, location: "San Francisco, CA", skills: ["Lifestyle", "Brand Photography", "Natural Light"], avatar: "/placeholder.svg", matchReason: "Authentic lifestyle shots for brand storytelling" },
        { id: "ph6", name: "Marcus Johnson", role: "Real Estate Photographer", rating: 4.6, completedJobs: 78, hourlyRate: 70, location: "San Francisco, CA", skills: ["Real Estate", "Drone", "Virtual Tours"], avatar: "/placeholder.svg", matchReason: "Property showcase with virtual tour expertise" }
      ]
    };

    const serviceAlternatives = alternativePools[request.serviceType] || alternativePools["Graphic Design"];
    return serviceAlternatives.slice(0, 4); // Return 4 alternatives
  };

  const replaceTeamMember = (currentId: string, replacement: Professional) => {
    setTeam(prev => prev.map(member => 
      member.id === currentId ? replacement : member
    ));
    setAlternatives(prev => prev.filter(alt => alt.id !== replacement.id));
    setShowAlternatives(false);
    setSelectedForReplacement(null);
  };

  const showAlternativesForMember = (memberId: string) => {
    setSelectedForReplacement(memberId);
    setShowAlternatives(true);
  };

  const handleConfirm = () => {
    setCompleted(true);
    setTimeout(() => {
      onComplete({ selectedTeam: team });
    }, 1000);
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
                          onClick={() => showAlternativesForMember(professional.id)}
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

            {showAlternatives && alternatives.length > 0 && selectedForReplacement && (
              <Card className="p-4 border-accent">
                <h4 className="font-semibold mb-4">
                  Alternative Professionals for {team.find(m => m.id === selectedForReplacement)?.name}
                </h4>
                <div className="space-y-3">
                  {alternatives.map((alt) => (
                    <div key={alt.id} className="space-y-3 p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-accent text-white">
                              {alt.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{alt.name}</p>
                            <p className="text-sm text-muted-foreground">{alt.role} • ${alt.hourlyRate}/hr</p>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 fill-amber-dark text-amber-dark" />
                              <span>{alt.rating}</span>
                              <span className="text-muted-foreground">({alt.completedJobs} jobs)</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => replaceTeamMember(selectedForReplacement, alt)}
                        >
                          Select
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">AI Evaluation:</p>
                        <p className="text-sm text-blue-700">{alt.matchReason}</p>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {alt.rating >= 4.8 ? "Excellent" : alt.rating >= 4.5 ? "Very Good" : "Good"} Rating
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alt.hourlyRate < 75 ? "Cost Effective" : alt.hourlyRate > 90 ? "Premium" : "Competitive"} Rate
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAlternatives(false)}
                  >
                    Close Alternatives
                  </Button>
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
              <div className="flex items-center gap-3">
                {completed && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Step Completed</span>
                  </div>
                )}
                <Button onClick={handleConfirm} disabled={completed} className="bg-primary">
                  {completed ? "Proceeding..." : "Confirm Team Selection"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamMatching;