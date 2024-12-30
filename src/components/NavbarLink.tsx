import React, { useEffect, useRef } from "react";
import { LottieRefCurrentProps } from "lottie-react";
import DynamicLottie from "@/components/DynamicLottie";
import animationData from "../../public/lottie/LottieSharpieCirclePurple.json";
import { useActiveLink } from "../contexts/ActiveLinkContext";

interface AnimatedLinkProps {
    href: string;
    children: React.ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => {
    const { activeHref, handleLinkClick } = useActiveLink();
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const handleEnterFrame = () => {
        const currentFrame =
            lottieRef.current?.animationItem?.currentFrame || 0;
        let speed = 1;

        if (currentFrame >= 0 && currentFrame <= 15) {
            speed = 4;
        } else if (currentFrame > 15 && currentFrame <= 22) {
            speed = 2;
        } else if (currentFrame > 22 && currentFrame <= 29) {
            speed = 0.75;
        }

        lottieRef.current?.setSpeed(speed);
    };
    useEffect(() => {
        const lottieInstance = lottieRef.current;
        if (lottieInstance) {
            lottieInstance.setSpeed(1);
        }

        return () => {
            if (lottieInstance) {
                lottieInstance.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (href === activeHref) {
            setTimeout(() => {
                lottieRef.current?.play();
                lottieRef.current?.pause();
            }, 200);
        } else {
            lottieRef.current?.setDirection(-1);
            lottieRef.current?.play();
        }
    }, [activeHref, href]);

    const handleMouseEnter = () => {
        if (href !== activeHref) {
            lottieRef.current?.setDirection(1);
            lottieRef.current?.play();
        }
    };

    const handleMouseLeave = () => {
        if (href !== activeHref) {
            lottieRef.current?.setDirection(-1);
            lottieRef.current?.play();
        }
    };

    const handleClick = () => {
        if (activeHref !== href) {
            handleLinkClick(href);
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <a
                className="text-black hover:text-gray-200 transition-colors mx-5"
                style={{
                    cursor: "pointer",
                }}
            >
                {children}
            </a>
            <DynamicLottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                onEnterFrame={handleEnterFrame}
                style={{
                    position: "absolute",
                    height: 100,
                    width: "100%",
                    top: -29,
                    pointerEvents: href === activeHref ? "auto" : "none",
                }}
            />
        </div>
    );
};

export default AnimatedLink;
