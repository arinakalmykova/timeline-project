import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedNumberProps {
  from: number;
  to: number;
  duration?: number;
}

export const AnimatedNumbers: React.FC<AnimatedNumberProps> = ({ from, to, duration = 1 }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        innerText: to,
        duration,
        snap: "innerText", 
        ease: "power1.inOut",
      });
    }
  }, [from, to, duration]);

  return <span ref={ref}>{from}</span>;
};