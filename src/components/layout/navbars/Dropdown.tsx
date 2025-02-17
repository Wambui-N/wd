"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const navLinks = [
  { path: "/story", label: "Our Story" },
  { path: "/knowledge-hub", label: "Knowledge Hub" },
];

const container = {
  hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
  show: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
  exit: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const links = {
  hidden: { y: -100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative z-50">
      <button
        onClick={toggleMenu}
        className="flex items-center font-medium capitalize text-black"
      >
        <span className="px-1">{isOpen ? "Close" : "Menu"}</span>
        <span
          className={`material-symbols-rounded transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown color="#020C12" strokeWidth={2} />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 mt-4 inline-block min-w-max rounded-2xl bg-black p-6 shadow-md`}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {navLinks.map((link, index) => (
              <div key={index} className="overflow-hidden p-0">
                <motion.div
                  className="hover:text-grey block overflow-hidden py-1 text-right text-lg font-medium capitalize text-primary"
                  variants={links}
                >
                  <Link
                    href={link.path}
                    onClick={toggleMenu}
                    className="flex flex-row items-center justify-end"
                  >
                    {pathname === link.path && (
                      <span className="">
                        <svg
                          className="h-auto w-5 px-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 70 70"
                          fill="none"
                        >
                          <circle
                            cx="35" /* X-coordinate of the center */
                            cy="35" /* Y-coordinate of the center */
                            r="10" /* Radius of the circle */
                            fill="#81c4ee"
                          />
                        </svg>
                      </span>
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              </div>
            ))}
            <Link
              href="/signup"
              className="flex flex-row gap-2 items-center justify-end py-2 text-2xl font-medium uppercase text-white"
            >
              Join the Community <ArrowUpRight size={32} color="#81c4ee" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
