import { useState } from 'react';
import { Target, Plus, Check, Edit2, Trash2, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  category: string;
  deadline: string;
  completed: boolean;
}

const WeeklyGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Complete Data Structures Topics",
      target: 5,
      current: 3,
      category: "Study",
      deadline: "2024-06-30",
      completed: false
    },
    {
      id: 2,
      title: "Practice Coding Problems",
      target: 10,
      current: 7,
      category: "Practice",
      deadline: "2024-06-30",
      completed: false
    },
    {
      id: 3,
      title: "Watch Tutorial Videos",
      target: 8,
      current: 8,
      category: "Learning",
      deadline: "2024-06-29",
      completed: true
    }
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: 1,
    category: 'Study',
    deadline: ''
  });

  const addGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal.title,
        target: newGoal.target,
        current: 0,
        category: newGoal.category,
        deadline: newGoal.deadline,
        completed: false
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', target: 1, category: 'Study', deadline: '' });
      setIsAddingGoal(false);
    }
  };

  const updateProgress = (id: number, increment: boolean) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newCurrent = increment 
          ? Math.min(goal.current + 1, goal.target)
          : Math.max(goal.current - 1, 0);
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const toggleComplete = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed, current: goal.completed ? 0 : goal.target }
        : goal
    ));
  };

  const overallProgress = goals.length > 0 
    ? Math.round((goals.reduce((acc, goal) => acc + (goal.current / goal.target), 0) / goals.length) * 100)
    : 0;

  const completedGoals = goals.filter(goal => goal.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Weekly Goals</h2>
            <p className="text-muted-foreground">Track your progress and stay motivated</p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddingGoal(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            {completedGoals}/{goals.length} Goals Completed
          </Badge>
        </div>
        <Progress value={overallProgress} className="mb-2 h-3" />
        <p className="text-sm text-muted-foreground">
          {overallProgress}% of weekly goals completed. Keep pushing! 💪
        </p>
      </Card>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`p-4 transition-all duration-300 hover:shadow-lg ${
              goal.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-card/80'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComplete(goal.id)}
                  className={`p-1 ${goal.completed ? 'text-green-400' : 'text-muted-foreground'}`}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <div>
                  <h4 className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {goal.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {goal.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{goal.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateProgress(goal.id, false)}
                  disabled={goal.current === 0}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  -
                </Button>
                <span className="text-sm font-medium min-w-[60px] text-center">
                  {goal.current}/{goal.target}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateProgress(goal.id, true)}
                  disabled={goal.current >= goal.target}
                  className="text-green-400 hover:text-green-300 p-1"
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Progress 
                value={(goal.current / goal.target) * 100} 
                className="flex-1 mr-4 h-2" 
              />
              <span className="text-sm text-muted-foreground">
                {Math.round((goal.current / goal.target) * 100)}%
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Goal Modal */}
      {isAddingGoal && (
        <Card className="p-6 bg-card/90 backdrop-blur-sm border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Add New Goal</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Goal Title</label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Enter your goal"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Target</label>
                <Input
                  type="number"
                  min="1"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 1 })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="mt-1 w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm"
                >
                  <option value="Study">Study</option>
                  <option value="Practice">Practice</option>
                  <option value="Learning">Learning</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Reading">Reading</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Deadline</label>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={addGoal} className="bg-green-600 hover:bg-green-500">
                Add Goal
              </Button>
              <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WeeklyGoals;
