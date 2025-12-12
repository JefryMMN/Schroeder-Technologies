/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useRef, useState } from 'react';
import { Paper } from '../types';
import { getPublisherInfo, GLOSSARY } from '../constants';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Paper;
  relatedPapers: Paper[];
  onBack: () => void;
  onToggleSave: (paper: Paper) => void;
  isSaved: boolean;
  onPublisherClick?: (name: string) => void;
  onProductClick: (paper: Paper) => void;
}

// --- 3D Interactive Helper ---
const TiltWrapper: React.FC<{ children: React.ReactNode; className?: string; intensity?: number }> = ({ children, className = "", intensity = 10 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - y) / centerY) * intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setScale(1.02);
    
    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setScale(1);
    };

    return (
        <div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-100 ease-out transform-style-3d ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
            }}
        >
            {children}
        </div>
    );
};

// Helper component to render text with glossary tooltips
const TextWithTooltips: React.FC<{ text: string }> = ({ text }) => {
  const processedContent = useMemo(() => {
    // Escape special regex characters
    const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Sort keys by length (descending) to match longest phrases first
    const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`\\b(${keys.map(escapeRegExp).join('|')})\\b`, 'gi');

    const parts = text.split(pattern);
    
    return parts.map((part, index) => {
      // Check if part matches a glossary key (case-insensitive)
      const matchedKey = keys.find(key => key.toLowerCase() === part.toLowerCase());
      
      if (matchedKey) {
        return (
          <span key={index} className="tooltip-trigger inline-block relative z-20 font-bold text-[#6A4FBF] cursor-help border-b-2 border-[#6A4FBF]/30 hover:border-[#6A4FBF] transition-colors">
            {part}
            <span className="tooltip-content">
              {GLOSSARY[matchedKey]}
            </span>
          </span>
        );
      }
      return part;
    });
  }, [text]);

  return <p>{processedContent}</p>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  relatedPapers,
  onBack, 
  onToggleSave, 
  isSaved,
  onProductClick
}) => {
  const publisherInfo = getPublisherInfo(product.publisher);

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 animate-fade-in-up relative overflow-hidden bg-[#fdfbf7]">
      
      {/* 3D Decorative Floating Coins/Shapes */}
      <div className="absolute top-20 right-[-5%] w-64 h-64 rounded-full bg-gradient-to-br from-[#FFB673] to-[#FFD447] opacity-10 blur-3xl animate-float-delayed pointer-events-none"></div>
      <div className="absolute bottom-40 left-[-5%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#6A4FBF] to-[#2AB9A9] opacity-10 blur-3xl animate-float pointer-events-none"></div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Navigation */}
        <button 
            onClick={onBack}
            className="flex items-center gap-2 font-bold text-gray-500 hover:text-[#6A4FBF] transition-colors mb-8 group"
        >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[4px_4px_10px_#d1d5db,-4px_-4px_10px_#ffffff] group-hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </div>
            Back to Modules
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-[#4A4A4A] mb-4 tracking-tight drop-shadow-sm">{product.title}</h1>
                            <div className="flex flex-wrap gap-3 text-sm font-semibold text-gray-500">
                                <span className="clay-tag px-4 py-1.5 rounded-xl">{product.publisher}</span>
                                <span className="clay-tag px-4 py-1.5 rounded-xl">Ages {product.publicationDate}</span>
                                <span className="bg-[#e6fffa] text-[#2AB9A9] px-4 py-1.5 rounded-xl shadow-[2px_2px_5px_rgba(42,185,169,0.1)] border border-[#2AB9A9]/20">Verified Curriculum</span>
                            </div>
                    </div>
                    <button 
                        onClick={() => onToggleSave(product)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff] hover:scale-105 ${isSaved ? 'bg-[#FFD447] text-white animate-pop border-2 border-white' : 'bg-[#F8E9DD] text-gray-400 hover:text-[#6A4FBF]'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        {/* 3D Floating Stats Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 perspective-[1000px]">
            <TiltWrapper intensity={15} className="h-full">
                <div className="h-full bg-[#F8E9DD] rounded-[2rem] p-8 shadow-[20px_20px_40px_#d3c6bc,-20px_-20px_40px_#ffffff] border border-white/50 flex flex-col items-center justify-center text-center group cursor-default">
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Difficulty</span>
                    <div className="bg-[#F8E9DD] px-6 py-2 rounded-full shadow-[inset_4px_4px_8px_#d3c6bc,inset_-4px_-4px_8px_#ffffff] border border-white/20">
                        <span className="block text-2xl font-black text-[#4A4A4A] group-hover:scale-110 transition-transform">{product.readTime}</span>
                    </div>
                </div>
            </TiltWrapper>

            <TiltWrapper intensity={15} className="h-full">
                <div className="h-full bg-[#e6fffa] rounded-[2rem] p-8 shadow-[20px_20px_40px_rgba(42,185,169,0.15),-20px_-20px_40px_#ffffff] border border-white/50 flex flex-col items-center justify-center text-center group cursor-default">
                    <span className="block text-xs font-bold uppercase tracking-widest text-[#2AB9A9]/70 mb-2">XP Reward</span>
                     <div className="bg-[#d1fcf6] px-6 py-2 rounded-full shadow-[4px_4px_10px_rgba(42,185,169,0.1),-4px_-4px_10px_#ffffff] border border-white/60">
                        <span className="block text-3xl font-black text-[#2AB9A9] group-hover:scale-110 transition-transform drop-shadow-sm">+{product.upvotes} XP</span>
                     </div>
                </div>
            </TiltWrapper>

            <TiltWrapper intensity={15} className="h-full">
                <div className="h-full bg-[#f3e8ff] rounded-[2rem] p-8 shadow-[20px_20px_40px_rgba(106,79,191,0.15),-20px_-20px_40px_#ffffff] border border-white/50 flex flex-col items-center justify-center text-center group cursor-default">
                    <span className="block text-xs font-bold uppercase tracking-widest text-[#6A4FBF]/70 mb-2">Est. Time</span>
                    <div className="bg-[#ebdfff] px-6 py-2 rounded-full shadow-[4px_4px_10px_rgba(106,79,191,0.1),-4px_-4px_10px_#ffffff] border border-white/60">
                        <span className="block text-3xl font-black text-[#6A4FBF] group-hover:scale-110 transition-transform drop-shadow-sm">20 Mins</span>
                    </div>
                </div>
            </TiltWrapper>
        </div>

        {/* 3D "About" Section */}
        <TiltWrapper intensity={5} className="mb-16">
            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[30px_30px_60px_#d1d5db,-30px_-30px_60px_#ffffff] border border-white z-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFB673] via-[#FFD447] to-[#2AB9A9] opacity-80"></div>
                <h3 className="text-[#4A4A4A] font-black text-3xl mb-8 flex items-center gap-3">
                    <div className="w-3 h-8 bg-[#4A4A4A] rounded-full"></div>
                    About This Module
                </h3>
                <div className="prose prose-lg max-w-none text-gray-600 leading-loose font-medium">
                    <TextWithTooltips text={product.abstract} />
                    <br/>
                    <TextWithTooltips text={product.description || ""} />
                </div>
            </div>
        </TiltWrapper>

        {/* Interactive Learning Outcomes Pills */}
        {product.aiInsights && (
            <div className="mb-20">
                <h3 className="text-[#4A4A4A] font-black text-2xl mb-8 pl-4 border-l-4 border-[#FFB673]">Learning Outcomes</h3>
                <div className="flex flex-wrap gap-6 perspective-[800px]">
                    {product.aiInsights.map((insight, idx) => (
                        <div 
                            key={idx} 
                            className="group relative"
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                             <div className="relative bg-white px-8 py-4 rounded-2xl border border-white shadow-[10px_10px_20px_#d1d5db,-10px_-10px_20px_#ffffff] transform transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-x-12 group-hover:shadow-[20px_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#FFB673] shadow-[0_0_10px_#FFB673] group-hover:animate-pulse"></div>
                                <span className="text-lg font-bold text-gray-700 group-hover:text-[#6A4FBF] transition-colors">{insight}</span>
                                
                                {/* Shine effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Action Buttons - Massive Tactile Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-24">
                <button className="flex-1 group relative h-20 perspective-[1000px]">
                    <div className="absolute inset-0 bg-[#4A4A4A] rounded-3xl transform translate-y-2"></div>
                    <div className="absolute inset-0 bg-[#F8E9DD] rounded-3xl border-2 border-[#4A4A4A] flex items-center justify-center transform transition-transform duration-100 group-active:translate-y-2">
                        <span className="text-xl font-black text-[#4A4A4A] uppercase tracking-widest group-hover:text-[#6A4FBF]">Start Lesson</span>
                    </div>
                </button>

                <button className="flex-1 group relative h-20 perspective-[1000px]">
                     <div className="absolute inset-0 bg-[#d1d5db] rounded-3xl transform translate-y-2"></div>
                     <div className="absolute inset-0 bg-white rounded-3xl border-2 border-gray-200 flex items-center justify-center transform transition-transform duration-100 group-active:translate-y-2 group-hover:border-[#6A4FBF]">
                         <span className="text-xl font-bold text-gray-500 group-hover:text-[#6A4FBF] flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Teacher Guide
                         </span>
                     </div>
                </button>
        </div>

        {/* Related Assets Section */}
        {relatedPapers.length > 0 && (
            <div className="pt-16 border-t border-gray-200/60">
                <h3 className="text-3xl font-black text-[#4A4A4A] mb-12">Keep Exploring</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedPapers.map(paper => (
                        <div key={paper.id} className="h-full">
                            <ProductCard 
                                product={paper} 
                                onClick={onProductClick}
                                onUpvote={() => {}} 
                                isUpvoted={false}
                                onToggleSave={onToggleSave}
                                isSaved={isSaved} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;