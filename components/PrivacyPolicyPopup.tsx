import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PrivacyPolicyPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-privacy-policy', handleOpen);
    return () => window.removeEventListener('open-privacy-policy', handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto no-scrollbar bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="font-display text-3xl uppercase text-white mb-6">Privacy Policy</h2>
            <div className="font-sans text-gray-400 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                <strong>Last Updated:</strong> April 2026
              </p>
              <p>
                At EVOLVIX, we prioritize your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our website and services.
              </p>
              
              <h3 className="text-white text-lg font-semibold mt-6 mb-2">1. Information We Collect</h3>
              <p>
                We may collect personal information such as your name, email address, phone number, and company details when you submit forms, contact us, or use our digital services. We also collect non-personal data such as browser type, IP address, and interaction data to improve user experience.
              </p>
              
              <h3 className="text-white text-lg font-semibold mt-6 mb-2">2. How We Use Your Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, operate, and maintain our services.</li>
                <li>To communicate with you, including responding to inquiries and sending updates.</li>
                <li>To analyze website usage and improve our offerings.</li>
                <li>To enforce our terms and comply with legal obligations.</li>
              </ul>
              
              <h3 className="text-white text-lg font-semibold mt-6 mb-2">3. Data Sharing and Security</h3>
              <p>
                We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our website or conducting our business, as long as they agree to keep this information confidential. We implement strict security measures to ensure your data is protected against unauthorized access or disclosure.
              </p>
              
              <h3 className="text-white text-lg font-semibold mt-6 mb-2">4. Your Rights</h3>
              <p>
                You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us directly.
              </p>
              
              <h3 className="text-white text-lg font-semibold mt-6 mb-2">5. Contact Us</h3>
              <p>
                If you have any questions or concerns regarding this Privacy Policy, please contact us via our website or email us at info@evolvix.ai.
              </p>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-8 bg-white/10 text-white font-display text-xl uppercase rounded-lg py-4 hover:bg-white hover:text-black transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyPopup;
