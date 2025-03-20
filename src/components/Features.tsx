
import React from "react";
import AnimatedSection from "./AnimatedSection";
import { CheckCircle, Zap, Shield, Sparkles } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <AnimatedSection 
      animation="fade-in-up" 
      delay={delay} 
      className="relative group"
    >
      <div className="h-full relative p-6 sm:p-8 rounded-3xl border border-border bg-card hover:shadow-md transition-all duration-500 ease-apple">
        <div className="p-4 rounded-2xl bg-primary/10 text-primary inline-flex mb-6">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight">{title}</h3>
        <p className="text-foreground/70">{description}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/0 rounded-b-3xl transition-all duration-500 ease-apple group-hover:bg-primary/80"></div>
      </div>
    </AnimatedSection>
  );
};

const Features = () => {
  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: "Design Intuitif",
      description: "Une interface utilisateur conçue pour être immédiatement compréhensible et facile à utiliser.",
      delay: 100
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Optimale",
      description: "Rapidité et efficacité à chaque interaction pour une expérience fluide et réactive.",
      delay: 200
    },
    {
      icon: <Shield size={24} />,
      title: "Sécurité Renforcée",
      description: "Protection de vos données avec des protocoles de sécurité avancés intégrés dès la conception.",
      delay: 300
    },
    {
      icon: <Sparkles size={24} />,
      title: "Détails Soignés",
      description: "Chaque élément a été méticuleusement conçu avec une attention particulière aux moindres détails.",
      delay: 400
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Caractéristiques Exceptionnelles
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Une combinaison parfaite de design épuré et de fonctionnalités puissantes 
            pour une expérience utilisateur sans précédent.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
