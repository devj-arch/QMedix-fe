import React, { useState, useEffect } from 'react';
import { RefreshCcw, Plus, Ticket, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PatientHeader from '../../components/patient/PatientHeader';
import LiveQueueCard from '../../components/patient/LiveQueueCard';
import HistoryTable from '../../components/patient/HistoryTable';
import api from "../../services/apiWrapper.js";

export default function PatientDashboard({ user, isDark, toggleTheme, onLogout }) {
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await api("GET","patient/get-appointments");
        const formattedData = res.data.data.map((appointment) => ({
          id: appointment.appointment_id,
          hospital_name: appointment.hospital_name || "Unknown Hospital",
          speciality: appointment.department || "General",
          doctor_name: appointment.assigned_doctor || "Not Assigned",
          token_number: appointment.token_number ? `Q-${appointment.token_number}` : "Pending",
          serving_token: appointment.serving_token ? `Q-${appointment.serving_token}` : "N/A",
          isEmergency: appointment.isEmergency || false,
          status: appointment.status === "waiting" ? "Waiting" 
                : appointment.status === "in_progress" ? "In-Progress" 
                : appointment.status === "completed" ? "Completed" 
                : appointment.status,
        }));
        setQueueData(formattedData);
      } catch (err) {
        console.error("Failed to fetch queue data:", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => { loadData(); }, [user]);

  const handleCancel = async (id) => {
    setQueueData(prev => prev.filter(a => a.id !== id));
    // Add your API delete call here later!
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="font-bold text-xs uppercase tracking-widest text-slate-400 animate-pulse">Syncing Portal...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12 pt-6">
      
      <PatientHeader 
        user={user} activeCount={queueData.length} 
        isDark={isDark} toggleTheme={toggleTheme} onLogout={onLogout} 
      />

      {/* Active Overview Section */}
      <section>
        {/* Make the header stack on phones (flex-col) and sit side-by-side on tablets (sm:flex-row) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            {/* Scale the text down for mobile */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight dark:text-white mb-1 uppercase">Active Portal</h1>
            <p className="text-slate-500 font-semibold uppercase text-xs tracking-wider">Live Medical Sessions</p>
          </div>
          {/* Ensure buttons stretch to fill the screen on mobile, but stay normal on desktop */}
          <div className="flex gap-3 w-full sm:w-auto">
             <button onClick={loadData} className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-slate-500 hover:text-blue-600 transition-all flex-shrink-0">
               <RefreshCcw size={18} />
             </button>
             <button onClick={() => navigate('/patient/book')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all flex items-center justify-center w-full group">
               <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" /> New Booking
             </button>
          </div>
        </div>

        {/* The Grid: 1 column on mobile, 2 on tablets, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queueData.map(app => (
            <LiveQueueCard key={app.id} app={app} onCancel={handleCancel} />
          ))}
        </div>
      </section>

      <HistoryTable />
      
    </div>
  );
}