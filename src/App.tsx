import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { HistoryPage } from './pages/History';
import { About } from './pages/About';
import { Templates } from './pages/Templates';
import { SalaryCalculator } from './pages/SalaryCalculator';
import { ResumeGenerator } from './pages/ResumeGenerator';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-[#2563EB] selection:text-white">
        
        {/* Sticky Minimal Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/salary-calculator" element={<SalaryCalculator />} />
            <Route path="/resume-generator" element={<ResumeGenerator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Multi-Column Modern Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;
