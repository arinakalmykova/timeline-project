import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { TimelineEvent } from "@/entities";
import { TimelineEventCard } from "@/entities";
import "swiper/css";
import gsap from "gsap";

interface Props {
  events: TimelineEvent[];
}

export const TimelineSlider: React.FC<Props> = ({ events }) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      gsap.from(".swiper-slide-active", { opacity: 0, y: 20, duration: 0.5 });
    }
  }, [events]);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <TimelineEventCard event={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
