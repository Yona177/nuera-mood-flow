import { Heart, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import meditationCard from '@/assets/meditation-card.png';
import breathingCard from '@/assets/breathing-card.png';
import journalCard from '@/assets/journal-card.png';

const Favorites = () => {
  const favorites = [
    {
      id: '1',
      type: 'meditation',
      title: '5-Minute Mindfulness',
      duration: '5 min',
      image: meditationCard,
      category: 'Meditation'
    },
    {
      id: '2',
      type: 'breathing',
      title: 'Box Breathing',
      duration: '3 min', 
      image: breathingCard,
      category: 'Breathing'
    },
    {
      id: '3',
      type: 'journaling',
      title: 'Gratitude Reflection',
      duration: '2 min',
      image: journalCard,
      category: 'Reflection'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm p-6 pb-24">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Favorites
          </h1>
          <p className="text-muted-foreground">
            Tools and content you've saved for later
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No favorites yet
            </h3>
            <p className="text-muted-foreground">
              Heart the tools and content you love to save them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item, index) => (
              <Card 
                key={item.id} 
                className="p-4 bg-card/80 backdrop-blur-sm border-border/50 animate-fade-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="w-full h-full rounded-xl bg-black/20 flex items-center justify-center">
                      <Play size={20} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {item.title}
                      </h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <Heart size={16} className="fill-current" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;