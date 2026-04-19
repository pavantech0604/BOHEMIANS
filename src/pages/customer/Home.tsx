import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button, Badge, Card } from '../../components/ui';
import { ArrowRight, Calendar, Store, CheckCircle2, Loader2, Star } from 'lucide-react';
import { REAL_PHOTOS, REAL_REVIEWS, REAL_MENU } from '../../data/realData';
import { ContactMapSection } from '../../components/sections/ContactMapSection';
import { supabase } from '../../lib/supabase';

// Import assets correctly for Vite
import logoBlack from '../../assets/logo-black.png';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
}

const Home = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [signatureItems, setSignatureItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSignatureItems();
  }, []);

  // Handle incoming scroll requests from other pages
  useEffect(() => {
    if (location.state && (location.state as any).scrollToContact) {
      setTimeout(() => {
        const element = document.getElementById('contact-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

      // Clear the state so it doesn't re-scroll on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchSignatureItems = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .limit(3);

      if (data && data.length > 0) {
        setSignatureItems(data);
      } else {
        // Fallback to REAL_MENU if database is empty
        const fallbackItems = REAL_MENU.flatMap(cat =>
          cat.items.map(item => ({
            id: item.name.toLowerCase().replace(/\s+/g, '-'),
            name: item.name,
            price: item.price,
            description: item.desc,
            image_url: item.img,
            category: cat.category
          }))
        ).slice(0, 3);
        setSignatureItems(fallbackItems);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Fallback on error as well
      const fallbackItems = REAL_MENU.flatMap(cat =>
        cat.items.map(item => ({
          id: item.name.toLowerCase().replace(/\s+/g, '-'),
          name: item.name,
          price: item.price,
          description: item.desc,
          image_url: item.img,
          category: cat.category
        }))
      ).slice(0, 3);
      setSignatureItems(fallbackItems);
    }
    setLoading(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <CustomerLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section - Asymmetrical & Editorial */}
        <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center pt-4 md:pt-0 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 w-full editorial-grid relative z-10 transition-all">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-12 lg:col-span-7 flex flex-col justify-center"
            >
              <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                The Electric Soul of Indiranagar
              </span>
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black font-headline text-on-background leading-[0.85] tracking-tighter mb-6 xl:text-[7.5rem]">
                THE SOCIAL <br />
                <span className="text-primary italic">HOUSE.</span>
              </h1>
              <p className="text-lg md:text-xl max-w-lg mb-8 text-on-surface-variant leading-relaxed font-body">
                Where haute cuisine meets rebellion. Housed in a converted bungalow, <img src={logoBlack} dir="ltr" className="logo-inline" alt="Bohemians" /> is an artsy salon designed for the curated chaos of modern life.
              </p>
              <div className="flex flex-wrap gap-6 mt-4">
                <Button variant="primary" size="xl" className="shadow-2xl" onClick={() => window.location.href = '/reservations'}>
                  Book a Table
                </Button>
                <Button variant="secondary" size="xl" onClick={() => window.location.href = '/menu'}>
                  Explore Menu
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="col-span-12 lg:col-span-5 relative mt-6 md:mt-12 lg:mt-0 xl:pl-12"
            >
              <div className="aspect-[4/5] max-h-[50vh] md:max-h-[60vh] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative z-10 border-4 border-surface">
                <img
                  src={REAL_PHOTOS.INTERIOR_VIBE}
                  alt="Bohemians Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 w-48 h-48 md:w-80 md:h-80 bg-primary-container rounded-[3rem] -rotate-12 -z-10 opacity-20" />
            </motion.div>
          </div>

          {/* Abstract background shape */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-0 rounded-l-[10rem] hidden lg:block" />
        </section>

        {/* Signature Curations */}
        <section className="py-32 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 relative">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-xl">
                <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">The Culinary Rebellion</span>
                <h2 className="text-5xl md:text-7xl font-black font-headline text-on-background tracking-tighter uppercase mb-6 leading-none">
                  Signature <span className="text-primary italic">Curations.</span>
                </h2>
                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-body italic opacity-70">
                  Direct from our Bengaluru kitchen: authentic flavors presented through a bohemian lens.
                </p>
              </div>
              <a href="/menu" className="group flex items-center gap-2 font-headline font-black text-primary uppercase tracking-tighter text-lg">
                Explore Full Menu
                <ArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 min-h-[500px]">
              {loading ? (
                <div className="col-span-12 flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 size={64} className="text-primary animate-spin" />
                  <p className="font-headline font-black uppercase text-[10px] tracking-[0.3em] opacity-30">Culling the finest artifacts...</p>
                </div>
              ) : (
                signatureItems.map((dish, i) => {
                  const relatedReview = REAL_REVIEWS.find(r =>
                    r.text.toLowerCase().includes(dish.name.toLowerCase().split(' ')[0]) ||
                    (dish.name.includes('Fried Chicken') && r.text.includes('Fried Chicken'))
                  );

                  return (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className={`relative group ${i === 1 ? 'md:mt-24' : ''}`}
                    >
                      <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 relative shadow-2xl border-2 border-outline-variant/5">
                        <img src={dish.image_url} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />

                        {/* Interactive Chef's Notes Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-primary/95 to-primary/40 translate-y-full group-hover:translate-y-0 transition-transform duration-700 backdrop-blur-md z-20">
                          <span className="text-secondary font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">The Curation</span>
                          <p className="text-white text-sm font-medium leading-relaxed italic opacity-90 mb-4 line-clamp-3">
                            {dish.description}
                          </p>
                          <div className="h-[1px] w-full bg-white/10 mb-4" />
                          <span className="text-white font-headline font-black uppercase text-xs tracking-widest">{dish.price}</span>
                        </div>

                        {/* Guest Testimony Overlay - Subtle Reveal */}
                        {relatedReview && (
                          <div className="absolute top-8 right-8 left-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
                              <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-secondary text-secondary" />)}
                              </div>
                              <p className="text-white text-[10px] italic leading-tight opacity-90 mb-2">"{relatedReview.text.slice(0, 80)}..."</p>
                              <span className="text-secondary font-black uppercase text-[8px] tracking-[0.1em]">— {relatedReview.author}</span>
                            </div>
                          </div>
                        )}

                        {i === 0 && <Badge variant="primary" className="absolute top-8 left-8 z-30">Identity Pick</Badge>}
                      </div>
                      <div className="px-4">
                        <h3 className="text-3xl font-black font-headline text-on-background uppercase mb-3 leading-none tracking-tighter group-hover:text-primary transition-colors">{dish.name}</h3>
                        <div className="flex items-center gap-2 text-on-surface-variant font-label font-bold uppercase tracking-widest text-[10px] opacity-40">
                          <span>Signature Selection</span>
                          <span className="w-4 h-[1px] bg-outline-variant/30" />
                          <span>{dish.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Movement Section - Verification & Reviews */}
        <section className="py-32 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto px-8 editorial-grid">
            <div className="col-span-12 lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <motion.img
                    whileHover={{ scale: 0.98 }}
                    src={REAL_PHOTOS.EXTERIOR}
                    className="w-full aspect-[3/4] object-cover rounded-[2rem] shadow-xl border-4 border-surface cursor-pointer"
                    alt="Exterior"
                  />
                  <motion.img
                    whileHover={{ scale: 0.98 }}
                    src={REAL_PHOTOS.FUSION_TACOS}
                    className="w-full aspect-square object-cover rounded-[2rem] shadow-xl border-4 border-surface cursor-pointer"
                    alt="Fusion Tacos"
                  />
                </div>
                <div className="pt-20 space-y-6">
                  <motion.img
                    whileHover={{ scale: 0.98 }}
                    src={REAL_PHOTOS.MALABAR_PLATTER}
                    className="w-full aspect-square object-cover rounded-[2rem] shadow-xl border-4 border-surface cursor-pointer"
                    alt="Malabar Platter"
                  />
                  <motion.img
                    whileHover={{ scale: 0.98 }}
                    src={REAL_PHOTOS.INTERIOR_VIBE}
                    className="w-full aspect-[3/4] object-cover rounded-[2rem] shadow-xl border-4 border-surface cursor-pointer"
                    alt="Interior Details"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center mt-20 lg:mt-0">
              <Badge variant="primary" className="mb-8 w-fit">Guest Experience</Badge>
              <h2 className="text-5xl md:text-7xl font-black font-headline text-on-background tracking-tighter uppercase mb-10 leading-[0.85]">
                What The <br className="hidden md:block" /> Salon <br className="hidden md:block" /> <span className="text-secondary italic">Is Saying.</span>
              </h2>

              <div className="space-y-12">
                {REAL_REVIEWS.map((review, i) => (
                  <motion.div
                    key={review.author}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="text-xl text-on-surface-variant italic mb-4 leading-relaxed font-body">
                      "{review.text}"
                    </p>
                    <h4 className="font-headline font-black uppercase text-sm text-primary tracking-[0.2em]">— {review.author}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stay Electric Bento */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 bg-primary p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between text-on-primary relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-black font-headline tracking-tighter uppercase mb-6">Stay Electric</h3>
                    <p className="mb-10 text-base md:text-lg opacity-90 max-w-sm leading-relaxed">Join our inner circle for secret menu releases and guest list access to salon events.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {subscribed ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 bg-on-primary/20 p-6 rounded-2xl backdrop-blur-md"
                      >
                        <CheckCircle2 size={32} />
                        <div>
                          <p className="font-headline font-black uppercase tracking-widest text-sm">Welcome to the Salon</p>
                          <p className="text-sm opacity-80">Guest list access confirmed.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-on-primary/10 border-none rounded-full px-8 py-5 w-full placeholder:text-on-primary/40 focus:ring-2 focus:ring-on-primary transition-all font-headline font-bold"
                          placeholder="Your Email"
                          type="email"
                        />
                        <Button variant="surface" size="lg" className="shrink-0 text-primary font-black px-12">Join</Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
                <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Calendar size={400} strokeWidth={1} />
                </div>
              </div>

              <Card variant="high" className="p-12 rounded-[2.5rem] flex flex-col justify-center items-center text-center group shadow-xl">
                <Calendar className="text-primary mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h4 className="text-3xl font-black font-headline uppercase mb-4 tracking-tighter">Host Event</h4>
                <p className="text-on-surface-variant mb-10 leading-relaxed max-w-[200px]">Private salons for your gatherings.</p>
                <Button
                  variant="ghost"
                  className="border-b-2 border-primary rounded-none px-0 py-1 font-black"
                  onClick={() => window.location.href = '/events'}
                >
                  Inquire Now
                </Button>
              </Card>

              <Card variant="highest" className="p-12 rounded-[2.5rem] bg-secondary text-on-secondary flex flex-col justify-center items-center text-center group hover:shadow-[0_20px_60px_rgba(0,106,106,0.2)] transition-all duration-500">
                <Store className="text-secondary-fixed mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" size={48} />
                <h4 className="text-3xl font-black font-headline uppercase mb-4 tracking-tighter">Catering</h4>
                <p className="opacity-80 mb-10 leading-relaxed max-w-[200px]">Bring the Bohemians experience home.</p>
                <Button
                  variant="ghost"
                  className="border-b-2 border-on-secondary/30 text-on-secondary rounded-none px-0 py-1 hover:border-on-secondary transition-colors font-black"
                  onClick={() => window.location.href = '/inquiry'}
                >
                  Book Today
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* New Contact & Map Section */}
        <ContactMapSection />
      </div>
    </CustomerLayout>
  );
};

export default Home;
