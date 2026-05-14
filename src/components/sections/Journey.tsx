"use client";
import { useState } from "react";

export default function Journey() {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const education = [
    {
      year: "Pre-Primary - Class 1",
      title: "Early Education",
      institution: "Dr. Tobgyel School",
      details: "Formative early years."
    },
    {
      year: "Class 1 - 6",
      title: "Primary Education",
      institution: "Druk School",
      details: "Primary schooling and foundational education."
    },
    {
      year: "Class 7 - 10",
      title: "Middle Secondary",
      institution: "Lungtenzampa Middle Secondary School",
      details: "Middle and lower secondary education."
    },
    {
      year: "2018-2020",
      title: "Class 11-12",
      institution: "Yangchenphug Higher Secondary School",
      details: "Completed higher secondary education with a strong foundation in sciences."
    },
    {
      year: "2022-2026",
      title: "Bachelors of Computer Science",
      institution: "Gyalpozhing College of IT",
      details: "Specializing in Artificial Intelligence, Machine Learning, and Cybersecurity. Involved in multiple practical projects and lead roles."
    }
  ];

  return (
    <section 
      className="w-full md:w-[120vw] min-h-screen py-20 md:py-0 flex flex-col justify-center px-6 md:px-24 shrink-0 relative group overflow-hidden section-mobile-fix"
      style={{
        borderRight: '1px solid',
        borderBottom: typeof window !== 'undefined' && window.innerWidth < 768 ? '1px solid' : 'none',
        borderImageSource: 'linear-gradient(to bottom, #000, #1a0a08)',
        borderImageSlice: 1
      }}
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,10,8,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row w-full h-[80vh] md:h-[70vh] gap-12 md:gap-20 mt-16 md:mt-0 items-center justify-start relative z-10">
        
        {/* Left Column: Experience */}
        <div className="flex-[1] flex flex-col gap-8 justify-center">
          <div>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#1a0a08] pb-4">Experience</h3>
            <ul className="space-y-8">
               <li className="relative pl-6 border-l border-[#1a0a08]/30 hover:border-[#1a0a08] transition-colors duration-500 group/item cursor-default">
                 <p className="font-bold text-white tracking-widest uppercase text-lg md:text-xl group-hover/item:text-white transition-colors">Enki Realm Creatives</p>
                 <p className="text-gray-400 mt-1 uppercase text-xs md:text-sm tracking-widest group-hover/item:text-gray-300">Lead UI/UX Designer & Frontend Developer | 2023 - Present</p>
                 <p className="text-xs text-gray-500 mt-2">Tshongkhang (Hatil Bhutan) & Nubyui Law Agency.</p>
               </li>
               <li className="relative pl-6 border-l border-[#1a0a08]/30 hover:border-[#1a0a08] transition-colors duration-500 group/item cursor-default">
                 <p className="font-bold text-white tracking-widest uppercase text-lg md:text-xl group-hover/item:text-white transition-colors">RMD Center</p>
                 <p className="text-gray-400 mt-1 uppercase text-xs md:text-sm tracking-widest group-hover/item:text-gray-300">Visual Designer | Nov - Dec 2025</p>
               </li>
               <li className="relative pl-6 border-l border-[#1a0a08]/30 hover:border-[#1a0a08] transition-colors duration-500 group/item cursor-default">
                 <p className="font-bold text-white tracking-widest uppercase text-lg md:text-xl group-hover/item:text-white transition-colors">GCIT Start-Up Agency</p>
                 <p className="text-gray-400 mt-1 uppercase text-xs md:text-sm tracking-widest group-hover/item:text-gray-300">Developer | Dec 2023</p>
               </li>
               <li className="relative pl-6 border-l border-[#1a0a08]/30 hover:border-[#1a0a08] transition-colors duration-500 group/item cursor-default">
                 <p className="font-bold text-white tracking-widest uppercase text-lg md:text-xl group-hover/item:text-white transition-colors">SLSI Bhutan</p>
                 <p className="text-gray-400 mt-1 uppercase text-xs md:text-sm tracking-widest group-hover/item:text-gray-300">Open World Mapping project | Sept 2022</p>
               </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Education Timeline */}
        <div className="flex-[1] flex flex-col justify-center relative pl-0 md:pl-12 border-l-0 md:border-l border-[#1a0a08]/20">
           <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 md:text-right hidden md:block">Education</h3>
           <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 block md:hidden border-b border-[#1a0a08] pb-4">Education</h3>
           
           {/* Interactive Timeline */}
           <div className="relative border-l-2 border-[#1a0a08]/40 ml-4 md:ml-12 pl-10 flex flex-col gap-6 md:gap-8 mt-4">
              {education.map((item, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer"
                  onClick={() => setActiveTimelineItem(index)}
                  onMouseEnter={() => setActiveTimelineItem(index)}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[49px] top-2 w-4 h-4 transition-all duration-500 rounded-none transform rotate-45
                    ${activeTimelineItem === index ? 'border-2 border-[#1a0a08] bg-[#1a0a08] scale-125 shadow-[0_0_15px_rgba(26,10,8,0.5)]' : 'border border-[#1a0a08]/50 bg-black scale-100'}`}>
                  </div>
                  
                  <div className="transition-all duration-500">
                    <span className={`text-xs md:text-sm tracking-[0.2em] font-bold transition-colors duration-500 ${activeTimelineItem === index ? 'text-[#1a0a08] brightness-150' : 'text-gray-500'}`}>
                      {item.year}
                    </span>
                    <h4 className={`text-lg md:text-2xl font-black uppercase tracking-tighter mt-1 mb-1 transition-all duration-500
                      ${activeTimelineItem === index ? 'text-white' : 'text-gray-600'}`}>
                      {item.title}
                    </h4>
                    <p className={`uppercase tracking-widest text-[10px] md:text-xs transition-colors duration-500 ${activeTimelineItem === index ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.institution}
                    </p>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${activeTimelineItem === index ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                      <p className="text-gray-400 text-sm border-l-2 border-[#1a0a08]/50 pl-4 py-1">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Section Number Indicator */}
        <div className="hidden md:flex flex-col justify-center items-center h-full">
          <div className="text-[15vw] xl:text-[20vw] font-black opacity-5 tracking-tighter pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 leading-none">
            02
          </div>
        </div>
      </div>
    </section>
  );
}
