import AnimatedLink from "./NavbarLink";
import { ActiveLinkProvider } from "../contexts/ActiveLinkContext";
import BackButton from "./BackButton";

const Navbar = () => {
    return (
        <ActiveLinkProvider>
            <BackButton />
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-pastel-pink to-pastel-blue py-6 z-10">
                <nav className="flex justify-around text-base-plus font-semi-bold tracking-tightest font-switzer">
                    <AnimatedLink href="/about-me">About Me</AnimatedLink>
                    <AnimatedLink href="/education">Education</AnimatedLink>
                    <AnimatedLink href="/projects">Projects</AnimatedLink>
                    <AnimatedLink href="/resume">Resume</AnimatedLink>
                    <AnimatedLink href="/contact-me">Contact Me</AnimatedLink>
                </nav>
            </div>
        </ActiveLinkProvider>
    );
};

export default Navbar;
