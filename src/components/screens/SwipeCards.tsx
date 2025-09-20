import { useState, useRef } from 'react';
import { Heart, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import meditationCard from '@/assets/meditation-card.png';
import breathingCard from '@/assets/breathing-card.png';
import journalCard from '@/assets/journal-card.png';

interface Card {
  id: string;
  type: 'meditation' | 'breathing' | 'journaling' | 'companion' | 'sleep';
  title: string;
  content: string;
  image?: string;
  duration?: string;
}

const SwipeCards = () => {
  const [cards] = useState<Card[]>([
    {
      id: '1',
      type: 'meditation',
      title: '5-Minute Mindfulness',
      content: 'Take a moment to center yourself with this gentle meditation. Focus on your breath and let your thoughts flow freely.',
      image: meditationCard,
      duration: '5 min'
    },
    {
      id: '2',
      type: 'breathing',
      title: 'Box Breathing',
      content: 'Try this simple breathing technique: Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat to find your calm.',
      image: breathingCard,
      duration: '3 min'
    },
    {
      id: '3',
      type: 'journaling',
      title: 'Gratitude Reflection',
      content: 'What are three things you\'re grateful for today? Write them down and reflect on why they matter to you.',
      image: journalCard,
      duration: '2 min'
    },
    {
      id: '4',
      type: 'companion',
      title: 'AI Companion Chat',
      content: 'I\'m here to listen and support you. What\'s on your mind today? Share your thoughts and feelings in a safe space.',
      duration: 'Open'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCard = cards[currentIndex];
  
  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0); // Loop back to start
      }
      setSwipeDirection(null);
    }, 300);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
  };

  if (!currentCard) return null;

  return (
    <div className="min-h-screen bg-gradient-calm p-6 pb-32">
      <div className="max-w-sm mx-auto pt-16">
        {/* Card Stack */}
        <div className="relative h-[500px] mb-8">
          {/* Next card (background) */}
          {currentIndex < cards.length - 1 && (
            <div className="absolute inset-0 swipe-card bg-card/50 scale-95 -rotate-1" />
          )}
          
          {/* Current card */}
          <div
            ref={cardRef}
            className={cn(
              "absolute inset-0 swipe-card cursor-pointer touch-manipulation",
              swipeDirection === 'left' && "animate-swipe-left",
              swipeDirection === 'right' && "animate-swipe-right"
            )}
          >
            {currentCard.image && (
              <div 
                className="w-full h-48 rounded-2xl bg-cover bg-center mb-6"
                style={{ backgroundImage: `url(${currentCard.image})` }}
              />
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {currentCard.title}
                </h2>
                {currentCard.duration && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {currentCard.duration}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg">
                {currentCard.content}
              </p>
            </div>

            {/* Swipe Indicators */}
            <div className={cn(
              "swipe-indicator left",
              swipeDirection === 'left' && "opacity-100"
            )}>
              ✕
            </div>
            <div className={cn(
              "swipe-indicator right", 
              swipeDirection === 'right' && "opacity-100"
            )}>
              ♥
            </div>
          </div>
        </div>

        {/* Action Buttons */ }
        <div className="flex items-center justify-center space-x-6">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleSwipe('left')}
            className="rounded-full w-16 h-16 border-destructive/30 text-destructive hover:bg-destructive/10 shadow-lg"
          >
            <X size={24} />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="rounded-full w-12 h-12 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw size={20} />
          </Button>
          
          <Button
            size="lg"
            onClick={() => handleSwipe('right')}
            className="rounded-full w-16 h-16 bg-gradient-to-r from-wellness-energy to-wellness-energy/80 hover:from-wellness-energy/90 hover:to-wellness-energy/70 shadow-lg"
          >
            <Heart size={24} />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwipeCards;