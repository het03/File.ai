"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation"; // For active link
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Toggle mobile menu
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scrolling effect
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Smooth scroll to hash on initial load
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Update active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll("section[id]");
    let currentSection: string | null = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSection = `#${section.id}`;
      }
    });

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [updateActiveSection]);

  // Set default active section to "#home" if no hash is present
  useEffect(() => {
    const hash = window.location.hash || "#home";
    setActiveSection(hash);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-sm text-base py-2 z-50">
      <nav className="max-w-[85rem] w-full mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Left side logo */}
        {loading ? (
          <>
            {/* Skeleton for logo */}
            <Skeleton className="w-24 h-8 rounded-lg" />
            {/* Skeleton for buttons */}
            <div className="flex items-center gap-x-2 sm:order-3">
              <Skeleton className="w-20 h-10 rounded-lg" />
              <Skeleton className="w-28 h-10 rounded-lg" />
            </div>
            {/* Skeleton for navigation links */}
            <div
              id="hs-navbar-alignment"
              className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
              aria-labelledby="hs-navbar-alignment-collapse"
            >
              <div className="flex flex-col sm:flex-row gap-5 mt-5 sm:mt-0 sm:ps-5 sm:items-center">
                <Skeleton className="w-16 h-6 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-lg" />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href="/">
              <span className="text-xl font-semibold focus:outline-none focus:opacity-80">
                File.ai
              </span>
            </Link>

            {/* Right side button for small screens */}
            <button
              type="button"
              className="sm:hidden relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-red-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-navbar-alignment-collapse"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls="hs-navbar-alignment"
              aria-label="Toggle navigation"
              onClick={toggleNavbar}
            >
              <span className="sr-only">Toggle</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>

            {/* Middle navigation links */}
            <div
              id="hs-navbar-alignment"
              className={`hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2 ${
                isOpen ? "block" : "hidden"
              }`}
              aria-labelledby="hs-navbar-alignment-collapse"
            >
              <div className="flex flex-col sm:flex-row gap-5 mt-5 sm:mt-0 sm:ps-5 sm:items-center px-4">
                {" "}
                {/* Added horizontal padding */}
                <Link
                  href="/#home"
                  className={`font-medium focus:outline-none ${
                    activeSection === "#home"
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-gray-400"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/#features"
                  className={`font-medium focus:outline-none ${
                    activeSection === "#features"
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-gray-400"
                  }`}
                >
                  Features
                </Link>
                <Link
                  href="/#contact"
                  className={`font-medium focus:outline-none ${
                    activeSection === "#contact"
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-gray-400"
                  }`}
                >
                  Contact
                </Link>
                {/* Buttons moved inside the collapsible section */}
                <div className="mt-5 sm:mt-0 flex flex-col sm:flex-row gap-2">
                  <Button className="rounded-lg bg-transparent text-gray-800 hover:bg-red-50 focus:outline-none active:bg-red-100">
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                  <Button className="rounded-lg bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:bg-red-500">
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
