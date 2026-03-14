import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Download, X } from 'lucide-react';

export default function HistoryTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  // Simulated History Data with Filtering/Sorting
  const history = [
    { id: 'h1', date: '2024-10-15', hospital: 'Apollo Central', doctor: 'Dr. Smith', dept: 'ENT', token: 'A-12', status: 'Completed', emergency: false },
    { id: 'h2', date: '2024-10-10', hospital: 'Metro Clinic', doctor: 'Dr. Mike', dept: 'General', token: 'G-05', status: 'Completed', emergency: true },
    { id: 'h3', date: '2024-09-28', hospital: 'St. Marys', doctor: 'Dr. Ross', dept: 'Neurology', token: 'N-22', status: 'Cancelled', emergency: false }
  ];

  const filteredHistory = useMemo(() => {
    return history
      .filter(h => h.hospital.toLowerCase().includes(search.toLowerCase()) || h.doctor.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDir === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [search, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    // FIXED: Responsive rounded corners (rounded-3xl on mobile, 3rem on desktop)
    <section className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-sm">
      
      {/* FIXED: Scaled down padding for mobile (p-6), stacked layout for search bar */}
      <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">Appointment History</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Archive of Participating Centers</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Hospital or Specialist..." 
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold text-slate-900 dark:text-white transition-all shadow-sm" 
          />
        </div>
      </div>

      {/* FIXED: The wrapper enables horizontal scrolling natively on phones */}
      <div className="w-full overflow-x-auto">
        {/* FIXED: min-w-[800px] prevents the columns from crushing together! */}
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <tr>
              {/* FIXED: Scaled horizontal padding (px-6) */}
              {['Date', 'Hospital', 'Doctor', 'Dept', 'Token', 'Status'].map(h => (
                 <th key={h} onClick={() => toggleSort(h.toLowerCase())} className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 group transition-colors select-none">
                   <div className="flex items-center gap-2">
                      {h} {sortKey === h.toLowerCase() && (sortDir === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                   </div>
                 </th>
              ))}
              <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 select-none">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredHistory.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                {/* FIXED: Adjusted paddings for cells as well */}
                <td className="px-6 py-5 text-sm font-bold text-slate-500 dark:text-slate-400">{row.date}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                     <p className="font-bold text-slate-900 dark:text-white text-sm">{row.hospital}</p>
                     {row.emergency && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Emergency Intake"></span>}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-600 dark:text-slate-300">{row.doctor}</td>
                <td className="px-6 py-5 text-[10px] font-black uppercase text-blue-500 dark:text-blue-400">{row.dept}</td>
                <td className="px-6 py-5 text-sm font-black text-slate-900 dark:text-white uppercase">{row.token}</td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    row.status === 'Completed' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>{row.status}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  {row.status === 'Completed' ? (
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center font-black uppercase text-[10px] tracking-widest justify-end w-full">
                      <Download size={14} className="mr-2" /> PDF
                    </button>
                  ) : <X className="text-slate-300 dark:text-slate-600 ml-auto" size={16} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}