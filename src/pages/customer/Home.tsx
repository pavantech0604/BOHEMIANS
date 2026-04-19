import { motion } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button, Badge, Card } from '../../components/ui';
import { ArrowRight, Calendar, Store } from 'lucide-react';
import { REAL_PHOTOS, REAL_REVIEWS } from '../../data/realData';

const Home = () => {
  return (
    <CustomerLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section - Asymmetrical & Editorial */}
        <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center pt-4 md:pt-0">
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
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-headline text-on-background leading-[0.85] tracking-tighter mb-6 xl:text-[7.5rem]">
                THE SOCIAL <br /> 
                <span className="text-primary italic">HOUSE.</span>
              </h1>
              <p className="text-lg md:text-xl max-w-lg mb-8 text-on-surface-variant leading-relaxed">
                Where haute cuisine meets rebellion. Housed in a converted bungalow, <img src="/src/assets/logo-magenta.png" className="logo-inline" alt="Bohemians" /> is an artsy salon designed for the curated chaos of modern life.
              </p>
              <div className="flex flex-wrap gap-6 mt-4">
                <Button variant="primary" size="xl" className="shadow-2xl">
                  Book a Table
                </Button>
                <Button variant="secondary" size="xl">
                  Order Online
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0 xl:pl-12"
            >
              <div className="aspect-[4/5] max-h-[60vh] rounded-xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative z-10">
                <img 
                  src={REAL_PHOTOS.INTERIOR_VIBE} 
                  alt="Bohemians Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-primary-container rounded-lg -rotate-12 -z-10 opacity-20" />
            </motion.div>
          </div>
          
          {/* Abstract background shape */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-0 rounded-l-[10rem] hidden lg:block" />
        </section>

        {/* Signature Curations */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-6xl font-black font-headline text-on-background tracking-tighter uppercase mb-6 leading-none">
                  Signature <span className="text-primary">Curations</span>
                </h2>
                <p className="text-on-surface-variant text-lg">
                  Direct from our Bengaluru kitchen: authentic flavors presented through a bohemian lens.
                </p>
              </div>
              <a href="/menu" className="group flex items-center gap-2 font-headline font-black text-primary uppercase tracking-tighter text-lg">
                Explore Full Menu 
                <ArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: 'Railway Mutton Curry', price: '₹595', desc: 'The legendary slow-cooked bungalow classic.', img: REAL_PHOTOS.RAILWAY_MUTTON_CURRY, badge: 'Heritage' },
                { title: 'Charcoal Dim Sums', price: '₹425', desc: 'Indiranagar’s favorite signature black-skinned dumplings.', img: REAL_PHOTOS.CHARCOAL_DIM_SUMS, offset: true },
                { title: 'Aam Panna Kick', price: '₹450', desc: 'The superb green mango infusion mentioned by our guests.', img: REAL_PHOTOS.AAM_PANNA_COCKTAIL }
              ].map((dish, i) => (
                <motion.div 
                  key={dish.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className={`relative group ${dish.offset ? 'md:mt-24' : ''}`}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-8 relative">
                    <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {dish.badge && <Badge className="absolute top-6 left-6">{dish.badge}</Badge>}
                  </div>
                  <h3 className="text-3xl font-black font-headline text-on-background uppercase mb-3 leading-none">{dish.title}</h3>
                  <p className="text-on-surface-variant mb-6 text-lg">{dish.desc}</p>
                  <span className="text-secondary font-black text-2xl tracking-tighter">{dish.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Movement Section - Verification & Reviews */}
        <section className="py-32 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto px-8 editorial-grid">
            <div className="col-span-12 lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img src={REAL_PHOTOS.EXTERIOR} className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl" alt="Exterior" />
                  <img src={REAL_PHOTOS.FUSION_TACOS} className="w-full aspect-square object-cover rounded-lg shadow-xl" alt="Fusion Tacos" />
                </div>
                <div className="pt-20 space-y-6">
                  <img src={REAL_PHOTOS.MALABAR_PLATTER} className="w-full aspect-square object-cover rounded-lg shadow-xl" alt="Malabar Platter" />
                  <img src={REAL_PHOTOS.INTERIOR_VIBE} className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl" alt="Interior Details" />
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center mt-20 lg:mt-0">
              <Badge variant="primary" className="mb-8 w-fit">Guest Experience</Badge>
              <h2 className="text-6xl md:text-7xl font-black font-headline text-on-background tracking-tighter uppercase mb-10 leading-[0.85]">
                What The <br /> Salon <br /> <span className="text-secondary italic">Is Saying.</span>
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
              <div className="md:col-span-2 bg-primary p-12 rounded-lg flex flex-col justify-between text-on-primary relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-5xl font-black font-headline tracking-tighter uppercase mb-6">Stay Electric</h3>
                  <p className="mb-10 text-lg opacity-90 max-w-sm leading-relaxed">Join our inner circle for secret menu releases and guest list access to salon events.</p>
                  <form className="flex flex-col sm:flex-row gap-4">
                    <input 
                      className="bg-on-primary/10 border-none rounded-full px-8 py-4 w-full placeholder:text-on-primary/40 focus:ring-2 focus:ring-on-primary transition-all" 
                      placeholder="Email Address" 
                      type="email" 
                    />
                    <Button variant="surface" size="md" className="shrink-0 text-primary">Join Now</Button>
                  </form>
                </div>
                <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Calendar size={400} strokeWidth={1} />
                </div>
              </div>

              <Card variant="high" className="p-12 flex flex-col justify-center items-center text-center group">
                <Calendar className="text-primary mb-6 group-hover:scale-110 transition-transform" size={48} />
                <h4 className="text-3xl font-black font-headline uppercase mb-4 tracking-tighter">Host Event</h4>
                <p className="text-on-surface-variant mb-10 leading-relaxed">Private salons for your most social gatherings.</p>
                <Button variant="ghost" className="border-b-2 border-primary rounded-none px-0 py-1">Inquire Now</Button>
              </Card>

              <Card variant="highest" className="p-12 bg-secondary text-on-secondary flex flex-col justify-center items-center text-center group hover:shadow-[0_20px_60px_rgba(0,106,106,0.2)] transition-all duration-500">
                <Store className="text-secondary-fixed mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" size={48} />
                <h4 className="text-3xl font-black font-headline uppercase mb-4 tracking-tighter">Catering</h4>
                <p className="opacity-80 mb-10 leading-relaxed max-w-[200px]">Bring the <img src="/src/assets/logo-magenta.png" className="logo-inline" alt="Bohemians" /> experience to your private residence.</p>
                <Button variant="ghost" className="border-b-2 border-on-secondary/30 text-on-secondary rounded-none px-0 py-1 hover:border-on-secondary transition-colors">Book Today</Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
};

export default Home;
