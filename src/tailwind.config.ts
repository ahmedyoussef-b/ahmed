// tailwind.config.ts
import type { Config } from "tailwindcss" with { "resolution-mode": "import" };
import defaultTheme from "tailwindcss/defaultTheme"; // Importez le module par défaut
import animate from "tailwindcss-animate";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Assurez-vous que ce chemin correspond à votre structure de projet
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans], // Accédez à fontFamily via defaultTheme
            },
        },
    },
    plugins: [
        animate, // Utilisez le module importé
    ],
};

export default config;