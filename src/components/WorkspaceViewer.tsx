import { useState } from "react";
import { ArrowLeft, Brain, MessageSquare, FileText, Play, Bookmark, Volume2, Highlighter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const WorkspaceViewer = ({ workspace, onBack, onAddXP }) => {
  const [selectedTopic, setSelectedTopic] = useState("binary-trees");
  const [highlightMode, setHighlightMode] = useState(false);
  const [notes, setNotes] = useState([]);

  const topics = [
    { id: "arrays", name: "Arrays", completed: true, difficulty: "Easy" },
    { id: "linked-lists", name: "Linked Lists", completed: true, difficulty: "Medium" },
    { id: "stacks", name: "Stacks & Queues", completed: true, difficulty: "Medium" },
    { id: "binary-trees", name: "Binary Trees", completed: false, difficulty: "Hard", current: true },
    { id: "graphs", name: "Graphs", completed: false, difficulty: "Hard" },
    { id: "dp", name: "Dynamic Programming", completed: false, difficulty: "Expert" },
  ];

  const currentTopic = topics.find(t => t.id === selectedTopic);

  const handleTopicComplete = () => {
    onAddXP(50);
    // Mark topic as completed logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">{workspace.title}</h1>
              <p className="text-sm text-gray-400">{currentTopic?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={highlightMode ? "default" : "outline"}
              size="sm"
              onClick={() => setHighlightMode(!highlightMode)}
              className={highlightMode ? "bg-yellow-500 text-black" : "border-yellow-500/50 text-yellow-400"}
            >
              <Highlighter className="w-4 h-4 mr-2" />
              Highlight
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-teal-500/50 text-teal-400"
            >
              <Brain className="w-4 h-4 mr-2" />
              Mind Map
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Topics */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700 p-4">
          <h3 className="font-semibold mb-4 text-gray-300">Topics</h3>
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTopic === topic.id
                      ? "bg-violet-500/20 border border-violet-500/50"
                      : "bg-gray-800/50 hover:bg-gray-700/50"
                  }`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{topic.name}</h4>
                      <Badge
                        variant="secondary"
                        className={`mt-1 text-xs ${
                          topic.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400"
                            : topic.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : topic.difficulty === "Hard"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {topic.difficulty}
                      </Badge>
                    </div>
                    {topic.completed && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                    )}
                    {topic.current && (
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Center Panel - Content Viewer */}
          <div className="flex-1 p-6">
            <Tabs defaultValue="content" className="h-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="notes">My Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="h-full">
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
                  {/* Simulated PDF/Video Content */}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Binary Trees - Introduction</h3>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-green-500/50 text-green-400">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-400">
                        <FileText className="w-4 h-4 mr-2" />
                        PDF Notes
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-6 mb-4 border border-gray-700">
                    <h4 className="font-medium mb-3 text-violet-300">Key Concepts:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-violet-400 mt-1">•</span>
                        <span>A binary tree is a hierarchical data structure where each node has at most two children</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-violet-400 mt-1">•</span>
                        <span>The two children are referred to as left child and right child</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-violet-400 mt-1">•</span>
                        <span>Common traversal methods: Inorder, Preorder, Postorder</span>
                      </li>
                    </ul>
                  </div>

                  {/* Interactive Code Example */}
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm border border-gray-700">
                    <div className="text-gray-400 mb-2">// Binary Tree Node Structure</div>
                    <div className="text-blue-400">class</div> <div className="text-yellow-400">TreeNode</div> {'{'}
                    <div className="ml-4">
                      <div><span className="text-green-400">int</span> val;</div>
                      <div><span className="text-green-400">TreeNode</span> left;</div>
                      <div><span className="text-green-400">TreeNode</span> right;</div>
                    </div>
                    {'}'}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={handleTopicComplete}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400"
                    >
                      Mark as Complete (+50 XP)
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="practice">
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">Practice Problems</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Maximum Depth of Binary Tree", difficulty: "Easy", status: "Completed" },
                      { title: "Binary Tree Inorder Traversal", difficulty: "Medium", status: "In Progress" },
                      { title: "Validate Binary Search Tree", difficulty: "Hard", status: "Not Started" }
                    ].map((problem, index) => (
                      <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{problem.title}</h4>
                            <Badge
                              variant="secondary"
                              className={`mt-1 ${
                                problem.difficulty === "Easy"
                                  ? "bg-green-500/20 text-green-400"
                                  : problem.difficulty === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <Badge
                            variant={problem.status === "Completed" ? "default" : "outline"}
                            className={problem.status === "Completed" ? "bg-green-500/20 text-green-400" : ""}
                          >
                            {problem.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes">
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">My Notes</h3>
                    <Button size="sm" variant="outline" className="border-violet-500/50 text-violet-400">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                  <div className="text-gray-400 text-center mt-8">
                    No notes yet. Start highlighting content to create notes!
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - AI Notes & Tools */}
          <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-l border-gray-700 p-4">
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/30">
                <h4 className="font-medium mb-2 flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-violet-400" />
                  AI Summary
                </h4>
                <p className="text-sm text-gray-300">
                  Binary trees are fundamental data structures. Key operations include insertion, deletion, and traversals (inorder, preorder, postorder).
                </p>
              </Card>

              <Card className="p-4 bg-gray-800/50 border-gray-700">
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start border-teal-500/50 text-teal-400"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen as Podcast
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start border-pink-500/50 text-pink-400"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask AI Question
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start border-yellow-500/50 text-yellow-400"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </Card>

              <Card className="p-4 bg-gray-800/50 border-gray-700">
                <h4 className="font-medium mb-3">Key Points</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Each node has max 2 children</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Time complexity: O(log n) for balanced trees</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                    <span className="text-gray-300">Common in interview questions</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceViewer;
