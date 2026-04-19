import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '../../layouts/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Card, Button, Badge } from '../../components/ui';
import { ShoppingBag, Loader2, ArrowUpRight } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  items: OrderItem[];
  total_price: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  created_at: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // Real-time subscription
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    fetchOrders();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-5xl font-black font-headline uppercase leading-none tracking-tighter">Live Orders</h2>
            <p className="text-on-surface/40 mt-2 font-medium">Monitoring the gastronomic flow in real-time.</p>
          </div>
          <div className="flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
             <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#B40065]"></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Connection</span>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="font-headline font-black uppercase tracking-widest text-xs opacity-40">Syncing order stream...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card variant="low" className="p-0 overflow-hidden border border-stone-200/10 hover:bg-stone-50 transition-all rounded-[2.5rem] flex flex-col h-full">
                    <div className="p-8 border-b border-stone-200/10 flex justify-between items-start">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-1">Order ID</p>
                          <h4 className="font-headline font-black text-lg uppercase tracking-tight">#{order.id.slice(0, 8)}</h4>
                       </div>
                       <Badge variant={order.status === 'pending' ? 'tertiary' : 'primary'}>{order.status}</Badge>
                    </div>
                    
                    <div className="p-8 flex-grow">
                       <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-4 text-center">Curated Selection</p>
                       <ul className="space-y-4">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center bg-surface-container-low/50 p-4 rounded-2xl">
                               <div className="flex items-center gap-4">
                                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-black">{item.quantity}x</span>
                                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                               </div>
                               <span className="text-xs font-black opacity-40">{item.price}</span>
                            </li>
                          ))}
                       </ul>
                    </div>

                    <div className="p-8 bg-surface-container-low mt-auto">
                       <div className="flex justify-between items-center mb-8">
                          <span className="text-xs font-black uppercase tracking-widest opacity-40">Total Energy</span>
                          <span className="text-2xl font-black font-headline text-primary">₹{order.total_price}</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <select 
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className="bg-white border border-stone-200/20 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest appearance-none cursor-pointer hover:border-primary transition-all"
                          >
                             <option value="pending">Pending</option>
                             <option value="preparing">Preparing</option>
                             <option value="ready">Ready</option>
                             <option value="delivered">Delivered</option>
                          </select>
                          <Button variant="primary" size="md" className="rounded-xl flex items-center justify-center font-black">
                             Details <ArrowUpRight size={16} className="ml-2" />
                          </Button>
                       </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {orders.length === 0 && (
              <div className="col-span-full text-center py-40">
                 <ShoppingBag size={64} className="mx-auto text-primary/10 mb-6" />
                 <p className="font-headline font-black uppercase text-2xl opacity-20">Waiting for first order...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
