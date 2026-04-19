import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingBag, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Bell, 
  PlusCircle,
  LogOut
} from 'lucide-react';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Operations', path: '/admin', icon: LayoutDashboard },
    { name: 'Reservations', path: '/admin/reservations', icon: Calendar },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Menu', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Inventory', path: '/admin/inventory', icon: ClipboardList },
    { name: 'Staff', path: '/admin/staff', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-surface flex overflow-hidden font-body">
      {/* Sidebar Anchor */}
      <aside className="w-72 bg-surface flex flex-col border-r border-stone-200/30 z-40 fixed inset-y-0 left-0">
        <div className="px-6 py-2 border-b border-stone-200/5 bg-surface-container-low/20">
          <div className="flex items-center justify-center -mb-4 -mt-2">
            <img 
              src="/src/assets/logo-black.png" 
              alt="Bohemians Logo" 
              className="h-32 w-auto object-contain transition-all duration-700 hover:scale-105 hover:-translate-y-1 cursor-pointer"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/30 text-center relative z-10">Admin Control</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-r-full mr-4 transition-all duration-300 font-bold text-sm ${
                location.pathname === item.path 
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105" 
                  : "text-on-surface/60 hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              <item.icon size={20} />
              <span className="tracking-tight uppercase">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full py-5 bg-primary text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(180,0,101,0.2)] hover:scale-102 transition-all">
            <PlusCircle size={18} />
            New Event
          </button>
          
          <div className="mt-8 flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" 
              alt="Admin" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-on-surface truncate">Admin User</p>
              <p className="text-[10px] uppercase font-bold text-on-surface/40">Manager Profile</p>
            </div>
            <button className="text-on-surface/40 hover:text-primary transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 ml-72 min-h-screen overflow-y-auto relative p-12">
        <header className="flex justify-between items-center mb-16 h-20">
          <div>
            <h2 className="font-headline text-5xl font-black text-on-background tracking-tighter uppercase leading-none">Daily Pulse</h2>
            <div className="flex items-center gap-3 mt-4">
                <span className="flex items-center gap-2">
                  <span className="brand-mention text-[10px]">Bohemians</span>
                  <span className="text-secondary font-black uppercase tracking-widest text-xs">Social House</span>
                </span>
                <span className="text-on-surface/30">|</span>
               <span className="text-on-surface/60 font-medium text-xs">Friday, May 24</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-surface-container-high px-6 py-3 rounded-full flex items-center gap-3 border border-outline-variant/10">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
              <span className="text-xs font-black uppercase tracking-widest">System Online</span>
            </div>
            <button className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
              <Bell size={20} />
            </button>
          </div>
        </header>

        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};
