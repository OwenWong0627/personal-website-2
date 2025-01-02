import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            spacing: {
                "monitor-width": "1600",
                "monitor-height": "900",
            },
            letterSpacing: {
                tightest: "-.03em",
            },
            fontSize: {
                "base-plus": "2rem",
            },
            fontFamily: {
                switzer: ["Switzer", "sans-serif"],
                "custom-mono": ["Courier New", "Courier", "monospace"],
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
            keyframes: {
                typing: {
                    "0%": {
                        width: "0%",
                        visibility: "hidden",
                    },
                    "100%": {
                        width: "760px",
                    },
                },
                blink: {
                    "0%, 100%": {
                        borderColor: "white",
                    },
                    "50%": {
                        borderColor: "transparent",
                    },
                },
                "border-and-padding": {
                    "0%, 99%": {
                        borderRightWidth: "4px",
                        paddingRight: "1.25rem",
                    },
                    "100%": {
                        borderRightWidth: "0px",
                        paddingRight: "0",
                    },
                },
                twinkle: {
                    "0%": { opacity: "0.2" },
                    "100%": { opacity: "1" },
                },
                "shooting-star": {
                    "0%": {
                        transform: "scale(1) translate(0, 0)",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "scale(1.5) translate(100vh, 100vh)",
                        opacity: "0",
                    },
                },
            },
            animation: {
                typing: "typing 3s steps(30), blink .5s steps(1) 15, border-and-padding 3s steps(1) forwards",
                twinkle: "twinkle 2s infinite alternate",
                "shooting-star": "shooting-star 6s linear forwards",
            },
            transitionDuration: {
                "light-dark": "2000ms",
                "light-dark-fast": "1250ms",
            },
        },
    },
    plugins: [],
} satisfies Config;
