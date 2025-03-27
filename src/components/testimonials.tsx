"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const testimonials = [
  {
    name: "Maria S.",
    location: "Schaumburg, IL",
    quote:
      "Diego sold my home in under two weeks for more than I expected! His market knowledge and energy made the process so smooth.",
    image: "/client1.jpg",
  },
  {
    name: "James R.",
    location: "Palatine, IL",
    quote:
      "As an investor, I appreciate Diego’s insights into Chicagoland properties. He helped me find a great deal and handled everything perfectly.",
    image: "/client2.jpg",
  },
  {
    name: "Ana P.",
    location: "Arlington Heights, IL",
    quote:
      "Diego’s fluency in Spanish was a game-changer for my family. He found us our dream home in the Northwest suburbs with ease.",
    image: "/client3.jpg",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12 bg-brand-neutral">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-brand-primary tracking-tight">
            Client Stories
          </h2>
          <p className="mt-6 text-2xl text-brand-primary/80 max-w-3xl mx-auto">
            Discover why Chicagoland clients trust Diego Garcia for their real
            estate needs.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl mx-auto transition-all duration-300 hover:shadow-2xl hover:-rotate-1 animate-fade-in">
                    <div className="flex items-center mb-8">
                      <div className="relative h-20 w-20">
                        <Image
                          src={testimonial.image}
                          alt={`${testimonial.name} testimonial`}
                          fill
                          className="object-cover rounded-full border-4 border-brand-secondary/50 shadow-sm"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20 opacity-60" />
                      </div>
                      <div className="ml-6">
                        <p className="text-brand-primary text-2xl font-bold">
                          {testimonial.name}
                        </p>
                        <p className="text-brand-primary/80 text-base">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-brand-primary/90 text-xl leading-relaxed relative">
                      <span className="absolute -top-4 -left-4 text-4xl text-brand-primary/20 opacity-50">
                        “
                      </span>
                      {testimonial.quote}
                      <span className="absolute -bottom-4 -right-4 text-4xl text-brand-primary/20 opacity-50">
                        ”
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-brand-primary/70 text-brand-text p-4 rounded-full hover:bg-brand-primary hover:scale-110 transition-all duration-300 shadow-md"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-brand-primary/70 text-brand-text p-4 rounded-full hover:bg-brand-primary hover:scale-110 transition-all duration-300 shadow-md"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-4 w-4 rounded-full transition-all duration-300 shadow-sm ${
                  selectedIndex === index
                    ? "bg-brand-secondary scale-125"
                    : "bg-brand-primary/30 hover:bg-brand-secondary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
