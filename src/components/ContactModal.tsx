import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBuild?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, selectedBuild }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const finalMessage = selectedBuild 
      ? `Interested in: ${selectedBuild}\n\n${message}`
      : message;

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ email, message: finalMessage }]);

      if (error) throw error;

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-8 rounded-2xl w-full max-w-md mx-4 backdrop-blur-lg border border-purple-500/20"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </motion.button>
          
          <h2 className="text-2xl font-bold mb-6 shine-effect">
            {selectedBuild ? `Inquire About ${selectedBuild}` : 'Contact Us'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-purple-200 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                disabled={isSubmitting}
                rows={4}
                className="w-full px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 transition-all"
                placeholder={selectedBuild 
                  ? "Tell us about your requirements and any customizations you'd like..."
                  : "Tell us about your project..."}
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium relative overflow-hidden ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitStatus === 'success' ? (
                <span className="text-green-300">Message Sent! ✨</span>
              ) : submitStatus === 'error' ? (
                <span className="text-red-300">Error - Please try again</span>
              ) : (
                <span>Send Message</span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};