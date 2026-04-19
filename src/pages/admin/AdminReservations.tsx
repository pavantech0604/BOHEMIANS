import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLayout } from '../../layouts/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Card, Button, Badge } from '../../components/ui';
import { Calendar, Users, Clock, CheckCircle2, XCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

interface Reservation {
  id: string;
  customer_name: string;
  email: string;
  guests: string;
  date: string;
  time: string;
  note: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true });
    
    if (data) setReservations(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);
    fetchReservations();
  };

  const filteredReservations = reservations.filter(res => 
    filter === 'all' ? true : res.status === filter
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-5xl font-black font-headline uppercase leading-none tracking-tighter">Guest List</h2>
            <p className="text-on-surface/40 mt-2 font-medium">Coordinate the social pulse of the salon.</p>
          </div>
          <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-stone-200/10">
            {['all', 'pending', 'confirmed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface/40 hover:text-on-surface'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="font-headline font-black uppercase tracking-widest text-xs opacity-40">Polling guest lists...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {filteredReservations.map((res, i) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card variant="low" className="p-8 border border-stone-200/10 hover:bg-surface-container-low transition-all group rounded-[2.5rem]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="flex gap-8 items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${
                          res.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                          res.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-stone-500/10 text-stone-500'
                        }`}>
                          <Users size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-1">
                            <h3 className="text-2xl font-black font-headline uppercase tracking-tighter">{res.customer_name}</h3>
                            <Badge variant={res.status === 'confirmed' ? 'primary' : 'tertiary'}>{res.status}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-6 mt-2">
                             <span className="flex items-center gap-2 text-xs font-bold text-on-surface/60">
                               <Calendar size={14} className="text-primary" /> {new Date(res.date).toLocaleDateString()}
                             </span>
                             <span className="flex items-center gap-2 text-xs font-bold text-on-surface/60">
                               <Clock size={14} className="text-primary" /> {res.time}
                             </span>
                             <span className="flex items-center gap-2 text-xs font-bold text-on-surface/60">
                               <Users size={14} className="text-primary" /> {res.guests} Guests
                             </span>
                             <span className="flex items-center gap-2 text-xs font-bold text-on-surface/60 truncate max-w-xs">
                               <Mail size={14} className="text-primary" /> {res.email}
                             </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 self-end md:self-center">
                        {res.status === 'pending' && (
                          <Button 
                            variant="primary" 
                            size="md" 
                            className="rounded-xl px-6"
                            onClick={() => updateStatus(res.id, 'confirmed')}
                          >
                            <CheckCircle2 size={18} className="mr-2" /> Confirm
                          </Button>
                        )}
                        <Button 
                          variant="surface" 
                          size="md" 
                          className="rounded-xl px-6 text-error hover:bg-error/10 border-none"
                          onClick={() => updateStatus(res.id, 'cancelled')}
                        >
                          <XCircle size={18} className="mr-2" /> Cancel
                        </Button>
                      </div>
                    </div>
                    {res.note && (
                      <div className="mt-6 pt-6 border-t border-stone-200/10 flex gap-4">
                        <AlertCircle size={16} className="text-secondary shrink-0 mt-1" />
                        <p className="text-sm italic text-on-surface/60 font-medium">"{res.note}"</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredReservations.length === 0 && (
              <div className="text-center py-32 bg-surface-container-low rounded-[3rem] border border-dashed border-stone-200/20">
                <p className="font-headline font-black uppercase text-xl opacity-20 tracking-tighter">No reservations found for this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReservations;
