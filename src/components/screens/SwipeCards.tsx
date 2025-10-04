import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 NEW
import { Heart, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SEED_CARDS } from '@/data/cards';
import { useCardActions } from '@/hooks/useCardActions';
import type { Card } from '@/types/card';

const SwipeCards = () => {
  const [cards] = useState<Card[]>(SEED_CARDS);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { onSwipeRight, onSwipeLeft } = useCardActions();
  const navigate = useNavigate(); // 👈 NEW

  const currentCard = cards[currentIndex];
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentCard) {
      if (direction === 'right') {
        // Existing like handler
        onSwipeRight(currentCard);

        // 👇 NEW: Route based on card.action
        const a = currentCard.action;
        if (a) {
          switch (a.kind) {
            case 'open_meditation':
              navigate(`/meditation/${a.meditationId}`);
              break;
            case 'open_breathing':        // preferred new action
              navigate(`/breathing/${a.breathingId}`);
              break;
            case 'open_breath':           // legacy support
              navigate(`/breathing/${a.patternId}`);
              break;
            case 'open_cbt':
              // navigate(`/cbt/${a.tipId}`);
              break;
            case 'open_companion':
              // navigate(`/companion`);
              break;
            case 'open_sleep':
              // navigate(`/sleep/${a.routineId}`);
              break;
            case 'none':
            default:
              // no-op
              break;
          }
        }
      } else {
        onSwipeLeft(currentCard);
      }
    }
    
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
            {(currentCard.image || currentCard.imageUrl) && (
              <div 
                className="w-full h-48 rounded-2xl bg-cover bg-center mb-6"
                style={{ backgroundImage: `url(${currentCard.image || currentCard.imageUrl})` }}
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
