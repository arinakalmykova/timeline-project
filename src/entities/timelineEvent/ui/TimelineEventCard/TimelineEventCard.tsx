import React from "react";
import { TimelineEvent } from "../../model/types";
import * as styles from "./TimelineEventCard.module.scss";

interface Props {
  event: TimelineEvent;
}

export const TimelineEventCard: React.FC<Props> = ({ event }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.description}>{event.description}</p>
      <span className={styles.date}>{event.date}</span>
    </div>
  );
};
