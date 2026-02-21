import type { TimelineEvent } from "@/entities";

export interface TimelinePeriod {
  id: string;
  title: string;
  years: string[]; 
  events: TimelineEvent[];
}
