"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/SoundProvider";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();

  const handleToggle = () => {
    // Play the click *before* toggling so it's audible when turning ON
    if (!enabled) uiSoundPreview();
    toggle();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      aria-pressed={enabled}
      title={enabled ? "Sound on" : "Sound off"}
      className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      {enabled ? (
        <Volume2 size={15} aria-hidden="true" />
      ) : (
        <VolumeX size={15} aria-hidden="true" />
      )}
    </button>
  );
}

/**
 * Fire a tiny preview tone directly (bypasses the context enabled-gate)
 * so the user can hear that sound just turned ON.
 */
function uiSoundPreview() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 720;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // AudioContext not available — silently ignore
  }
}
