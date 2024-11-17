// components/Navbar.tsx
import Link from "next/link";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md w-full">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <Link
                    href="/about-me"
                    className="text-gray-800 hover:text-orange-500 transition duration-300"
                >
                    About Me
                </Link>
                <Link
                    href="/education"
                    className="text-gray-800 hover:text-orange-500 transition duration-300"
                >
                    Education
                </Link>
                <Link
                    href="/projects"
                    className="text-gray-800 hover:text-orange-500 transition duration-300"
                >
                    Projects
                </Link>
                <Link
                    href="/resume"
                    className="text-gray-800 hover:text-orange-500 transition duration-300"
                >
                    Resume
                </Link>
                <Link
                    href="/contact-me"
                    className="text-gray-800 hover:text-orange-500 transition duration-300"
                >
                    Contact Me
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
