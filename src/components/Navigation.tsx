"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // hamburger and close icons

export function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu after click
    }
  };

  const opacity = Math.max(1 - scrollY / 600, 0.7);
  const blur = Math.max(20 - scrollY / 35, 4);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 border-b border-white/10"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-transparent text-2xl font-medium bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-pink-400 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          &lt; SomPortfolio /&gt;
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {["home", "about", "skills", "projects", "contact"].map(
            (item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(item)}
                className="relative text-white/80 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-emerald-400 to-blue-400 transition-colors duration-300 capitalize group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300" />
              </motion.button>
            )
          )}
        </div>

        {/* Animated Hamburger → X */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="relative w-10 h-10 flex flex-col justify-center items-center group"
            whileTap={{ scale: 0.9 }}
          >
            {/* Top line */}
            <motion.span
              initial={false}
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 5 : -2, // tighter spacing
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block w-7 h-[2.5px] bg-white/80 rounded-full origin-center"
            />
            {/* Middle line */}
            <motion.span
              initial={false}
              animate={{
                opacity: menuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="block w-7 h-[2.5px] bg-white/80 rounded-full my-[3px]" // tighter gap
            />
            {/* Bottom line */}
            <motion.span
              initial={false}
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -6 : 2, // tighter spacing
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block w-7 h-[2.5px] bg-white/80 rounded-full origin-center"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4 z-40"
          >
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white/80 text-lg capitalize hover:text-emerald-400 transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
