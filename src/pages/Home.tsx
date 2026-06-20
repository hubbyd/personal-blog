import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import StatisticsDashboard from "../components/StatisticsDashboard";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <StatisticsDashboard />
        </div>
      </section>
    </motion.div>
  );
}

export default Home;