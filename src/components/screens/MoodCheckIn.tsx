import { useState } from 'react';
import { Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MoodCheckInProps {
  onComplete: (mood: string[], text?: string) => void;
}

const MoodCheckIn = ({ onComplete }: MoodCheckInProps) => {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');

  const moods = [
    { id: 'happy', label: 'Happy', color: 'from-wellness-energy/20 to-wellness-energy/30' },
    { id: 'calm', label: 'Calm', color: 'from-wellness-calm/20 to-wellness-calm/30' },
    { id: 'anxious', label: 'Anxious', color: 'from-accent/20 to-accent/30' },
    { id: 'stressed', label: 'Stressed', color: 'from-destructive/20 to-destructive/30' },
    { id: 'focused', label: 'Focused', color: 'from-wellness-focus/20 to-wellness-focus/30' },
    { id: 'tired', label: 'Tired', color: 'from-wellness-sleep/20 to-wellness-sleep/30' },
    { id: 'excited', label: 'Excited', color: 'from-primary/20 to-primary/30' },
    { id: 'sad', label: 'Sad', color: 'from-muted/30 to-muted/40' },
  ];

  const toggleMood = (moodId: string) => {
    setSelectedMoods(prev => 
      prev.includes(moodId) 
        ? prev.filter(id => id !== moodId)
        : [...prev, moodId]
    );
  };

  const handleComplete = () => {
    if (selectedMoods.length > 0) {
      onComplete(selectedMoods, textInput);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-6 pb-24">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            How are you feeling?
          </h1>
          <p className="text-muted-foreground">
            Tap one or more bubbles that match your mood
          </p>
        </div>

        {/* Floating Mood Bubbles */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {moods.map((mood, index) => (
            <button
              key={mood.id}
              onClick={() => toggleMood(mood.id)}
              className={cn(
                "mood-bubble relative overflow-hidden",
                selectedMoods.includes(mood.id) && "selected",
                "animate-fade-in"
              )}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-r", mood.color)} />
              <span className="relative z-10">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Text Input */}
        <div className="mb-8">
          <div className="relative">
            <Input
              placeholder="Tell us more about how you're feeling..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="pr-12 bg-card/80 backdrop-blur-sm border-border/50"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Mic size={16} />
            </Button>
          </div>
        </div>

        {/* Continue Button */}
        {selectedMoods.length > 0 && (
          <div className="flex justify-center animate-scale-in">
            <Button
              onClick={handleComplete}
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg group"
            >
              <span className="mr-2">Continue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCheckIn;