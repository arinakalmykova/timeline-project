import React from "react";
import { TimelineSlider, useTimelineSlider } from "@/features";
import { TimelinePeriod } from "@/widgets";
import * as styles from "./TimelineBlock.module.scss";

interface Props {
  periods: TimelinePeriod[];
}

export const TimelineBlock: React.FC<Props> = ({ periods }) => {
  const { activePeriod, activeIndex, setActivePeriod } = useTimelineSlider(periods);

  return (
    <div className={styles.timelineBlock}>
      <div className={styles.periodSelector}>
        {periods.map((period, index) => (
          <button
            key={period.id}
            className={`${styles.periodButton} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => setActivePeriod(index)}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className={styles.sliderWrapper}>
        <TimelineSlider events={activePeriod.events} />
      </div>
    </div>
  );
};
