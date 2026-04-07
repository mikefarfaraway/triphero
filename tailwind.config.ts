import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./tests/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#FFF8EE",
        blush: "#FFD8C7",
        coral: "#FF8966",
        mint: "#C3F4D6",
        ocean: "#0F3D3E",
        ink: "#18212B",
      },
      boxShadow: {
        float: "0 24px 60px rgba(24, 33, 43, 0.14)",
      },
      backgroundImage: {
        "confetti-glow":
          "radial-gradient(circle at 20% 20%, rgba(255, 137, 102, 0.24), transparent 32%), radial-gradient(circle at 80% 0%, rgba(195, 244, 214, 0.28), transparent 24%), radial-gradient(circle at 50% 100%, rgba(255, 216, 199, 0.42), transparent 36%)",
      },
    },
  },
  plugins: [],
};

export default config;
