import React from 'react';
import { Hospital, Trash2, Users, Clock, AlertCircle } from 'lucide-react';

export default function LiveQueueCard({ app, onCancel }) {
  // calculation logic for position and wait time
  const servingNum = parseInt(app.serving_token?.split('-')[1]) || 0;
  const myNum = parseInt(app.token_number?.split('-')[1]) || 0;
  
  // fallback if the position calculates as negative
  const position = myNum > servingNum ? myNum - servingNum : 0; 
  const waitEstimate = position * 12; // 12min average wait
  const isEmergency = app.isEmergency || false;

  return (
    <div className={`relative p-6 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md overflow-hidden animate-in slide-in-from-bottom-4 duration-500
      ${isEmergency ? 'border-red-200 dark:border-red-900/50' : 'border-slate-200 dark:border-slate-800'}`}>
      
      {/* Subtle background icon */}
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
        <Hospital size={100} className="text-slate-900 dark:text-white -rotate-12" />
      </div>

      <div className="relative z-10">
        {/* Header: Title, Emergency, Delete */}
        <div className="flex justify-between items-start mb-5">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">
                {app.hospital_name}
              </h3>
              {isEmergency && (
                <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center shadow-sm whitespace-nowrap">
                  <AlertCircle size={10} className="mr-1" /> Emergency
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {app.speciality} • Dr. {app.doctor_name}
            </p>
          </div>
          <button 
            onClick={() => onCancel(app.id)} 
            className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
            title="Cancel Appointment"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Token Display Grid: Scaled down from text-4xl to text-2xl */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your Token</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{app.token_number || "Pending"}</p>
          </div>
          <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-xl shadow-md shadow-blue-500/20 text-white flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Now Serving</p>
            <p className="text-2xl font-black">{app.serving_token || "N/A"}</p>
          </div>
        </div>

        {/* Footer Details: Queue Pos, Wait Time, Status */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-4">
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Users size={14} className="mr-1.5 text-slate-400" />
              <span className="text-xs font-semibold">
                Pos: <span className="text-slate-900 dark:text-white">{position}</span>
              </span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Clock size={14} className="mr-1.5 text-slate-400" />
              <span className="text-xs font-semibold">
                Wait: <span className="text-slate-900 dark:text-white">~{waitEstimate}m</span>
              </span>
            </div>
          </div>
          
          <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
            app.status?.toLowerCase() === 'in-progress' || app.status?.toLowerCase() === 'in progress'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}>
            {app.status}
          </div>
        </div>
      </div>
    </div>
  );
}