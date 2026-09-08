import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { HistoryPage } from './pages/History';
import { About } from './pages/About';
import { Target, Heart } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Glass Footer */}
        <footer className="bg-slate-950/80 border-t border-slate-800/80 py-8 text-xs text-slate-400 mt-auto backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Target className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-white">ResumeMatch</span>
              <span>— Modern AI ATS Engine</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 font-semibold">
              <span>100% Client-Side Privacy</span>
              <span>•</span>
              <span className="flex items-center gap-1">Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Job Seekers</span>
            </div>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
};

export default App;
