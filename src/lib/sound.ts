// lib/sound.ts
// Zero-asset UI sounds — synthesized with the Web Audio API, no files to fetch.

let ctx: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!ctx)
    ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  return ctx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  peak = 0.05
) {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  // Fast attack, exponential decay — reads as a soft "click", not a beep
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(peak, audioCtx.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + duration
  );

  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export const uiSound = {
  /** Soft tap — nav links, minor interactions */
  click: () => playTone(720, 0.08, "sine", 0.05),
  /** Slightly richer — primary CTA, send button */
  confirm: () => playTone(880, 0.12, "triangle", 0.06),
  /** Light dismiss — close / cancel */
  dismiss: () => playTone(440, 0.09, "sine", 0.04),
  /** Warm, friendly — hero primary CTA (view resume) */
  heroPrimary: () => playTone(660, 0.15, "sine", 0.07),
  /** Bright, outward — hero secondary CTA (LinkedIn, external) */
  heroSecondary: () => playTone(880, 0.1, "square", 0.05),
  /** Subtle — header nav links, footer links */
  nav: () => playTone(600, 0.06, "sine", 0.03),
  /** Success/completion — form submit, download */
  success: () => playTone(1000, 0.18, "triangle", 0.06),
  /** Error/block — validation error, disabled action */
  error: () => playTone(300, 0.15, "sawtooth", 0.05),
};
