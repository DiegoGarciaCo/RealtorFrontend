"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type EmblaCarouselProps = {
    images: string[];
};

export default function Carousel({ images }: EmblaCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false, // disable native loop to prevent DOM recycling
            containScroll: false,
        },
        [
            Autoplay({
                delay: 5000,
                stopOnInteraction: false,
            }),
        ]
    );

    // Manual loop without remounting slides
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const index = emblaApi.selectedScrollSnap();

            // If last slide, jump back to first after delay
            if (index === images.length - 1) {
                setTimeout(() => {
                    emblaApi.scrollTo(0, false);
                }, 5000);
            }
        };

        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, images.length]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div
            className="embla absolute inset-0 z-0 h-screen w-full overflow-hidden"
            ref={emblaRef}
        >
            <div className="embla__container flex h-full w-full will-change-transform">
                {images.map((image, index) => (
                    <div
                        key={image} // stable key prevents remounts
                        className="embla__slide relative h-full w-full flex-shrink-0"
                        style={{ transform: "translateZ(0)" }} // prevents white flash
                    >
                        <Image
                            src={image}
                            alt="hoa event photo"
                            fill
                            sizes="100vw" // critical for Next/Image layout stability
                            className="object-cover"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-30">
                <button
                    onClick={scrollPrev}
                    className="bg-black/60 text-white p-3 rounded-lg hover:bg-black/80 transition"
                    aria-label="Previous slide"
                >
                    ◀
                </button>
                <button
                    onClick={scrollNext}
                    className="bg-black/60 text-white p-3 rounded-lg hover:bg-black/80 transition"
                    aria-label="Next slide"
                >
                    ▶
                </button>
            </div>
        </div>
    );
}
