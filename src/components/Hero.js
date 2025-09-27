import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/RajaCingh',
      icon: FaGithub,
      color: '#333'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rajacingh/',
      icon: FaLinkedin,
      color: '#0077b5'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/raja.cingh?igsh=MTk3aXA3NXhrZmt6aQ==',
      icon: FaInstagram,
      color: '#E4405F'
    }
  ];

  return (
    <section id="hero" className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Hi, I'm <span className="highlight">Raja Babu Singh</span>
            </motion.h1>
            
            <motion.h2 
              className="hero-subtitle"
              variants={itemVariants}
            >
              .NET Developer & Software Engineer
            </motion.h2>
            
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              Experienced .NET Developer with a proven track record of delivering 
              high-quality software solutions. Proficient in developing robust 
              applications using .NET framework, ASP.NET, C#, and related technologies.
            </motion.p>

            <motion.div 
              className="hero-buttons"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              
              <motion.a
                href={process.env.PUBLIC_URL + '/RajaSinghCV.pdf'}
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                download="RajaSinghCV.pdf"
              >
                <FaDownload className="btn-icon" />
                View Resume
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image"
            variants={itemVariants}
          >
            <div className="image-container">
              <div className="profile-image">
                <img 
                  src={process.env.PUBLIC_URL + '/profile.jpg'} 
                  alt="Raja Babu Singh - .NET Developer"
                  className="profile-photo"
                />
              </div>
              <div className="floating-elements">
                <div className="floating-element element-1">.NET</div>
                <div className="floating-element element-2">C#</div>
                <div className="floating-element element-3">ASP.NET</div>
                <div className="floating-element element-4">SQL</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="social-links"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              style={{ '--color': link.color }}
            >
              <link.icon />
            </motion.a>
          ))}
        </motion.div>
        {/* animated particles */}
        {Array.from({ length: 14 }).map((_, idx) => {
          const left = `${Math.random() * 100}%`;
          const bottom = `${Math.random() * 40}%`;
          const delay = `${Math.random() * 8}s`;
          const duration = `${8 + Math.random() * 8}s`;
          return (
            <span
              key={idx}
              className="particle"
              style={{ left, bottom, animationDelay: delay, animationDuration: duration }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
