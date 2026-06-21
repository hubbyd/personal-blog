import { motion } from "framer-motion";
import { Download, Mail, MapPin, Github, Calendar, Award, BookOpen, Briefcase } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Resume() {
  const { t } = useTranslation();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const experiences = [
    {
      period: "2024 - Present",
      title: t.resume.softwareEngineeringStudent,
      company: t.resume.xiAnUniversity,
      description: t.resume.pursuingDegree,
    },
    {
      period: "2024",
      title: t.resume.researchAssistant,
      company: t.resume.academicResearchLab,
      description: t.resume.conductedResearch,
    },
  ];

  const education = [
    {
      period: "2024 - 2028 (Expected)",
      title: t.resume.bachelorEngineering,
      school: t.resume.xiAnUniversity,
      major: t.resume.softwareEngineering,
      gpa: "3.5/4.0",
    },
  ];

  const certificates = [
    { name: t.resume.awsCloudPractitioner, issuer: "Amazon Web Services", year: "2024" },
    { name: t.resume.reactDeveloperCertification, issuer: t.resume.meta, year: "2024" },
    { name: t.resume.machineLearningSpecialization, issuer: t.resume.stanfordOnline, year: "2024" },
  ];

  const handleDownloadPdf = async () => {
    if (!resumeRef.current || isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f0f1a",
        logging: false,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume-rement.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF下载失败，请重试");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24"
    >
      <div ref={resumeRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.resume.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{t.resume.subtitle}</p>
          <motion.button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all ${
              isDownloading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-primary hover:opacity-90"
            }`}
            whileHover={!isDownloading ? { scale: 1.05 } : {}}
            whileTap={!isDownloading ? { scale: 0.95 } : {}}
          >
            {isDownloading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isDownloading ? t.resume.downloading : t.resume.downloadPdf}
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-8 sticky top-24">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-500">
                  <img src="/assets/photo.jpg" alt="rement" className="w-full h-full object-cover" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">rement</h2>
              <p className="text-primary-400 text-center mb-6">{t.resume.fullstackDeveloper}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">rement_zhh@163.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{t.contact.locationValue}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Github className="w-5 h-5 flex-shrink-0" />
                  <a href="https://github.com/hubbyd" className="text-sm hover:text-white transition-colors">github.com/hubbyd</a>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t.resume.skills}</h3>
                <div className="space-y-3">
                  {["React", "TypeScript", "Node.js", "Python", "AI/ML"].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{skill}</span>
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-primary rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-primary-400" />
                <h3 className="text-2xl font-bold text-white">{t.resume.experience}</h3>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary-500/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full" />
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{exp.title}</h4>
                    <p className="text-primary-400 text-sm mb-2">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary-400" />
                <h3 className="text-2xl font-bold text-white">{t.resume.education}</h3>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-accent-500/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-accent-500 rounded-full" />
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{edu.title}</h4>
                    <p className="text-accent-400 text-sm mb-1">{edu.school}</p>
                    <p className="text-gray-400 text-sm">{t.about.achievements.major}: {edu.major}</p>
                    <p className="text-gray-400 text-sm">{t.resume.gpa}: {edu.gpa}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary-400" />
                <h3 className="text-2xl font-bold text-white">{t.resume.certificates}</h3>
              </div>
              <div className="grid gap-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium mb-1">{cert.name}</h4>
                      <p className="text-gray-500 text-sm">{cert.issuer}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Resume;