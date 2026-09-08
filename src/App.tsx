import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { HistoryPage } from './pages/History';
import { About } from './pages/About';
import { FileText } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        
        {/* Minimal Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Minimal Clean Footer */}
        <footer className="border-t border-zinc-200 py-6 text-xs text-zinc-500 bg-white mt-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-zinc-900 flex items-center justify-center text-white">
                <FileText className="w-3 h-3" />
              </div>
              <span className="font-semibold text-zinc-800">ResumeMatch</span>
              <span>— Clean ATS Resume Matcher</span>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-400">
              <span>100% Client-Side Privacy</span>
              <span>•</span>
              <span>No Server Uploads</span>
            </div>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
};

export default App;
