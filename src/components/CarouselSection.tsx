"use client";
import Image from "next/image";
import { useState } from "react";

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/images/carousel/carousel1.webp",
    "/images/carousel/carousel2.webp",
    "/images/carousel/carousel3.webp",
    "/images/carousel/carousel4.webp",
    "/images/carousel/carousel5.webp",
  ];

  const goToPrevSlide = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  return (
    <div className="relative w-full overflow-hidden" data-carousel="static">
      <div
        className="relative h-[500px] flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-none w-full" data-carousel-item>
            <Image
              width={1920}
              height={1080}
              src={src}
              className="block w-full h-full object-cover object-center"
              alt="Property Image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-50/50 dark:bg-secondary-900/50 group-hover:bg-secondary-50/80 dark:group-hover:bg-secondary-900/80 group-focus:ring-4 group-focus:ring-secondary-900/50 dark:group-focus:ring-secondary-50/50 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-secondary-900 dark:text-secondary-50 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-50/50 dark:bg-secondary-900/50 group-hover:bg-secondary-50/80 dark:group-hover:bg-secondary-900/80 group-focus:ring-4 group-focus:ring-secondary-900/50 dark:group-focus:ring-secondary-50/50  group-focus:outline-none">
          <svg
            className="w-4 h-4 text-secondary-900 dark:text-secondary-50 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
