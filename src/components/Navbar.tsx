import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Mail, Globe, Sun, Moon, Home, User, Code, FolderOpen, FileText, MessageCircle, FileBadge, Clock, Trophy, Image, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Language } from "../i18n/index";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { t, lang, setLang, languageNames, availableLanguages } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    setIsLangDropdownOpen(false);
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
            <span className="text-lg sm:text-xl font-bold text-white">rement</span>
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
            
            {/* 语言切换下拉菜单 */}
            <div ref={langDropdownRef} className="relative">
              <motion.button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 glass-card rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{languageNames[lang]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </motion.button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-[#1a1a2e]/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 overflow-hidden z-50"
                  >
                    {availableLanguages.map((langCode) => (
                      <button
                        key={langCode}
                        onClick={() => handleLanguageChange(langCode)}
                        className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all ${
                          lang === langCode
                            ? "bg-primary-500/20 text-white"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="font-medium">{languageNames[langCode]}</span>
                        {lang === langCode && <Check className="w-4 h-4 text-primary-400" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
              
              {/* 移动端语言切换 */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 px-4 py-2 text-gray-400">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">语言 / Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4">
                  {availableLanguages.map((langCode) => (
                    <button
                      key={langCode}
                      onClick={() => handleLanguageChange(langCode)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                        lang === langCode
                          ? "bg-primary-500/20 text-white border border-primary-500/30"
                          : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {lang === langCode && <Check className="w-4 h-4" />}
                      <span>{languageNames[langCode]}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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