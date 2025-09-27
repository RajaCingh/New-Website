import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './Gallery.css';

const builtInImages = [
  process.env.PUBLIC_URL + '/profile.jpg'
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [images, setImages] = useState(builtInImages);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('uploaded_gallery_images_v1');
      const list = raw ? JSON.parse(raw) : [];
      const uploaded = Array.isArray(list) ? list.map((it) => it.src) : [];
      if (uploaded.length > 0) {
        setImages([...uploaded, ...builtInImages]);
      }
    } catch {}
  }, []);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">A few photos and visuals</p>
        </div>

        <div className="gallery-grid">
          {images.map((src, index) => (
            <motion.button
              key={index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={src} alt={`Gallery ${index + 1}`} className="gallery-img" />
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div 
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="lightbox-content"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
                  <FaTimes />
                </button>
                <button className="lightbox-nav prev" onClick={prev} aria-label="Previous">‹</button>
                <img src={images[activeIndex]} alt="Preview" className="lightbox-img" />
                <button className="lightbox-nav next" onClick={next} aria-label="Next">›</button>
              </motion.div>
              <div className="lightbox-backdrop" onClick={closeLightbox} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;


