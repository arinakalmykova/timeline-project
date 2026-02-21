import React from "react";
import { TimelineSlider } from "@/features";
import { useTimeline } from "@/widgets";
import type { TimelinePeriod } from "@/widgets";
import * as styles from "./TimelineBlock.module.scss";
import { AnimatedNumbers } from "@/features/animatedNumbers/AnimatedNumbers";

interface Props {
  periods: TimelinePeriod[];
}

export const TimelineBlock: React.FC<Props> = ({ periods }) => {
  const {
    activeIndex,
    activePeriod,
    previousYears,
    hoveredIndex,
    setHoveredIndex,
    rotation,
    initialAngles,
    canGoNext,
    canGoPrev,
    handleDotClick,
    nextPeriod,
    prevPeriod,
  } = useTimeline(periods, 3);

  return (
    <div className={styles.timelineBlock}>
      <div className={styles.container}>
        <div className={styles.circle}>
          {periods.map((_, index) => {
            const angle = initialAngles[index];
            return (
              <div
                key={index}
                className={styles.dotWrapper}
                style={{
                  transform: `rotate(${angle + rotation}deg) translateY(265px)`,
                }}
                onClick={() => handleDotClick(index)}
                onMouseOver={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={styles.dotInner + (index === activeIndex ? " " + styles.active : "")}
                  style={{ transform: `rotate(${-angle - rotation}deg)` }}
                >
                  <span>{index === activeIndex || hoveredIndex === index ? index + 1 : ""}</span>
                </div>
                <span
                  className={styles.dotTitle}
                  style={{ transform: `rotate(${-angle - rotation}deg) translateX(95px)` }}
                >
                  {index === activeIndex ? periods[index].title : ""}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.timeBlockTitle}>
          <h1>Исторические даты</h1>
        </div>

        <div className={styles.content}>
          <span className={styles.periodYears}>
            {activePeriod.years.map((year, idx) => (
              <AnimatedNumbers
                key={idx}
                from={Number(previousYears[idx] || year)}
                to={Number(year)}
                duration={Math.abs(Number(year) - Number(previousYears[idx] || year)) * 0.2}
              />
            ))}
          </span>

          <div className={styles.bottomSection}>
            <div className={styles.sliderHeader}>
              <label htmlFor="timeline-slider">
                0{activeIndex + 1}/0{periods.length}
              </label>
              <div className={styles.periodSelector}>
                <button className={styles.periodButton} onClick={prevPeriod} disabled={!canGoPrev}>‹</button>
                <button className={styles.periodButton} onClick={nextPeriod} disabled={!canGoNext}>›</button>
              </div>
            </div>

            <div className={styles.sliderWrapper}>
              <h2 className={styles.sliderTitle}>{activePeriod.title}</h2>
              <TimelineSlider events={activePeriod.events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};