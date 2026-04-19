import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button, Card, Badge } from '../../components/ui';
import { Calendar, Music, Mic2, Star, ArrowRight, X, CheckCircle2 } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 1,
    title: "Midnight Jazz Salon",
    date: "Every Friday",
    time: "21:00 Onwards",
    category: "Live Music",
    desc: "A curation of smooth jazz and experimental rhythms in our converted bungalow courtyard.",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH-H2AtP_Edmgv-ssysn1EnnmSUowuxoHkXw15BNuvRNkXO9oIQBwC5p043nVpKoXWa3b4rO8h7dz9w6XhTSCOp9w4b1sveXP0dIndlfGIpglaV3ptdo34-mzxG9SBjiQexUUVc=s2048",
    icon: Music
  },
  {
    id: 2,
    title: "The Karaoke Rebellion",
    date: "Saturdays",
    time: "20:30 Onwards",
    category: "Social",
    desc: "Unleash your inner rockstar. No judgment, just pure bohemian energy and craft cocktails.",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFzhxQKrAaC3yWcU2Md2et8fF50Gp9ycOt9qNvcG5AO4MLV8Ilzr049Lp4EJA2eVCbmVLvmFW6nISjNCR_M__DdAsWEgQmfuWdmfZLBkcopI3CjqDGsccN7lmXrCwrxfWatwXlCbU0giikc=s2048",
    icon: Mic2
  },
  {
    id: 3,
    title: "Artisanal Mixology Workshop",
    date: "Last Sunday of the Month",
    time: "16:00 - 18:00",
    category: "Workshop",
    desc: "Learn the secrets of our 'Aam Panna Kick' and other signature curations with our head mixologist.",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHElQuqHJhmBIpTxfr99zksZDsfztncD89OQ0zJ_yf3AxiHm4QJZOMWzqb_pkuEaZ_Up0PXeh1jybXspI2zhewufcXQiBp40h0s0yrsAFAz85XMeW_ERyryKht9xEfcMx-_8ric=s2048",
    icon: Star
  }
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleBookAccess = (id: number) => {
    setSelectedEvent(id);
    // Simulate API call
    setTimeout(() => {
      setSelectedEvent(null);
      alert("Guest List access requested! We will notify you shortly.");
    }, 1500);
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setShowInquiryForm(false);
    }, 3000);
  };

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6">Curation Series</Badge>
            <h1 className="text-5xl md:text-8xl font-black font-headline text-on-background leading-none tracking-tighter uppercase mb-8">
              THE SOCIAL <br /> <span className="text-primary italic">CALENDAR.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl">
              From smooth jazz to high-voltage karaoke, explore the events that define the Bohemians pulse.
            </p>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            className="shrink-0 mb-2"
            onClick={() => setShowInquiryForm(true)}
          >
            Host Your Own Event <ArrowRight size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {EVENTS_DATA.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Card variant="low" className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[16/10] overflow-hidden relative">
                   <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center text-primary border border-primary/20">
                      <event.icon size={20} />
                   </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest mb-4">
                    <Calendar size={14} />
                    {event.date} • {event.time}
                  </div>
                  <h3 className="text-3xl font-black font-headline uppercase mb-4 leading-none tracking-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-on-surface-variant mb-8 flex-1 leading-relaxed">
                    {event.desc}
                  </p>
                  <Button 
                    variant={selectedEvent === event.id ? "surface" : "ghost"}
                    className={`w-fit p-0 border-b-2 ${selectedEvent === event.id ? "border-transparent text-secondary" : "border-primary/20 hover:border-primary"} rounded-none transition-all`}
                    onClick={() => handleBookAccess(event.id)}
                    disabled={selectedEvent !== null}
                  >
                    {selectedEvent === event.id ? "Requesting Access..." : "Request Guest List Access"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Private Selection CTA */}
        <section className="mt-24 md:mt-40 bg-primary rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-24 text-on-primary relative overflow-hidden">
           <div className="max-w-3xl relative z-10">
              <h2 className="text-4xl md:text-7xl font-black font-headline uppercase leading-none tracking-tighter mb-8">
                 HOST A PRIVATE <br /> <span className="italic opacity-80">SALON.</span>
              </h2>
              <p className="text-xl opacity-90 mb-12 max-w-xl leading-relaxed">
                 From corporate rebellions to intimate celebrations, we offer curated spaces designed for the social elite.
              </p>
              <div className="flex flex-wrap gap-6">
                 <Button variant="surface" size="lg" className="text-primary font-black shadow-xl">Download Pricing</Button>
                 <Button 
                   variant="ghost" 
                   className="text-on-primary border border-on-primary/30 hover:bg-on-primary/10"
                   onClick={() => setShowInquiryForm(true)}
                 >
                   Inquire Now
                 </Button>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-25 hidden lg:block">
              <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFfMMvCOlYmXvtoGnmy0y1ambes3me5eoZILmfAAUbLyKfwV5QpLRUsWLtRw8a6avr-h4NKUf_XTNbqM6dQ5enXRR7kZp_xPF6nvBrdQ9-KFaDMLZRZe0b0KuBcXpMFOoMLRKH1=s2048" className="w-full h-full object-cover grayscale brightness-150" alt="Private Space" />
           </div>
        </section>

        {/* Inquiry Form Modal */}
        <AnimatePresence>
          {showInquiryForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowInquiryForm(false)}
                className="absolute inset-0 bg-on-background/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-surface w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-primary/10"
              >
                <button 
                  onClick={() => setShowInquiryForm(false)}
                  className="absolute top-8 right-8 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <X size={32} />
                </button>
                
                <div className="p-8 md:p-16">
                  {inquirySubmitted ? (
                    <div className="text-center py-12">
                       <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-on-secondary mx-auto mb-8">
                          <CheckCircle2 size={40} />
                       </div>
                       <h3 className="text-4xl font-black font-headline uppercase mb-4">Inquiry Received</h3>
                       <p className="text-on-surface-variant text-lg">Our events curator will reach out within 24 hours.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-4xl font-black font-headline uppercase mb-2">Host Your Salon</h3>
                      <p className="text-on-surface-variant mb-10">Tell us about your curated gathering.</p>
                      
                      <form onSubmit={handleInquiry} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Name</label>
                            <input required type="text" className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-headline font-bold" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Email</label>
                            <input required type="email" className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-headline font-bold" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Event Type</label>
                           <select className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-headline font-bold appearance-none">
                              <option>Private Celebration</option>
                              <option>Corporate Salon</option>
                              <option>Art / Music Showcase</option>
                              <option>Other</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Details</label>
                           <textarea rows={4} className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-headline font-bold" />
                        </div>
                        <Button variant="primary" size="xl" className="w-full mt-6 py-6 text-lg">Send Inquiry</Button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </CustomerLayout>
  );
};

export default Events;
