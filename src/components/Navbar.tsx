import AnimatedLink from "./NavbarLink";
import { ActiveLinkProvider } from "../contexts/ActiveLinkContext";

const Navbar = () => {
    return (
        <ActiveLinkProvider>
            <div className="bg-gradient-to-r from-pastel-pink to-pastel-blue py-6">
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
