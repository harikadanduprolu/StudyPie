
import { useState } from "react";
import { ArrowLeft, Download, Maximize, Share, Play, Volume2, MessageSquare, FileText, Zap, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MindMapView = ({ workspace, onBack, onAddXP }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mindMapData = {
    center: {
      id: "dsa",
      title: "Data Structures & Algorithms",
      x: 500,
      y: 350,
      color: "violet",
      level: 0
    },
    nodes: [
      { id: "arrays", title: "Arrays", x: 250, y: 200, color: "emerald", completed: true, parent: "dsa", level: 1 },
      { id: "linked-lists", title: "Linked Lists", x: 250, y: 350, color: "emerald", completed: true, parent: "dsa", level: 1 },
      { id: "stacks", title: "Stacks & Queues", x: 250, y: 500, color: "emerald", completed: true, parent: "dsa", level: 1 },
      {
        id: "trees",
        title: "Trees",
        x: 750,
        y: 250,
        color: "amber",
        completed: false,
        parent: "dsa",
        current: true,
        level: 1
      },
      { id: "graphs", title: "Graphs", x: 750, y: 450, color: "rose", completed: false, parent: "dsa", level: 1 },
      { id: "dp", title: "Dynamic Programming", x: 500, y: 600, color: "cyan", completed: false, parent: "dsa", level: 1 },
      { id: "binary-tree", title: "Binary Trees", x: 900, y: 180, color: "amber", completed: false, parent: "trees", level: 2 },
      { id: "bst", title: "BST", x: 900, y: 250, color: "orange", completed: false, parent: "trees", level: 2 },
      { id: "heap", title: "Heaps", x: 900, y: 320, color: "red", completed: false, parent: "trees", level: 2 }
    ]
  };

  const getNodeColor = (color, completed, current) => {
    if (completed) return "from-emerald-400 via-green-500 to-emerald-600";
    if (current) return "from-amber-400 via-orange-500 to-red-500";
    
    switch (color) {
      case "violet": return "from-violet-400 via-purple-500 to-indigo-600";
      case "emerald": return "from-emerald-400 via-green-500 to-teal-600";
      case "amber": return "from-amber-400 via-yellow-500 to-orange-600";
      case "rose": return "from-rose-400 via-pink-500 to-red-600";
      case "cyan": return "from-cyan-400 via-blue-500 to-indigo-600";
      case "orange": return "from-orange-400 via-red-500 to-pink-600";
      case "red": return "from-red-400 via-pink-500 to-rose-600";
      default: return "from-gray-400 via-gray-500 to-gray-600";
    }
  };

  const getNodeSize = (level, isCenter = false) => {
    if (isCenter) return "w-32 h-32";
    if (level === 1) return "w-24 h-24";
    return "w-20 h-20";
  };

  const getConnections = () => {
    const connections = [];
    
    // Connect center to main branches with enhanced styling
    mindMapData.nodes.forEach(node => {
      if (node.parent === "dsa") {
        connections.push({
          from: mindMapData.center,
          to: node,
          type: "main"
        });
      }
    });

    // Connect sub-nodes
    mindMapData.nodes.forEach(node => {
      if (node.parent === "trees") {
        const parent = mindMapData.nodes.find(n => n.id === "trees");
        connections.push({
          from: parent,
          to: node,
          type: "sub"
        });
      }
    });

    return connections;
  };

  const handleNodeClick = (nodeId) => {
    const node = nodeId === "dsa" ? mindMapData.center : mindMapData.nodes.find(n => n.id === nodeId);
    setSelectedNode(node);
    onAddXP(5);
  };

  const handleNodeHover = (nodeId) => {
    const node = nodeId === "dsa" ? mindMapData.center : mindMapData.nodes.find(n => n.id === nodeId);
    setHoveredNode(node);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-violet-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-amber-400/60 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mind Map - {workspace.title}
              </h1>
              <p className="text-slate-400 text-sm mt-1">Visual learning made beautiful ✨</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
            >
              <Maximize className="w-4 h-4 mr-2" />
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-violet-500/50 text-violet-400 hover:bg-violet-500/20 hover:border-violet-400 transition-all duration-300 group"
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Podcast Mode
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-300"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)] relative">
        {/* Mind Map Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Enhanced Connections */}
            {getConnections().map((connection, index) => (
              <g key={index}>
                {/* Glow effect */}
                <line
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke="url(#connectionGlow)"
                  strokeWidth="6"
                  className="opacity-30"
                />
                {/* Main line */}
                <line
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke={connection.type === "main" ? "rgba(139, 92, 246, 0.6)" : "rgba(59, 130, 246, 0.4)"}
                  strokeWidth={connection.type === "main" ? "3" : "2"}
                  strokeDasharray={connection.type === "main" ? "none" : "5,5"}
                  className="animate-pulse"
                />
              </g>
            ))}
            
            {/* SVG Definitions */}
            <defs>
              <linearGradient id="connectionGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0 w-full h-full">
            {/* Center Node */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${(mindMapData.center.x / 1200) * 100}%`, top: `${(mindMapData.center.y / 800) * 100}%` }}
              onClick={() => handleNodeClick(mindMapData.center.id)}
              onMouseEnter={() => handleNodeHover(mindMapData.center.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`${getNodeSize(0, true)} bg-gradient-to-br ${getNodeColor(mindMapData.center.color, false, false)} rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 hover:scale-110 group-hover:rotate-3 relative overflow-hidden`}>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="text-center relative z-10">
                  <div className="text-sm font-bold mb-1">DSA</div>
                  <Zap className="w-6 h-6 mx-auto text-white/80" />
                </div>
                
                {/* Floating ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 scale-110 group-hover:scale-125 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Other Nodes */}
            {mindMapData.nodes.map((node) => (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${(node.x / 1200) * 100}%`, top: `${(node.y / 800) * 100}%` }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`${getNodeSize(node.level)} bg-gradient-to-br ${getNodeColor(node.color, node.completed, node.current)} rounded-xl flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-125 hover:shadow-2xl group-hover:-rotate-2 relative overflow-hidden ${selectedNode?.id === node.id ? 'ring-4 ring-violet-400/60 ring-offset-4 ring-offset-slate-900' : ''} ${node.current ? 'animate-pulse' : ''}`}>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="text-center relative z-10 p-2">
                    <div className="text-xs font-semibold text-white/90 leading-tight">
                      {node.title.length > 8 ? node.title.substring(0, 8) + '...' : node.title}
                    </div>
                    {node.completed && (
                      <div className="text-lg mt-1">✨</div>
                    )}
                    {node.current && (
                      <Star className="w-4 h-4 mx-auto mt-1 text-amber-300 animate-spin" />
                    )}
                  </div>
                  
                  {/* Progress indicator for current topic */}
                  {node.current && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-b-xl"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Floating Controls */}
          <div className="absolute bottom-8 left-8 flex space-x-3">
            <Button
              size="sm"
              className="bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105"
            >
              <Target className="w-4 h-4 mr-2" />
              Zoom In
            </Button>
            <Button
              size="sm"
              className="bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105"
            >
              <Target className="w-4 h-4 mr-2" />
              Zoom Out
            </Button>
            <Button
              size="sm"
              className="bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105"
            >
              Reset View
            </Button>
          </div>

          {/* Hover tooltip */}
          {hoveredNode && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg px-4 py-2 animate-fade-in">
              <p className="text-sm font-medium text-white">{hoveredNode.title}</p>
              <p className="text-xs text-slate-400">
                {hoveredNode.completed ? "✅ Mastered" : hoveredNode.current ? "🔥 In Progress" : "📚 Ready to learn"}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Right Panel */}
        <div className="w-96 bg-slate-900/60 backdrop-blur-xl border-l border-slate-700/50 p-6">
          {selectedNode ? (
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${getNodeColor(selectedNode.color, selectedNode.completed, selectedNode.current)} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-lg font-bold text-white">
                    {selectedNode.title.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {selectedNode.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {selectedNode.completed
                    ? "🎉 Completed with excellence!"
                    : selectedNode.current
                    ? "🚀 Currently crushing it"
                    : "⚡ Ready for takeoff"}
                </p>
                
                <div className="space-y-3">
                  <Button
                    size="sm"
                    className="w-full justify-start bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 text-violet-300 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 group"
                  >
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Dive into Content
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group"
                  >
                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Watch & Learn
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start border-pink-500/50 text-pink-400 hover:bg-pink-500/20 hover:border-pink-400 transition-all duration-300 group"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Ask AI Genius
                  </Button>
                </div>
              </Card>

              {/* Prerequisites with enhanced styling */}
              <Card className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/50 backdrop-blur-sm">
                <h4 className="font-semibold mb-4 text-slate-200">Prerequisites Path</h4>
                <div className="space-y-3 text-sm">
                  {selectedNode.id === "trees" && (
                    <>
                      <div className="flex items-center space-x-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-300 font-medium">Arrays ✨</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-300 font-medium">Linked Lists ✨</span>
                      </div>
                    </>
                  )}
                  {selectedNode.id === "binary-tree" && (
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-amber-300 font-medium">Trees (In Progress) 🔥</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Enhanced Study Tip */}
              <Card className="p-6 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 border-violet-500/30 backdrop-blur-sm">
                <h4 className="font-semibold mb-3 flex items-center text-violet-300">
                  💡 Pro Study Tip
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedNode.id === "trees"
                    ? "Master tree visualization by drawing structures by hand. This builds intuitive understanding of node relationships and traversal patterns. 🌳"
                    : "Break down complex algorithms into smaller steps. Focus on understanding the 'why' behind each operation's time and space complexity. 🧠"}
                </p>
              </Card>
            </div>
          ) : (
            <div className="text-center text-slate-400 mt-16 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-600/50">
                <MessageSquare className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">Explore Your Mind Map</h3>
              <p className="text-slate-500">Click on any node to unlock detailed insights and study resources.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindMapView;
