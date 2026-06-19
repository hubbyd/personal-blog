import { motion } from "framer-motion";
import { Calendar, Trophy, BookOpen, Code, Rocket, Star } from "lucide-react";

function Timeline() {

  const timeline = [
    {
      date: "2024",
      title: "Started University",
      description: "Began Software Engineering studies at Xi'an University of Finance and Economics",
      icon: BookOpen,
      color: "primary",
      image: "/assets/photo.jpg",
    },
    {
      date: "2024",
      title: "First Academic Paper",
      description: "Published first research paper on AI and machine learning in a core journal",
      icon: Code,
      color: "accent",
      image: "/assets/photo.jpg",
    },
    {
      date: "2024",
      title: "Competition Awards",
      description: "Won multiple awards including 三创赛一等奖, 计算机设计大赛西北赛区三等奖",
      icon: Trophy,
      color: "primary",
      image: "/assets/photo.jpg",
    },
    {
      date: "2025",
      title: "Full-stack Development",
      description: "Mastered React, Vue, TypeScript and started building AI-powered applications",
      icon: Rocket,
      color: "accent",
      image: "/assets/photo.jpg",
    },
    {
      date: "2025",
      title: "Second Academic Paper",
      description: "Published second research paper on malware classification using deep learning",
      icon: Star,
      color: "primary",
      image: "/assets/photo.jpg",
    },
    {
      date: "2025",
      title: "Seeking Internship",
      description: "Actively looking for summer frontend/full-stack internship opportunities",
      icon: Rocket,
      color: "accent",
      image: "/assets/photo.jpg",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Timeline</h1>
          <p className="text-gray-400 text-lg">My Journey So Far</p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 rounded-full" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 justify-start">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.color === "primary" 
                      ? "bg-gradient-primary" 
                      : "bg-gradient-to-br from-accent-500 to-primary-500"
                  } shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Timeline;