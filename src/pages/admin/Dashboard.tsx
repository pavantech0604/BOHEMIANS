import { motion } from 'framer-motion';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Card } from '../../components/ui';
import { 
  TrendingUp, 
  Banknote, 
  Table2, 
  Zap, 
  Utensils, 
  CheckCircle2, 
  AlertTriangle, 
  PartyPopper 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Stats Bento Grid - Visibility Overhaul for Revenue and Reservations */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4"
          >
            <Card className="bg-primary text-on-primary p-10 h-full flex flex-col justify-between shadow-2xl shadow-primary/30 relative overflow-hidden group border-none">
              <div className="relative z-10">
                <Banknote size={40} className="mb-6 opacity-90" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Today's Revenue</p>
                <h3 className="text-5xl font-black font-headline tracking-tighter mt-2 leading-none text-white">₹82,482.00</h3>
              </div>
              <div className="mt-8 flex items-center gap-2 z-10 text-[10px] font-black uppercase tracking-widest text-white/80">
                <TrendingUp size={16} />
                <span>+14.2% from yesterday</span>
              </div>
              <Banknote size={240} className="absolute -right-16 -bottom-16 opacity-10 group-hover:scale-110 transition-transform duration-[2s] ease-out" />
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4"
          >
            <Card className="bg-secondary text-on-secondary p-10 h-full flex flex-col justify-between shadow-2xl shadow-secondary/30 relative overflow-hidden group border-none">
              <div className="relative z-10">
                <Table2 size={40} className="mb-6 opacity-90" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Total Reservations</p>
                <h3 className="text-5xl font-black font-headline tracking-tighter mt-2 leading-none text-white">142</h3>
              </div>
              <p className="mt-8 text-[10px] font-black uppercase tracking-widest z-10 text-white/80">88% Capacity reached</p>
              <Table2 size={240} className="absolute -right-16 -bottom-16 opacity-10 group-hover:scale-110 transition-transform duration-[2s] ease-out" />
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-12 lg:col-span-4"
          >
            <Card variant="high" className="p-10 h-full flex flex-col justify-between border-b-8 border-primary/20">
              <div>
                <div className="flex justify-between items-start">
                  <Zap size={40} className="text-primary" />
                  <span className="bg-primary text-on-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Live Now</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 mt-6">Active Orders</p>
                <h3 className="text-5xl font-black font-headline tracking-tighter text-on-surface mt-2 leading-none">18</h3>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span>Main Salon</span>
                  <span>12</span>
                </div>
                <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[66%] transition-all duration-1000 ease-out" />
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Floor Status Map */}
          <div className="md:col-span-12 lg:col-span-8">
            <Card variant="lowest" className="p-6 md:p-10 shadow-sm border border-stone-200/20 h-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <h4 className="font-headline text-3xl font-black tracking-tighter uppercase">Main Floor Status</h4>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#B40065]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-surface-container-high border border-stone-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Available</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8 h-auto md:h-96 relative">
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(n => (
                    <div 
                      key={n}
                      className={`${n % 2 === 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface/30'} aspect-square rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer p-4`}
                    >
                      <span className="text-sm font-black uppercase tracking-tighter">B{n}</span>
                      <span className="text-[10px] font-bold opacity-60">{n * 2} PAX</span>
                    </div>
                  ))}
                </div>
                <div className="col-span-2 md:col-span-4 bg-surface-container-low rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-2 border-stone-200/20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`${i % 3 === 0 ? 'bg-primary/20 border-2 border-primary border-dashed text-primary' : 'bg-primary text-on-primary'} aspect-square rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer p-4`}
                    >
                      <span className="text-xs font-black uppercase tracking-tighter">T{i+1}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-4 md:bottom-4 right-0 md:right-4 bg-secondary text-on-secondary rounded-2xl px-6 md:px-8 py-4 flex items-center gap-6 shadow-2xl scale-90 md:scale-100">
                   <div className="font-headline font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">Bar Lounge</div>
                   <div className="flex gap-1.5">
                     {[1,2,3,4].map(n => <div key={n} className={`w-2 h-2 rounded-full ${n===1 ? 'bg-on-secondary' : 'bg-on-secondary/30'}`} />)}
                   </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="md:col-span-12 lg:col-span-4">
            <Card variant="high" className="p-10 h-full">
              <h4 className="font-headline text-3xl font-black tracking-tighter uppercase mb-10">Operations Log</h4>
              <div className="space-y-10">
                {[
                  { icon: Utensils, label: 'Table 12 Ordered', sub: 'Railway Mutton x2, Red Wine...', time: '2 mins ago', color: 'text-primary', bg: 'bg-primary/10' },
                  { icon: CheckCircle2, label: 'Table 4 Paid', sub: 'Invoice #8842 - ₹3400.50', time: '14 mins ago', color: 'text-secondary', bg: 'bg-secondary/10' },
                  { icon: AlertTriangle, label: 'Inventory Alert', sub: 'House White Wine is low', time: '38 mins ago', color: 'text-error', bg: 'bg-error/10' },
                  { icon: PartyPopper, label: 'New Booking', sub: 'VIP Birthday - 12 Guests', time: '1 hour ago', color: 'text-primary', bg: 'bg-primary/10' }
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-full ${log.bg} flex items-center justify-center shrink-0`}>
                      <log.icon className={log.color} size={20} />
                    </div>
                    <div className="border-b border-stone-200/30 flex-1 pb-4">
                      <p className="text-sm font-black text-on-surface uppercase tracking-tight">{log.label}</p>
                      <p className="text-xs text-on-surface-variant italic mt-1">{log.sub}</p>
                      <span className="text-[10px] font-black uppercase text-on-surface/30 mt-2 block">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Promotion Highlight */}
        <section className="bg-stone-950 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-surface relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Marketing & Events</span>
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mt-8 leading-[0.85]">THE ELECTRIC <br /> NEON NIGHTS</h2>
              <p className="text-stone-400 mt-8 text-base md:text-lg max-w-md leading-relaxed opacity-80">Boost Tuesday revenue by launching the "Electric Hours" drink promotion. Predicted growth: +18%.</p>
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <button className="bg-surface text-stone-950 px-10 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-white hover:scale-105 transition-all w-fit">
                  Launch Campaign
                </button>
                <button className="border border-surface/20 px-10 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-surface/10 transition-all w-fit">
                  View Assets
                </button>
              </div>
            </div>
            <div className="relative aspect-video">
               <img 
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Promotion" 
               />
               <div className="absolute -top-6 -left-6 bg-primary p-6 rounded-tl-[3rem] rounded-br-[3rem] font-headline font-black text-2xl italic shadow-2xl skew-x-[-10deg]">HOT!</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 font-headline font-black text-[150px] md:text-[300px] leading-none text-white/5 pointer-events-none select-none -translate-y-10 md:-translate-y-20 translate-x-10 md:translate-x-20">BHM</div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
