/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Exchange from './components/Exchange'; // Platform & Experience
import Learn from './components/Learn'; // Vision
import Community from './components/Community'; // Stakeholders
import About from './components/About'; // The Story
import Footer from './components/Footer';
import InfoPage from './components/InfoPage';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import NewsletterModal from './components/NewsletterModal';
import { PAPERS } from './constants';
import { Paper } from './types';

// Simple Toast Component with 3D styling
const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10002] bg-[#4A4A4A] text-white px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center gap-3 animate-fade-in-up font-bold text-sm border-2 border-[#F8E9DD]">
       <div className="w-3 h-3 bg-[#FFD447] rounded-full animate-pulse shadow-[0_0_10px_#FFD447]"></div>
       <span>{message}</span>
    </div>
  );
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<{type: string, pageId?: string}>({ type: 'home' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [savedPaperIds, setSavedPaperIds] = useState<string[]>([]);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const handleScrollToSection = (targetId: string) => {
    if (targetId === 'newsletter') {
      setIsNewsletterOpen(true);
      return;
    }

    if (viewState.type !== 'home') {
      setViewState({ type: 'home' });
      // Wait for render to switch back to home before scrolling
      setTimeout(() => {
        if (targetId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.getElementById(targetId);
            el?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
        if (targetId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.getElementById(targetId);
            el?.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handleBeginJourney = () => {
    handleScrollToSection('modules');
  };

  const handleProductClick = (paper: Paper) => {
      setSelectedPaper(paper);
      setViewState({ type: 'paper' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
      setViewState({ type: 'home' });
      // Restore scroll to modules
      setTimeout(() => {
        const el = document.getElementById('modules');
        el?.scrollIntoView({ behavior: 'auto' });
      }, 50);
  };

  const handleToggleSave = (paper: Paper) => {
      setSavedPaperIds(prev => {
          const isSaved = prev.includes(paper.id);
          const newSaved = isSaved ? prev.filter(id => id !== paper.id) : [...prev, paper.id];
          setToastMessage(isSaved ? "Removed from saved modules" : "Module saved to library");
          return newSaved;
      });
  };

  const handleNewsletterSubmit = (data: { firstName: string; lastName: string; email: string }) => {
     setToastMessage(`Demo confirmation sent to ${data.email}.`);
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    
    // Explicitly do nothing for Privacy, Terms, Security, and Careers as requested
    if (['security', 'privacy', 'terms', 'careers'].includes(targetId)) {
        return;
    }

    if (['help', 'api', 'fees'].includes(targetId)) {
        setViewState({ type: 'info', pageId: targetId });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       // Mapping for footer links to sections
       const sectionMap: Record<string, string> = {
         'about': 'story',
         'vision': 'vision',
         'contact': 'newsletter', // Redirect contact to newsletter for now based on request
         'schools': 'schools',
         'families': 'families',
         'governments': 'governments',
         'story': 'story',
         'platform': 'platform'
       };
       handleScrollToSection(sectionMap[targetId] || 'hero');
    }
  };

  return (
    <div className="bg-[#F8E9DD] min-h-screen text-[#4A4A4A] selection:bg-[#FFB673] selection:text-white flex flex-col relative">
      <Navbar onNavClick={handleScrollToSection} />
      
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <NewsletterModal 
        isOpen={isNewsletterOpen} 
        onClose={() => setIsNewsletterOpen(false)} 
        onSubmit={handleNewsletterSubmit} 
      />

      {viewState.type === 'home' && (
        <main>
            <div id="hero"><Hero onBegin={handleBeginJourney} /></div>
            <div id="story"><About /></div>
            <div id="platform"><Exchange /></div>
            <div id="modules">
                <ProductGrid 
                    papers={PAPERS}
                    onProductClick={handleProductClick}
                    onUpvote={() => {}} 
                    userUpvotes={[]}
                    onPublisherClick={() => {}}
                    onToggleSave={handleToggleSave}
                    savedPaperIds={savedPaperIds}
                    activeCategory={"All"}
                    setActiveCategory={() => {}}
                />
            </div>
            <div id="vision"><Learn onBegin={handleBeginJourney} /></div>
            <div id="community"><Community /></div>
        </main>
      )}

      {viewState.type === 'paper' && selectedPaper && (
        <ProductDetail 
            product={selectedPaper}
            relatedPapers={PAPERS.filter(p => p.id !== selectedPaper.id).slice(0,3)}
            onBack={handleBackFromDetail}
            onToggleSave={handleToggleSave}
            isSaved={savedPaperIds.includes(selectedPaper.id)}
            onProductClick={handleProductClick}
        />
      )}

      {viewState.type === 'info' && viewState.pageId && (
          <InfoPage pageId={viewState.pageId} />
      )}

      <div id="footer">
        <Footer onLinkClick={handleFooterLinkClick} />
      </div>
    </div>
  );
};

export default App;