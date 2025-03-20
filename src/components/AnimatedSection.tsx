"use client"
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?:
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "slide-in-right"
  | "slide-in-left"
  | "scale-in";
  threshold?: number;
  once?: boolean;
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = "fade-in-up",
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : "opacity-0",
        className
      )}
      style={{
        animationDelay: delay ? `${delay}ms` : "0ms",
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
