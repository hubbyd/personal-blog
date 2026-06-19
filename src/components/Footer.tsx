import { motion } from "framer-motion";
import { Github, Mail, Heart } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f23] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
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
            <p className="text-gray-400 text-sm leading-relaxed">{t.footer.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {[t.nav.home, t.nav.about, t.nav.skills, t.nav.projects, t.nav.blog, t.nav.contact].map((link, index) => (
                <li key={index}>
                  <a
                    href={"#" + (link === t.nav.home ? "hero" : link.toLowerCase())}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
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
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/hubbyd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:rement_zhh@163.com"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
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