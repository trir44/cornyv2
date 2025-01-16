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

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold shine-effect mb-6">Get in Touch</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Have a question or want to discuss a custom build? We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20 h-full"
          >
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
                  rows={6}
                  className="w-full px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 transition-all"
                  placeholder="Tell us about your project or questions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Attachments
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
                    className="flex items-center justify-center w-full px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg cursor-pointer hover:bg-purple-800/50 transition-all"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    <span className="text-purple-200">
                      {attachments.length > 0
                        ? `${attachments.length} file(s) selected`
                        : 'Choose files'}
                    </span>
                  </label>
                </div>
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-4">Quick Contact</h2>
              <div className="flex items-center space-x-3 text-purple-200">
                <Mail className="w-5 h-5" />
                <span>support@cornysoftworks.com</span>
              </div>
            </div>

            <div className="bg-black/40 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-purple-200 mb-6">
                Join our Discord community to connect with other enthusiasts and get quick support.
              </p>
              <a
                href="https://discord.gg/your-invite-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#5865F2] text-white px-6 py-3 rounded-full font-medium hover:bg-[#4752C4] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join Discord</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}