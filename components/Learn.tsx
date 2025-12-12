/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface LearnProps {
    onBegin?: () => void;
}

const Learn: React.FC<LearnProps> = ({ onBegin }) => {
  return (
    <section className="py-24 px-6 max-w-[1000px] mx-auto text-center min-h-[60vh] flex flex-col justify-center">
      <div className="mb-12">
        <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#6A4FBF] mb-8">The Vision</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#4A4A4A] mb-8 leading-tight">
             Building a foundation <br/> for the next generation.
        </h2>
        <div className="w-24 h-1 bg-[#FFB673] mx-auto rounded-full mb-12"></div>
        <p className="text-xl text-gray-600 leading-loose font-light max-w-3xl mx-auto mb-12">
            We are building more than a platform. We are building a quiet guide for children stepping into a world shaped by intelligence. 
            A space where they can learn not just to use technology, but to understand it, question it, and grow with it.
            <br/><br/>
            Our vision is simple: every child, everywhere, deserves the confidence to navigate the future with clarity.
            We envision a future where technology is not a black box, but a tool that every student knows how to wield safely and creatively.
        </p>
      </div>

      <div className="clay-card p-12 bg-[#6A4FBF] text-white relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFD447] opacity-10 rounded-full blur-2xl"></div>

          <p className="text-2xl font-serif italic mb-8 relative z-10">
            "The future belongs to the children who understand the world they will inherit.
            And now, they finally have a way to learn it."
          </p>
          <button 
            onClick={onBegin}
            className="px-12 py-4 rounded-full bg-white text-[#6A4FBF] font-bold shadow-lg hover:scale-105 transition-transform text-lg relative z-10"
          >
             Begin the Journey
          </button>
      </div>
    </section>
  );
};

export default Learn;