import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Scan, History, Home } from 'lucide-react';
import { cn } from '../components/ui/Button';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scan', icon: Scan, label: 'Scan' },
    { path: '/history', icon: History, label: 'History' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 glass rounded-2xl flex items-center gap-2 border-white/20 shadow-2xl backdrop-blur-xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              isActive ? "bg-primary text-black font-bold glow-primary" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => (
  <header className="fixed top-0 inset-x-0 z-40 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-background/50">
    <Link to="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center p-2 glow-primary">
        <Shield className="w-full h-full text-black stroke-[2.5]" />
      </div>
      <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">
        QRypt
      </span>
    </Link>
    
    <div className="hidden sm:flex items-center gap-6">
      <span className="text-[10px] font-bold tracking-[0.2em] text-text-secondary uppercase">
        Context-Aware Security
      </span>
    </div>
  </header>
);

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-primary/2 blur-[100px] rounded-full" />
      </div>

      <Header />
      
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {children}
      </main>

      <Navbar />
    </div>
  );
};

export default MainLayout;
