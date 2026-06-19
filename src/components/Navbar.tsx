import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Mail, Globe, Sun, Moon, Home, User, Code, FolderOpen, FileText, MessageCircle, FileBadge, Clock, Trophy, Image } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang, toggleLang } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/", icon: Home },
    { name: t.nav.about, href: "/#about", icon: User },
    { name: t.nav.skills, href: "/skills", icon: Code },
    { name: t.nav.projects, href: "/projects", icon: FolderOpen },
    { name: t.nav.blog, href: "/blog", icon: FileText },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "Resume", href: "/resume", icon: FileBadge },
    { name: "Timeline", href: "/timeline", icon: Clock },
    { name: "Awards", href: "/awards", icon: Trophy },
    { name: t.nav.contact, href: "/#contact", icon: MessageCircle },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href;
    return location.pathname === href;
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#0f0f23]/90 backdrop-blur-xl shadow-2xl shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.button
            onClick={() => scrollToSection("/")}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-white">rement</span>
          </motion.button>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                <span className="flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{link.name}</span>
                </span>
                {isActive(link.href) && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              onClick={toggleLang}
              className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={lang === "zh" ? "切换到英文" : "Switch to Chinese"}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            <motion.a
              href="https://github.com/hubbyd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:rement_zhh@163.com"
              className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>

          <button
            className="lg:hidden text-white p-2 glass-card rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0f0f23]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </motion.button>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleLang}
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Globe className="w-5 h-5" />
                </button>
                <a
                  href="https://github.com/hubbyd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:rement_zhh@163.com"
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;