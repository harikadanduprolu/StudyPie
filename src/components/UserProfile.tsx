
import { useState } from "react";
import { User, Settings, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfileProps {
  userXP: number;
  coins: number;
  onLogout?: () => void;
}

const UserProfile = ({ userXP, coins, onLogout }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Scholar");
  const [email, setEmail] = useState("scholar@studypie.com");

  // Mock user stats
  const userStats = {
    level: Math.floor(userXP / 250) + 1,
    studyStreak: 7,
    completedTopics: 23,
    totalStudyTime: "45h 30m"
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to Supabase
    console.log("Profile saved:", { userName, email });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
        >
          <User className="w-5 h-5 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-gray-900 border-gray-700">
        <SheetHeader>
          <SheetTitle className="text-white">Profile</SheetTitle>
          <SheetDescription className="text-gray-400">
            Manage your account settings and view your progress
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Profile Info */}
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{userName}</h3>
                  <p className="text-sm text-gray-400">{email}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(!isEditing)}
                className="text-violet-400 hover:text-violet-300"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            
            {isEditing && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-sm text-gray-300">Name</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button
                  onClick={handleSaveProfile}
                  size="sm"
                  className="bg-violet-500 hover:bg-violet-600"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </Card>

          {/* Stats */}
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <h4 className="font-medium mb-3 text-white">Your Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400">{userStats.level}</div>
                <div className="text-xs text-gray-400">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">{userStats.studyStreak}</div>
                <div className="text-xs text-gray-400">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{userStats.completedTopics}</div>
                <div className="text-xs text-gray-400">Topics Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{userStats.totalStudyTime}</div>
                <div className="text-xs text-gray-400">Study Time</div>
              </div>
            </div>
          </Card>

          {/* XP and Coins */}
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <h4 className="font-medium mb-3 text-white">Rewards</h4>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-violet-500/20 text-violet-300">
                {userXP} XP
              </Badge>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                {coins} Coins
              </Badge>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfile;
