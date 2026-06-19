import { motion } from "framer-motion";
import { Github, Mail, Heart, Home, User, Code, FolderOpen, FileText, FileBadge, Clock, Trophy, MessageCircle, Image } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/#about", icon: User },
    { name: "Skills", href: "/skills", icon: Code },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "Resume", href: "/resume", icon: FileBadge },
    { name: "Timeline", href: "/timeline", icon: Clock },
    { name: "Awards", href: "/awards", icon: Trophy },
    { name: "Contact", href: "/#contact", icon: MessageCircle },
  ];

  return (
    <footer className="bg-[#0f0f23] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white">rement</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.footer.description}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/hubbyd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:rement_zhh@163.com"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
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
            <h4 className="text-white font-semibold mb-4">{t.footer.socialMedia}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Github className="w-5 h-5" />
                <a href="https://github.com/hubbyd" className="hover:text-white transition-colors">github.com/hubbyd</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5" />
                <a href="mailto:rement_zhh@163.com" className="hover:text-white transition-colors">rement_zhh@163.com</a>
              </div>
            </div>
            <div className="mt-6 p-4 glass-card rounded-xl">
              <p className="text-gray-400 text-sm mb-2">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Available for Internship</span>
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
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            © {currentYear} rement. {t.footer.copyright} <Heart className="w-4 h-4 text-red-500" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;