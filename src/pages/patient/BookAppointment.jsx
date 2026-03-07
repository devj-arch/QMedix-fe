import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import WizardHeader from '../../components/patient/booking/WizardHeader';
import StepHospital from '../../components/patient/booking/StepHospital';
import StepDepartment from '../../components/patient/booking/StepDepartment';
import StepDoctor from '../../components/patient/booking/StepDoctor';
import { StepSchedule, StepConfirm } from '../../components/patient/booking/StepScheduleAndConfirm';

// Mock API 
const mockApi = {
  getHospitals: async () => [
    { id: 'h1', name: 'Apollo Central', location: 'Downtown', isOpen: true, emergency: true },
    { id: 'h2', name: 'Metro Care', location: 'Westside Sector', isOpen: true, emergency: false }
  ],
  getDepartments: async () => ['Cardiology', 'Neurology', 'Orthopedics'],
  getDoctors: async (h, d) => [{ id: 'd1', name: 'Dr. Aristhoth', speciality: d, nextAvailable: 'Today, 2:00 PM' }],
  book: async (d) => new Promise(r => setTimeout(r, 1500))
};

export default function BookAppointment({ user }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    hospital_id: null, hospital_name: '', department: null,
    pref_doctor: null, doctor_name: '', bookingDate: '',
    timeSlot: null, isEmergency: false
  });

  useEffect(() => { mockApi.getHospitals().then(setHospitals); }, []);

  const selectHospital = async (hosp) => {
    if(!hosp.isOpen) return alert("This OPD is currently closed.");
    setFormData({ ...formData, hospital_id: hosp.id, hospital_name: hosp.name });
    setLoading(true);
    setDepartments(await mockApi.getDepartments(hosp.id));
    setLoading(false);
    setStep(2);
  };

  const selectDepartment = async (dept) => {
    setFormData({ ...formData, department: dept });
    setLoading(true);
    setDoctors(await mockApi.getDoctors(formData.hospital_id, dept));
    setLoading(false);
    setStep(3);
  };

  const selectDoctor = (doc) => {
    setFormData({ ...formData, pref_doctor: doc.id, doctor_name: doc.name });
    setStep(4);
  };

  const submitBooking = async () => {
    setSubmitting(true);
    try {
      await mockApi.book({ ...formData, patient_id: user.id });
      navigate('/patient/dashboard'); 
    } catch (err) {
      alert("Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <WizardHeader step={step} setStep={setStep} />

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 shadow-xl min-h-[400px]">
        {loading ? (
           <div className="py-32 flex flex-col items-center justify-center">
             <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
             <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Fetching Data...</p>
           </div>
        ) : (
          <>
            {step === 1 && <StepHospital hospitals={hospitals} selectHospital={selectHospital} />}
            {step === 2 && <StepDepartment departments={departments} formData={formData} setFormData={setFormData} selectDepartment={selectDepartment} />}
            {step === 3 && <StepDoctor doctors={doctors} formData={formData} selectDoctor={selectDoctor} />}
            {step === 4 && <StepSchedule formData={formData} setFormData={setFormData} setStep={setStep} />}
            {step === 5 && <StepConfirm formData={formData} submitBooking={submitBooking} submitting={submitting} />}
          </>
        )}
      </div>
    </div>
  );
}