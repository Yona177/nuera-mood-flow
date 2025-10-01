import { useEffect, useMemo, useRef, useState } from "react";
import { MEDITATIONS } from "@/data/meditations";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { track } from "@/utils/analytics";
import { ArrowLeft, Play, Pause } from "lucide-react";

export default function MeditationPlayer() {
  const { meditationId = "mindful5" } = useParams();
  const nav = useNavigate();
  const m = useMemo(() => MEDITATIONS[meditationId!] ?? MEDITATIONS["mindful5"], [meditationId]);

  const [isPlaying, setPlaying] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(m.durationSec);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    track("meditation_start", { meditationId: m.id });
    const audio = new Audio(m.audioUrl);
    audio.preload = "auto";
    audio.loop = true; // Loop the audio for the full duration
    audioRef.current = audio;

    const start = () => {
      audioRef.current?.play().catch(() => {
        // Autoplay blocked: user can tap play
        setPlaying(false);
      });
      tickRef.current = window.setInterval(() => {
        setSecondsLeft((s) => Math.max(0, s - 1));
      }, 1000) as unknown as number;
    };

    start();

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [m.id, m.audioUrl, m.durationSec]);

  useEffect(() => {
    if (secondsLeft === 0) {
      audioRef.current?.pause();
      if (tickRef.current) window.clearInterval(tickRef.current);
      track("meditation_complete", { meditationId: m.id, durationSec: m.durationSec });
      nav(`/meditation/${m.id}/complete`);
    }
  }, [secondsLeft, m.id, m.durationSec, nav]);

  const togglePlay = () => {
    setPlaying((p) => {
      const next = !p;
      if (next) audioRef.current?.play();
      else audioRef.current?.pause();
      return next;
    });
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="mx-auto max-w-md p-6 pt-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm" 
            onClick={() => nav(-1)}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Meditation</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="text-center">
          {/* Cover Image */}
          <div className="mb-8">
            {m.coverUrl ? (
              <img 
                src={m.coverUrl} 
                alt={m.title} 
                className="mx-auto h-48 w-full rounded-2xl object-cover shadow-card" 
              />
            ) : (
              <div className="mx-auto h-48 w-full rounded-2xl bg-gradient-wellness flex items-center justify-center shadow-card">
                <div className="text-4xl">🧘‍♀️</div>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground mb-2">{m.title}</h1>
          {m.subtitle && <p className="text-muted-foreground mb-8">{m.subtitle}</p>}

          {/* Timer Circle */}
          <div className="my-12 flex items-center justify-center">
            <div className="relative">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-primary/20 bg-card shadow-card">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground">
                    {mins}:{secs}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {isPlaying ? "Playing" : "Paused"}
                  </div>
                </div>
              </div>
              {/* Progress ring */}
              <svg className="absolute inset-0 h-48 w-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96" 
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary/30"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor" 
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (secondsLeft / m.durationSec)}`}
                  className="text-primary transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button 
              onClick={togglePlay} 
              className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-card"
              size="lg"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
          </div>

          <Button 
            variant="ghost" 
            onClick={() => nav(-1)}
            className="mt-8 text-muted-foreground"
          >
            Exit Meditation
          </Button>
        </div>
      </div>
    </div>
  );
}