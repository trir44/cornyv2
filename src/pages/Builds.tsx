import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MonitorPlay, CircuitBoard, HardDrive, Fan, Wrench } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';

const builds = [
  {
    name: "Quantum Beast",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Intel Core i9-13900K",
      "NVIDIA RTX 4080 16GB",
      "32GB DDR5 6000MHz",
      "2TB NVMe Gen4 SSD",
      "360mm AIO Cooling",
      "850W Platinum PSU"
    ],
    description: "Ultimate gaming and content creation powerhouse with top-tier components and RGB lighting."
  },
  {
    name: "Creator Pro",
    price: "$1,999",
    image: "https://images.unsplash.com/photo-1587202372162-638fa1791a43?auto=format&fit=crop&w=800&q=80",
    specs: [
      "AMD Ryzen 9 7950X",
      "NVIDIA RTX 4070 Ti",
      "64GB DDR5 5600MHz",
      "4TB NVMe Storage",
      "240mm AIO Cooling",
      "750W Gold PSU"
    ],
    description: "Optimized for content creation with massive memory and storage capacity."
  },
  {
    name: "Stealth Operator",
    price: "$1,499",
    image: "https://images.unsplash.com/photo-1587202372599-36ef6a571a4d?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Intel Core i7-13700K",
      "NVIDIA RTX 4070 12GB",
      "32GB DDR5 5200MHz",
      "1TB NVMe Gen4 SSD",
      "Air Cooling",
      "750W Gold PSU"
    ],
    description: "Minimalist design meets high performance in this sleek gaming build."
  }
];

const specIcons = {
  CPU: <Cpu className="w-5 h-5" />,
  GPU: <MonitorPlay className="w-5 h-5" />,
  RAM: <CircuitBoard className="w-5 h-5" />,
  Storage: <HardDrive className="w-5 h-5" />,
  Cooling: <Fan className="w-5 h-5" />,
  PSU: <Wrench className="w-5 h-5" />
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
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold shine-effect mb-6">Custom PC Builds</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Experience unparalleled performance with our meticulously crafted custom PC builds.
            Each system is assembled with premium components and extensive testing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builds.map((build, index) => (
            <motion.div
              key={build.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="build-card group"
            >
              <div className="relative bg-black/40 rounded-2xl overflow-hidden backdrop-blur-lg border border-purple-500/20">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={build.image} 
                    alt={build.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{build.name}</h3>
                    <span className="text-xl font-bold text-purple-400">{build.price}</span>
                  </div>
                  <p className="text-purple-100 mb-6">{build.description}</p>
                  <div className="space-y-3">
                    {build.specs.map((spec, i) => (
                      <div key={i} className="flex items-center space-x-2 text-purple-200">
                        {specIcons[Object.keys(specIcons)[i] as keyof typeof specIcons]}
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 button-hover bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium"
                    onClick={() => handleEmailClick(build.name)}
                  >
                    Email Us
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}