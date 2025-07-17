import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Clock, MapPin, Star, Edit2, Check } from "lucide-react";

interface BudgetEstimateProps {
  serviceRequest: any;
  onComplete: (data: any) => void;
}

const BudgetEstimate = ({ serviceRequest, onComplete }: BudgetEstimateProps) => {
  const [estimate, setEstimate] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simulate AI processing
    setTimeout(() => {
      const mockEstimate = generateEstimate(serviceRequest);
      setEstimate(mockEstimate);
      setEditedDescription(serviceRequest.description || "");
      setLoading(false);
    }, 2000);
  }, [serviceRequest]);

  const generateEstimate = (request: any) => {
    // Mock estimation logic based on service type and other factors
    const baseRates: Record<string, { min: number; max: number }> = {
      "Home Renovation": { min: 2000, max: 15000 },
      "Graphic Design": { min: 500, max: 3000 },
      "Web Development": { min: 1500, max: 10000 },
      "Content Writing": { min: 300, max: 2000 },
      "Photography": { min: 400, max: 2500 },
      "Other": { min: 500, max: 5000 }
    };

    const urgencyMultiplier: Record<string, number> = {
      "ASAP (1-3 days)": 1.5,
      "This week": 1.2,
      "Within 2 weeks": 1.0,
      "Within a month": 0.9,
      "Flexible timing": 0.8
    };

    const base = baseRates[request.serviceType] || baseRates["Other"];
    const multiplier = urgencyMultiplier[request.urgency] || 1.0;

    return {
      min: Math.round(base.min * multiplier),
      max: Math.round(base.max * multiplier),
      average: Math.round((base.min + base.max) / 2 * multiplier),
      timeline: getTimeline(request.urgency),
      complexity: getComplexity(request.description?.length || 0)
    };
  };

  const getTimeline = (urgency: string) => {
    const timelines: Record<string, string> = {
      "ASAP (1-3 days)": "1-3 days",
      "This week": "3-7 days", 
      "Within 2 weeks": "7-14 days",
      "Within a month": "2-4 weeks",
      "Flexible timing": "4-6 weeks"
    };
    return timelines[urgency] || "2-4 weeks";
  };

  const getComplexity = (descriptionLength: number) => {
    if (descriptionLength > 200) return "High";
    if (descriptionLength > 100) return "Medium";
    return "Low";
  };

  const handleContinue = () => {
    setCompleted(true);
    setTimeout(() => {
      onComplete({
        estimate,
        finalDescription: editedDescription
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl mx-auto shadow-strong">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold mb-2">Analyzing Your Request</h3>
            <p className="text-muted-foreground mb-4">Our AI is processing your requirements...</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="animate-pulse">location data</Badge>
              <Badge variant="outline" className="animate-pulse">professional availability</Badge>
              <Badge variant="outline" className="animate-pulse">market rates</Badge>
              <Badge variant="outline" className="animate-pulse">project complexity</Badge>
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
              <DollarSign className="w-5 h-5 text-primary" />
              Project Estimate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-primary rounded-lg text-white">
                <div className="text-2xl font-bold">${estimate.min?.toLocaleString()}</div>
                <div className="text-sm opacity-90">Minimum</div>
              </div>
              <div className="text-center p-4 bg-gradient-accent rounded-lg text-white">
                <div className="text-2xl font-bold">${estimate.average?.toLocaleString()}</div>
                <div className="text-sm opacity-90">Average</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-secondary-foreground">${estimate.max?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Maximum</div>
              </div>
            </div>

            <Separator />

            {/* Project Details */}
            <div className="space-y-4">
              <h4 className="font-semibold">Project Summary</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{serviceRequest.serviceType}</Badge>
                  <span className="text-sm text-muted-foreground">Service Type</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{serviceRequest.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{estimate.timeline} timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{estimate.complexity} complexity</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Editable Description */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Project Description</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
              
              {isEditing ? (
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="min-h-24"
                  placeholder="Describe your project in detail..."
                />
              ) : (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{editedDescription}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end items-center gap-3">
              {completed && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Step Completed</span>
                </div>
              )}
              <Button onClick={handleContinue} disabled={completed} className="bg-primary">
                {completed ? "Proceeding..." : "Continue to Team Matching"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetEstimate;