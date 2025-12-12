/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Community: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-[1200px] mx-auto flex flex-col gap-32">
      
      {/* For Schools */}
      <div id="schools" className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
              <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#2775CA] mb-6">For Schools</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#4A4A4A] mb-6">Support, don't complicate.</h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Teachers do not need new training or technical expertise. The platform begins teaching the moment a student opens it. 
                Every lesson is embedded in the experience, allowing teachers to supervise rather than instruct. 
                It runs smoothly on any device, fits any timetable, and reduces the pressure on educators to understand emerging technologies before they are ready.
              </p>
              <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#2775CA] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Zero-setup classroom integration</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#2775CA] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Aligned with National Digital Curriculums</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#2775CA] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Real-time progress dashboards for teachers</span>
                  </li>
              </ul>
              <div className="p-6 bg-white/60 rounded-2xl border border-white/50 shadow-sm">
                  <p className="font-bold text-[#4A4A4A] text-sm">"The platform is built to support the classroom, not complicate it."</p>
              </div>
          </div>
          <div className="flex-1 flex justify-center">
              <div className="clay-card p-12 bg-[#e0f2fe] w-80 h-80 flex items-center justify-center text-[#2775CA] rotate-3 hover:rotate-0 transition-transform duration-500">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-40 h-40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.516 50.552 50.552 0 00-2.658.813m-15.482 0A50.553 50.553 0 0112 20.904a50.553 50.553 0 0112-16.817m-12 .922l-.75 3h1.5l-.75-3zm-3.75 3h7.5M12 15.75h.008v.008H12v-.008z" />
                   </svg>
              </div>
          </div>
      </div>

      {/* For Families */}
      <div id="families" className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="flex-1">
              <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#FFB673] mb-6">For Families</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#4A4A4A] mb-6">Reassurance in a digital world.</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Children face a digital world that parents cannot always monitor or understand fully. 
                This platform gives families reassurance by allowing children to learn safe behaviour, responsible choices, and critical thinking in a guided environment. 
                It does not replace parental teaching; it supports it by giving children the language to discuss what they see online.
              </p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff7ed] flex items-center justify-center text-[#FFB673] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Safe "Sandbox" environments for social media practice</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fff7ed] flex items-center justify-center text-[#FFB673] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Weekly conversation starters for parents</span>
                  </li>
              </ul>
          </div>
          <div className="flex-1 flex justify-center">
              <div className="clay-card p-12 bg-[#fff7ed] w-80 h-80 flex items-center justify-center text-[#FFB673] -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-40 h-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
              </div>
          </div>
      </div>

      {/* For Governments */}
      <div id="governments" className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
              <span className="clay-text-convex text-xs font-bold uppercase tracking-widest text-[#6A4FBF] mb-6">For Governments</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#4A4A4A] mb-6">System-level value.</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Nations everywhere are preparing their youth for a future shaped by artificial intelligence. 
                They need a scalable, accessible, and reliable way to teach foundational AI literacy, online safety, critical thinking, and responsible digital behaviour. 
                This platform fits naturally into national goals by offering a ready structure that can be deployed at scale.
              </p>
              <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6A4FBF] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Scalable cloud infrastructure</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6A4FBF] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Data sovereignty and privacy compliant</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6A4FBF] font-bold text-xs">✓</div>
                      <span className="text-gray-600 font-medium">Future-proofing the national workforce</span>
                  </li>
              </ul>
          </div>
          <div className="flex-1 flex justify-center">
              <div className="clay-card p-12 bg-[#f3e8ff] w-80 h-80 flex items-center justify-center text-[#6A4FBF] rotate-6 hover:rotate-0 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-40 h-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
              </div>
          </div>
      </div>

    </div>
  );
};

export default Community;