import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, CheckCircle, Brain } from "lucide-react";
import ChatFlow from "@/components/patchwork/ChatFlow";
import BudgetEstimate from "@/components/patchwork/BudgetEstimate";
import TeamMatching from "@/components/patchwork/TeamMatching";
import Dashboard from "@/components/patchwork/Dashboard";

type DemoStep = 'welcome' | 'chat' | 'budget' | 'team' | 'dashboard';

const PatchworkDemo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('welcome');
  const [serviceRequest, setServiceRequest] = useState<any>({});

  const handleStepComplete = (step: DemoStep, data?: any) => {
    if (data) {
      setServiceRequest({ ...serviceRequest, ...data });
    }
    
    const stepFlow: Record<DemoStep, DemoStep> = {
      welcome: 'chat',
      chat: 'budget',
      budget: 'team',
      team: 'dashboard',
      dashboard: 'dashboard'
    };
    
    setCurrentStep(stepFlow[step]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onStart={() => handleStepComplete('welcome')} />;
      case 'chat':
        return <ChatFlow onComplete={(data) => handleStepComplete('chat', data)} />;
      case 'budget':
        return <BudgetEstimate 
          serviceRequest={serviceRequest} 
          onComplete={(data) => handleStepComplete('budget', data)} 
        />;
      case 'team':
        return <TeamMatching 
          serviceRequest={serviceRequest} 
          onComplete={(data) => handleStepComplete('team', data)} 
        />;
      case 'dashboard':
        return <Dashboard serviceRequest={serviceRequest} />;
      default:
        return <WelcomeScreen onStart={() => handleStepComplete('welcome')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {renderStep()}
    </div>
  );
};

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Patchwork
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Smart Service Request Platform with AI Assistant
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>AI-Powered Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our smart assistant asks the right questions to understand your needs
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <Brain className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle>Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced algorithms match you with the perfect team for your project
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Expert Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with verified professionals and specialized teams
              </p>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 text-white px-8 py-4 text-lg shadow-medium"
        >
          Start Your Service Request
        </Button>
      </div>
    </div>
  );
};

export default PatchworkDemo;