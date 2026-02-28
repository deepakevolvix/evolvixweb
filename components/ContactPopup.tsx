import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-contact-popup', handleOpen);
    return () => window.removeEventListener('open-contact-popup', handleOpen);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, service, email, contact } = formData;

    const message = `I am interested!\nThis is my details\nName: ${name}\nService of Interest: ${service || 'Not Specified'}\nEmail: ${email}\nContact: ${contact}`;
    
    // Encode the message for the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '971585745334';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Optionally close the popup after submission
    setIsOpen(false);
    setFormData({ name: '', service: '', email: '', contact: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="font-display text-3xl uppercase text-white mb-2">Contact Us</h2>
            <p className="font-sans text-gray-400 text-sm mb-6">
              Fill in your details below and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 font-sans focus:outline-none focus:border-primary transition-colors"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange as any}
                required
                className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans focus:outline-none focus:border-primary transition-colors appearance-none ${formData.service ? 'text-white' : 'text-gray-500'}`}
              >
                <option value="" disabled className="text-gray-500 bg-black">Select Type of Service</option>
                <option value="AI Automation & SAAS Software" className="text-white bg-black">AI Automation & SAAS Software</option>
                <option value="Digital Marketing" className="text-white bg-black">Digital Marketing</option>
                <option value="Website & E-Commerce" className="text-white bg-black">Website & E-Commerce</option>
                <option value="UI/UX Design & Branding" className="text-white bg-black">UI/UX Design & Branding</option>
                <option value="Custom Software, ERP & CRM" className="text-white bg-black">Custom Software, ERP & CRM</option>
                <option value="IT Support & Cyber Security" className="text-white bg-black">IT Support & Cyber Security</option>
              </select>
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 font-sans focus:outline-none focus:border-primary transition-colors"
              />

              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 font-sans focus:outline-none focus:border-primary transition-colors"
              />

              <button
                type="submit"
                className="w-full mt-2 bg-primary text-black font-display text-xl uppercase rounded-lg py-4 hover:bg-white transition-colors"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
