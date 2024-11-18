import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            letterSpacing: {
                tightest: "-.03em",
            },
            fontSize: {
                "base-plus": "2rem",
            },
            fontFamily: {
                switzer: ["Switzer", "sans-serif"],
            },
            fontWeight: {
                "semi-bold": "600",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "pastel-pink": "#fcbad3",
                "pastel-blue": "#a7c7e7",
            },
            backgroundImage: {
                "gradient-to-r": "linear-gradient(to right, #fcbad3, #a7c7e7)",
            },
        },
    },
    plugins: [],
} satisfies Config;
