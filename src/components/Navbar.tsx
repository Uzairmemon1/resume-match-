import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Target, FileSearch, History, Info, Menu, X, Sparkles, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: Target },
    { name: 'Analyze', path: '/analyze', icon: FileSearch },
    { name: 'History', path: '/history', icon: History },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo with Vibrant Gradient */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all duration-300">
              <Target className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white flex items-center gap-1">
                Resume<span className="text-gradient-primary">Match</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400 -mt-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-indigo-400 inline animate-pulse" /> ATS AI Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/analyze"
              className="relative group px-5 py-2.5 rounded-xl font-bold text-xs text-white overflow-hidden shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 group-hover:opacity-90 transition-opacity" />
              <div className="relative flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-white/20" />
                <span>Check Resume Now</span>
              </div>
            </Link>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-white border border-indigo-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-indigo-400" />
                {item.name}
              </NavLink>
            );
          })}
          <div className="pt-3">
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm text-center rounded-xl shadow-lg shadow-indigo-600/40"
            >
              <Zap className="w-4 h-4" />
              Analyze Resume Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
