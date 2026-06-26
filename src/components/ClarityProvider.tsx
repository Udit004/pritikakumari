"use client";

import { useEffect } from "react";
import { initializeClarity } from "@/lib/Clarity";

export default function ClarityProvider() {
  useEffect(() => {
    initializeClarity();
  }, []);

  return null;
}