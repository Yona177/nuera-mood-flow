import { useEffect, useMemo, useRef, useState } from "react";
import { MEDITATIONS } from "@/data/meditations";
import { GUIDANCE } from "@/data/guidance";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { track } from "@/utils/analytics";
import { ArrowLeft, Play, Pause } from "lucide-react";

type Mode = "mp3" | "tts" | "silent";

async function canStream(url?: string) {
  if (!url) return false;
  try {
    const res = await fetch(url, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

export default function MeditationPlayer() {
  const { meditationId = "mindful7" } = useParams();
  const nav = useNavigate();
  const m = useMemo(() => MEDITATIONS[meditationId!] ?? MEDITATIONS["mindful7"], [meditationId]);

  const [mode, setMode] = useState<Mode>("silent");
  const [ready, setReady] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(m.durationSec);
  const [voicesReady, setVoicesReady] = useState(false);

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const tickRef = useRef<number | null>(null);
  const ttsTimers = useRef<number[]>([]);

  // Decide playback mode: mp3 > tts > silent
  useEffect(() => {
    let mounted = true;

    // TTS warm-up
    if ("speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length) setVoicesReady(true);
      else {
        window.speechSynthesis.onvoiceschanged = () => setVoicesReady(true);
        // nudge some browsers to init
        window.speechSynthesis.getVoices();
      }
    }

    (async () => {
      const ok = await canStream(m.audioUrl);
      if (!mounted) return;
      if (ok) setMode("mp3");
      else if ("speechSynthesis" in window) setMode("tts");
      else setMode("silent");
      setReady(true);
    })();

    return () => { mounted = false; };
  }, [m.audioUrl]);

  // Start/stop timer + audio/tts
  const start = () => {
    if (!ready) return;
    setPlaying(true);
    track("meditation_start", { meditationId: m.id, mode });

    // timer
    tickRef.current = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000) as unknown as number;

    if (mode === "mp3" && audioElRef.current) {
      audioElRef.current.currentTime = 0;
      audioElRef.current.play().catch(() => {/* user gesture already present via Play click */});
    } else if (mode === "tts" && voicesReady) {
      const cues = GUIDANCE[m.id] ?? [];
      cues.forEach(({ t, text }) => {
        const h = window.setTimeout(() => {
          const u = new SpeechSynthesisUtterance(text);
          u.rate = 1.0; u.pitch = 1.0; u.volume = 1.0;
          window.speechSynthesis.speak(u);
        }, t * 1000);
        ttsTimers.current.push(h as unknown as number);
      });
    }
  };

  const pause = () => {
    setPlaying(false);
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (mode === "mp3") audioElRef.current?.pause();
    if (mode === "tts") window.speechSynthesis.pause();
  };

  const resume = () => {
    setPlaying(true);
    if (!tickRef.current) {
      tickRef.current = window.setInterval(() => {
        setSecondsLeft((s) => Math.max(0, s - 1));
      }, 1000) as unknown as number;
    }
    if (mode === "mp3") audioElRef.current?.play();
    if (mode === "tts") window.speechSynthesis.resume();
  };

  const stopAll = () => {
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (mode === "mp3" && audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current.currentTime = 0;
    }
    if (mode === "tts") {
      window.speechSynthesis.cancel();
      ttsTimers.current.forEach((id) => window.clearTimeout(id));
      ttsTimers.current = [];
    }
  };

  useEffect(() => {
    if (secondsLeft === 0 && ready) {
      stopAll();
      track("meditation_complete", { meditationId: m.id, durationSec: m.durationSec, mode });
      nav(`/meditation/${m.id}/complete`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, ready]);

  useEffect(() => () => stopAll(), []); // cleanup

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      if (secondsLeft === m.durationSec) {
        start();
      } else {
        resume();
      }
    }
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
            onClick={() => { stopAll(); nav(-1); }}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Meditation</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* hidden audio element to satisfy autoplay policies */}
        <audio ref={audioElRef} src={m.audioUrl} preload="auto" playsInline />
        
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
                    {isPlaying ? "Playing" : ready ? "Ready" : "Loading..."}
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
              disabled={!ready}
              className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-card"
              size="lg"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
          </div>

          <Button 
            variant="ghost" 
            onClick={() => { stopAll(); nav(-1); }}
            className="mt-8 text-muted-foreground"
          >
            Exit Meditation
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Voice mode: {mode === "mp3" ? "Recorded audio" : mode === "tts" ? "Speech synthesis" : "Silent"}
          </p>
        </div>
      </div>
    </div>
  );
}