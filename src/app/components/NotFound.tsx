
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AnimatedButton from "@/components/AnimatedButton";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center">
        <AnimatedSection animation="fade-in-down" delay={100}>
          <div className="text-9xl font-bold text-primary/20">404</div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={300}>
          <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-foreground/70 mb-8">
            La page que vous recherchez semble ne pas exister. Elle a peut-être été déplacée ou supprimée.
          </p>
          
          <Link to="/">
            <AnimatedButton 
              variant="primary" 
              className="px-6 py-3"
              icon={<ArrowLeft size={16} />}
              iconPosition="left"
            >
              Retour à l&apos;accueil
            </AnimatedButton>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NotFound;
