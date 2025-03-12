import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Upload, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ email, message }]);

      if (error) throw error;

      setSubmitStatus('success');
      e.currentTarget.reset();
      setTimeout(() => {
        setSubmitStatus('idle');
        setAttachments([]);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold shine-effect mb-6">Let's Create Something Amazing</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Whether you're dreaming of a custom PC build or have questions about our services,
            we're here to turn your vision into reality. Reach out and let's start the conversation.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20 h-full transform hover:scale-[1.02] transition-transform duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-lg font-medium text-purple-200 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 transition-all"
                  placeholder="you@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-lg font-medium text-purple-200 mb-2">
                  Tell Us About Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 transition-all"
                  placeholder="Share your ideas, requirements, or questions. We're excited to hear from you!"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-lg font-medium text-purple-200 mb-2">
                  Add Files
                </label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg cursor-pointer hover:bg-purple-800/50 transition-all group"
                  >
                    <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-200">
                      {attachments.length > 0
                        ? `${attachments.length} file${attachments.length === 1 ? '' : 's'} selected`
                        : 'Attach reference images or documents'}
                    </span>
                  </label>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-full font-medium relative overflow-hidden ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitStatus === 'success' ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-300 flex items-center justify-center"
                  >
                    Message Sent Successfully! ✨
                  </motion.span>
                ) : submitStatus === 'error' ? (
                  <span className="text-red-300">Error - Please try again</span>
                ) : (
                  <span className="flex items-center justify-center">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20 transform hover:scale-[1.02] transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 shine-effect">Direct Contact</h2>
              <div className="flex items-center space-x-3 text-purple-200">
                <Mail className="w-6 h-6 text-purple-400" />
                <span className="text-lg">support@cornysoftworks.com</span>
              </div>
              <p className="mt-4 text-purple-200">
                We aim to respond to all inquiries within 24 hours during business days.
                For urgent matters, please include "Urgent" in your subject line.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20 transform hover:scale-[1.02] transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 shine-effect">Join Our Community</h2>
              <p className="text-purple-200 mb-6">
                Connect with fellow enthusiasts, get real-time support, and stay updated on our latest builds
                and tech discussions. Our Discord community is the perfect place to share your passion for PC building.
              </p>
              <motion.a
                href="https://discord.gg/your-invite-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#5865F2] text-white px-6 py-3 rounded-full font-medium hover:bg-[#4752C4] transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Join Our Discord</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}