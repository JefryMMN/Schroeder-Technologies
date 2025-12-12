/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-[1000px] mx-auto relative animate-fade-in-up">
       {/* Decorative */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFB673] opacity-10 rounded-full blur-3xl pointer-events-none -z-10"></div>
       
       <div className="text-center mb-16 relative z-10">
         <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#6A4FBF] mb-8">The Story</span>
         <h2 className="text-3xl md:text-5xl font-extrabold text-[#4A4A4A] mb-8 drop-shadow-sm leading-tight">
           The gap between what children do<br/> and what they understand.
         </h2>
       </div>

       <div className="prose prose-xl mx-auto text-gray-600 leading-loose font-light">
         <p className="mb-8">
            There is a myth that children today are "digital natives", that because they can swipe a screen before they can speak, they inherently understand technology. 
            This is dangerous. Being able to drive a car doesn't mean you know how the engine works, or how to fix it when it breaks. 
            Being able to use AI doesn't mean you understand bias, data privacy, or the difference between reality and a simulation.
         </p>
         <p className="mb-8">
            Technology moves faster than classrooms can adapt. Parents feel responsible yet overwhelmed. 
            Teachers want to help but lack the tools. Children step into a digital world that is larger and more complex than anything we had as adults. 
            They are curious, capable, and eager to learn, yet no one has given them the map for the territory they now live in.
         </p>
         <p>
            We built Schroeder Technologies to be that map. We believe that literacy is no longer just about reading and writing; it is about code, data, and algorithmic awareness.
            Our story isn't just about building software. It is about empowering a generation to be the masters of their tools, rather than the subjects of them.
            We are closing the gap between consumption and comprehension.
         </p>
       </div>
    </div>
  );
};

export default About;