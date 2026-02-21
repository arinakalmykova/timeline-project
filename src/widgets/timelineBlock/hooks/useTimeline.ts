import { useState } from "react";
import type { TimelinePeriod } from "@/widgets";

export const useTimeline = (periods: TimelinePeriod[], initialIndex = 0 ) => {
    const safeIndex = initialIndex < periods.length ? initialIndex : 0;

  const [activeIndex, setActiveIndex] = useState(safeIndex);
  const [previousYears, setPreviousYears] = useState<number[]>(
    periods[safeIndex]?.years?.map(Number) || []
  );
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const initialAngles = [40, 90, 140, 220, 270, 320];
  const targetAngle = 220;

  const activePeriod = periods[activeIndex];
  const canGoNext = activeIndex < periods.length - 1;
  const canGoPrev = activeIndex > 0;

  const handleDotClick = (index: number) => {
    setPreviousYears(periods[activeIndex].years.map(Number));
    const currentAngle = (initialAngles[index] + rotation) % 360; 
    const rotateBy = targetAngle - currentAngle; 
    setRotation(prev => prev + rotateBy); 
    setActiveIndex(index); 
  };

  const nextPeriod = () => {
    setPreviousYears(periods[activeIndex].years.map(Number));
    const nextIndex = (activeIndex + 1) % periods.length;
    setActiveIndex(nextIndex);
    handleDotClick(nextIndex);
  };

  const prevPeriod = () => {
    setPreviousYears(periods[activeIndex].years.map(Number));
    const prevIndex = activeIndex === 0 ? periods.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    handleDotClick(prevIndex);
  };

  return {
    activeIndex,
    activePeriod,
    previousYears,
    hoveredIndex,
    setHoveredIndex,
    setActiveIndex,
    rotation,
    initialAngles,
    canGoNext,
    canGoPrev,
    handleDotClick,
    nextPeriod,
    prevPeriod,
  };
};