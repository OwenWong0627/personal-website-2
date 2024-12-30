import AnimatedLink from "./NavbarLink";
import BackButton from "./BackButton";
import { useActiveLink } from "@/contexts/ActiveLinkContext";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// interface NavbarProps {
//     controlsRef: React.RefObject<OrbitControlsImpl>;
// }

const Navbar: React.FC = () => {
    const { isNavbarRetracted } = useActiveLink();

    return (
        <>
            <BackButton />
            <div
                className={`absolute top-0 left-0 right-0 bg-gradient-to-r from-pastel-pink to-pastel-blue py-6 z-10 transition-all duration-300 ${
                    isNavbarRetracted ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <nav className="flex justify-around text-base-plus font-semi-bold tracking-tightest font-switzer">
                    <AnimatedLink href="/about-me">About Me</AnimatedLink>
                    <AnimatedLink href="/education">Education</AnimatedLink>
                    <AnimatedLink href="/projects">Projects</AnimatedLink>
                    <AnimatedLink href="/resume">Resume</AnimatedLink>
                    <AnimatedLink href="/contact-me">Contact Me</AnimatedLink>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
