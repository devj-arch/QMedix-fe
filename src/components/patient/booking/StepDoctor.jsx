import React from 'react';
import { Stethoscope } from 'lucide-react';

export default function StepDoctor({ doctors, formData, selectDoctor }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-3xl font-black mb-2 dark:text-white">Select Doctor</h2>
      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-8">{formData.department} Specialists</p>
      <div className="space-y-4">
        {doctors.map(doc => (
          <div key={doc.id} onClick={() => selectDoctor(doc)} className="p-6 border border-slate-100 dark:border-slate-700 rounded-[2rem] flex items-center justify-between cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all group">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mr-6 text-blue-600"><Stethoscope size={24} /></div>
              <div>
                <h3 className="text-xl font-black dark:text-white">{doc.name}</h3>
                <p className="text-xs text-slate-500 font-bold">{doc.speciality}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Next Available</p>
              <p className="text-sm font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg">{doc.nextAvailable}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}