import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import WeeklyGoals from '../components/WeeklyGoals';

const Goals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-background text-foreground">
      {/* Header */}
      <header className="p-6 flex justify-between items-center backdrop-blur-sm bg-background/50">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-foreground hover:bg-muted/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-6">
        <WeeklyGoals />
      </main>
    </div>
  );
};

export default Goals;
