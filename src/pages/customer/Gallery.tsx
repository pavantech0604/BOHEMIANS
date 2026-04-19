import { motion } from 'framer-motion';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { REAL_PHOTOS } from '../../data/realData';

const Gallery = () => {
  const photos = Object.values(REAL_PHOTOS);

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-8 py-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Archive</span>
          <h1 className="text-7xl md:text-8xl font-headline font-black text-primary leading-none tracking-tighter xl:text-[7.5rem]">
            LENS OF <br /> SOCIAL CHAOS.
          </h1>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo, i) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-lg break-inside-avoid"
            >
              <img 
                src={photo} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={`Bohemians Perspective ${i}`} 
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white font-headline font-black uppercase text-xs tracking-widest bg-primary px-6 py-2 rounded-full">View Story</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Gallery;
