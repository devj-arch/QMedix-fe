import { useEffect, useState } from "react";
import DashboardHeader from "../../components/patient/DashboardHeader";
import ActiveAppointments from "../../components/patient/ActiveAppointments";
import AppointmentHistory from "../../components/patient/AppointmentHistory";
import api from "../../services/apiWrapper";

export default function PatientDashboard() {

  const [activeAppointments,setActiveAppointments] = useState([]);
  const [history,setHistory] = useState([]);
  const [notifications,setNotifications] = useState([]);

  const fetchDashboard = async () => {

    try {

      const activeRes = await api("get","patient/appointments/active");
      const historyRes = await api("get","patient/appointments/history");
      const notificationRes = await api("get","patient/notifications");

      setActiveAppointments(activeRes.data || []);
      setHistory(historyRes.data || []);
      setNotifications(notificationRes.data || []);

    } catch(err){
      console.log("Dashboard fetch error",err);
    }

  };

  useEffect(()=>{
    fetchDashboard();
  },[]);

  return (

    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

      <DashboardHeader
        activeCount={activeAppointments.length}
        notifications={notifications}
      />

      <ActiveAppointments appointments={activeAppointments}/>

      <AppointmentHistory history={history}/>

    </div>
  );
}