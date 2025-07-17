import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send } from "lucide-react";

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  inputType?: 'text' | 'select' | 'textarea';
}

interface ChatFlowProps {
  onComplete: (data: any) => void;
}

const ChatFlow = ({ onComplete }: ChatFlowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatScript = [
    {
      message: "Hi! I'm your Patchwork AI assistant. I'll help you find the perfect team for your project. What type of service do you need?",
      options: ["Home Renovation", "Graphic Design", "Web Development", "Content Writing", "Photography", "Other"],
      inputType: "select" as const,
      key: "serviceType"
    },
    {
      message: "Great choice! Can you describe your project in more detail? What exactly do you need done?",
      inputType: "textarea" as const,
      key: "description"
    },
    {
      message: "Perfect! Where is this project located? This helps me find local professionals.",
      inputType: "text" as const,
      key: "location",
      placeholder: "City, State or ZIP code"
    },
    {
      message: "When do you need this completed? This helps me find available professionals.",
      options: ["ASAP (1-3 days)", "This week", "Within 2 weeks", "Within a month", "Flexible timing"],
      inputType: "select" as const,
      key: "urgency"
    },
    {
      message: "What's your estimated budget range for this project?",
      options: ["Under $500", "$500 - $1,500", "$1,500 - $5,000", "$5,000 - $15,000", "Over $15,000", "Not sure"],
      inputType: "select" as const,
      key: "budget"
    }
  ];

  useEffect(() => {
    // Start with initial message
    setTimeout(() => {
      addBotMessage(chatScript[0]);
    }, 500);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBotMessage = (scriptItem: any) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: scriptItem.message,
        options: scriptItem.options,
        inputType: scriptItem.inputType
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random typing delay
  };

  const handleUserResponse = (response: string) => {
    const currentScriptItem = chatScript[currentStep];
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: response
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Store response
    const newResponses = { ...responses, [currentScriptItem.key]: response };
    setResponses(newResponses);
    
    setCurrentInput("");
    
    // Move to next step or complete
    const nextStep = currentStep + 1;
    if (nextStep < chatScript.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        addBotMessage(chatScript[nextStep]);
      }, 1000);
    } else {
      // Chat complete
      setTimeout(() => {
        const completionMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: "Perfect! I have all the information I need. Let me generate a detailed estimate for your project..."
        };
        setMessages(prev => [...prev, completionMessage]);
        
        setTimeout(() => {
          onComplete(newResponses);
        }, 2000);
      }, 1000);
    }
  };

  const currentScriptItem = chatScript[currentStep];
  const canRespond = currentStep < chatScript.length && !isTyping;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl mx-auto shadow-strong">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-primary ml-3' : 'bg-accent mr-3'
                }`}>
                  {message.type === 'user' ? 
                    <User className="w-4 h-4 text-white" /> : 
                    <Bot className="w-4 h-4 text-white" />
                  }
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-accent mr-3 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-2xl bg-secondary">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {canRespond && (
          <div className="border-t p-4">
            {currentScriptItem?.inputType === 'select' && currentScriptItem.options ? (
              <div className="space-y-2">
                {currentScriptItem.options.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleUserResponse(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : currentScriptItem?.inputType === 'textarea' ? (
              <div className="flex space-x-2">
                <Textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Describe your project..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && currentInput.trim()) {
                      e.preventDefault();
                      handleUserResponse(currentInput);
                    }
                  }}
                />
                <Button
                  onClick={() => handleUserResponse(currentInput)}
                  disabled={!currentInput.trim()}
                  className="bg-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={currentScriptItem?.placeholder || "Type your response..."}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && currentInput.trim()) {
                      handleUserResponse(currentInput);
                    }
                  }}
                />
                <Button
                  onClick={() => handleUserResponse(currentInput)}
                  disabled={!currentInput.trim()}
                  className="bg-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatFlow;