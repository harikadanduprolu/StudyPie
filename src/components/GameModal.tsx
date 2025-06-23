
import { Trophy, Star, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const GameModal = ({ title, message, xpEarned, coinsEarned, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-violet-500/50 text-center p-8 animate-scale-in">
        {/* Celebration Animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-violet-400 rounded-full animate-ping"></div>
          <div className="absolute -top-4 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute -bottom-1 -left-4 w-2 h-2 bg-teal-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-700"></div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        {/* Rewards Display */}
        <div className="flex justify-center space-x-6 mb-6">
          {xpEarned > 0 && (
            <div className="flex items-center space-x-2 bg-violet-500/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-violet-400" />
              <span className="text-violet-300 font-semibold">+{xpEarned} XP</span>
            </div>
          )}
          
          {coinsEarned > 0 && (
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">+{coinsEarned}</span>
            </div>
          )}
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-semibold py-3"
        >
          Awesome! Let's Keep Going 🚀
        </Button>

        {/* Progress indicator */}
        <div className="mt-4 text-sm text-gray-400">
          You're on fire! Keep up the momentum! 🔥
        </div>
      </Card>
    </div>
  );
};

export default GameModal;
