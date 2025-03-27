"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type EmblaCarouselProps = {
  images: string[];
};

export default function Carousel({ images }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return undefined;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      className="embla absolute inset-0 z-0 h-screen w-full overflow-hidden"
      ref={emblaRef}
    >
      <div className="embla__container absolute inset-0 h-full w-full">
        {images.map((image, index) => (
          <div
            className={`embla__slide relative h-full w-full ${
              index === activeIndex ? "animate-slide-in" : ""
            }`}
            key={index}
          >
            <Image
              src={image}
              alt="hoa event photo"
              fill
              className="object-cover"
              priority // Apply to all images for preloading
              placeholder="blur" // Add blur placeholder
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAUR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APDmoq7g0JD0mNNC6M3sfLDmHcTclf2SPP/rE9f2zPQB//2Q==" // Optional: custom blur
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-30">
        <button
          onClick={scrollPrev}
          className="bg-black/60 text-white p-3 rounded-lg shadow-md hover:bg-black/80 transition"
          aria-label="Previous slide"
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          className="bg-black/60 text-white p-3 rounded-lg shadow-md hover:bg-black/80 transition"
          aria-label="Next slide"
        >
          ▶
        </button>
      </div>

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.8s ease-in-out forwards;
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
