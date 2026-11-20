"use client";

import React, { ReactNode } from "react";

interface SceneContainerProps {
  id: string;
  className?: string;
  fullscreen?: boolean;
  children: ReactNode;
  snap?: boolean;
  sceneIndex?: string; // e.g. "01"
  sceneName?: string;  // e.g. "Hero"
}

export function SceneContainer({
  id,
  className = "",
  fullscreen = true,
  children,
  snap = true,
  sceneIndex,
  sceneName,
}: SceneContainerProps) {
  return (
    <section
      id={id}
      data-scene-index={sceneIndex}
      data-scene-name={sceneName}
      className={`relative w-full ${
        snap ? "scene-section" : ""
      } ${
        fullscreen ? "scene-fullscreen" : "min-h-fit"
      } ${className}`}
    >
      {children}
    </section>
  );
}
