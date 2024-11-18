import React, { useEffect, useState } from "react";
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
            setAnimationState((prevState) => ({
                ...prevState,
                isStopped: false,
                isPaused: true,
            }));
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
                options={defaultOptions}
                height={100}
                width="100%"
                isStopped={animationState.isStopped}
                isPaused={animationState.isPaused}
                direction={animationState.direction}
                speed={1.5}
                style={{
                    position: "absolute",
                    height: 100,
                    width: "100%",
                    top: -29,
                }}
            />
        </div>
    );
};

export default AnimatedLink;
