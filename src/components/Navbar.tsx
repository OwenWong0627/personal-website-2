import React, { useState } from "react";
import AnimatedLink from "./NavbarLink";
import BackButton from "./BackButton";
import { useActiveLink } from "@/contexts/ActiveLinkContext";

const Navbar: React.FC = () => {
    const { isNavbarRetracted } = useActiveLink();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <BackButton />
            <div
                className={`absolute top-0 left-0 right-0 bg-gradient-to-r from-pastel-pink to-pastel-blue transition-all duration-700 ${
                    isNavbarRetracted && !isHovered
                        ? "-translate-y-[90%]"
                        : "translate-y-0"
                }`}
                style={{ zIndex: 2000000000 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <nav className="flex justify-around text-base-plus font-semi-bold tracking-tightest font-switzer py-6">
                    <AnimatedLink href="/about-me">About Me</AnimatedLink>
                    <AnimatedLink href="/experience">Experience</AnimatedLink>
                    <AnimatedLink href="/projects">Projects</AnimatedLink>
                    <AnimatedLink href="/resume">Resume</AnimatedLink>
                    <AnimatedLink href="/contact-me">Contact Me</AnimatedLink>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
