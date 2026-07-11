"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  rating: number;
  content: string;
  image: string | null;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // How many cards to show at once per breakpoint
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getVisibleCount]);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Auto-play
  useEffect(() => {
    if (isPaused || testimonials.length <= visibleCount) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, visibleCount, testimonials.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) return prev >= maxIndex ? 0 : prev + 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) paginate(1);
    else if (info.offset.x > 50) paginate(-1);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  // If we're near the end, wrap around
  if (visibleTestimonials.length < visibleCount) {
    const remaining = visibleCount - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cards container */}
      <motion.div
        className="overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "grid gap-6",
              visibleCount === 1 && "grid-cols-1",
              visibleCount === 2 && "grid-cols-2",
              visibleCount === 3 && "grid-cols-3"
            )}
          >
            {visibleTestimonials.map((testimonial, i) => (
              <TestimonialCard key={`${currentIndex}-${i}`} testimonial={testimonial} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      {testimonials.length > visibleCount && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => paginate(-1)}
            className="flex items-center justify-center size-10 rounded-full border border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="flex items-center justify-center size-10 rounded-full border border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative rounded-xl border border-white/[0.06] bg-card overflow-hidden group hover:border-primary/20 transition-all duration-300"
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="p-6 lg:p-8 space-y-5">
        {/* Quote icon */}
        <Quote className="size-8 text-primary/20" />

        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-muted-foreground leading-relaxed min-h-[80px]">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center justify-center size-11 rounded-full bg-gradient-green text-primary-foreground font-semibold text-sm shrink-0">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">Funded Trader</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
