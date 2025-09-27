import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-info">
              <h3 className="footer-name">Raja Singh</h3>
              <p className="footer-description">
                .NET Developer passionate about creating innovative software solutions 
                and delivering exceptional user experiences.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-nav">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-title">Contact Info</h4>
              <div className="contact-details">
                <p>📧 er.singhraja@gmail.com</p>
                <p>📱 +977 9862940185</p>
                <p>📍 Koteshwar, Nepal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--color': social.color }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>

            <div className="footer-copyright">
              <p>
                © {currentYear} Raja Singh.<FaHeart className="heart-icon" /> All Rights Reserved
              </p>
            </div>

            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowUp />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
