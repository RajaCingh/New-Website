import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaCogs, FaUsers } from 'react-icons/fa';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
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

  const skills = [
    {
      icon: FaCode,
      title: 'Programming Languages',
      items: ['C#', 'JavaScript (ES6)', 'C', 'HTML5', 'CSS3']
    },
    {
      icon: FaCogs,
      title: 'Frameworks & Technologies',
      items: ['ASP.NET', 'ASP.NET Core', '.NET Framework', 'jQuery']
    },
    {
      icon: FaDatabase,
      title: 'Database Management',
      items: ['MS-SQL Server', 'MySQL', 'Database Design', 'Query Optimization']
    },
    {
      icon: FaUsers,
      title: 'Tools & Practices',
      items: ['GitHub', 'Azure DevOps']
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              I'm a passionate .NET Developer with over 2 years of experience in building 
              robust and scalable software solutions. My journey in software development 
              began during my Bachelor's in Information Technology, I developed a strong foundation in programming and system design.
            </p>
            <p className="about-description">
              Currently working as a Software Developer at 
              <a href="https://www.technables.com/" target="_blank" rel="noopener noreferrer"> Technables IT Solution Pvt. Ltd</a>,
              I specialize in .NET framework, ASP.NET, and modern web technologies. I have 
              a proven track record of delivering high-quality applications and enjoy 
              solving complex technical challenges.
            </p>
            <p className="about-description">
              When I'm not coding, I love exploring new technologies, contributing to 
              open-source projects, and sharing knowledge with the developer community. 
              I believe in continuous learning and staying updated with the latest trends 
              in software development.
            </p>
          </motion.div>

          <motion.div className="skills-grid" variants={itemVariants}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="skill-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="skill-icon">
                  <skill.icon />
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <ul className="skill-items">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="skill-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
