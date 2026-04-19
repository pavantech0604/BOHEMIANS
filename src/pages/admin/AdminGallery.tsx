import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '../../layouts/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  category: string;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    category: 'Interior'
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await supabase
      .from('gallery')
      .insert([formData]);

    setIsModalOpen(false);
    setFormData({ image_url: '', title: '', category: 'Interior' });
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this image from the archive?')) return;
    await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    fetchImages();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-5xl font-black font-headline uppercase leading-none tracking-tighter">Visual Archive</h2>
            <p className="text-on-surface/40 mt-2 font-medium">Curating the lens of social chaos.</p>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            className="rounded-2xl shadow-xl px-8"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} className="mr-2" /> Add to Gallery
          </Button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="font-headline font-black uppercase tracking-widest text-xs opacity-40">Developing film...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group overflow-hidden rounded-[2rem] break-inside-avoid border border-stone-200/10 shadow-xl"
                >
                  <img src={img.image_url} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" alt={img.title} />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                     <span className="text-white font-headline font-black uppercase text-xs tracking-widest bg-primary px-6 py-2 rounded-full shadow-2xl">{img.category}</span>
                     <button 
                       onClick={() => handleDelete(img.id)}
                       className="p-4 bg-error text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
                     >
                       <Trash2 size={20} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="bg-surface w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10"
             >
               <div className="p-8 md:p-12 text-on-background">
                  <h3 className="text-3xl md:text-4xl font-black font-headline uppercase leading-none tracking-tighter mb-10 text-center">Archive New Moment</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Image URL</label>
                        <input 
                          required
                          type="text" 
                          value={formData.image_url}
                          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                          className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Title / Caption</label>
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary appearance-none"
                        >
                          <option>Interior</option>
                          <option>Plates</option>
                          <option>Cocktails</option>
                          <option>Events</option>
                        </select>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button variant="primary" size="lg" className="w-full rounded-2xl py-6 text-lg">
                           Archive Image
                        </Button>
                        <Button type="button" variant="surface" size="lg" onClick={() => setIsModalOpen(false)} className="rounded-2xl px-8 w-full sm:w-auto">
                           Cancel
                        </Button>
                     </div>
                  </form>
               </div>
             </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
