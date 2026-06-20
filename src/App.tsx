import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n/useTranslation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Splash from './pages/Splash'
import Login from './pages/Login'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import BlogPage from './pages/BlogPage'
import BlogDetail from './pages/BlogDetail'
import Resume from './pages/Resume'
import Timeline from './pages/Timeline'
import Awards from './pages/Awards'
import SkillsPage from './pages/SkillsPage'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'
import { useTheme } from './context/ThemeContext'

function AppContent() {
  const { theme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const isFullScreenPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]'
              : 'bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]'
          }`}
        >
          {!isFullScreenPage && <Navbar />}
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Splash />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:articleId" element={<BlogDetail />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/awards" element={<Awards />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          {!isFullScreenPage && <Footer />}
          {!isFullScreenPage && <ScrollToTop />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [basename, setBasename] = useState('/')

  useEffect(() => {
    const url = window.location.href
    if (url.includes('gitee.io')) {
      const match = url.match(/https?:\/\/[\w-]+\.gitee\.io(\/[\w-]+)?/)
      if (match && match[1]) {
        setBasename(match[1])
      }
    } else if (url.includes('github.io')) {
      const match = url.match(/https?:\/\/[\w-]+\.github\.io(\/[\w-]+)?/)
      if (match && match[1]) {
        setBasename(match[1])
      }
    }
  }, [])

  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App