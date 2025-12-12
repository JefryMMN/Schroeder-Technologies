/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HeroProps {
    onBegin?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBegin }) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-32 md:pb-40 px-6 perspective-[1000px] z-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fde2c8] to-[#f9c1d2] -z-20"></div>
      
      {/* 3D Ring Element (Background) */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[900px] h-[900px] ring-3d-container pointer-events-none -z-10 opacity-50 hidden md:block">
         <div className="w-full h-full ring-3d border-[#ffffff] border-opacity-30 blur-[2px]"></div>
      </div>

      {/* Additional 3D Spheres for Depth Effect */}
      <div className="absolute top-24 left-[8%] w-20 h-20 shape-sphere animate-float z-0 opacity-70"></div>
      <div className="absolute bottom-32 right-[8%] w-28 h-28 shape-sphere animate-float-delayed z-0 opacity-50" style={{animationDelay: '1.5s'}}></div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Content Side */}
        <div className="flex flex-col items-start z-10 mt-12 md:mt-0">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#4A4A4A] leading-tight mb-8 drop-shadow-sm">
                The World <br/>
                <span className="text-[#6A4FBF] relative">
                    Has Changed.
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD447]" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                </span>
            </h1>
            <p className="text-lg md:text-xl text-[#666] mb-10 max-w-lg leading-relaxed font-light">
                Children today grow up in a world where technology thinks, responds, and adapts. 
                They explore it with curiosity, but without guidance. 
                For the first time, a generation is using artificial intelligence before anyone has taught them how to understand it.
                <br/><br/>
                <strong className="text-[#6A4FBF]">Our platform exists to change that.</strong>
            </p>
            
            <div className="flex gap-4">
                <button 
                    onClick={onBegin}
                    className="clay-button px-10 py-4 text-lg font-bold bg-[#6A4FBF] text-white hover:text-white"
                >
                    Begin the Journey
                </button>
            </div>
        </div>

        {/* Illustration Side */}
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-[1200px]">
            {/* Main Central Card - Simulated Interface */}
            <div className="relative w-[340px] h-[460px] bg-[#F8E9DD] border border-white/60 rounded-[40px] shadow-[20px_20px_60px_rgba(0,0,0,0.1),-20px_-20px_60px_rgba(255,255,255,0.8)] z-20 flex flex-col p-6 animate-float transform-style-3d rotate-y-6">
                 
                 <div className="w-full flex justify-between items-center mb-6">
                     <div className="w-8 h-8 rounded-full bg-[#2AB9A9] shadow-inner flex items-center justify-center text-white font-bold text-xs">AI</div>
                     <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                     </div>
                 </div>
                 
                 <div className="w-full h-40 bg-white/40 rounded-2xl mb-6 border border-white/40 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#6A4FBF]/10 to-transparent"></div>
                    {/* Abstract Symbol instead of Emoji */}
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center relative z-10 text-[#6A4FBF]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                    </div>
                 </div>

                 <div className="space-y-3">
                     <div className="p-3 bg-white/60 rounded-xl shadow-sm border border-white/20">
                        <div className="h-2 w-24 bg-gray-200 rounded-full mb-2"></div>
                        <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                     </div>
                     <div className="p-3 bg-white/60 rounded-xl shadow-sm border border-white/20 flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-full bg-[#FFB673] flex items-center justify-center text-white font-bold">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                             <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                           </svg>
                        </div>
                        <div className="text-xs text-gray-500 font-bold">Is this content authentic?</div>
                     </div>
                     <div className="flex gap-2 mt-2">
                        <button className="flex-1 py-2 bg-[#2AB9A9] text-white text-xs font-bold rounded-lg shadow-md">Authentic</button>
                        <button className="flex-1 py-2 bg-[#FFD447] text-[#4A4A4A] text-xs font-bold rounded-lg shadow-md">Synthetic</button>
                     </div>
                 </div>
            </div>

            {/* Floating Abstract Icons */}
            <div className="absolute top-20 right-0 w-16 h-16 rounded-[20px] bg-[#6A4FBF] flex items-center justify-center shadow-xl rotate-12 z-30 animate-float-delayed clay-bevel text-white text-xl font-bold">
                AI
            </div>
            <div className="absolute bottom-20 left-0 w-20 h-20 rounded-full bg-[#FFB673] flex items-center justify-center shadow-xl -rotate-6 z-30 animate-float clay-bevel text-white text-2xl font-bold">
                i
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;