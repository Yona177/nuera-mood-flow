import { useEffect } from 'react';

// This page is no longer used - the app now starts directly from App.tsx
const Index = () => {
  useEffect(() => {
    // Redirect to the main app
    window.location.href = '/';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-calm">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading Nuera...</p>
      </div>
    </div>
  );
};

export default Index;
