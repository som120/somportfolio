"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import HyperspeedBackground from "./Hyperspeed";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-14 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HyperspeedBackground />
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-gray-900/40 to-black/70" />
      </div>

      <div className="flex flex-col items-center justify-center text-center grow relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-400 text-lg tracking-wider"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl text-white mb-6"
          >
            Somnath Paul
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-4xl text-gray-300 mb-8"
          >
            I'm an{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-400">
              App Developer
            </span>{" "}
            specializing in{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
              Modern Mobile Applications
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
          >
            I craft seamless mobile experiences using Flutter and Dart.
            Passionate about elegant UI, smooth performance, and transforming
            creative ideas into powerful cross-platform apps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              onClick={scrollToProjects}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </Button>

            <div className="flex items-center space-x-4">
              {[
                { icon: Github, href: "https://github.com/som120" },
                { icon: Linkedin, href: "https://linkedin.com/in/somnath03" },
                { icon: Mail, href: "mailto:raxalpha36gmail.com" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:text-emerald-400 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        onClick={scrollToAbout}
      >
        <motion.div className="flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-emerald-400 transition-colors duration-300">
          <span className="text-xs tracking-widest">Scroll to Explore</span>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full relative"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-emerald-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
