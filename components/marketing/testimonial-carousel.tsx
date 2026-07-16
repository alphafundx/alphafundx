"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50) paginate(1);
    else if (info.offset.x > 50) paginate(-1);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

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
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
              "grid gap-4",
              visibleCount === 1 && "grid-cols-1",
              visibleCount === 2 && "grid-cols-2",
              visibleCount === 3 && "grid-cols-3"
            )}
          >
            {visibleTestimonials.map((testimonial, i) => (
              <TestimonialCard
                key={`${currentIndex}-${i}`}
                testimonial={testimonial}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      {testimonials.length > visibleCount && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => paginate(-1)}
            className="flex items-center justify-center size-8 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white hover:border-white/[0.12] transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={cn(
                  "rounded-full transition-all duration-200",
                  i === currentIndex
                    ? "w-5 h-1.5 bg-[#26FF5E]"
                    : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="flex items-center justify-center size-8 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white hover:border-white/[0.12] transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-4" />
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="rounded-xl border border-white/[0.05] bg-[#232930] p-5 lg:p-6 hover:border-white/[0.08] transition-colors duration-200"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < testimonial.rating
                ? "text-amber-400 fill-amber-400"
                : "text-white/10"
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-white/50 leading-relaxed mb-5 min-h-[60px]">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
        <div className="flex items-center justify-center size-9 rounded-full bg-[#26FF5E]/10 text-[#26FF5E] font-semibold text-xs shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-white/80">
            {testimonial.name}
          </p>
          <p className="text-[11px] text-white/30">Funded Trader</p>
        </div>
      </div>
    </motion.div>
  );
}
