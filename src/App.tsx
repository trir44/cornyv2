import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Code2, Rocket, Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ContactModal } from './components/ContactModal';
import { Navbar } from './components/Navbar';
import Builds from './pages/Builds';
import Contact from './pages/Contact';

function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const heroTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[calc(100vh-6rem)] flex items-center">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mix-blend-overlay"
          />
        </motion.div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <motion.div
                variants={heroTextVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl"
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold shine-effect mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Building the Future of Software
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-purple-100 mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  We create cutting-edge solutions that transform businesses and drive innovation. Experience the next generation of software development.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="flex gap-4"
                >
                  <motion.a
                    href="/contact"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="button-hover bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium text-lg"
                  >
                    Get Started
                  </motion.a>
                  <motion.a
                    href="/builds"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="button-hover bg-purple-900/50 text-purple-100 px-8 py-4 rounded-full font-medium text-lg border border-purple-500/30"
                  >
                    View Builds
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ scale }}
              className="md:w-1/2"
            >
              <motion.div
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="relative floating-element"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30"
                />
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
                  alt="Tech visualization" 
                  className="relative rounded-lg shadow-2xl transform transition-transform duration-500 w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 py-32"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold shine-effect text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Code2 className="h-12 w-12 text-purple-400 mb-6" />,
              title: "Clean Code",
              description: "Our development practices ensure maintainable, scalable, and efficient code bases."
            },
            {
              icon: <Rocket className="h-12 w-12 text-purple-400 mb-6" />,
              title: "Fast Delivery",
              description: "Rapid development and deployment without compromising on quality."
            },
            {
              icon: <Shield className="h-12 w-12 text-purple-400 mb-6" />,
              title: "Secure Solutions",
              description: "Enterprise-grade security built into every layer of our applications."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="tech-card relative group"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-500"
              />
              <div className="relative bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-purple-100 mb-4">{feature.title}</h3>
                <p className="text-purple-100/90 text-lg">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4"
      >
        <Navbar isScrolled={isScrolled} onContactClick={() => setIsModalOpen(true)} />
      </motion.div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builds" element={<Builds />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer */}
      <footer className="border-t border-purple-900/50">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-purple-400">© 2024 Corny Softworks. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}