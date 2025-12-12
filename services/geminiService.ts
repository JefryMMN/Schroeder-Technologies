/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PAPERS } from '../constants';

const getSystemInstruction = () => {
  const paperContext = PAPERS.map(p => 
    `"${p.title}" (${p.publicationDate}). Category: ${p.category}. Context: ${p.abstractPreview}`
  ).join('\n');

  return `You are "Schroeder Assistant", an educational assistant for Schroeder Technologies.
  
  Your goals:
  1. Provide clear, age-appropriate answers about AI, technology, and online safety for students (ages 7-14) and parents.
  2. Use an encouraging and knowledgeable tone.
  3. Connect the user's question to the modules in our curriculum if relevant (listed below).
  4. If asked about dangerous topics, firmly redirect to safety and talking to a trusted adult.
  
  Current Modules:
  ${paperContext}
  
  Format:
  Keep responses under 5 sentences.
  Avoid complex jargon without explanation.
  `;
};

// Use export to expose functionality
export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    // API key check. Direct access of process.env.API_KEY is preferred.
    if (!process.env.API_KEY) {
      return "I cannot access the network at this moment. My access key appears to be missing.";
    }

    // Always use initialization as requested.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Call generateContent via ai.models
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history.map(h => ({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    // Directly access text property from response.
    return response.text || "I cannot generate an answer at this time.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "A connection error occurred. Please try again later.";
  }
};