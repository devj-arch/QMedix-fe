import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WizardHeader({ step, setStep }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-10">
      <button 
        onClick={() => step > 1 ? setStep(step - 1) : navigate('/patient/dashboard')} 
        className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors dark:text-slate-400"
      >
        <ArrowLeft size={16} className="mr-2" /> {step > 1 ? 'Back' : 'Cancel'}
      </button>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-2 rounded-full transition-all ${step >= i ? 'w-8 bg-blue-600' : 'w-4 bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>
    </div>
  );
}