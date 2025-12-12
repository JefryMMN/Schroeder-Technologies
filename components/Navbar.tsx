/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  // Handle scroll effect and resize
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      // Changed from 768 to 1024 to support tablets in mobile view
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { label: 'The Story', id: 'story' },
    { label: 'The Platform', id: 'platform' },
    { label: 'For Schools', id: 'schools' },
    { label: 'For Families', id: 'families' },
    { label: 'For Governments', id: 'governments' },
    { label: 'Vision', id: 'vision' },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      {/* Changed hidden md:flex to hidden lg:flex to hide on tablets */}
      <nav 
        className={`hidden lg:flex py-4 px-6 md:px-12 items-center justify-center sticky top-0 z-[50] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled 
            ? 'bg-[#F8E9DD]/85 backdrop-blur-xl shadow-sm py-3 border-b border-white/40' 
            : 'bg-transparent py-6'
        }`}
      >
        
        {/* Brand Container - Absolute Left to prevent layout shift */}
        <div 
          className={`absolute left-6 md:left-12 cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] z-10 ${
             isHoveringNav ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'
          }`}
          onClick={() => onNavClick('hero')}
        >
          <span className="font-extrabold text-2xl text-[#4A4A4A] tracking-tight group-hover:text-[#6A4FBF] transition-colors whitespace-nowrap">Schroeder</span>
        </div>

        {/* Desktop Nav Items - Center Interactive 3D Island */}
        <div 
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
            className={`
                hidden lg:flex items-center gap-1 p-2 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] relative z-20
                ${isHoveringNav 
                    ? 'shadow-[12px_12px_24px_rgba(211,198,188,0.6),-12px_-12px_24px_rgba(255,255,255,0.8)] bg-[#F8E9DD] scale-105 border-white/60 px-6' 
                    : 'shadow-[inset_2px_2px_4px_rgba(211,198,188,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] bg-[#F8E9DD]/40 border-white/20'
                }
            `}
        >
          {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`
                    relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 overflow-hidden group
                    ${isHoveringNav 
                        ? 'text-[#4A4A4A] hover:bg-white hover:text-[#6A4FBF] hover:shadow-md' 
                        : 'text-[#4A4A4A]/80 hover:text-[#6A4FBF]'
                    }
                `}
              >
                  <span className="relative z-10">{item.label}</span>
              </button>
          ))}
        </div>

        {/* Actions - Absolute Right to prevent layout shift */}
        <div className={`absolute right-6 md:right-12 hidden lg:flex items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-10 ${isHoveringNav ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
           <button 
             onClick={() => onNavClick('newsletter')}
             className="clay-button px-8 py-3 text-sm bg-[#4A4A4A] text-[#F8E9DD] hover:bg-[#6A4FBF] hover:text-white shadow-[6px_6px_12px_#d3c6bc,-6px_-6px_12px_#ffffff] relative overflow-hidden group"
           >
             <span className="relative z-10">Stay Updated</span>
           </button>
        </div>
      </nav>


      {/* --- MOBILE NAVBAR (Floating 3D Pill) --- */}
      {/* Changed md:hidden to lg:hidden to show on tablets */}
      <div className="lg:hidden fixed top-6 left-4 right-4 z-[100] flex flex-col items-center perspective-[1000px]">
         
         {/* The Pill - Highly Tactile 3D Object */}
         <div 
            className={`w-full h-[72px] rounded-[36px] flex justify-between items-center px-8 transition-all duration-500 ease-out transform-style-3d ${
             isMobileMenuOpen 
               ? 'bg-[#F8E9DD] shadow-[15px_15px_35px_rgba(0,0,0,0.1),-15px_-15px_35px_rgba(255,255,255,0.8)] scale-[1.02]' 
               : 'bg-[#F8E9DD]/80 backdrop-blur-xl shadow-[8px_8px_20px_rgba(166,145,129,0.2),-8px_-8px_20px_rgba(255,255,255,0.9)] border border-white/40'
            }`}
         >
             
             {/* Brand - Text Only */}
             <div className="flex items-center cursor-pointer" onClick={() => { onNavClick('hero'); setIsMobileMenuOpen(false); }}>
                 <span className="font-extrabold text-xl text-[#4A4A4A] tracking-tight hover:text-[#6A4FBF] transition-colors">
                    Schroeder
                 </span>
             </div>

             {/* Interactive Hamburger Button */}
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex flex-col items-end justify-center gap-1.5 focus:outline-none group active:scale-90 transition-transform"
                aria-label="Menu"
             >
                <span 
                    className={`h-[3px] bg-[#4A4A4A] rounded-full transition-all duration-300 ease-out ${
                        isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[9px] bg-[#6A4FBF]' : 'w-6 group-hover:w-8'
                    }`}
                ></span>
                <span 
                    className={`h-[3px] bg-[#4A4A4A] rounded-full transition-all duration-300 ease-out ${
                        isMobileMenuOpen ? 'opacity-0 w-8 translate-x-4' : 'w-4 group-hover:w-8'
                    }`}
                ></span>
                <span 
                    className={`h-[3px] bg-[#4A4A4A] rounded-full transition-all duration-300 ease-out ${
                        isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[9px] bg-[#6A4FBF]' : 'w-6 group-hover:w-8'
                    }`}
                ></span>
             </button>
         </div>

         {/* Mobile Menu Dropdown - Floating Card with Spring Animation */}
         <div 
            className={`absolute top-[84px] w-full rounded-[32px] bg-[#F8E9DD] border border-white/60 shadow-[20px_20px_60px_#d3c6bc,-20px_-20px_60px_#ffffff] p-3 flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top ${
                isMobileMenuOpen 
                ? 'opacity-100 scale-100 translate-y-0 visible' 
                : 'opacity-0 scale-90 -translate-y-8 invisible pointer-events-none'
            }`}
         >
             {/* Added max-height and overflow for scrolling on landscape phones/small tablets */}
             <div className="p-2 space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar">
                 {navItems.map((item, idx) => (
                    <button 
                        key={item.id}
                        className="w-full text-left py-4 px-6 rounded-2xl text-[#4A4A4A] font-bold text-lg transition-all duration-200 bg-transparent hover:bg-white/60 hover:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.05)] hover:text-[#6A4FBF] hover:pl-8 flex justify-between items-center group active:scale-[0.98]"
                        style={{ transitionDelay: `${idx * 40}ms` }}
                        onClick={() => {
                            onNavClick(item.id);
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        {item.label}
                        <div className="w-8 h-8 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-300 group-hover:shadow-sm">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#6A4FBF] transform -translate-x-2 group-hover:translate-x-0 transition-all">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                           </svg>
                        </div>
                    </button>
                 ))}
             </div>
             
             <div className="h-px bg-gradient-to-r from-transparent via-[#4A4A4A]/10 to-transparent my-1"></div>
             
             <div className="p-2">
                <button 
                    onClick={() => {
                        onNavClick('newsletter');
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-4 rounded-2xl bg-[#4A4A4A] text-white font-bold text-lg shadow-[5px_5px_10px_#b8b2ce,-5px_-5px_10px_#ffffff] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all hover:bg-[#6A4FBF]"
                >
                    Stay Updated
                </button>
             </div>
         </div>
      </div>
    </>
  );
};

export default Navbar;