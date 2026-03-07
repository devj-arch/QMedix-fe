import React from 'react';
import { Building2, ShieldAlert, MapPin } from 'lucide-react';

export default function StepHospital({ hospitals, selectHospital }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-3xl font-black mb-2 dark:text-white">Select Medical Center</h2>
      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-8">Participating Hospitals in your area</p>
      <div className="grid md:grid-cols-2 gap-6">
        {hospitals.map(h => (
          <div key={h.id} onClick={() => selectHospital(h)} className={`p-6 border rounded-[2rem] cursor-pointer transition-all group ${h.isOpen ? 'hover:border-blue-500 hover:shadow-lg dark:border-slate-700' : 'opacity-60 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${h.isOpen ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                <Building2 size={24} />
              </div>
              {h.emergency && <span className="bg-red-50 dark:bg-red-900/20 text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-lg flex items-center"><ShieldAlert size={12} className="mr-1"/> ER Open</span>}
            </div>
            <h3 className="text-xl font-black dark:text-white mb-1">{h.name}</h3>
            <div className="flex items-center text-slate-500 text-sm mb-4"><MapPin size={14} className="mr-1"/> {h.location}</div>
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
              <span className={h.isOpen ? 'text-emerald-500' : 'text-slate-400'}>{h.isOpen ? 'OPD Open' : 'OPD Closed'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}