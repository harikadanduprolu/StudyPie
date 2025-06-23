import { useState, useRef, useEffect } from "react";
import { X, Send, Mic, FileText, Play, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  xpEarned?: number;
}

const ChatBot = ({ onClose, onAddXP }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hey there! 👋 I'm your AI study assistant. How can I help you level up your prep today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Explain binary trees in simple terms",
    "What's the difference between DFS and BFS?",
    "Help me with time complexity",
    "Create a study plan for graphs",
    "Summarize this topic for me"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Great question! Let me break that down for you... 🤔\n\nBinary trees are hierarchical data structures where each node has at most two children. Think of it like a family tree, but each person can only have up to 2 direct descendants.",
        "I can help you with that! Here's a quick explanation:\n\n• Time Complexity: How execution time grows with input size\n• Space Complexity: How memory usage grows with input size\n\nFor example, searching in a sorted array is O(log n) with binary search! 📊",
        "Perfect! Here's a personalized study plan:\n\n1. Start with graph representation (adjacency list/matrix)\n2. Learn DFS and BFS traversals\n3. Practice shortest path algorithms\n4. Tackle advanced topics like MST\n\nWant me to create practice problems for each step? 🎯"
      ];

      const response: Message = {
        id: Date.now(),
        type: "bot",
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
        xpEarned: 10
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
      onAddXP(10);
    }, 2000);
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 border-violet-500/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Study Assistant</h3>
              <p className="text-sm text-gray-400">Always here to help you learn! 🚀</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white ml-auto"
                      : "bg-gray-800/80 text-gray-100 mr-auto border border-gray-700"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  {message.xpEarned && (
                    <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/50">
                      +{message.xpEarned} XP
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 border border-gray-700 p-4 rounded-2xl max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Quick questions to get started:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 3).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs border-violet-500/50 text-violet-300 hover:bg-violet-500/20"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="px-6 py-3 border-t border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <Button
              size="sm"
              variant="outline"
              className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20"
            >
              <FileText className="w-4 h-4 mr-1" />
              Analyze PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-pink-500/50 text-pink-400 hover:bg-pink-500/20"
            >
              <Play className="w-4 h-4 mr-1" />
              Explain Video
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
            >
              <Brain className="w-4 h-4 mr-1" />
              Quiz Me
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about your studies..."
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-violet-500"
            />
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-400 hover:text-white"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;
