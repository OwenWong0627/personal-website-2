import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/LottieSharpieCirclePurple.json";
import { useActiveLink } from "../contexts/ActiveLinkContext";

interface AnimatedLinkProps {
    href: string;
    children: React.ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => {
    const { activeHref, setActiveHref } = useActiveLink();
    const animRef = useRef<any>(null);

    useEffect(() => {
        const anim = animRef.current?.anim;
        if (anim) {
            const handleEnterFrame = () => {
                const currentFrame = anim.currentFrame;
                let speed = 1;

                if (currentFrame >= 0 && currentFrame <= 15) {
                    speed = 4;
                } else if (currentFrame > 15 && currentFrame <= 22) {
                    speed = 2;
                } else if (currentFrame > 22 && currentFrame <= 29) {
                    speed = 0.75;
                }

                anim.setSpeed(speed);
                // console.log("Current Frame:", currentFrame, "Speed:", speed);
            };

            anim.addEventListener("enterFrame", handleEnterFrame);

            return () => {
                anim.removeEventListener("enterFrame", handleEnterFrame);
            };
        }
    }, []);

    const [animationState, setAnimationState] = useState({
        isStopped: true,
        isPaused: false,
        direction: 1,
        isHovered: false,
    });

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
        },
    };

    useEffect(() => {
        if (href === activeHref) {
            setTimeout(() => {
                setAnimationState((prevState) => ({
                    ...prevState,
                    isStopped: false,
                    isPaused: true,
                }));
            }, 200);
        } else {
            setAnimationState((prevState) => ({
                ...prevState,
                isStopped: false,
                isPaused: false,
                direction: -1,
            }));
        }
    }, [activeHref, href]);

    const handleMouseEnter = () => {
        if (href !== activeHref) {
            setAnimationState((prevState) => ({
                ...prevState,
                isStopped: false,
                isPaused: false,
                direction: 1,
            }));
        }
    };

    const handleMouseLeave = () => {
        if (href !== activeHref) {
            setAnimationState((prevState) => ({
                ...prevState,
                isPaused: false,
                direction: -1,
            }));
        }
    };

    const handleClick = () => {
        if (activeHref !== href) {
            setActiveHref(href);
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <Link
                href={href}
                className="text-black hover:text-gray-200 transition-colors mx-5"
            >
                {children}
            </Link>
            <Lottie
                ref={animRef}
                options={defaultOptions}
                height={100}
                width="100%"
                isStopped={animationState.isStopped}
                isPaused={animationState.isPaused}
                direction={animationState.direction}
                style={{
                    position: "absolute",
                    height: 100,
                    width: "100%",
                    top: -29,
                    // pointerEvents: href === activeHref ? "auto" : "none",
                    cursor: href === activeHref ? "default" : "pointer",
                }}
            />
        </div>
    );
};

export default AnimatedLink;
