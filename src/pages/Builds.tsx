import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MonitorPlay, CircuitBoard, HardDrive, Fan, Wrench, Sparkles, Hammer } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';

const builds = [
  {
    name: "Performance Gaming Build",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&q=80",
    description: "Our most popular gaming configuration, perfect for high-FPS gaming and streaming.",
    specs: [
      "Intel Core i9-13900K",
      "NVIDIA RTX 4080 16GB",
      "32GB DDR5 6000MHz",
      "2TB NVMe Gen4 SSD",
      "360mm AIO Cooling",
      "850W Platinum PSU"
    ],
    startingPrice: "$2,499"
  },
  {
    name: "Professional Workstation",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
    description: "Optimized for content creation, 3D rendering, and professional workflows.",
    specs: [
      "AMD Ryzen 9 7950X",
      "NVIDIA RTX 4070 Ti",
      "64GB DDR5 5600MHz",
      "4TB NVMe Storage",
      "240mm AIO Cooling",
      "750W Gold PSU"
    ],
    startingPrice: "$1,999"
  }
];

const specIcons = {
  CPU: <Cpu className="spec-icon w-5 h-5" />,
  GPU: <MonitorPlay className="spec-icon w-5 h-5" />,
  RAM: <CircuitBoard className="spec-icon w-5 h-5" />,
  Storage: <HardDrive className="spec-icon w-5 h-5" />,
  Cooling: <Fan className="spec-icon w-5 h-5" />,
  PSU: <Wrench className="spec-icon w-5 h-5" />
};

export default function Builds() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedBuild, setSelectedBuild] = React.useState<string>('');

  const handleEmailClick = (buildName: string) => {
    setSelectedBuild(buildName);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24">
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedBuild={selectedBuild}
      />
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold shine-effect mb-6">Custom PC Builds</h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
            Every PC we build is tailored to your specific needs. Below are example configurations to inspire your build, 
            but we'll work with you to create the perfect system for your requirements and budget.
          </p>
        </motion.div>

        {/* Custom Build Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="process-card bg-black/40 p-6 md:p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
              <Sparkles className="process-icon w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-purple-100 mb-4">Personalized Design</h3>
              <p className="text-purple-100">
                Share your requirements and preferences, and we'll design a custom configuration that perfectly matches your needs.
              </p>
            </div>
            <div className="process-card bg-black/40 p-6 md:p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
              <Hammer className="process-icon w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-purple-100 mb-4">Expert Assembly</h3>
              <p className="text-purple-100">
                Each system is built by experienced technicians using premium components and meticulous attention to detail.
              </p>
            </div>
            <div className="process-card bg-black/40 p-6 md:p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
              <Fan className="process-icon w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-purple-100 mb-4">Extensive Testing</h3>
              <p className="text-purple-100">
                Every build undergoes comprehensive testing and benchmarking before delivery to ensure peak performance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Example Builds */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-purple-100 mb-8 text-center"
        >
          Example Configurations
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {builds.map((build, index) => (
            <motion.div
              key={build.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="build-card"
            >
              <div className="relative bg-black/40 rounded-2xl overflow-hidden backdrop-blur-lg border border-purple-500/20">
                <div className="image-container">
                  <img 
                    src={build.image} 
                    alt={build.name}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-purple-100">{build.name}</h3>
                    <span className="price text-xl font-bold text-purple-400">Starting at {build.startingPrice}</span>
                  </div>
                  <p className="text-purple-100 mb-6">{build.description}</p>
                  <div className="spec-list space-y-3">
                    {build.specs.map((spec, i) => (
                      <div key={i} className="spec-item flex items-center space-x-3 text-purple-200">
                        {specIcons[Object.keys(specIcons)[i] as keyof typeof specIcons]}
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 button-hover bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium text-lg"
                    onClick={() => handleEmailClick(build.name)}
                  >
                    Customize & Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-purple-100 mb-8">
            Don't see exactly what you're looking for? Let's create your dream build together.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button-hover bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium text-lg"
            onClick={() => handleEmailClick("Custom Build")}
          >
            Start Your Custom Build
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}