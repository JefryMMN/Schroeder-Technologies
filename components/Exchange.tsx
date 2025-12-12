/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, MouseEvent } from 'react';

// --- Tilt Card Component for High Interaction ---
interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", onClick }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position relative to center
        // Limit rotation to +/- 8 degrees for subtle effect
        const rotateY = ((x - centerX) / centerX) * 8;
        const rotateX = ((centerY - y) / centerY) * 8;

        // Calculate glare position as percentage
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setRotation({ x: rotateX, y: rotateY });
        setGlarePosition({ x: glareX, y: glareY, opacity: 1 });
    };

    const handleMouseLeave = () => {
        // Reset to initial state with smooth transition
        setRotation({ x: 0, y: 0 });
        setGlarePosition(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div 
            ref={cardRef}
            className={`relative preserve-3d transition-all duration-300 ease-out transform-gpu ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: 'transform 0.1s ease-out, box-shadow 0.3s ease'
            }}
        >
            {/* Content */}
            {children}

            {/* Glare Effect */}
            <div 
                className="absolute inset-0 rounded-2xl pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
                    opacity: glarePosition.opacity
                }}
            />
        </div>
    );
};


const Exchange: React.FC = () => {
  return (
    <div className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-[#F8E9DD]">
      
      {/* The Platform */}
      <div className="max-w-[1000px] mx-auto mb-32 z-10">
          <div className="text-center mb-12">
            <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#6A4FBF] mb-6">The Platform</span>
            <h2 className="text-4xl font-extrabold text-[#4A4A4A] mb-8">Exploration over Explanation.</h2>
          </div>
          <div className="prose prose-xl mx-auto text-gray-600 leading-loose text-center mb-12">
            <p className="mb-6">
                Instead of teaching through long text or heavy lessons, our platform creates a world children can explore. 
                Every part of it is built on interaction, movement, and discovery. 
                Students learn how AI works by experimenting with it in safe "sandboxes", controlled environments where they can break things, make mistakes, and see the consequences without real-world risk.
            </p>
            <p>
                They learn digital safety by making choices inside simulated social networks. 
                They learn about bias by training their own simple AI models and seeing how their data choices affect the outcome.
                <strong className="block mt-4 text-[#6A4FBF]">The entire environment is guided, thoughtful, and designed to make complex ideas feel natural.</strong>
            </p>
          </div>
      </div>

      {/* The Experience (Visual Cards) */}
      <div className="max-w-[1200px] w-full z-10 mb-24">
         <div className="text-center mb-12">
             <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#2AB9A9] mb-6">The Experience</span>
             <h3 className="text-3xl font-extrabold text-[#4A4A4A] mb-4">Invisible Learning. Real Understanding.</h3>
             <p className="text-gray-500 max-w-2xl mx-auto">
                 Hover over the cards to explore the environments.
             </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Laboratory */}
            <TiltCard className="clay-card p-8 bg-white/60 hover:bg-white/90 cursor-pointer group">
                <div className="h-40 bg-[#e0f2fe] rounded-2xl mb-6 relative overflow-hidden shadow-inner border border-white/50 flex items-center justify-center text-[#2775CA] transition-all group-hover:shadow-[inset_0_0_20px_rgba(39,117,202,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2775CA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {/* Abstract Lab Icon - Animates on hover */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-2 group-hover:text-[#2775CA] transition-colors">The Laboratory</h3>
                <p className="text-gray-600 text-sm">Explains how AI learns. Students mix data ingredients to see how algorithms change their behavior.</p>
            </TiltCard>

            {/* Card 2 - Newsroom */}
            <TiltCard className="clay-card p-8 bg-white/60 hover:bg-white/90 cursor-pointer group md:-translate-y-8">
                <div className="h-40 bg-[#fef3c7] rounded-2xl mb-6 relative overflow-hidden shadow-inner border border-white/50 flex items-center justify-center text-[#d97706] transition-all group-hover:shadow-[inset_0_0_20px_rgba(217,119,6,0.2)]">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#d97706]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     {/* Abstract News Icon */}
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                     </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-2 group-hover:text-[#d97706] transition-colors">The Newsroom</h3>
                <p className="text-gray-600 text-sm">Teaches misinformation checking. Students take on the role of editor, verifying sources and spotting fakes.</p>
            </TiltCard>

            {/* Card 3 - City */}
            <TiltCard className="clay-card p-8 bg-white/60 hover:bg-white/90 cursor-pointer group">
                <div className="h-40 bg-[#dcfce7] rounded-2xl mb-6 relative overflow-hidden shadow-inner border border-white/50 flex items-center justify-center text-[#059669] transition-all group-hover:shadow-[inset_0_0_20px_rgba(5,150,105,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#059669]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {/* Abstract City Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 transform transition-transform duration-500 group-hover:scale-110 group-hover:translate-y-[-5px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-2 group-hover:text-[#059669] transition-colors">The City</h3>
                <p className="text-gray-600 text-sm">Teaches digital citizenship. Scenarios challenge students to interact respectfully with bots and humans alike.</p>
            </TiltCard>
         </div>
      </div>
      
      {/* Decorative Elements (Shapes) */}
      <div className="absolute top-20 left-10 w-32 h-32 shape-sphere opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 shape-sphere opacity-20 animate-float"></div>
    </div>
  );
};

export default Exchange;