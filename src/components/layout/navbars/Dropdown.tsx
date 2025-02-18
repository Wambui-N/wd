// components/navigation/DropDown.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const navLinks = [
  { path: "/story", label: "Our Story" },
 ];

const menuVariants = {
  initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
  animate: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const linkVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-full px-3 py-2 font-medium text-black hover:bg-gray-100 transition-colors"
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-64 rounded-xl bg-black p-6 shadow-lg"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="space-y-4">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={linkVariants} className="text-right">
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-end gap-2 text-lg font-medium text-white"
                  >
                    {pathname === link.path && (
                      <div className=" rounded-full bg-blue-400" />
                    )}
                    <span className="group-hover:text-blue-400 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={linkVariants} className="pt-4 text-right">
                <Link
                  href="/authentication"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-end gap-2 text-xl font-medium text-white"
                >
                  <span className="group-hover:text-blue-400 transition-colors">
                    Join the Community
                  </span>
                  <ArrowUpRight
                    className="text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    size={24}
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
