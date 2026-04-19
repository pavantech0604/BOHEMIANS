import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button } from '../../components/ui';
import { Calendar, Users, ArrowRight, CheckCircle2, ChevronLeft, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const Reservations = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guests: '2',
    date: '',
    time: '',
    name: '',
    email: '',
    note: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error: submitError } = await supabase
      .from('reservations')
      .insert([{
        customer_name: formData.name,
        email: formData.email,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        note: formData.note,
        status: 'pending'
      }]);

    setLoading(false);
    if (!submitError) {
      nextStep();
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-8 py-20 min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-primary font-headline font-black uppercase tracking-widest text-sm mb-4 block">
            Table Booking
          </span>
          <h1 className="text-5xl md:text-8xl font-black font-headline text-on-background mb-8 leading-none">
            RESERVE YOUR <span className="text-secondary italic">SPACE.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-primary/10 shadow-2xl"
                >
                  <h3 className="text-3xl font-black font-headline uppercase mb-10 tracking-tight">Step 01: Select Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60">Guests</label>
                      <div className="flex flex-wrap gap-3">
                        {['1', '2', '4', '6', '8+'].map(n => (
                          <button
                            key={n}
                            onClick={() => setFormData({...formData, guests: n})}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-headline font-black transition-all ${formData.guests === n ? 'bg-primary text-on-primary scale-110' : 'bg-surface-container hover:bg-surface-container-highest'}`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60">Date</label>
                      <input 
                        type="date" 
                        required
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-surface-container border-none rounded-2xl py-5 px-6 font-headline font-bold text-lg focus:ring-2 focus:ring-primary h-[56px]" 
                      />
                    </div>
                  </div>

                  <div className="mt-12 space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60">Preferred Time</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'].map(time => (
                        <button 
                          key={time} 
                          onClick={() => setFormData({...formData, time})}
                          className={`py-4 px-4 rounded-xl font-headline font-bold text-xs md:text-sm transition-all ${formData.time === time ? 'bg-secondary text-on-secondary scale-105' : 'bg-surface-container hover:bg-surface-container-highest'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    disabled={!formData.date || !formData.time}
                    variant="primary" 
                    size="xl" 
                    className="w-full mt-12 py-6 text-xl"
                    onClick={nextStep}
                  >
                    Continue <ArrowRight size={24} className="ml-2" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-primary/10 shadow-2xl"
                >
                  <button onClick={prevStep} className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-8 hover:-translate-x-2 transition-transform">
                    <ChevronLeft size={16} /> Back to details
                  </button>
                  <h3 className="text-3xl font-black font-headline uppercase mb-10 tracking-tight">Step 02: Contact Information</h3>
                  
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60">Full Name</label>
                       <input 
                         type="text" 
                         required
                         placeholder="John Doe"
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-surface-container border-none rounded-2xl py-5 px-6 font-headline font-bold focus:ring-2 focus:ring-primary" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60">Email Address</label>
                       <input 
                         type="email" 
                         required
                         placeholder="john@example.com"
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         className="w-full bg-surface-container border-none rounded-2xl py-5 px-6 font-headline font-bold focus:ring-2 focus:ring-primary" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60">Special Notes (Optional)</label>
                       <textarea 
                         rows={3}
                         placeholder="Anniversary, allergy info, etc..."
                         onChange={(e) => setFormData({...formData, note: e.target.value})}
                         className="w-full bg-surface-container border-none rounded-2xl py-5 px-6 font-headline font-bold focus:ring-2 focus:ring-primary" 
                       />
                    </div>
                    <Button variant="primary" size="xl" className="w-full mt-8 py-6 text-xl" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin" size={24} /> : <>Confirm Reservation <CheckCircle2 size={24} className="ml-2" /></>}
                    </Button>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] text-on-primary text-center shadow-[0_40px_100px_rgba(180,0,101,0.3)] relative overflow-hidden"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                    className="w-24 h-24 bg-on-primary rounded-full flex items-center justify-center text-primary mx-auto mb-8"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl font-black font-headline uppercase leading-none tracking-tighter mb-6">Reservation <br /> <span className="italic opacity-80">Confirmed.</span></h2>
                  <p className="text-xl opacity-90 mb-12 max-w-md mx-auto">
                    Check your email for the digital invitation. We can't wait to have you in the salon, {formData.name.split(' ')[0]}.
                  </p>
                  
                  <div className="bg-on-primary/10 rounded-2xl p-6 text-left border border-white/20 inline-block mb-12 w-full max-w-sm">
                    <div className="flex items-start gap-4 mb-4">
                       <Calendar className="mt-1 opacity-60" size={20} />
                       <div>
                          <p className="text-xs uppercase font-black tracking-widest opacity-60">Date & Time</p>
                          <p className="font-headline font-bold text-lg">{new Date(formData.date).toLocaleDateString('en-GB')} at {formData.time}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <MapPin className="mt-1 opacity-60" size={20} />
                       <div>
                          <p className="text-xs uppercase font-black tracking-widest opacity-60">Location</p>
                          <p className="font-headline font-bold text-lg">Bohemians, Indiranagar</p>
                       </div>
                    </div>
                  </div>

                  <Button 
                    variant="surface" 
                    size="lg" 
                    className="w-full py-4 text-primary font-black"
                    onClick={() => window.location.href = '/'}
                  >
                    Return to Home
                  </Button>

                  {/* Decorative element */}
                  <div className="absolute -bottom-10 -right-10 opacity-20">
                     <Users size={300} strokeWidth={1} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 hidden lg:block relative">
             <div className="sticky top-32">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 relative">
                   <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAH-H2AtP_Edmgv-ssysn1EnnmSUowuxoHkXw15BNuvRNkXO9oIQBwC5p043nVpKoXWa3b4rO8h7dz9w6XhTSCOp9w4b1sveXP0dIndlfGIpglaV3ptdo34-mzxG9SBjiQexUUVc=s2048" className="w-full h-full object-cover" alt="Ambience" />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -left-8 p-10 bg-secondary text-on-secondary rounded-[2.5rem] -rotate-3 max-w-sm shadow-2xl border-4 border-surface">
                   <h4 className="font-headline font-black uppercase text-2xl mb-3 tracking-tight space-y-2">
                     <span className="block">The Haute</span>
                     <span className="block italic text-secondary-fixed">Selection.</span>
                   </h4>
                   <p className="text-sm opacity-80 leading-relaxed font-medium">As a converted bungalow, every seat in Bohemians has its own story. From the Gold Salon to the Courtyard, we curate your experience based on your mood.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Reservations;
