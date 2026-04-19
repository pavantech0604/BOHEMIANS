import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button, Badge, Card } from '../../components/ui';
import { Filter, ShoppingBag } from 'lucide-react';
import { REAL_MENU, REAL_PHOTOS } from '../../data/realData';

const categories = ['Small Plates', 'Mains', 'Cocktails'];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Small Plates');

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Editorial Hero */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 items-end max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-7"
          >
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">The Culinary Collective</span>
            <h1 className="text-7xl md:text-8xl font-headline font-black text-primary leading-tight tracking-tighter xl:text-[7.5rem]">
              Electric <br /> Flavors.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-md mt-8 leading-relaxed">
              A curated collision of high-end hospitality and bohemian rebellion. Every plate tells a story of social energy.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1 }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[4/5] max-h-[60vh] rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={REAL_PHOTOS.EXTERIOR} 
                alt="Bohemians Exterior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-10 rounded-tr-xl rounded-bl-xl shadow-2xl font-headline font-black text-3xl rotate-[-6deg]">
              EST. 2024
            </div>
          </motion.div>
        </section>

        {/* Sticky Category Bar */}
        <section className="sticky top-20 z-40 mb-20 py-6 glass-panel -mx-8 px-8 border-b border-outline-variant/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex gap-12 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 font-headline font-black text-2xl md:text-4xl tracking-tighter transition-all ${
                    activeCategory === cat ? "text-primary border-b-4 border-primary pb-2 scale-105" : "text-on-surface/30 hover:text-on-surface/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3 text-secondary group cursor-pointer">
              <Filter size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-label font-bold uppercase tracking-widest text-xs">Filter Dietary</span>
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <AnimatePresence mode="wait">
            {REAL_MENU
              .find(cat => cat.category === activeCategory)?.items
              .map((item, i) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${i === 0 ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'}`}
                >
                  <Card variant="low" className="h-full flex flex-col group border border-outline-variant/5 hover:bg-surface-container-high transition-colors">
                    <div className={`${i === 0 ? 'aspect-[21/9]' : 'aspect-square'} overflow-hidden relative`}>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      {i === 0 && (
                        <div className="absolute top-6 left-6">
                          <Badge variant="primary">Chef's Selection</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className={`${i === 0 ? 'text-4xl' : 'text-2xl'} font-headline font-black text-on-surface uppercase tracking-tighter`}>{item.name}</h3>
                          <span className="text-2xl font-headline font-black text-primary">{item.price}</span>
                        </div>
                        <p className={`${i === 0 ? 'text-lg max-w-xl' : 'text-sm'} text-on-surface-variant mb-6 leading-relaxed`}>{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Custom CTA Card */}
          <div className="md:col-span-6 lg:col-span-4 translate-y-4">
            <Card variant="high" className="bg-primary p-10 h-full flex flex-col justify-center items-center text-center text-on-primary border-none shadow-2xl">
              <ShoppingBag size={64} className="mb-6 opacity-40" />
              <h4 className="text-3xl font-headline font-black uppercase mb-4 tracking-tighter leading-none">Custom Event <br /> Platter?</h4>
              <p className="mb-10 text-on-primary/70">Design your own social board for parties of 4 or more.</p>
              <Button variant="surface" size="md" className="text-primary w-full shadow-none hover:bg-white">Inquire Now</Button>
            </Card>
          </div>
        </div>

        {/* Floating Shopping Bag */}
        <button className="fixed bottom-12 right-12 z-50 bg-secondary text-on-secondary w-20 h-20 rounded-full shadow-[0_20px_50px_rgba(0,106,106,0.3)] flex items-center justify-center group hover:scale-110 transition-all duration-300">
          <ShoppingBag size={32} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </CustomerLayout>
  );
};

export default Menu;
