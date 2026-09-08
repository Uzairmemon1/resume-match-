import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Check } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: connect to real auth backend later
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center" />
          <h2 className="text-xl font-bold text-zinc-900">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-xs text-zinc-500">
            {mode === 'login' 
              ? 'Log in to view saved ATS reports and templates.' 
              : 'Join ResumeMatch to unlock salary insights and resume tools.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-zinc-100 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => { setMode('login'); setSubmitted(false); }}
            className={`flex-1 py-2 rounded-md transition-all ${
              mode === 'login' 
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setSubmitted(false); }}
            className={`flex-1 py-2 rounded-md transition-all ${
              mode === 'signup' 
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Success Feedback */}
        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span className="font-semibold">
              {mode === 'login' ? 'Logged in successfully! (Demo)' : 'Account created! (Demo)'}
            </span>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-800 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-800 block">
                  Password
                </label>
                {mode === 'login' && (
                  <span className="text-[11px] text-[#2563EB] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <p className="text-center text-[11px] text-zinc-400 pt-1">
              {/* TODO: connect to real auth backend later */}
              Demo Authentication Interface • No backend required
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
