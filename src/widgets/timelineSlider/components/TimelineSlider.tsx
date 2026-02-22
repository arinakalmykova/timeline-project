import React, { useRef, useState, useEffect, act } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper/modules";
import { useTimeline } from "@/features";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as styles from "./TimelineSlider.module.scss";
import { TimelineEventCard } from "@/entities";
import type { TimelineEvent } from "@/entities";
import gsap from "gsap";

interface Props {
  events: TimelineEvent[];
}

export const TimelineSlider: React.FC<Props> = ({ events }) => {
  const swiperRef = useRef<any>(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(true);
  const { activeIndex, setActiveIndex, activePeriod } = useTimeline([], 0);

  useEffect(() => {
  if (swiperRef.current) {
    setCanSlidePrev(!swiperRef.current.isBeginning);
    setCanSlideNext(!swiperRef.current.isEnd);

    const slides = Array.from(swiperRef.current.slides) as HTMLElement[];
    gsap.to(slides, { opacity: 0, y: 20, duration: 0.3, stagger: 0.05 });
    setTimeout(() => {
      gsap.to(slides, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
    }, 300);
  }
}, [ activePeriod]);


  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
    gsap.from(".swiper-slide-active", { opacity: 0, y: 20, duration: 0.5 });
  };

  return (
    <div
      className={styles.timelineSwiperWrapper}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={100}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        breakpoints={{
          320: {
            slidesPerView: "auto",
            spaceBetween: 25,
            pagination: { el: ".custom-pagination", clickable: true }
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 100, 
            pagination: {  clickable: false }
          },
        }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            {" "}
            <TimelineEventCard event={event} />{" "}
          </SwiperSlide>
        ))}{" "}    
      </Swiper>

      <div className="custom-pagination"></div>

      {canSlidePrev && (
        <button
          className={styles.swiperButtonCustom + " " + styles.prev}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          ‹
        </button>
      )}
      {canSlideNext && (
        <button
          className={styles.swiperButtonCustom + " " + styles.next}
          onClick={() => swiperRef.current?.slideNext()}
        >
          ›
        </button>
      )}
    </div>
  );
};
