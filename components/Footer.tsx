/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { BRAND_NAME } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Very subtle tilt for the massive footer block
    const rotateY = ((x - centerX) / centerX) * 1.5; 
    const rotateX = ((centerY - y) / centerY) * 1.5;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ 
        x: (x / rect.width) * 100, 
        y: (y / rect.height) * 100,
        opacity: 0.3
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <footer id="footer" className="relative bg-[#F8E9DD] overflow-hidden pt-20 perspective-[2000px]">
        
        {/* PART 1: Massive Floating Brand Text with Parallax Feel */}
        <div className="w-full px-6 mb-12 relative z-0">
             <div className="max-w-[1400px] mx-auto text-center md:text-left select-none pointer-events-none transform-style-3d">
                <h2 
                    className="text-[13vw] leading-[0.8] font-extrabold tracking-tighter text-transparent bg-clip-text bg-cover bg-center animate-float-delayed drop-shadow-2xl pb-6"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop')",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        filter: 'contrast(1.2)'
                    }}
                >
                    Schroeder
                </h2>
                <h2 
                    className="text-[10vw] leading-[0.8] font-extrabold tracking-tighter text-transparent bg-clip-text bg-cover bg-center md:ml-12 animate-float pb-12"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop')",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        filter: 'contrast(1.2)'
                    }}
                >
                    Technologies
                </h2>
             </div>
        </div>

        {/* PART 2: 3D Interactive Gradient Block */}
        <div className="px-4 pb-4 relative z-10">
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-[40px] md:rounded-[60px] transition-transform duration-100 ease-out transform-style-3d text-[#F8E9DD]"
                style={{
                    transform: `perspective(2000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {/* 
                   Background Layer: Separated to handle overflow:hidden (clipping blobs/glare) 
                   without flattening the 3D context of the interactive content.
                   Added pointer-events-none to ensure clicks pass through to content if it overlaps.
                */}
                <div className="absolute inset-0 rounded-[40px] md:rounded-[60px] overflow-hidden bg-[#6A4FBF] shadow-[0_30px_60px_rgba(106,79,191,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none z-0">
                     {/* Dynamic Glare Effect */}
                    <div 
                        className="absolute inset-0 mix-blend-soft-light transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                            opacity: glare.opacity
                        }}
                    />
                     {/* 3D Decorative Blobs inside the card */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7c62d6] rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#573fa8] rounded-full blur-3xl opacity-50"></div>
                </div>

                {/* 
                    Content Layer: Sits 'above' the background.
                    transform-style: preserve-3d enables children to translateZ properly.
                    Increased z-index to 20 to ensure it is clickable.
                */}
                <div className="relative z-20 pt-24 pb-12 px-8 md:px-16 max-w-[1200px] mx-auto" style={{ transformStyle: 'preserve-3d' }}>
                    
                    {/* Links Grid with Hover Lift */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-24">
                        
                        {/* Column 1 */}
                        <div className="flex flex-col space-y-6 group/col" style={{ transform: 'translateZ(20px)' }}>
                            <h4 className="font-bold text-2xl text-white mb-2">Product</h4>
                            <div className="flex flex-col space-y-2">
                                <FooterLink onClick={(e) => onLinkClick(e, 'story')}>The Story</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'platform')}>The Platform</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'vision')}>Vision</FooterLink>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col space-y-6 group/col" style={{ transform: 'translateZ(20px)' }}>
                            <h4 className="font-bold text-2xl text-white mb-2">Resources</h4>
                            <div className="flex flex-col space-y-2">
                                <FooterLink onClick={(e) => onLinkClick(e, 'schools')}>For Schools</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'families')}>For Families</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'governments')}>For Governments</FooterLink>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col space-y-6 group/col" style={{ transform: 'translateZ(20px)' }}>
                            <h4 className="font-bold text-2xl text-white mb-2">Company</h4>
                            <div className="flex flex-col space-y-2">
                                <FooterLink onClick={(e) => onLinkClick(e, 'about')}>About Us</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'contact')}>Stay Updated</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'careers')}>Careers</FooterLink>
                            </div>
                        </div>

                        {/* Column 4 */}
                        <div className="flex flex-col space-y-6 group/col" style={{ transform: 'translateZ(20px)' }}>
                            <h4 className="font-bold text-2xl text-white mb-2">Legal</h4>
                            <div className="flex flex-col space-y-2">
                                <FooterLink onClick={(e) => onLinkClick(e, 'privacy')}>Privacy Policy</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'terms')}>Terms of Service</FooterLink>
                                <FooterLink onClick={(e) => onLinkClick(e, 'security')}>Security</FooterLink>
                            </div>
                        </div>

                    </div>

                    {/* Bottom: Copyright & Socials */}
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F8E9DD]/20 relative z-30">
                        <p className="text-sm text-[#F8E9DD]/70 font-medium mb-6 md:mb-0" style={{ transform: 'translateZ(10px)' }}>
                            &copy; 2025 Schroeder Technologies. All rights reserved.
                        </p>
                        
                        {/* 
                           SOCIAL ICONS: Lifted significantly (translateZ 40px) and given high z-index.
                           The parent container does NOT have overflow:hidden, so these hit boxes
                           will not be clipped even if they float slightly "outside" the bounds during tilt.
                        */}
                        <div className="flex gap-6 relative z-50 pointer-events-auto" style={{ transform: 'translateZ(40px)' }}>
                           <SocialOrb icon="twitter" />
                           <SocialOrb icon="github" />
                           <SocialOrb icon="linkedin" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

// --- Helper Components for Interactivity ---

const FooterLink: React.FC<{ onClick: (e: React.MouseEvent) => void, children: React.ReactNode }> = ({ onClick, children }) => (
    <button 
        onClick={onClick} 
        className="text-left py-2 px-4 -ml-4 rounded-xl text-[#F8E9DD] hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-lg hover:translate-x-2 hover:shadow-lg active:scale-95 flex items-center group relative z-50 pointer-events-auto"
    >
        <span className="w-0 h-0.5 bg-[#FFD447] mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
        {children}
    </button>
);

const SocialOrb: React.FC<{ icon: 'twitter' | 'github' | 'linkedin' }> = ({ icon }) => {
    const icons = {
        twitter: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
        ),
        github: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
        linkedin: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
        )
    };

    return (
        <div 
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#F8E9DD] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.2)] relative z-50"
            style={{ transform: 'translateZ(1px)' }}
        >
            {icons[icon]}
        </div>
    );
}

export default Footer;