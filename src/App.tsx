import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from '@/components/screens/SplashScreen';
import MoodCheckIn from '@/components/screens/MoodCheckIn';
import SwipeCards from '@/components/screens/SwipeCards';
import ReelsFeed from '@/components/screens/ReelsFeed';
import Favorites from '@/components/screens/Favorites';
import Profile from '@/components/screens/Profile';
import Navigation from '@/components/layout/Navigation';

const queryClient = new QueryClient();

type AppState = 'splash' | 'mood-check' | 'main-app';
type ActiveTab = 'home' | 'reels' | 'favorites' | 'profile';

const App = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userMood, setUserMood] = useState<string[]>([]);

  const handleSplashComplete = () => {
    setAppState('mood-check');
  };

  const handleMoodComplete = (moods: string[], text?: string) => {
    setUserMood(moods);
    setAppState('main-app');
    // AI decision logic would go here - for now default to swipe cards
    setActiveTab('home');
  };

  const renderCurrentScreen = () => {
    if (appState === 'splash') {
      return <SplashScreen onComplete={handleSplashComplete} />;
    }
    
    if (appState === 'mood-check') {
      return <MoodCheckIn onComplete={handleMoodComplete} />;
    }

    // Main app with navigation
    switch (activeTab) {
      case 'home':
        return <SwipeCards />;
      case 'reels':
        return <ReelsFeed />;
      case 'favorites':
        return <Favorites />;
      case 'profile':
        return <Profile />;
      default:
        return <SwipeCards />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {renderCurrentScreen()}
          {appState === 'main-app' && (
            <Navigation 
              activeTab={activeTab} 
              onTabChange={(tab) => setActiveTab(tab as ActiveTab)} 
            />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
