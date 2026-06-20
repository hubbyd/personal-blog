import { motion } from "framer-motion";
import { Sparkles, ChevronDown, Globe, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";

function Splash() {
  const navigate = useNavigate();
  const { t, lang, setLang, languageNames, availableLanguages } = useTranslation();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);
  const [showContent, setShowContent] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-transparent to-fuchsia-500/20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-pink-500/20 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Language Switcher */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-5 h-5 text-white" />
          <span className="text-white font-medium">{languageNames[lang]}</span>
        </motion.button>

        {showLangMenu && (
          <motion.div
            className="absolute top-full right-0 mt-2 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl min-w-[160px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {availableLanguages.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setShowLangMenu(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  lang === l ? "text-fuchsia-300" : "text-white/80"
                }`}
              >
                <span>{languageNames[l]}</span>
                {lang === l && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-violet-500/40 to-purple-500/40 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-fuchsia-500/40 to-pink-500/40 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo/Icon */}
          <motion.div
            className="mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-1 shadow-2xl shadow-fuchsia-500/50">
              <div className="w-full h-full rounded-3xl bg-slate-900/90 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-fuchsia-400" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-pink-200 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            rement
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-violet-200/80 mb-2 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t.hero.subtitle.split("|")[0]}
          </motion.p>
          <motion.p
            className="text-sm md:text-base text-fuchsia-300/60 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t.hero.subtitle.split("|")[1]?.trim() || "AI Applications & Open Source Enthusiast"}
          </motion.p>

          {/* Single Enter Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={handleEnter}
              className="group relative px-12 py-5 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-white font-bold text-xl tracking-wide">
                {t.splash.enterWebsite}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-fuchsia-300/50" />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
  );
}

export default Splash;
