import { useState } from "react";
import { TimelinePeriod } from "@/widgets";

export const useTimelineSlider = (periods: TimelinePeriod[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const setActivePeriod = (index: number) => {
    if (index >= 0 && index < periods.length) {
      setActiveIndex(index);
    }
  };

  return {
    activeIndex,
    activePeriod: periods[activeIndex],
    setActivePeriod,
  };
};
