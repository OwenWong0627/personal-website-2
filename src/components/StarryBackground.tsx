import React, { useEffect, useRef } from "react";

const StarryBackground: React.FC = () => {
    const starFieldRef = useRef<HTMLDivElement>(null);
    const shootingStarsRef = useRef<HTMLDivElement>(null);

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

        const createShootingStars = () => {
            const shootingStarsContainer = shootingStarsRef.current;
            if (!shootingStarsContainer) return;

            const createShootingStar = () => {
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

            // Create multiple shooting stars
            const shootingStarCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < shootingStarCount; i++) {
                createShootingStar();
            }

            // Set interval to generate new shooting stars periodically
            setInterval(createShootingStar, Math.random() * 4000 + 3000);
        };

        createStars();
        createShootingStars();
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
