import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "AI Automation & SaaS Software",
    headline: "Your Business on Autopilot. Seriously.",
    description: "Stop burning time on repetitive tasks. Evolvix builds custom AI automation solutions, from intelligent admin agents to multi-channel marketing bots, that execute complex workflows at machine speed, with human-level precision.",
    features: ["AI Admin Agents", "WhatsApp Smart Marketing", "SaaS Platform Development", "Chatbot Development"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop", // Abstract AI
    cta: "Automate My Business",
    tags: ["AI Automation", "Chatbots", "SaaS"]
  },
  {
    id: "02",
    title: "Digital Marketing",
    headline: "Stop Guessing. Start Growing.",
    description: "Data is the new currency. Evolvix runs performance-obsessed digital marketing campaigns across every platform that matters, turning impressions into leads, and leads into loyal customers.",
    features: ["SEO & Content Strategy", "Performance Marketing", "Social Media Marketing", "Lead Generation"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Data/Marketing
    cta: "Scale My Marketing",
    tags: ["SEO", "Ads", "Growth"]
  },
  {
    id: "03",
    title: "Website & E-Commerce",
    headline: "Websites That Don't Just Look Good — They Convert.",
    description: "Your website is your most powerful sales tool. Evolvix designs and develops blazing-fast, mobile-first, conversion-optimized websites that make your brand impossible to ignore.",
    features: ["Custom Website Development", "E-Commerce Stores", "Shopify Experts", "Landing Page Design"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop", // Web Design
    cta: "Build My Website",
    tags: ["Web Design", "Shopify", "Development"]
  },
  {
    id: "04",
    title: "UI/UX Design & Branding",
    headline: "Design That Speaks Before You Do.",
    description: "In the digital world, design is trust. Evolvix crafts visually stunning, intuitively structured digital experiences that captivate users from the first pixel, and keep them coming back.",
    features: ["UI/UX Design", "Brand Identity", "Motion Design", "3D Visualization"],
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2670&auto=format&fit=crop", // UI/UX Wireframing
    cta: "Design My Brand",
    tags: ["UI/UX", "Branding", "3D"]
  },
  {
    id: "05",
    title: "Custom Software, ERP & CRM",
    headline: "Software Engineered for the Way You Work.",
    description: "Off-the-shelf software fits nobody perfectly. Evolvix builds custom enterprise solutions, from ERP systems that unify your entire operation to CRM platforms that turn every interaction into an opportunity.",
    features: ["Custom Software", "ERP Platforms", "CRM Systems", "API Integration"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", // Code/Tech
    cta: "Build My Software",
    tags: ["Software", "ERP", "CRM"]
  },
  {
    id: "06",
    title: "IT Support & Cyber Security",
    headline: "Technology That Works. Security That Protects.",
    description: "Your business runs on technology. Evolvix ensures it never stops, with enterprise IT support, proactive monitoring, and world-class cybersecurity defenses.",
    features: ["Managed IT Support", "Cyber Security", "Network Management", "Cloud Migration"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop", // Security/Server
    cta: "Secure My Business",
    tags: ["IT Support", "Security", "Cloud"]
  }
];

const ServicesShowcase: React.FC = () => {
  return (
    <section id="work" className="relative w-full bg-gray-50 z-20">
      
      {/* Section Title */}
      <div className="py-20 px-6 md:px-16 bg-white">
         <h2 className="text-6xl md:text-9xl font-display font-semibold uppercase leading-[0.85] text-center">
            Everything Your <br/> Business Needs <br/> <span className="text-primary">To Dominate.</span>
         </h2>
      </div>

      {/* Services List */}
      <div className="flex flex-col">
        {services.map((service, index) => (
          <div key={service.id} className="min-h-screen sticky top-0 bg-white border-t border-gray-100 flex items-center overflow-hidden">
             
             <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 md:gap-20 py-20">
                
                {/* Content */}
                <div className="w-full md:w-1/2 order-2 md:order-1">
                   <div className="flex items-center gap-4 mb-6">
                      <span className="font-display text-4xl text-primary/50">{service.id}</span>
                      <h3 className="font-display text-3xl md:text-4xl text-black uppercase tracking-wide">{service.title}</h3>
                   </div>
                   
                   <h4 className="font-sans text-xl md:text-2xl font-bold text-black mb-6 leading-tight">
                      "{service.headline}"
                   </h4>
                   
                   <p className="font-sans text-gray-600 text-lg leading-relaxed mb-8">
                      {service.description}
                   </p>

                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-800 uppercase tracking-widest">
                           <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                           {feature}
                        </li>
                      ))}
                   </ul>

                   <button className="group relative overflow-hidden bg-black text-white font-display text-xl uppercase px-8 py-3 rounded-lg hover:bg-primary transition-colors duration-300">
                      <span className="relative z-10 flex items-center gap-2">
                         {service.cta} 
                         <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                   </button>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 order-1 md:order-2 h-[40vh] md:h-[60vh] relative rounded-2xl overflow-hidden shadow-2xl">
                   <img 
                     src={service.image} 
                     alt={service.title} 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-primary/10" />
                   
                   {/* Tags overlay */}
                   <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {service.tags.map((tag, t) => (
                         <span key={t} className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                            {tag}
                         </span>
                      ))}
                   </div>
                </div>

             </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default ServicesShowcase;
