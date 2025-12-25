
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import SymptomGuide from './components/SymptomGuide';
import ChatInterface from './components/ChatInterface';
import HealthLibrary from './components/HealthLibrary';
import HistoryView from './components/HistoryView';
import Login from './components/Login';
import { User, SeverityLevel } from './types';

type AppView = 'home' | 'guide' | 'chat' | 'library' | 'history';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [lastAssessment, setLastAssessment] = useState<{ severity: SeverityLevel; summary: string } | null>(null);

  useEffect(() => {
    // Simulate system initialization
    const timer: number = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  const handleLogin = (studentId: string, name: string): void => {
    setUser({
      studentId,
      name,
      department: 'Faculty of Information Technology',
      points: 50,
      level: 1,
      badges: ['Access Verified']
    });
    setShowWelcome(true);
  };

  const handleAssessmentComplete = (severity: SeverityLevel, summary: string): void => {
    setLastAssessment({ severity, summary });
    if (severity === 'high') {
      setCurrentView('chat');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D9488] text-white max-w-md mx-auto relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <div className="w-28 h-28 bg-white rounded-[3rem] flex items-center justify-center shadow-2xl mb-8 transition-transform hover:scale-105 duration-500">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#0D9488] fill-none stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Care4U</h1>
          <p className="text-teal-100 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Health Support System</p>
          <div className="mt-12 flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = (): React.ReactElement => {
    switch (currentView) {
      case 'home':
        return <Home user={user} onNavigate={(view: AppView) => setCurrentView(view)} hasSymptoms={selectedSymptomIds.length > 0} />;
      case 'guide':
        return (
          <SymptomGuide 
            selectedIds={selectedSymptomIds} 
            onToggleSymptom={(id: string) => setSelectedSymptomIds((prev: string[]) => prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id])} 
            onAssessmentComplete={handleAssessmentComplete}
          />
        );
      case 'chat':
        return <ChatInterface user={user} initialSymptoms={selectedSymptomIds} />;
      case 'library':
        return <HealthLibrary />;
      case 'history':
        return <HistoryView user={user} />;
      default:
        return <Home user={user} onNavigate={(view: AppView) => setCurrentView(view)} hasSymptoms={selectedSymptomIds.length > 0} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 max-w-md mx-auto shadow-2xl relative overflow-x-hidden border-x border-slate-100">
      <Header onLogout={() => setUser(null)} />
      
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-lg">
          <div className="bg-white rounded-[4rem] p-12 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-500 text-center relative overflow-hidden border border-slate-100">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#0D9488] to-[#0065B3]"></div>
            <div className="w-24 h-24 bg-teal-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-teal-100 shadow-inner">
              <span className="text-5xl animate-bounce">👋</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Verified Access</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 font-bold opacity-80">
              Your digital health twin is now active. Care4U is providing quick, simple, and reliable health support for your recovery.
            </p>
            <button 
              onClick={() => setShowWelcome(false)}
              className="w-full bg-[#0D9488] text-white py-6 rounded-[2.25rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-teal-600/30 active:scale-95 transition-all"
            >
              Enter Hub
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 pb-32 overflow-y-auto pt-28 px-6 custom-scrollbar animate-in fade-in duration-700">
        {renderView()}
      </main>
      
      <BottomNav activeView={currentView} onNavigate={(view: string) => setCurrentView(view as AppView)} />
      
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-white/20 pointer-events-none backdrop-blur-sm z-40"></div>
    </div>
  );
};

export default App;
