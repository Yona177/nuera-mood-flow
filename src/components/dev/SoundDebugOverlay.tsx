import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Short base64 encoded MP3 beep (440Hz sine wave, ~500ms)
const BASE64_BEEP =
  "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAASAAAOsAAhISEhISEhISEhISEhITExMTExMTExMTExMTExQUFBQUFBQUFBQUFBQUFBUVFRUVFRUVFRUVFRUVFRYWFhYWFhYWFhYWFhYWFhcXFxcXFxcXFxcXFxcXFxgYGBgYGBgYGBgYGBgYGBkZGRkZGRkZGRkZGRkZGRoaGhoaGhoaGhoaGhoaGhsbGxsbGxsbGxsbGxsbGxwcHBwcHBwcHBwcHBwcHB0dHR0dHR0dHR0dHR0dHR4eHh4eHh4eHh4eHh4eHh8fHx8fHx8fHx8fHx8fHx//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////";

type Props = { audioUrl?: string; visible?: boolean };

export default function SoundDebugOverlay({ audioUrl, visible = false }: Props) {
  const [log, setLog] = useState<string[]>([]);
  const [fetchOk, setFetchOk] = useState<null | boolean>(null);
  const [mime, setMime] = useState<string>("");
  const [voicesReady, setVoicesReady] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const add = (m: string) => setLog((L) => [...L, `[${new Date().toLocaleTimeString()}] ${m}`]);

  useEffect(() => {
    (async () => {
      if (!audioUrl) { setFetchOk(false); add("No audioUrl provided"); return; }
      try {
        const res = await fetch(audioUrl, { method: "GET" });
        setFetchOk(res.ok);
        setMime(res.headers.get("content-type") || "");
        add(`GET ${audioUrl} → ${res.status} (${res.ok ? "ok" : "fail"}), mime=${res.headers.get("content-type")}`);
      } catch (e) {
        setFetchOk(false);
        add(`GET ${audioUrl} failed: ${(e as Error).message}`);
      }
    })();

    if ("speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length) setVoicesReady(true);
      else {
        window.speechSynthesis.onvoiceschanged = () => setVoicesReady(true);
        window.speechSynthesis.getVoices();
      }
    }
  }, [audioUrl]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-2xl rounded-t-2xl border bg-background/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-2 text-sm font-semibold">Sound Debug Overlay</div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={async () => {
          try {
            let el = audioRef.current;
            if (!el) return add("audio element missing");
            el.src = audioUrl || "";
            el.currentTime = 0;
            await el.play();
            add("MP3 play() resolved");
          } catch (e) { add("MP3 play() rejected: " + (e as Error).message); }
        }}>Play MP3</Button>

        <Button variant="secondary" onClick={async () => {
          try {
            let el = audioRef.current;
            if (!el) return add("audio element missing");
            el.src = BASE64_BEEP;
            el.currentTime = 0;
            await el.play();
            add("Base64 tone play() resolved");
          } catch (e) { add("Base64 tone play() rejected: " + (e as Error).message); }
        }}>Play Base64 Tone</Button>

        <Button variant="secondary" onClick={() => {
          try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            osc.type = "sine"; osc.frequency.value = 440;
            osc.connect(ctx.destination); osc.start();
            setTimeout(() => { osc.stop(); ctx.close(); }, 500);
            add("WebAudio oscillator beep triggered");
          } catch (e) { add("WebAudio error: " + (e as Error).message); }
        }}>WebAudio Beep</Button>

        <Button variant="secondary" onClick={() => {
          try {
            if (!("speechSynthesis" in window)) return add("TTS not supported");
            const u = new SpeechSynthesisUtterance("This is a test of the speech synthesis voice.");
            u.rate = 1.0; u.pitch = 1.0; u.volume = 1.0;
            window.speechSynthesis.speak(u);
            add("TTS speak() called; voicesReady=" + voicesReady);
          } catch (e) { add("TTS error: " + (e as Error).message); }
        }}>Speak TTS</Button>
      </div>

      <div className="mb-2 text-xs">
        <div>Fetch ok: {String(fetchOk)} | MIME: {mime || "unknown"}</div>
        <div>TTS supported: {String("speechSynthesis" in window)} | voicesReady: {String(voicesReady)}</div>
      </div>

      <audio ref={audioRef} controls className="w-full" />

      <div className="mt-2 h-28 overflow-auto rounded bg-muted p-2 text-xs">
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}