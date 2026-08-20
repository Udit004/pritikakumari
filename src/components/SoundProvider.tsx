"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { uiSound } from "@/lib/sound";

type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
  play: (name: keyof typeof uiSound) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Off by default — never assume consent for audio
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sound-enabled") === "true") setEnabled(true);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      localStorage.setItem("sound-enabled", String(!prev));
      return !prev;
    });
  }, []);

  const play = useCallback(
    (name: keyof typeof uiSound) => {
      if (enabled) uiSound[name]();
    },
    [enabled]
  );

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
  return ctx;
}
