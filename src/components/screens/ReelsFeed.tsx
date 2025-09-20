import { useState } from 'react';
import { Heart, MessageCircle, Share, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Reel {
  id: string;
  title: string;
  creator: string;
  category: 'education' | 'inspiration' | 'mindfulness';
  description: string;
  likes: number;
  isLiked: boolean;
  thumbnail: string;
}

const ReelsFeed = () => {
  const [reels, setReels] = useState<Reel[]>([
    {
      id: '1',
      title: 'The Science of Happiness',
      creator: 'Dr. Wellness',
      category: 'education',
      description: 'Discover the neurochemical basis of happiness and how simple daily practices can rewire your brain for joy.',
      likes: 1243,
      isLiked: false,
      thumbnail: 'bg-gradient-to-br from-wellness-energy/20 to-wellness-energy/40'
    },
    {
      id: '2', 
      title: 'Morning Intention Setting',
      creator: 'Mindful Marie',
      category: 'mindfulness',
      description: 'Start your day with purpose. This 60-second practice will help you set powerful intentions.',
      likes: 892,
      isLiked: true,
      thumbnail: 'bg-gradient-to-br from-wellness-calm/20 to-wellness-calm/40'
    },
    {
      id: '3',
      title: 'Overcoming Inner Critic',
      creator: 'Growth Guru',
      category: 'inspiration',
      description: 'Transform that inner voice from critic to coach with these evidence-based cognitive techniques.',
      likes: 2156,
      isLiked: false,
      thumbnail: 'bg-gradient-to-br from-accent/20 to-accent/40'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleLike = (reelId: string) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            isLiked: !reel.isLiked,
            likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
          }
        : reel
    ));
  };

  const currentReel = reels[currentIndex];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Video Container */}
      <div className="relative h-screen">
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          currentReel.thumbnail
        )}>
          {/* Play Button Overlay */}
          <Button
            size="lg"
            className="rounded-full w-20 h-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm shadow-2xl"
          >
            <Play size={28} className="text-white ml-1" />
          </Button>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          {/* Right Side Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
            <button
              onClick={() => toggleLike(currentReel.id)}
              className="flex flex-col items-center space-y-1 touch-manipulation"
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                currentReel.isLiked 
                  ? "bg-red-500 text-white scale-110" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}>
                <Heart size={20} className={currentReel.isLiked ? "fill-current" : ""} />
              </div>
              <span className="text-white text-xs font-medium">
                {currentReel.likes}
              </span>
            </button>

            <button className="flex flex-col items-center space-y-1 touch-manipulation">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                <MessageCircle size={20} />
              </div>
              <span className="text-white text-xs font-medium">12</span>
            </button>

            <button className="flex flex-col items-center space-y-1 touch-manipulation">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                <Share size={20} />
              </div>
            </button>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-32 left-4 right-20">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                <span className="text-white font-semibold">
                  {currentReel.creator}
                </span>
              </div>
              
              <h3 className="text-white text-xl font-bold leading-tight">
                {currentReel.title}
              </h3>
              
              <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                {currentReel.description}
              </p>

              <div className="flex items-center space-x-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  currentReel.category === 'education' && "bg-wellness-focus/20 text-wellness-focus",
                  currentReel.category === 'inspiration' && "bg-wellness-energy/20 text-wellness-energy",
                  currentReel.category === 'mindfulness' && "bg-wellness-calm/20 text-wellness-calm"
                )}>
                  {currentReel.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe to Next Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-center">
        <div className="animate-bounce mb-1">↑</div>
        <span className="text-xs">Swipe up for next</span>
      </div>
    </div>
  );
};

export default ReelsFeed;