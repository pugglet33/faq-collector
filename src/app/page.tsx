'use client';

import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Home() {
  const [category, setCategory] = useState<string>('general');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Please enter a question or concern');
      return;
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, category }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      toast.success('Question submitted successfully');
      setContent('');
    } catch {
      toast.error('Failed to submit question');
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#62F895] p-4">
      <div className="max-w-2xl mx-auto space-y-6 pt-10">
        <h1 className="text-4xl font-bold text-center">
          Retard Global FAQ Collector
        </h1>
        
        <p className="text-center text-lg">
          Please submit all of the following (one per submission):
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Questions/concerns you have about Box Office / RAPR / 7star / AIDS or the way they work</li>
          <li>Questions/concerns you think other people will have</li>
          <li>Anything someone might ask that you are not confident/knowledgeable enough to answer personally</li>
        </ul>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {['general', 'Box Office', 'RAPR', '7star', 'AIDS'].map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="accent-[#62F895]"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your question or concern..."
            className="w-full h-32 p-3 bg-black border-2 border-[#62F895] rounded-lg text-[#62F895] placeholder-[#62F895]/50 focus:outline-none focus:ring-2 focus:ring-[#62F895]"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#62F895] text-black font-semibold rounded-lg hover:bg-[#52E885] transition-colors"
          >
            Submit Question
          </button>
        </div>
      </div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#62F895',
            border: '2px solid #62F895'
          },
        }}
      />
    </div>
  );
}
