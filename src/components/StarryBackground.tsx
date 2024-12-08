import React, { useEffect, useRef } from "react";

const StarryBackground: React.FC = () => {
    const starFieldRef = useRef<HTMLDivElement>(null);
    const shootingStarsRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const createStars = () => {
            const starField = starFieldRef.current;
            if (!starField) return;

            const starCount = 500;
            starField.innerHTML = ""; // Clear previous stars

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement("div");
                star.classList.add(
                    "absolute",
                    "bg-white",
                    "rounded-full",
                    "animate-twinkle"
                );

                star.style.width = `${Math.random() * 3}px`;
                star.style.height = star.style.width;
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.opacity = "0.5";
                star.style.animationDelay = `${Math.random() * 2}s`;

                starField.appendChild(star);
            }
        };

        const createShootingStar = () => {
            const shootingStarsContainer = shootingStarsRef.current;
            if (!shootingStarsContainer) return;

            const star = document.createElement("div");
            star.classList.add(
                "absolute",
                "bg-white",
                "rounded-full",
                "animate-shooting-star"
            );

            const startTop = Math.random() * 30;
            const startLeft = Math.random() * 60;

            if (Math.random() < 0.5) {
                star.style.top = `${startTop}%`;
                star.style.left = "0";
            } else {
                star.style.top = "0";
                star.style.left = `${startLeft}%`;
            }

            const size = Math.random() * 3 + 5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            const duration = Math.random() * 2 + 2;
            star.style.animationDuration = `${duration}s`;

            const delay = Math.random() * 5;
            star.style.animationDelay = `-${delay}s`;

            shootingStarsContainer.appendChild(star);
        };

        const startShootingStars = () => {
            const shootingStarCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < shootingStarCount; i++) {
                createShootingStar();
            }
            intervalRef.current = setInterval(() => {
                createShootingStar();
            }, Math.random() * 1000 + 2000);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            } else {
                startShootingStars();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        createStars();
        startShootingStars();

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <>
            <div
                ref={starFieldRef}
                className="fixed inset-0 bg-gradient-to-b from-black via-[#000033] to-[#000066] pointer-events-none z-[-1]"
            />
            <div
                ref={shootingStarsRef}
                className="fixed inset-0 pointer-events-none z-[-1]"
            />
        </>
    );
};

export default StarryBackground;
