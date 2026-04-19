import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button, Card } from '../../components/ui';
import { Send, CheckCircle2, Star, Users, Loader2 } from 'lucide-react';

const Inquiry = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Private Dinner',
    guests: '10-20',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-8 py-20 min-h-[85vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">The Inner Circle</span>
              <h1 className="text-7xl md:text-8xl font-black font-headline text-on-background leading-none tracking-tighter mb-8 xl:text-[7.5rem]">
                CURATE <br /> <span className="text-secondary italic">MOMENTS.</span>
              </h1>
              <p className="text-on-surface-variant text-xl leading-relaxed max-w-sm font-body font-medium italic opacity-70">
                From intimate candlelit salons to high-energy catering for your tribe. Tell us your vision.
              </p>
            </div>

            <div className="space-y-8">
               <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-black uppercase text-sm tracking-widest text-on-background mb-2">Bespoke Curation</h4>
                    <p className="text-sm text-on-surface-variant opacity-60">Customized menus designed by our culinary rebels.</p>
                  </div>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-black uppercase text-sm tracking-widest text-on-background mb-2">Social Energy</h4>
                    <p className="text-sm text-on-surface-variant opacity-60">Spaces that breathe character and curated chaos.</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7"
          >
            <Card variant="high" className="p-12 md:p-16 rounded-[4rem] border border-stone-200/10 shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-3xl">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-8 relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Full Identity</label>
                          <input 
                            required
                            type="text" 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 font-headline font-bold focus:ring-2 focus:ring-primary transition-all text-on-surface" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Digital Reach</label>
                          <input 
                            required
                            type="email" 
                            placeholder="hello@collective.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 font-headline font-bold focus:ring-2 focus:ring-primary transition-all text-on-surface" 
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Inquiry Type</label>
                          <select 
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 font-headline font-bold focus:ring-2 focus:ring-primary transition-all appearance-none text-on-surface"
                          >
                             <option>Private Dinner</option>
                             <option>Catering Event</option>
                             <option>Corporate Salon</option>
                             <option>Production Shoot</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">Guest Count</label>
                          <select 
                            value={formData.guests}
                            onChange={(e) => setFormData({...formData, guests: e.target.value})}
                            className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 font-headline font-bold focus:ring-2 focus:ring-primary transition-all appearance-none text-on-surface"
                          >
                             <option>10 - 20</option>
                             <option>20 - 50</option>
                             <option>50 - 100</option>
                             <option>100+</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4">The Vision</label>
                       <textarea 
                         rows={4}
                         placeholder="Tell us about the atmosphere you wish to create..."
                         value={formData.message}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                         className="w-full bg-surface-container-low border-none rounded-3xl py-6 px-8 font-headline font-bold focus:ring-2 focus:ring-primary transition-all resize-none text-on-surface"
                       />
                    </div>

                    <Button variant="primary" size="xl" className="w-full py-6 text-xl rounded-2xl shadow-xl flex items-center justify-center gap-3" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          Processing...
                        </>
                      ) : (
                        <>
                          Transmit Vision <Send size={24} />
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black font-headline uppercase tracking-tighter mb-4 text-on-surface">Vision Received.</h3>
                      <p className="text-on-surface-variant max-w-xs font-medium opacity-60">Our curators will reach out to bring your moment to life within 24 hours.</p>
                    </div>
                    <Button variant="surface" size="lg" onClick={() => setSubmitted(false)}>Send Another</Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 rounded-full" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 blur-3xl -z-10 rounded-full" />
            </Card>
          </motion.div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Inquiry;
