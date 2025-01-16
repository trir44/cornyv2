import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Code2, Rocket, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactModal } from './components/ContactModal';
import { Navbar } from './components/Navbar';
import Builds from './pages/Builds';
import Contact from './pages/Contact';

function Home() {
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

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptMC0xMmMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiM2YjIxYTgiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container mx-auto px-6 pt-32 pb-24">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold shine-effect mb-6"
              >
                Building the Future of Software
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-purple-100 mb-8"
              >
                We create cutting-edge solutions that transform businesses and drive innovation. Experience the next generation of software development.
              </motion.p>
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="inline-block button-hover bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium text-lg"
              >
                Get Started
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <div className="relative floating-element">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30"></div>
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
                  alt="Tech visualization" 
                  className="relative rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 py-24"
      >
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
              <div className="relative bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
                {feature.icon}
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-100">{feature.description}</p>
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