import { useState, useEffect } from "react";
import { BookOpen, Bot, Zap, Target, Brain, Trophy, Play, FileText, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import WorkspaceViewer from "@/components/WorkspaceViewer";
import MindMapView from "@/components/MindMapView";
import ChatBot from "@/components/ChatBot";
import GameModal from "@/components/GameModal";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [userXP, setUserXP] = useState(1250);
  const [coins, setCoins] = useState(340);
  const [showReward, setShowReward] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showBot, setShowBot] = useState(false);

  const workspaces = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      subject: "DSA",
      progress: 78,
      totalTopics: 15,
      completedTopics: 12,
      color: "from-violet-500 to-purple-600",
      icon: <BookOpen className="w-6 h-6" />,
      recent: "Binary Trees"
    },
    {
      id: 2,
      title: "Operating Systems",
      subject: "OS",
      progress: 45,
      totalTopics: 10,
      completedTopics: 4,
      color: "from-teal-500 to-cyan-600",
      icon: <Target className="w-6 h-6" />,
      recent: "Process Scheduling"
    },
    {
      id: 3,
      title: "Database Management",
      subject: "DBMS",
      progress: 62,
      totalTopics: 12,
      completedTopics: 7,
      color: "from-pink-500 to-rose-600",
      icon: <Brain className="w-6 h-6" />,
      recent: "SQL Joins"
    }
  ];

  const weeklyGoal = 75;
  const currentWeekProgress = 68;

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setShowReward(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const addXP = (amount) => {
    setUserXP(prev => prev + amount);
    setCoins(prev => prev + Math.floor(amount / 10));
  };

  if (currentView === "workspace" && selectedWorkspace) {
    return (
      <WorkspaceViewer 
        workspace={selectedWorkspace} 
        onBack={() => {
          setCurrentView("dashboard");
          setSelectedWorkspace(null);
        }}
        onAddXP={addXP}
      />
    );
  }

  if (currentView === "mindmap" && selectedWorkspace) {
    return (
      <MindMapView 
        workspace={selectedWorkspace}
        onBack={() => {
          setCurrentView("dashboard");
          setSelectedWorkspace(null);
        }}
        onAddXP={addXP}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm bg-background/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Studypie
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{coins}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Star className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-foreground">{userXP} XP</span>
          </div>
          <div 
            className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/profile')}
          >
            <span className="text-sm font-bold">L5</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome back, Scholar! 🚀</h2>
          <p className="text-muted-foreground text-lg">Ready to level up your placement prep?</p>
        </div>

        {/* Weekly Goal */}
        <Card 
          className="mb-8 p-6 bg-card/50 backdrop-blur-sm border-border hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/goals')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">Weekly Goal</h3>
            <Badge variant="secondary" className="bg-violet-500/20 text-violet-300">
              {currentWeekProgress}% Complete
            </Badge>
          </div>
          <Progress value={currentWeekProgress} className="mb-2 h-3" />
          <p className="text-sm text-muted-foreground">
            {currentWeekProgress}/{weeklyGoal} hours studied this week. Keep going! 💪
          </p>
          <p className="text-xs text-violet-400 mt-2">Click to manage your goals →</p>
        </Card>

        {/* Workspaces Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Your Workspaces</h3>
            <Button 
              variant="outline" 
              className="border-violet-500/50 text-violet-300 hover:bg-violet-500/20 transition-colors"
              onClick={() => navigate('/create-workspace')}
            >
              + New Workspace
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace) => (
              <Card
                key={workspace.id}
                className="group p-6 bg-card/80 backdrop-blur-sm border-border hover:border-violet-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
                onClick={() => {
                  setSelectedWorkspace(workspace);
                  setCurrentView("workspace");
                }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${workspace.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {workspace.icon}
                </div>
                
                <h4 className="text-lg font-semibold mb-2 text-foreground">{workspace.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Last studied: {workspace.recent}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{workspace.progress}%</span>
                </div>
                
                <Progress value={workspace.progress} className="mb-4 h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {workspace.completedTopics}/{workspace.totalTopics} topics
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/20 p-1 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkspace(workspace);
                        setCurrentView("mindmap");
                      }}
                    >
                      <Brain className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/20 p-1 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkspace(workspace);
                        setCurrentView("workspace");
                      }}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            className="h-20 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105"
            onClick={() => setShowBot(true)}
          >
            <Bot className="w-6 h-6" />
            <span className="text-sm">Ask AI</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 border-teal-500/50 text-teal-300 hover:bg-teal-500/20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/upload')}
          >
            <FileText className="w-6 h-6" />
            <span className="text-sm">Upload PDF</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 border-pink-500/50 text-pink-300 hover:bg-pink-500/20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/upload')}
          >
            <Play className="w-6 h-6" />
            <span className="text-sm">Add Video</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/upload')}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm">Voice Note</span>
          </Button>
        </div>
      </main>

      {/* Floating Bot Button */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 animate-pulse hover:scale-110 transition-all duration-300"
        onClick={() => setShowBot(true)}
      >
        <Bot className="w-6 h-6" />
      </Button>

      {/* Chat Bot Overlay */}
      {showBot && (
        <ChatBot 
          onClose={() => setShowBot(false)} 
          onAddXP={addXP}
        />
      )}

      {/* Reward Modal */}
      {showReward && (
        <GameModal
          title="Awesome Progress! 🎉"
          message={`You've earned 25 XP for consistent studying!`}
          xpEarned={25}
          coinsEarned={3}
          onClose={() => {
            setShowReward(false);
            addXP(25);
          }}
        />
      )}
    </div>
  );
};

export default Index;
  