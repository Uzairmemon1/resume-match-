import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const productLinks = [
    { name: 'Resume Analyzer', path: '/analyze', description: 'Scan & score ATS keyword match' },
    { name: 'AI Salary Calculator', path: '/salary-calculator', description: 'Estimate market compensation' },
    { name: 'AI Resume Generator', path: '/resume-generator', description: 'Generate formatted ATS resume' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo (left side) */}
            <div className="flex items-center gap-8">
              <Logo />

              {/* Desktop Navigation Links (Text-only, no icons) */}
              <nav className="hidden md:flex items-center space-x-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/templates"
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`
                  }
                >
                  Templates
                </NavLink>

                {/* Product Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                    onMouseEnter={() => setProductDropdownOpen(true)}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors focus:outline-none"
                    aria-expanded={productDropdownOpen}
                  >
                    <span>Product</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productDropdownOpen ? 'rotate-180 text-zinc-900' : 'text-zinc-400'}`} />
                  </button>

                  {productDropdownOpen && (
                    <div 
                      onMouseLeave={() => setProductDropdownOpen(false)}
                      className="absolute top-full left-0 mt-1 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      {productLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setProductDropdownOpen(false)}
                          className="block px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors group"
                        >
                          <p className="text-xs font-semibold text-zinc-800 group-hover:text-[#2563EB] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/analyze"
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`
                  }
                >
                  Analyze
                </NavLink>
              </nav>
            </div>

            {/* Right Side: User Authentication Placeholder */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-blue-700 text-white transition-colors shadow-xs"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile hamburger menu button */}
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-2 pb-5 space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'
                }`
              }
            >
              Templates
            </NavLink>

            {/* Product Mobile Section */}
            <div className="py-1 border-y border-zinc-100 my-1 space-y-0.5">
              <p className="px-3 py-1 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Product Tools
              </p>
              {productLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-sm text-zinc-700 hover:bg-zinc-50 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'
                }`
              }
            >
              Analyze
            </NavLink>

            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="w-full py-2 px-3 rounded-lg border border-zinc-200 text-zinc-800 text-xs font-semibold hover:bg-zinc-50"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="w-full py-2 px-3 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};
