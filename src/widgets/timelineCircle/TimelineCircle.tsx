import React from "react";
import * as styles from "./TimelineCircle.module.scss";

interface Props {
  periods: { title: string }[];
  activeIndex: number;
  hoveredIndex: number | null;
  rotation: number;
  initialAngles: number[];
  onDotClick: (index: number) => void;
  onHover: (index: number | null) => void;
}

export const TimelineCircle: React.FC<Props> = ({
  periods,
  activeIndex,
  hoveredIndex,
  rotation,
  initialAngles,
  onDotClick,
  onHover,
}) => {
  return (
    <div className={styles.circle}>
      {periods.map((period, index) => {
        const angle = initialAngles[index];

        return (
          <div
            key={index}
            className={styles.dotWrapper}
            style={{
              transform: `rotate(${angle + rotation}deg) translateY(265px)`,
            }}
            onClick={() => onDotClick(index)}
            onMouseOver={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
          >
            <div
              className={
                styles.dotInner +
                (index === activeIndex ? " " + styles.active : "")
              }
              style={{ transform: `rotate(${-angle - rotation}deg)` }}
            >
              <span>
                {index === activeIndex || hoveredIndex === index
                  ? index + 1
                  : ""}
              </span>
            </div>

            <span
              className={styles.dotTitle}
              style={{
                transform: `rotate(${-angle - rotation}deg) translateX(95px)`,
              }}
            >
              {index === activeIndex ? period.title : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};