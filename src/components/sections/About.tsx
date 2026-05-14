export default function About() {
  return (
    <section className="w-screen md:w-[120vw] h-screen flex flex-row items-center justify-start gap-20 pb-24 px-10 md:px-24 shrink-0 border-r border-[#222] relative group">
      <div className="flex flex-col gap-12 md:gap-16 w-full max-w-6xl relative z-10 mt-12 md:mt-20">
        
        {/* Profile (First Row) */}
        <div className="w-full">
          <h2 className="text-3xl md:text-5xl font-medium mb-10 uppercase tracking-[0.3em] text-white/60">
            Profile
          </h2>
          <p className="text-sm md:text-lg leading-relaxed font-normal text-gray-400 max-w-4xl">
            Detail-oriented and results-driven Computer Science student specializing in Artificial Intelligence, Machine Learning, and Cybersecurity. Experienced in developing AI-driven applications, implementing deep learning models, and simulating real-world cybersecurity vulnerabilities. Strong foundation in system design, API integration, and full-stack development with a focus on building scalable and efficient solutions. Seeking opportunities to apply technical expertise in real-world environments and contribute to innovative projects.
          </p>
        </div>

        {/* Leadership & Languages (Second Row) */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full">
          <div className="flex-1">
             <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-white/40 mb-8 border-b border-white/5 pb-4">Leadership</h3>
             <ul className="space-y-8">
               <li className="group/item cursor-default border-l border-white/10 pl-6 hover:border-white/40 transition-colors duration-500">
                 <p className="font-bold text-white/80 tracking-widest uppercase text-[10px] md:text-xs">Literary and Interactive Club (LIA)</p>
                 <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-widest border border-white/5 inline-block px-3 py-1 group-hover/item:border-white/20 transition-colors">President & Vice President | 2022 - 2026</p>
               </li>
               <li className="group/item cursor-default border-l border-white/10 pl-6 hover:border-white/40 transition-colors duration-500">
                 <p className="font-bold text-white/80 tracking-widest uppercase text-[10px] md:text-xs">Team Lead / Project Manager</p>
                 <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-widest border border-white/5 inline-block px-3 py-1 group-hover/item:border-white/20 transition-colors">EcoVision (2025), GCIT Chatbot (2026)</p>
               </li>
               <li className="group/item cursor-default border-l border-white/10 pl-6 hover:border-white/40 transition-colors duration-500">
                 <p className="font-bold text-white/80 tracking-widest uppercase text-[10px] md:text-xs">UI/UX Lead & Graphics Designer</p>
                 <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-widest border border-white/5 inline-block px-3 py-1 group-hover/item:border-white/20 transition-colors">COP28, EcoVision, GCIT Chatbot, Hatil</p>
               </li>
             </ul>
          </div>

          <div className="flex-1">
             <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-white/40 mb-8 border-b border-white/5 pb-4">Languages</h3>
             <div className="flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.3em] font-medium text-gray-500">
               {['Nepali (Native)', 'Dzongkha (Fluent)', 'English (Fluent)', 'Hindi (Conv.)'].map(lang => (
                 <span key={lang} className="border border-white/5 px-4 py-2 hover:bg-white/[0.03] hover:text-white transition-all duration-300 cursor-default">
                   {lang}
                 </span>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Number Indicator Container (Separate from content) */}
      <div className="hidden md:flex flex-col justify-center items-center h-full">
        <div className="text-[15vw] xl:text-[20vw] font-black opacity-5 tracking-tighter pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 leading-none">
          01
        </div>
      </div>
    </section>
  );
}
