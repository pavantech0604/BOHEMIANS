import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/customer/Home.tsx';
import Menu from './pages/customer/Menu.tsx';
import Gallery from './pages/customer/Gallery.tsx';
import Reservations from './pages/customer/Reservations.tsx';
import Events from './pages/customer/Events.tsx';
import Dashboard from './pages/admin/Dashboard.tsx';
import AdminMenu from './pages/admin/AdminMenu.tsx';
import AdminReservations from './pages/admin/AdminReservations.tsx';
import AdminOrders from './pages/admin/AdminOrders.tsx';
import AdminGallery from './pages/admin/AdminGallery.tsx';

// Curtain Transition Wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Customer Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/reservations" element={<PageWrapper><Reservations /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/admin/menu" element={<PageWrapper><AdminMenu /></PageWrapper>} />
        <Route path="/admin/reservations" element={<PageWrapper><AdminReservations /></PageWrapper>} />
        <Route path="/admin/orders" element={<PageWrapper><AdminOrders /></PageWrapper>} />
        <Route path="/admin/gallery" element={<PageWrapper><AdminGallery /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <div className="bg-grain" />
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
