import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import MeditationPlayer from '@/screens/meditation/MeditationPlayer';
import MeditationComplete from '@/screens/meditation/MeditationComplete';

const queryClient = new QueryClient();

type AppState = 'splash' | 'mood-check' | 'main-app';

const AppContent = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSplashComplete = () => {
    setAppState('mood-check');
  };

  const handleMoodComplete = (moods: string[], text?: string) => {
    setAppState('main-app');
    navigate('/cards');
  };

  // Don't show navigation on meditation screens
  const hideNavigation = location.pathname.startsWith('/meditation/');

  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  
  if (appState === 'mood-check') {
    return <MoodCheckIn onComplete={handleMoodComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<SwipeCards />} />
        <Route path="/cards" element={<SwipeCards />} />
        <Route path="/reels" element={<ReelsFeed />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meditation/:meditationId" element={<MeditationPlayer />} />
        <Route path="/meditation/:meditationId/complete" element={<MeditationComplete />} />
      </Routes>
      
      {!hideNavigation && (
        <Navigation 
          activeTab={location.pathname === '/reels' ? 'reels' : 
                   location.pathname === '/favorites' ? 'favorites' :
                   location.pathname === '/profile' ? 'profile' : 'home'} 
          onTabChange={(tab) => {
            switch(tab) {
              case 'home': navigate('/cards'); break;
              case 'reels': navigate('/reels'); break; 
              case 'favorites': navigate('/favorites'); break;
              case 'profile': navigate('/profile'); break;
            }
          }} 
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
