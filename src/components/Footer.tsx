import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/70 text-zinc-600 text-xs mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Logo & Tagline (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <Logo size="md" />
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
              The intelligent, privacy-first ATS resume matching tool. Optimize your resume keywords, benchmark compensation, and land more recruiter callbacks.
            </p>
            <p className="text-[11px] text-zinc-400">
              © 2026 ResumeMatch. All rights reserved.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/analyze" className="hover:text-[#2563EB] transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/salary-calculator" className="hover:text-[#2563EB] transition-colors">
                  AI Salary Calculator
                </Link>
              </li>
              <li>
                <Link to="/resume-generator" className="hover:text-[#2563EB] transition-colors">
                  AI Resume Generator
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#2563EB] transition-colors">
                  Resume Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-[#2563EB] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert('For inquiries: contact@resumematch.demo'); }} className="hover:text-[#2563EB] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => { e.preventDefault(); alert('We are currently expanding our team!'); }} className="hover:text-[#2563EB] transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/history" className="hover:text-[#2563EB] transition-colors">
                  Analysis History
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2563EB] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about#faq" className="hover:text-[#2563EB] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 mt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-zinc-400">
            Designed with minimal precision • 100% Client-Side Privacy
          </p>

          <div className="flex items-center gap-3 text-zinc-400">
            {/* GitHub */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-md hover:text-zinc-800 hover:bg-zinc-200/60 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-md hover:text-zinc-800 hover:bg-zinc-200/60 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-md hover:text-zinc-800 hover:bg-zinc-200/60 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z"/>
              </svg>
            </a>

            {/* Mail */}
            <a 
              href="mailto:support@resumematch.demo" 
              className="p-1.5 rounded-md hover:text-zinc-800 hover:bg-zinc-200/60 transition-colors"
              aria-label="Email Support"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
