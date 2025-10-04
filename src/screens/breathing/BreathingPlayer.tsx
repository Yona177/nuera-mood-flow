import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BREATHING_PATTERNS } from "@/data/breathing";
import { Button } from "@/components/ui/button";
import { track } from "@/utils/analytics";
import { ArrowLeft, Pause, Play } from "lucide-react";

type Phase = "inhale" | "hold" | "exhale" | "hold2";

export default function BreathingPlayer() {
  const { breathingId = "box44" } = useParams();
  const nav = useNavigate();
  const pattern = useMemo(
    () => BREATHING_PATTERNS[breathingId!] ?? BREATHING_PATTERNS["box44"],
    [breathingId]
  );

  const [isPlaying, setPlaying] = useState(true);
  const [sessionLeft, setSessionLeft] = useState(pattern.sessionSec);

  // UI state (derived from refs below)
  const [phase, setPhase] = useState<Phase>("inhale");
  const [phaseLeft, setPhaseLeft] = useState(pattern.cycle.inhale);

  // Refs to avoid stale-closure bugs inside setInterval
  const phaseRef = useRef<Phase>("inhale");
  const phaseLeftRef = useRef<number>(pattern.cycle.inhale);
  const tickRef = useRef<number | null>(null);

  // animation scale
  const minScale = pattern.minScale ?? 0.9;
  const maxScale = pattern.maxScale ?? 1.35;

  const phaseDuration = (p: Phase) =>
    p === "inhale" ? pattern.cycle.inhale
    : p === "hold" ? pattern.cycle.hold
    : p === "exhale" ? pattern.cycle.exhale
    : pattern.cycle.hold2;

  const nextPhase = (p: Phase): Phase =>
    p === "inhale" ? "hold"
    : p === "hold"   ? "exhale"
    : p === "exhale" ? "hold2"
    : "inhale";

  // Start / reset when pattern changes
  useEffect(() => {
    // reset state
    setSessionLeft(pattern.sessionSec);
    phaseRef.current = "inhale";
    phaseLeftRef.current = pattern.cycle.inhale;
    setPhase(phaseRef.current);
    setPhaseLeft(phaseLeftRef.current);

    // analytics
    track("breathing_start", { breathingId: pattern.id });

    // (re)start ticking if playing
    const start = () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      if (!isPlaying) return;
      tickRef.current = window.setInterval(() => {
        // session countdown
        setSessionLeft((s) => Math.max(0, s - 1));

        // phase countdown via refs (no stale closure)
        if (phaseLeftRef.current > 1) {
          phaseLeftRef.current -= 1;
          setPhaseLeft(phaseLeftRef.current);
        } else {
          // advance phase
          const next = nextPhase(phaseRef.current);
          phaseRef.current = next;
          const dur = phaseDuration(next);
          phaseLeftRef.current = dur;
          setPhase(next);
          setPhaseLeft(dur);
        }
      }, 1000) as unknown as number;
    };

    start();

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      tickRef.current = null;
    };
    // re-run when pattern or play/pause toggles
  }, [pattern.id, pattern.sessionSec, pattern.cycle.inhale, pattern.cycle.hold, pattern.cycle.exhale, pattern.cycle.hold2, isPlaying]);

  // Complete session
  useEffect(() => {
    if (sessionLeft === 0) {
      if (tickRef.current) window.clearInterval(tickRef.current);
      track("breathing_complete", { breathingId: pattern.id, sessionSec: pattern.sessionSec });
      nav(-1);
    }
  }, [sessionLeft, nav, pattern.id, pattern.sessionSec]);

  // animation scale calculation
  const total = phaseDuration(phase);
  const progress = 1 - phaseLeft / Math.max(1, total);
  let scale = 1;
  if (phase === "inhale") {
    scale = minScale + (maxScale - minScale) * progress; // expand
  } else if (phase === "exhale") {
    scale = maxScale - (maxScale - minScale) * progress; // contract
  } else {
    scale = phase === "hold" ? maxScale : minScale;       // holds keep edge size
  }

  const minutes = Math.floor(sessionLeft / 60);
  const seconds = String(sessionLeft % 60).padStart(2, "0");
  const phaseLabel = phase === "inhale" ? "Inhale" : phase === "exhale" ? "Exhale" : "Hold";

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="mx-auto max-w-md p-6 pt-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => nav(-1)} className="h-10 w-10 rounded-full p-0">
            <ArrowLeft size={20} />
          </Button>
          <h2 className="text-lg font-semibold">Breathing</h2>
          <div className="w-10" />
        </div>

        <div className="text-center">
          <h1 className="mb-1 text-2xl font-semibold">{pattern.title}</h1>
          <p className="mb-6 text-muted-foreground">{pattern.subtitle}</p>

          {/* Animated circle */}
          <div className="my-10 flex items-center justify-center">
            <div
              className="flex h-48 w-48 items-center justify-center rounded-full bg-card shadow-card transition-transform duration-1000 ease-linear"
              style={{ transform: `scale(${scale})` }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{phaseLabel}</div>
                <div className="mt-1 text-sm text-muted-foreground">{phaseLeft}s</div>
              </div>
            </div>
          </div>

          {/* Session timer */}
          <div className="mb-6 text-sm text-muted-foreground">
            Session: {minutes}:{seconds}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setPlaying(p => !p)}
              className="h-16 w-16 rounded-full bg-primary shadow-card hover:bg-primary/90"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
          </div>

          <Button variant="ghost" className="mt-8 text-muted-foreground" onClick={() => nav(-1)}>
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
