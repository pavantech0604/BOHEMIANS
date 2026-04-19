import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { Badge } from '../../components/ui';
import { supabase } from '../../lib/supabase';
import { Loader2, Maximize2, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  category: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Interior', 'Plates', 'Cocktails', 'Events'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setImages(data);
    setLoading(false);
  };

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-8 py-20 overflow-hidden min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Archive</span>
          <h1 className="text-5xl md:text-8xl font-headline font-black text-primary leading-none tracking-tighter xl:text-[7.5rem]">
            LENS OF <br /> <span className="text-on-background italic">SOCIAL CHAOS.</span>
          </h1>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex justify-start md:justify-center gap-4 mb-20 overflow-x-auto pb-4 scrollbar-hide -mx-8 px-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-headline font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? "bg-primary text-on-primary shadow-2xl scale-110" 
                : "bg-surface-container-low text-on-surface/40 hover:text-primary hover:bg-primary/5 border border-outline-variant/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={64} className="text-primary animate-spin" />
            <p className="font-headline font-black uppercase text-xs tracking-[0.3em] opacity-30">Developing film...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative group overflow-hidden rounded-[2.5rem] break-inside-avoid shadow-2xl border border-outline-variant/5 cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.image_url} 
                    className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                    alt={img.title || `Bohemians Perspective ${i}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-10 pb-12 gap-4">
                     <span className="text-white font-headline font-black uppercase text-[10px] tracking-widest bg-primary/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">{img.category}</span>
                     {img.title && <span className="text-white font-headline font-black uppercase text-xl text-center leading-none tracking-tighter">{img.title}</span>}
                     <div className="flex items-center gap-2 text-white/60 text-[8px] font-black uppercase tracking-[0.3em] mt-2">
                       <Maximize2 size={12} /> Full detail
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredImages.length === 0 && !loading && (
          <div className="py-40 text-center space-y-6">
            <p className="font-headline font-black uppercase text-xl opacity-20 tracking-tighter italic">The archive is currently empty for this curation.</p>
            <button onClick={() => setActiveCategory('All')} className="text-primary font-black uppercase text-xs tracking-widest border-b-2 border-primary pb-1">Reset Filters</button>
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 md:p-20"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors p-4 bg-white/5 rounded-full z-[110]">
              <X size={32} />
            </button>
            
            <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="relative max-w-full max-h-full flex flex-col items-center"
               onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.image_url} 
                className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10"
                alt={selectedImage.title} 
              />
              <div className="mt-6 md:mt-10 text-center space-y-2">
                 <Badge variant="primary" className="mb-2">{selectedImage.category}</Badge>
                 <h2 className="text-2xl md:text-5xl font-black font-headline text-white uppercase tracking-tighter">{selectedImage.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
};

export default Gallery;
