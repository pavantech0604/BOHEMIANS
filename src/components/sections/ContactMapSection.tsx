import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui';
import { Send, CheckCircle2, MapPin, Phone, Star } from 'lucide-react';

export const ContactMapSection = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormState('success');
        setTimeout(() => {
            setFormState('idle');
            setFormData({ name: '', email: '', message: '' });
        }, 5000);
    };

    return (
        <section id="contact-section" className="py-12 md:py-16 bg-surface relative overflow-hidden border-t border-primary/20">
            <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center">

                {/* 1. Global Centered Header: Inquiry Branding - Compressed Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center w-full mb-8 md:mb-12"
                >
                    <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-2 block w-full text-center opacity-60">Inquiry</span>

                    <div className="w-full flex flex-col items-center gap-0">
                        <img
                            src="/src/assets/logo-magenta.png"
                            alt="Bohemians"
                            className="h-20 md:h-32 lg:h-40 w-auto object-contain brightness-110 contrast-125"
                            style={{ imageRendering: 'crisp-edges' }}
                        />
                        <h2 className="text-3xl md:text-5xl font-headline font-black text-secondary italic leading-none tracking-tighter uppercase relative z-10 whitespace-nowrap">
                            Social House.
                        </h2>
                    </div>
                </motion.div>

                {/* 2. Main content Grid: Form & Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-start">
                    {/* Column 1: Informational Details & Form */}
                    <div className="flex flex-col items-center w-full gap-8">

                        {/* Centered Informational Details - Glassified (Compact) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div className="flex flex-col items-center text-center space-y-3 p-8 rounded-3xl bg-primary/5 backdrop-blur-xl border-4 border-primary/20 shadow-xl transition-all hover:scale-105 duration-500">
                                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                    <MapPin size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-headline font-black uppercase text-[10px] tracking-[0.3em] text-primary">Our Sanctuary</h4>
                                    <p className="text-on-surface font-body font-bold leading-relaxed text-sm">
                                        No. 4, 80 Feet Rd, 4th Block, <br />
                                        Koramangala, Bengaluru
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-3 p-8 rounded-3xl bg-primary/5 backdrop-blur-xl border-4 border-primary/20 shadow-xl transition-all hover:scale-105 duration-500">
                                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                    <Phone size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-headline font-black uppercase text-[10px] tracking-[0.3em] text-primary">Direct Line</h4>
                                    <p className="text-on-surface font-body font-bold leading-relaxed flex flex-col gap-1 text-sm italic">
                                        <a href="tel:+919876543210" className="hover:text-secondary transition-colors">+91 98765 43210</a>
                                        <a href="mailto:hello@bohemians.live" className="hover:text-secondary transition-colors">hello@bohemians.live</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* High-Visibility Form */}
                        <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-primary/5 p-12 rounded-[3.5rem] border-4 border-primary/20 flex flex-col items-center text-center gap-6 w-full shadow-2xl"
                                >
                                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-headline font-black uppercase tracking-tighter mb-2">Transmission Successful</h3>
                                        <p className="text-on-surface-variant font-body">Our salon curators will be in touch shortly.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-8 w-full text-left bg-primary/5 backdrop-blur-xl p-10 md:p-12 rounded-[4rem] border-4 border-primary/20 shadow-2xl"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Name Identity</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your Name"
                                                className="w-full bg-surface/80 border-2 border-primary/20 rounded-2xl px-6 py-4 font-headline font-bold text-lg focus:border-primary focus:ring-0 transition-all placeholder:text-on-surface-variant/20 shadow-inner"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Digital Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="email@example.com"
                                                className="w-full bg-surface/80 border-2 border-primary/20 rounded-2xl px-6 py-4 font-headline font-bold text-lg focus:border-primary focus:ring-0 transition-all placeholder:text-on-surface-variant/20 shadow-inner"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">The Inquiry</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us about your architectural or social inquiry..."
                                            className="w-full bg-surface/80 border-2 border-primary/20 rounded-2xl px-6 py-4 font-headline font-bold text-lg focus:border-primary focus:ring-0 transition-all placeholder:text-on-surface-variant/20 resize-none shadow-inner"
                                        />
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="xl"
                                        disabled={formState === 'submitting'}
                                        className="w-full group h-24 text-2xl font-headline font-black uppercase tracking-tighter rounded-2xl shadow-2xl"
                                    >
                                        {formState === 'submitting' ? (
                                            <span className="flex items-center gap-4">
                                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-4">
                                                Submit Inquiry
                                                <Send size={24} className="group-hover:translate-x-3 group-hover:-translate_y-3 transition-transform duration-500" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Column 2: Unified Sanctuary Locator (Indiranagar) */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-primary/5 backdrop-blur-xl relative z-10 transition-all duration-700 hover:border-primary/40"
                    >
                        {/* Stable Map - Synchronized to Indiranagar Branch */}
                        <iframe
                            src="https://www.google.com/maps?q=Bohemians+966+12th+Main+Rd+Indiranagar+Bengaluru&output=embed&z=16&iwloc=near"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-90 saturate-[1.1]"
                        ></iframe>

                        {/* Centered Sanctuary Pin Details - Indiranagar Identity */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-surface/90 backdrop-blur-xl p-8 md:p-10 rounded-[4rem] shadow-[0_40px_80px_rgba(var(--primary-rgb),0.25)] border-2 border-primary/20 flex flex-col items-center gap-5 text-center max-w-[320px] md:max-w-md pointer-events-auto group/pin"
                            >
                                <div className="w-20 h-20 bg-primary rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-primary/30 transform group-hover:rotate-12 transition-transform duration-500">
                                    <MapPin size={40} />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-headline font-black uppercase tracking-tighter text-on-background">Bohemians.</h3>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-secondary text-secondary" />)}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">4.2 • (3,662)</span>
                                    </div>
                                    <p className="text-on-surface font-body font-bold text-sm leading-relaxed max-w-[240px] mx-auto opacity-80 italic">
                                        966, 12th Main Rd, Doopanahalli,<br />
                                        Indiranagar, Bengaluru, KA 560008
                                    </p>
                                    <div className="pt-4">
                                        <a
                                            href="https://www.google.com/maps?q=Bohemians+Indiranagar+Bengaluru"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-3 rounded-2xl font-headline font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-110 transition-all"
                                        >
                                            Navigate to Sanctuary
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
