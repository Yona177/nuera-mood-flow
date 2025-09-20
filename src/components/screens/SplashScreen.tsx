import { useEffect } from 'react';
import nueraLogo from '@/assets/nuera-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-float">
          <img 
            src={nueraLogo} 
            alt="Nuera Logo" 
            className="w-32 h-32 mx-auto rounded-3xl shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Nuera
        </h1>
        
        <p className="text-xl text-white/90 font-light max-w-md mx-auto leading-relaxed">
          Easy, personalized mental wellness in swipes and scrolls
        </p>
        
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;