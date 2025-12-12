/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Validation States
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
  const [shake, setShake] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Remove shake class after animation completes so it can be triggered again
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
        setStatus('idle');
        setFirstName('');
        setLastName('');
        setEmail('');
        setErrors({ firstName: '', lastName: '', email: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
      let isValid = true;
      const newErrors = { firstName: '', lastName: '', email: '' };

      if (!firstName.trim()) {
          newErrors.firstName = 'Required';
          isValid = false;
      }

      if (!lastName.trim()) {
          newErrors.lastName = 'Required';
          isValid = false;
      }

      // Strict Email Regex
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!email.trim()) {
          newErrors.email = 'Required';
          isValid = false;
      } else if (!emailRegex.test(email)) {
          newErrors.email = 'Invalid Format';
          isValid = false;
      }

      setErrors(newErrors);
      return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
        setShake(true); // Trigger 3D shake
        return;
    }

    setStatus('submitting');
    
    // Simulate network delay and email sending process
    setTimeout(() => {
        setStatus('success');
        onSubmit({ firstName, lastName, email });
        
        // Close modal after showing success message
        setTimeout(() => {
            onClose();
        }, 3000);
    }, 1500);
  };

  const handleClose = () => {
      setErrors({ firstName: '', lastName: '', email: '' });
      setShake(false);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop - High blur for focus */}
      <div 
        className="absolute inset-0 bg-[#4A4A4A]/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={handleClose}
      ></div>

      {/* 3D Modal Card - Compact & Interactive */}
      <div 
        className={`relative w-full max-w-[440px] bg-[#F8E9DD] rounded-[32px] p-6 shadow-[40px_40px_80px_rgba(0,0,0,0.15),-40px_-40px_80px_rgba(255,255,255,0.8)] border border-white/60 perspective-[2000px] transition-transform ${shake ? 'animate-shake' : 'animate-pop'}`}
      >
        
        {/* Close Button */}
        <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F8E9DD] shadow-[4px_4px_8px_#d3c6bc,-4px_-4px_8px_#ffffff] flex items-center justify-center text-gray-400 hover:text-[#6A4FBF] active:shadow-[inset_2px_2px_4px_#d3c6bc,inset_-2px_-2px_4px_#ffffff] transition-all z-20"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
           </svg>
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-[#FFB673] rounded-full blur-2xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-[#6A4FBF] rounded-full blur-2xl opacity-20 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
            
            {status === 'success' ? (
                <div className="py-8 flex flex-col items-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-[#2AB9A9] rounded-full flex items-center justify-center text-white shadow-[0_10px_20px_rgba(42,185,169,0.3)] mb-6 animate-pop">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#4A4A4A] mb-2 tracking-tight">Check Your Inbox!</h3>
                    <p className="text-gray-500 text-sm font-medium mb-4 leading-relaxed px-4">
                        We've sent a confirmation link to <br/>
                        <span className="text-[#6A4FBF] font-bold text-base">{email}</span>
                    </p>
                    {/* Demo Mode Disclaimer */}
                    <div className="bg-[#FFB673]/20 border border-[#FFB673] rounded-lg px-3 py-2 max-w-[280px]">
                        <p className="text-[#d97706] text-[10px] font-bold uppercase tracking-wide">
                            Demo Mode: No email actually sent
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header Icon */}
                    <div className="w-12 h-12 mx-auto bg-[#6A4FBF] rounded-xl rotate-6 flex items-center justify-center shadow-lg mb-4 text-white transform-style-3d hover:rotate-0 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 -rotate-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#4A4A4A] mb-2 tracking-tight">Stay in the Loop</h2>
                    <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed px-4">
                        Join our community. Get the latest modules sent to your inbox.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 text-left px-2">
                        <div className="flex flex-row gap-4">
                            {/* First Name Field */}
                            <div className="flex-1 group relative">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6A4FBF] mb-1.5 ml-1 group-focus-within:text-[#FFB673] transition-colors">First Name</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        onChange={e => { setFirstName(e.target.value); if(errors.firstName) setErrors({...errors, firstName: ''}) }}
                                        placeholder="Jane"
                                        className={`w-full bg-[#f8f5f2] border-none rounded-xl p-3 shadow-[inset_3px_3px_6px_#d3c6bc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-[#FFB673]/50 text-[#4A4A4A] font-bold placeholder-gray-300 transition-all text-sm ${errors.firstName ? 'ring-2 ring-red-300 bg-red-50' : ''}`}
                                    />
                                    {/* 3D Warning Bubble */}
                                    {errors.firstName && (
                                        <div className="absolute -top-10 left-0 bg-[#ef4444] text-white text-[10px] font-bold py-1 px-3 rounded-lg shadow-lg animate-pop z-20 whitespace-nowrap">
                                            Required!
                                            <div className="absolute top-full left-4 -mt-[1px] border-[6px] border-transparent border-t-[#ef4444]"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Last Name Field */}
                            <div className="flex-1 group relative">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6A4FBF] mb-1.5 ml-1 group-focus-within:text-[#FFB673] transition-colors">Last Name</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={lastName} 
                                        onChange={e => { setLastName(e.target.value); if(errors.lastName) setErrors({...errors, lastName: ''}) }}
                                        placeholder="Doe"
                                        className={`w-full bg-[#f8f5f2] border-none rounded-xl p-3 shadow-[inset_3px_3px_6px_#d3c6bc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-[#FFB673]/50 text-[#4A4A4A] font-bold placeholder-gray-300 transition-all text-sm ${errors.lastName ? 'ring-2 ring-red-300 bg-red-50' : ''}`}
                                    />
                                    {/* 3D Warning Bubble */}
                                    {errors.lastName && (
                                        <div className="absolute -top-10 left-0 bg-[#ef4444] text-white text-[10px] font-bold py-1 px-3 rounded-lg shadow-lg animate-pop z-20 whitespace-nowrap">
                                            Required!
                                            <div className="absolute top-full left-4 -mt-[1px] border-[6px] border-transparent border-t-[#ef4444]"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Email Field */}
                        <div className="group relative">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6A4FBF] mb-1.5 ml-1 group-focus-within:text-[#FFB673] transition-colors">Email Address</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={email} 
                                    onChange={e => { setEmail(e.target.value); if(errors.email) setErrors({...errors, email: ''}) }}
                                    placeholder="jane@school.edu"
                                    className={`w-full bg-[#f8f5f2] border-none rounded-xl p-3 shadow-[inset_3px_3px_6px_#d3c6bc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-[#FFB673]/50 text-[#4A4A4A] font-bold placeholder-gray-300 transition-all text-sm ${errors.email ? 'ring-2 ring-red-300 bg-red-50' : ''}`}
                                />
                                {/* 3D Warning Bubble */}
                                {errors.email && (
                                        <div className="absolute -top-10 left-0 bg-[#ef4444] text-white text-[10px] font-bold py-1 px-3 rounded-lg shadow-lg animate-pop z-20 whitespace-nowrap">
                                            {errors.email === 'Required' ? 'Please enter email!' : 'Invalid format!'}
                                            <div className="absolute top-full left-4 -mt-[1px] border-[6px] border-transparent border-t-[#ef4444]"></div>
                                        </div>
                                )}
                                {/* Validation Success Icon */}
                                {!errors.email && email.length > 5 && email.includes('@') && email.includes('.') && (
                                    <div className="absolute right-3 top-3 text-[#2AB9A9] animate-pop">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="clay-button w-full py-4 text-sm font-black bg-[#4A4A4A] text-[#F8E9DD] hover:bg-[#6A4FBF] hover:text-white shadow-[6px_6px_12px_#d3c6bc,-6px_-6px_12px_#ffffff] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 active:scale-[0.98]"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    "Subscribe Now"
                                )}
                            </button>
                        </div>
                        <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest pt-1">
                            No spam. Unsubscribe anytime.
                        </p>
                    </form>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;