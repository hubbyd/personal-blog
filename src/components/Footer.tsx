import { motion } from "framer-motion";
import { Github, Mail, Heart, User, Code, FolderOpen, FileText, FileBadge, Clock, Trophy, MessageCircle, Image } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t.nav.about, href: "/#about", icon: User },
    { name: t.nav.skills, href: "/skills", icon: Code },
    { name: t.nav.projects, href: "/projects", icon: FolderOpen },
    { name: t.nav.blog, href: "/blog", icon: FileText },
    { name: t.nav.gallery, href: "/gallery", icon: Image },
    { name: t.nav.resume, href: "/resume", icon: FileBadge },
    { name: t.nav.timeline, href: "/timeline", icon: Clock },
    { name: t.nav.awards, href: "/awards", icon: Trophy },
    { name: t.nav.contact, href: "/#contact", icon: MessageCircle },
  ];

  return (
    <footer className="bg-[#0f0f23] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                  <path d="M8 8 L8 24 M8 16 L16 16 M16 8 L16 24 M16 11 L24 11 M16 21 L24 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">rement</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{t.footer.description}</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://github.com/hubbyd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="mailto:rement_zhh@163.com"
                className="w-8 h-8 sm:w-10 sm:h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.quickLinks}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.socialMedia}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <a href="https://github.com/hubbyd" className="hover:text-white transition-colors">github.com/hubbyd</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <a href="mailto:rement_zhh@163.com" className="hover:text-white transition-colors">rement_zhh@163.com</a>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 glass-card rounded-xl">
              <p className="text-gray-400 text-xs sm:text-sm mb-2">{t.footer.status}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-xs sm:text-sm font-medium">{t.footer.available}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-2">
            © {currentYear} rement. {t.footer.copyright} <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;