
import React from "react";
import AnimatedSection from "./AnimatedSection";
import AnimatedButton from "./AnimatedButton";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl opacity-60 animate-float animation-delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 relative text-center">
        {/* Badge */}
        <AnimatedSection animation="fade-in-down" delay={100}>
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Nouveau Produit | Design Élégant
          </div>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection animation="fade-in-up" delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            L'Élégance dans sa Forme<br /> la Plus Simple
          </h1>
        </AnimatedSection>

        {/* Subheadline */}
        <AnimatedSection animation="fade-in-up" delay={400}>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-10 text-balance">
            Découvrez la beauté de la simplicité à travers un design minimaliste et intuitif
            qui met en valeur l'essentiel. Une expérience sublime qui transcende l'ordinaire.
          </p>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection animation="fade-in-up" delay={600} className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton 
            variant="primary" 
            size="lg" 
            className="px-8 py-4 shadow-md"
            icon={<ArrowRight size={16} />}
          >
            Explorer
          </AnimatedButton>
          
          <AnimatedButton 
            variant="secondary" 
            size="lg" 
            className="px-8 py-4"
          >
            En savoir plus
          </AnimatedButton>
        </AnimatedSection>

        {/* Product Image */}
        <AnimatedSection animation="fade-in-up" delay={800} className="mt-16 relative">
          <div className="relative mx-auto w-full max-w-4xl aspect-video overflow-hidden rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900/10 z-10"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white dark:bg-gray-800 rounded-2xl shadow-inner flex items-center justify-center">
                  <div className="text-3xl font-bold text-gray-300 dark:text-gray-700">Aperçu Produit</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reflective surface underneath */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-11/12 h-24 bg-black/5 dark:bg-white/5 blur-md rounded-full transform scale-x-75"></div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
