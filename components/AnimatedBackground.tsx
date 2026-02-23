"use client";

import { useEffect } from "react";

export default function AnimatedBackground() {
  useEffect(() => {
    const inter = document.querySelector<HTMLDivElement>(".interactive")!;
    if (!inter) return;

    let curX = 0,
      curY = 0,
      tgX = 0,
      tgY = 0;

    function move() {
      if (!inter) return;  
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      inter.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(move);
    }

    window.addEventListener("mousemove", (e) => {
      tgX = e.clientX;
      tgY = e.clientY;
    });

    move();
  }, []);

  return (
    <div className="gradient-bg absolute inset-0 overflow-hidden">
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive"></div>
      </div>
    </div>
  );
}