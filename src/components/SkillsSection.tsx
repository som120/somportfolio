"use client";

import { motion } from "motion/react";
import { Card } from "./ui/card";

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "Flutter", level: 95, color: "from-blue-400 to-blue-600" },
        { name: "Figma", level: 90, color: "from-blue-500 to-blue-700" },
        { name: "Procreate", level: 88, color: "from-cyan-400 to-cyan-600" },
        {
          name: "Flutter Widgets",
          level: 75,
          color: "from-green-400 to-green-600",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Firebase", level: 90, color: "from-green-500 to-green-700" },
        { name: "Appwrite", level: 85, color: "from-yellow-400 to-yellow-600" },
        { name: "Python", level: 80, color: "from-indigo-400 to-indigo-600" },
        { name: "SQL", level: 78, color: "from-green-600 to-green-800" },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 92, color: "from-gray-400 to-gray-600" },
        {
          name: "Firebase Console",
          level: 82,
          color: "from-blue-600 to-blue-800",
        },
        { name: "AWS", level: 75, color: "from-orange-400 to-orange-600" },
        { name: "GCP", level: 70, color: "from-pink-400 to-pink-600" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Here are the technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gray-900/50 border-white/10 backdrop-blur-sm">
                <h3 className="text-xl text-white mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: categoryIndex * 0.2 + skillIndex * 0.1,
                        duration: 0.6,
                      }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          {skill.name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                            duration: 1,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl text-white mb-8">Technologies I Work With</h3>

          <div className="flex flex-wrap justify-center items-center gap-10">
            {[
              {
                name: "Flutter",
                src: "/tech/flutter.svg",
                color: "from-sky-400 to-blue-500",
              },
              {
                name: "Firebase",
                src: "/tech/firebase.svg",
                color: "from-yellow-400 to-orange-500",
              },
              {
                name: "Appwrite",
                src: "/tech/appwrite.svg",
                color: "from-pink-400 to-fuchsia-600",
              },
              {
                name: "Git",
                src: "/tech/git.svg",
                color: "from-orange-500 to-red-500",
              },
              {
                name: "Python",
                src: "/tech/python.svg",
                color: "from-blue-500 to-yellow-400",
              },
              {
                name: "Dart",
                src: "/tech/dart.svg",
                color: "from-cyan-400 to-blue-600",
              },
              {
                name: "Java",
                src: "/tech/java.svg",
                color: "from-red-500 to-orange-400",
              },
              {
                name: "Figma",
                src: "/tech/figma.svg",
                color: "from-purple-500 to-pink-500",
              },
              {
                name: "AWS",
                src: "/tech/aws.svg",
                color: "from-orange-400 to-yellow-500",
              },
              {
                name: "GCP",
                src: "/tech/gcp.svg",
                color: "from-yellow-400 via-red-400 to-sky-400",
              },
              // {
              //   name: "SQL",
              //   src: "/tech/sql.svg",
              //   color: "from-sky-500 to-blue-400",
              // },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="group relative w-20 h-20 flex items-center justify-center"
              >
                {/* Glowing circle background on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg bg-gradient-to-r ${tech.color} transition-all duration-500`}
                />
                {/* Icon itself */}
                <div className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-4 group-hover:scale-110 transition-all duration-300">
                  <img
                    src={tech.src}
                    alt={tech.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                {/* Label */}
                <span className="absolute -bottom-6 text-gray-400 text-xs mt-2 group-hover:text-white transition-all duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
