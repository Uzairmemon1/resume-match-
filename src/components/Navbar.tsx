import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FileText, FileSearch, History, Info, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: FileText },
    { name: 'Analyze', path: '/analyze', icon: FileSearch },
    { name: 'History', path: '/history', icon: History },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Minimalist Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-zinc-900">
                Resume<span className="text-zinc-600">Match</span>
              </span>
              <span className="text-[11px] font-medium text-zinc-600 px-1.5 py-0.5 rounded bg-zinc-100">
                ATS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-zinc-600" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Clean Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
            >
              <span>Scan Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300" />
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-zinc-600" />
                {item.name}
              </NavLink>
            );
          })}
          <div className="pt-2">
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-900 text-white font-medium text-sm rounded-lg"
            >
              <span>Scan Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
