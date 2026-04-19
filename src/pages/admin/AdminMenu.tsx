import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '../../layouts/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Card, Button, Badge } from '../../components/ui';
import { Plus, Search, Edit2, Trash2, X, Check, Loader2 } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
  is_available: boolean;
}

const AdminMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    category: 'Small Plates',
    is_available: true
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setItems(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingItem) {
      await supabase
        .from('menu_items')
        .update(formData)
        .eq('id', editingItem.id);
    } else {
      await supabase
        .from('menu_items')
        .insert([formData]);
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', price: '', description: '', image_url: '', category: 'Small Plates', is_available: true });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    fetchItems();
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.image_url,
      category: item.category,
      is_available: item.is_available
    });
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-5xl font-black font-headline uppercase leading-none tracking-tighter">Inventory Core</h2>
            <p className="text-on-surface/40 mt-2 font-medium">Manage the electric flavors of Bohemians.</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="rounded-2xl shadow-xl px-8"
            onClick={() => {
              setEditingItem(null);
              setFormData({ name: '', price: '', description: '', image_url: '', category: 'Small Plates', is_available: true });
              setIsModalOpen(true);
            }}
          >
            <Plus size={20} className="mr-2" /> Add New Item
          </Button>
        </header>

        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/30" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-stone-200/20 rounded-3xl py-6 px-16 font-headline font-bold text-lg focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="font-headline font-black uppercase tracking-widest text-xs opacity-40">Syncing with kitchen...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card variant="low" className="p-0 overflow-hidden group border border-stone-200/10 hover:border-primary/20 transition-all duration-500 rounded-[2.5rem]">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={() => openEdit(item)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary transition-all shadow-xl">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-error transition-all shadow-xl">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant={item.is_available ? 'primary' : 'tertiary'} className="backdrop-blur-md bg-stone-900/40 border-none">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black font-headline uppercase tracking-tighter leading-none">{item.name}</h3>
                        <span className="text-xl font-black text-primary font-headline">{item.price}</span>
                      </div>
                      <p className="text-sm text-on-surface/60 line-clamp-2 italic mb-6">{item.description}</p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                        {item.is_available ? <Check size={12} className="text-green-500" /> : <X size={12} className="text-error" />}
                        {item.is_available ? 'Available in Salon' : 'Sold Out'}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
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
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-surface w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] overflow-x-hidden shadow-2xl relative z-10"
              >
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl md:text-4xl font-black font-headline uppercase leading-none tracking-tighter mb-10">
                    {editingItem ? 'Edit Culinary Asset' : 'New Culinary Asset'}
                  </h3>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Item Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Price (e.g. ₹595)</label>
                      <input
                        required
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary appearance-none"
                      >
                        <option>Small Plates</option>
                        <option>Mains</option>
                        <option>Cocktails</option>
                      </select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Image URL</label>
                      <input
                        required
                        type="text"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary text-xs"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Description</label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-headline font-bold focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center gap-4 py-2">
                      <input
                        type="checkbox"
                        checked={formData.is_available}
                        onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                        className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-none bg-surface-container-highest"
                      />
                      <label className="text-xs font-black uppercase tracking-widest text-on-surface/60">Available for Order</label>
                    </div>
                    <div className="col-span-2 flex gap-4 mt-6">
                      <Button variant="primary" size="lg" className="w-full rounded-2xl py-6 text-lg">
                        {editingItem ? 'Save Changes' : 'Launch Asset'}
                      </Button>
                      <Button type="button" variant="surface" size="lg" onClick={() => setIsModalOpen(false)} className="rounded-2xl px-8">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
