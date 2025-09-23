import { useNavigate, useParams } from "react-router-dom";
import { MEDITATIONS } from "@/data/meditations";
import { Button } from "@/components/ui/button";
import { saveFavorite } from "@/state/favorites";
import { track } from "@/utils/analytics";
import { Heart, Home, RotateCcw } from "lucide-react";

export default function MeditationComplete() {
  const { meditationId = "mindful5" } = useParams();
  const m = MEDITATIONS[meditationId] ?? MEDITATIONS["mindful5"];
  const nav = useNavigate();

  const onSave = () => {
    saveFavorite({ 
      kind: "meditation", 
      id: m.id, 
      title: m.title, 
      durationSec: m.durationSec 
    });
    track("favorite_add", { kind: "meditation", id: m.id });
    nav("/favorites");
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="mx-auto max-w-md p-6 pt-20 text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-8 h-32 w-32 rounded-full bg-gradient-to-r from-wellness-energy/20 to-wellness-energy/10 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-wellness-energy/20 flex items-center justify-center">
            <div className="text-4xl">✨</div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-foreground mb-3">Well Done!</h1>
        <p className="text-muted-foreground text-lg mb-2">
          You've completed "{m.title}"
        </p>
        <p className="text-sm text-muted-foreground mb-12">
          Take a moment to notice how you feel right now
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <Button 
            onClick={onSave}
            className="w-full rounded-2xl h-14 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-card"
            size="lg"
          >
            <Heart size={20} className="mr-2" />
            Save to Favorites
          </Button>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => nav("/")}
              className="flex-1 rounded-2xl h-12"
            >
              <Home size={18} className="mr-2" />
              Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => nav("/cards")}
              className="flex-1 rounded-2xl h-12"
            >
              <RotateCcw size={18} className="mr-2" />
              More Tools
            </Button>
          </div>
        </div>

        {/* Bottom message */}
        <p className="mt-12 text-xs text-muted-foreground">
          Regular practice helps build mindfulness habits
        </p>
      </div>
    </div>
  );
}