import { motion } from "framer-motion";
import { Camera, Image, Layers, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

function Gallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "/assets/photo.jpg",
      title: t.gallery.profilePhoto,
      category: "Personal",
      description: t.gallery.officialProfile,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.universityLife,
      category: "Campus",
      description: t.gallery.universityMoments,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.codingSession,
      category: "Work",
      description: t.gallery.workingOnAI,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.awardCeremony,
      category: "Achievement",
      description: t.gallery.sanchuangAwardCeremony,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.researchWork,
      category: "Academic",
      description: t.gallery.mlResearch,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.teamCollaboration,
      category: "Team",
      description: t.gallery.workingWithTeammates,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.conference,
      category: "Academic",
      description: t.gallery.presentingResearch,
    },
    {
      src: "/assets/photo.jpg",
      title: t.gallery.hackathon,
      category: "Competition",
      description: t.gallery.buildingInnovations,
    },
  ];

  const categories = [t.gallery.all, ...new Set(galleryImages.map((img) => img.category))];
  const [selectedCategory, setSelectedCategory] = useState(t.gallery.all);

  const filteredImages = selectedCategory === t.gallery.all
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setSelectedImage(newIndex);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium tracking-wider text-sm uppercase flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            {t.gallery.title}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4">{t.gallery.title}</h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/25"
                  : "glass-card text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:opacity-0 transition-opacity duration-300" />
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold text-sm">{image.title}</p>
                <p className="text-gray-300 text-xs">{image.category}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Image className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.gallery.noImagesCategory}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 glass-card rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Camera className="w-6 h-6 text-primary-400" />
            {t.gallery.moreComingSoon}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {t.gallery.galleryDescription}
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-3xl font-black text-gradient mb-2">8</div>
              <div className="text-gray-400 text-sm">{t.gallery.photosUploaded}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-3xl font-black text-gradient mb-2">5</div>
              <div className="text-gray-400 text-sm">{t.gallery.categories}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-3xl font-black text-gradient mb-2">2024</div>
              <div className="text-gray-400 text-sm">{t.gallery.yearStarted}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedImage !== null ? 1 : 0 }}
        className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center ${
          selectedImage !== null ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeLightbox}
      >
        {selectedImage !== null && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <h3 className="text-white font-bold text-lg">{filteredImages[selectedImage].title}</h3>
              <p className="text-gray-300 text-sm">{filteredImages[selectedImage].description}</p>
            </div>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage > 0 && (
              <button
                onClick={() => navigateImage(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {selectedImage < filteredImages.length - 1 && (
              <button
                onClick={() => navigateImage(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Gallery;
