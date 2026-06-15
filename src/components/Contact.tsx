import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: t.contact.email, value: "zhanghehao@example.com", href: "mailto:zhanghehao@example.com" },
    { icon: Phone, label: t.contact.phone, value: "+86 138-0000-0000", href: "tel:13800000000" },
    { icon: MapPin, label: t.contact.location, value: "Xi'an, Shaanxi", href: null },
  ];

  return (<section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">{t.contact.title}</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full"/>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-bold text-white mb-6">{t.contact.sendMessage}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.contact.placeholder.name} className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors" required/>
              </div>
              <div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.contact.placeholder.email} className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors" required/>
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t.contact.placeholder.message} rows={5} className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none" required/>
              </div>
              <motion.button type="submit" className="w-full py-3 bg-gradient-primary rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/30 transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitted}>
                {isSubmitted ? (<><CheckCircle className="w-5 h-5"/>{t.contact.sentSuccess}</>) : (<><Send className="w-5 h-5"/>{t.contact.sendMessage}</>)}
              </motion.button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-bold text-white mb-6">{t.contact.contactInfo}</h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (<motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white"/>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    {item.href ? (<a href={item.href} className="text-white font-medium hover:text-primary-400 transition-colors">{item.value}</a>) : (<p className="text-white font-medium">{item.value}</p>)}
                  </div>
                </motion.div>))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 glass-card rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">{t.contact.internship}</h4>
              <p className="text-gray-400 leading-relaxed">{t.contact.internshipText}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);
}

export default Contact;
