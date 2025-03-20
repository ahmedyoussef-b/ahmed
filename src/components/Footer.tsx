//src/components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link"; // Utilisez `next/link` au lieu de `react-router-dom`
import AnimatedSection from "./AnimatedSection";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-10 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Prêt à Commencer ?
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-8">
            Découvrez dès aujourd&apos;hui comment notre approche minimaliste peut
            transformer votre expérience.
          </p>

          <div className="relative mx-auto w-full max-w-md">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="w-full px-6 py-4 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 pr-32"
            />
            <button className="absolute right-1.5 top-1.5 bg-primary text-primary-foreground px-4 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors">
              S&apos;inscrire
            </button>
          </div>
        </AnimatedSection>

        <div className="border-t border-border/50 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <Link href="/" className="text-xl font-bold mb-4 inline-block">
                Élégance
              </Link>
              <p className="text-foreground/70 mb-4">
                La beauté dans la simplicité. Un design épuré pour une expérience
                intuitive.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2">
                {["Fonctionnalités", "Tarifs", "Témoignages", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                {["À propos", "Équipe", "Carrières", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                {["Conditions d'utilisation", "Confidentialité", "Cookies"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-border/50 text-foreground/60 text-sm">
            <p>© {currentYear} Élégance. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;