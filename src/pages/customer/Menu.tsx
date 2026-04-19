import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Button, Badge, Card } from '../../components/ui';
import { Filter, ShoppingBag, X, Check, Loader2, ArrowRight, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
  is_available: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Small Plates');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const categories = ['Small Plates', 'Mains', 'Cocktails'];

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true);
    
    if (data) setItems(data);
    setLoading(false);
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    triggerToast(`${item.name} added to curated selection.`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  const checkout = async () => {
    const { error } = await supabase
      .from('orders')
      .insert([{
        items: cart,
        total_price: total,
        status: 'pending'
      }]);
    
    if (!error) {
      setCart([]);
      setShowCart(false);
      triggerToast("Order transmitted to the kitchen!");
    }
  };

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
            <h1 className="text-5xl md:text-8xl font-headline font-black text-primary leading-tight tracking-tighter xl:text-[7.5rem]">
              ELECTRIC <br /> <span className="italic text-on-background">FLAVORS.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-md mt-8 leading-relaxed font-body">
              A curated collision of high-end hospitality and bohemian rebellion. Every plate tells a story of social energy.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1 }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[4/5] max-h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-surface relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
                alt="Bohemians Vibe" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-6 md:p-10 rounded-tr-xl rounded-bl-xl shadow-2xl font-headline font-black text-2xl md:text-3xl rotate-[-6deg]">
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
                  className={`flex-shrink-0 font-headline font-black text-2xl md:text-4xl tracking-tighter transition-all relative ${
                    activeCategory === cat ? "text-primary scale-105" : "text-on-surface/30 hover:text-on-surface/60"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="activeCat"
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3 text-secondary group cursor-pointer" onClick={() => triggerToast("Dietary filters coming soon!")}>
              <Filter size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-label font-bold uppercase tracking-widest text-xs">Filter Dietary</span>
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 min-h-[400px]">
          {loading ? (
            <div className="col-span-12 flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 size={64} className="text-primary animate-spin" />
               <p className="font-headline font-black uppercase text-xs tracking-[0.3em] opacity-30">Preparing the collective...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-10 w-full"
              >
                {items
                  .filter(item => item.category === activeCategory)
                  .map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`${i === 0 ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'}`}
                    >
                      <Card variant="low" className="h-full flex flex-col group border border-outline-variant/5 hover:bg-surface-container-high transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                        <div className={`${i === 0 ? 'aspect-[21/9]' : 'aspect-square'} overflow-hidden relative`}>
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          {i === 0 && (
                            <div className="absolute top-6 left-6">
                              <Badge variant="primary">Signature Selection</Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-on-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Button 
                               variant="surface" 
                               size="md" 
                               className="text-primary font-black scale-90 group-hover:scale-100 transition-transform duration-500"
                               onClick={() => addToCart(item)}
                             >
                               Quick Add +
                             </Button>
                          </div>
                        </div>
                        <div className="p-10 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <h3 className={`${i === 0 ? 'text-4xl' : 'text-2xl'} font-headline font-black text-on-surface uppercase tracking-tighter`}>{item.name}</h3>
                              <span className="text-2xl font-headline font-black text-primary">{item.price}</span>
                            </div>
                            <p className={`${i === 0 ? 'text-lg max-w-xl' : 'text-md'} text-on-surface-variant mb-6 leading-relaxed font-body`}>{item.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Custom CTA Card */}
          <div className="md:col-span-6 lg:col-span-4 translate-y-4">
            <Card variant="high" className="bg-primary p-12 h-full flex flex-col justify-center items-center text-center text-on-primary border-none shadow-2xl rounded-[2.5rem] relative overflow-hidden group">
              <ShoppingBag size={80} className="mb-6 opacity-20 absolute -top-4 -right-4 rotate-12 group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10">
                <h4 className="text-4xl font-headline font-black uppercase mb-4 tracking-tighter leading-[0.85]">Custom <br /> Event <br /> <span className="italic opacity-80">Platter.</span></h4>
                <p className="mb-10 text-on-primary/70 font-medium">Design your own social board for parties of 4 or more.</p>
                <Button 
                  variant="surface" 
                  size="lg" 
                  className="text-primary w-full shadow-none hover:bg-white font-black"
                  onClick={() => window.location.href = '/events'}
                >
                  Inquire Now
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Floating Shopping Bag */}
        <button 
          onClick={() => setShowCart(true)}
          className="fixed bottom-12 right-12 z-50 bg-secondary text-on-secondary w-20 h-20 rounded-full shadow-[0_20px_50px_rgba(0,106,106,0.3)] flex items-center justify-center group hover:scale-110 transition-all duration-300 border-4 border-surface"
        >
          <ShoppingBag size={32} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[10px] font-black border-2 border-surface">
            {cart.length}
          </div>
        </button>

        {/* Shopping Cart Drawer */}
        <AnimatePresence>
          {showCart && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCart(false)}
                className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full md:max-w-md bg-white z-[70] shadow-2xl flex flex-col p-6 md:p-10"
              >
                 <div className="flex justify-between items-center mb-12">
                   <h3 className="text-4xl font-headline font-black uppercase tracking-tighter leading-none">Curated Bag</h3>
                   <button onClick={() => setShowCart(false)} className="p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors">
                     <X size={24} />
                   </button>
                 </div>

                 <div className="flex-grow overflow-y-auto space-y-6 pr-4 -mr-4">
                   {cart.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-6">
                        <ShoppingBag size={80} strokeWidth={1} />
                        <p className="font-headline font-black uppercase tracking-widest text-sm">Your bag is empty.</p>
                     </div>
                   ) : (
                     cart.map(item => (
                       <div key={item.id} className="flex gap-6 items-center bg-stone-50 p-6 rounded-[2rem] border border-stone-100 group">
                          <img src={item.image_url} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt={item.name} />
                          <div className="flex-1">
                             <h4 className="font-headline font-black uppercase text-lg tracking-tight leading-none mb-1">{item.name}</h4>
                             <p className="text-xs font-black text-primary mb-3">{item.price}</p>
                             <div className="flex items-center gap-4">
                                <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold" onClick={() => addToCart(item)}>+</button>
                                <span className="text-xs font-black">{item.quantity}</span>
                                <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold" onClick={() => {
                                  if (item.quantity > 1) {
                                    setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
                                  } else {
                                    removeFromCart(item.id);
                                  }
                                }}>-</button>
                             </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-error opacity-0 group-hover:opacity-100 transition-opacity">
                             <Trash2 size={20} />
                          </button>
                       </div>
                     ))
                   )}
                 </div>

                 {cart.length > 0 && (
                   <div className="mt-12 pt-10 border-t border-stone-100">
                      <div className="flex justify-between items-end mb-8">
                         <span className="text-xs font-black uppercase tracking-widest opacity-40">Total Energy Cost</span>
                         <span className="text-3xl font-black font-headline text-primary">₹{total}</span>
                      </div>
                      <Button variant="primary" size="xl" className="w-full py-6 text-xl rounded-2xl shadow-2xl" onClick={checkout}>
                         Transmit Order <ArrowRight size={24} className="ml-3" />
                      </Button>
                   </div>
                 )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Simple Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-on-background text-surface px-8 py-4 rounded-full font-headline font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl"
            >
              <Check className="text-secondary" size={16} />
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CustomerLayout>
  );
};

export default Menu;
