import React, { useEffect } from "react";
import { 
  ArrowRight, Clock, ShieldCheck, Globe, Activity, Zap, ChevronRight, 
  Users, CheckCircle2, Smartphone, QrCode, MessageSquare, ArrowUpRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = ({ user, loading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-16');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCtaClick = () => {
    if (user && user.role) {
      navigate(user.role === 'hospital-staff' ? '/staff/dashboard' : `/${user.role}/dashboard`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden w-full max-w-[100vw] bg-slate-50 dark:bg-[#0B0F19] selection:bg-blue-500/30">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-500 opacity-20 blur-[80px] sm:blur-[100px]"></div>
      </div>

      {/* hero section */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        <div className="flex-1 text-left w-full max-w-full">
          <div className="inline-flex flex-wrap items-center px-4 py-2 rounded-full mb-6 sm:mb-8 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-md max-w-full">
            <Zap size={14} className="mr-2 fill-blue-500 shrink-0" /> <span className="break-words">The Future of Med-Tech</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight leading-[1.1] break-words hyphens-auto">
            Standardize your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300">
              clinical workflow.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 max-w-xl font-medium leading-relaxed">
            Eliminate lobby congestion. QMedix is the global standard for medical queue management, bridging the gap between doctors and patients in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 min-h-[60px] w-full sm:w-auto">
            {loading ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full opacity-50">
                <div className="h-14 w-full sm:w-48 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                <div className="h-14 w-full sm:w-32 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse hidden sm:block"></div>
              </div>
            ) : user && user.role ? (
              <button onClick={handleCtaClick} className="group relative flex items-center justify-center bg-blue-600 text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] w-full sm:w-auto overflow-hidden">
                <span className="relative z-10 flex items-center">Open Portal <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} /></span>
              </button>
            ) : (
              <>
                <button onClick={handleCtaClick} className="group relative flex items-center justify-center bg-blue-600 text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] w-full sm:w-auto overflow-hidden">
                  <span className="relative z-10 flex items-center">Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} /></span>
                </button>
                <button onClick={() => navigate("/login")} className="group flex items-center justify-center bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 backdrop-blur-md transition-all w-full sm:w-auto">
                  Sign In <ChevronRight className="ml-1 opacity-50 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 relative w-full max-w-lg hidden lg:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-[80px] rounded-full"></div>
          
          <div className="relative z-10 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl shadow-blue-900/10 dark:shadow-blue-900/40 transform rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
               <div>
                 <h3 className="font-black text-slate-900 dark:text-white text-xl">City Hospital</h3>
                 <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Cardiology</p>
               </div>
               <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Live
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Your Token</p>
                 <p className="text-3xl font-black text-slate-900 dark:text-white">Q-42</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg shadow-blue-500/30">
                 <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Now Serving</p>
                 <p className="text-3xl font-black text-white">Q-39</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 py-3 px-4 rounded-xl">
               <span className="flex items-center"><Users size={16} className="mr-2 text-blue-500" /> Wait: 3 People</span>
               <span className="flex items-center"><Clock size={16} className="mr-2 text-amber-500" /> ~36 Mins</span>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-8 -z-10 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-xl transform -rotate-6 opacity-80 backdrop-blur-md flex items-center gap-3">
             <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                <CheckCircle2 size={20} />
             </div>
             <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Token Q-38</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Consultation Complete</p>
             </div>
          </div>
        </div>
      </section>

      {/* features grid */}
      <section className="relative z-20 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="text-center mb-12 sm:mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 sm:mb-4">Engineered for efficiency.</h2>
           <p className="text-sm sm:text-base text-slate-500 font-medium">Everything you need to manage patient flow in one secure platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            icon: <Clock size={24} />, title: "Smart Queues", desc: "Real-time virtual waiting rooms. Track status from anywhere.",
            color: "from-blue-500 to-cyan-400"
          },{
            icon: <ShieldCheck size={24} />, title: "Bank-Grade Security", desc: "End-to-end encryption ensures patient data remains private.",
            color: "from-indigo-500 to-purple-400"
          },{
            icon: <Globe size={24} />, title: "Cloud Native", desc: "Access the portal from any device, clinic, or hospital instantly.",
            color: "from-emerald-500 to-teal-400"
          }].map((f, i) => (
            <div key={i} className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out group relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform duration-500 relative z-10">
                {f.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight relative z-10">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium relative z-10">{f.desc}</p>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* stats section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 delay-300 ease-out relative rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 md:p-16 overflow-hidden shadow-xl sm:shadow-2xl shadow-blue-900/10 border border-blue-200/50">
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-300">
            <div className="pt-6 md:pt-0">
              <p className="text-5xl sm:text-6xl font-black mb-2 sm:mb-3 text-blue-700">98%</p>
              <p className="text-slate-600 font-bold uppercase tracking-widest sm:tracking-[0.3em] text-[10px]">Patient Satisfaction</p>
            </div>
            <div className="pt-6 md:pt-0">
              <p className="text-5xl sm:text-6xl font-black mb-2 sm:mb-3 text-indigo-700">12m</p>
              <p className="text-slate-600 font-bold uppercase tracking-widest sm:tracking-[0.3em] text-[10px]">Avg Wait Reduction</p>
            </div>
            <div className="pt-6 md:pt-0">
              <p className="text-5xl sm:text-6xl font-black mb-2 sm:mb-3 text-sky-700">50k+</p>
              <p className="text-slate-600 font-bold uppercase tracking-widest sm:tracking-[0.3em] text-[10px]">Active Sessions</p>
            </div>
          </div>
          <Activity className="absolute -bottom-10 -right-10 w-64 h-64 sm:w-96 sm:h-96 opacity-10 text-blue-500 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />
        </div>
      </section>

      {/* how it works */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 sm:mb-4">The patient journey, redefined.</h2>
           <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto">From the moment they book to the moment they are seen, QMedix keeps patients informed and clinics running on time.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>

          {[{
            num: "01", icon: <Smartphone size={24} />, title: "Digital Booking", desc: "Patients book online or via kiosk at the clinic."
          },{
            num: "02", icon: <QrCode size={24} />, title: "Smart Token", desc: "A unique dynamic QR token is instantly generated."
          },{
            num: "03", icon: <MessageSquare size={24} />, title: "Live Updates", desc: "Real-time SMS & web tracking eliminates anxiety."
          },{
            num: "04", icon: <CheckCircle2 size={24} />, title: "Zero Wait", desc: "Arrive exactly when the doctor is ready."
          }].map((step, i) => (
            <div key={i} className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-700 relative z-10 bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl transition-transform" style={{ transitionDelay: `${i * 100}ms` }}>
               <div className="text-5xl sm:text-6xl font-black text-slate-100 dark:text-slate-800/50 absolute top-4 right-6 select-none -z-10">{step.num}</div>
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 sm:mb-6">
                 {step.icon}
               </div>
               <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
               <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto mb-10 sm:mb-20">
        <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 relative rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-xl sm:shadow-2xl shadow-cyan-900/10 border border-cyan-200/50">
          
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">Ready to eliminate the waiting room?</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-8 sm:mb-10 max-w-xl mx-auto font-medium">
              Join thousands of healthcare providers who trust QMedix to optimize their daily workflow and improve patient satisfaction.
            </p>
            
            <button 
              onClick={handleCtaClick}
              className="bg-blue-600 text-white px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto rounded-2xl font-black text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center mx-auto group"
            >
              {user && user.role ? "Enter Your Dashboard" : "Create Free Account"} 
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;