import type { TimelineEvent } from "@/entities";

export interface TimelinePeriod {
  id: string;
  label: string; 
  events: TimelineEvent[];
}
