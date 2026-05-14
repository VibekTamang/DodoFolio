export default function Skills() {
  return (
    <section className="w-full md:w-[120vw] min-h-screen py-24 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-start gap-12 md:gap-20 px-6 md:px-24 shrink-0 relative group border-b md:border-b-0 md:border-r border-[#222] overflow-hidden">
      <div className="max-w-6xl w-full z-10 mix-blend-difference flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-8xl font-black mb-8 uppercase tracking-tighter text-white">
              System Core
            </h2>
            <div className="flex flex-wrap gap-3 text-xs md:text-sm uppercase tracking-widest font-medium mb-12">
              {['Machine Learning', 'Computer Vision', 'TensorFlow', 'OpenCV', 'Frontend Dev', 'UI/UX Design', 'Visual Design', 'Wireframing & Prototyping', 'Problem Solving', 'Project Management'].map(skill => (
                <span key={skill} className="border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest font-medium text-gray-400">
              {['Git & GitHub', 'Jupyter Notebook', 'Linux / Kali Linux', 'Docker', 'VMware', 'Figma', 'Adobe Illustrator'].map(tool => (
                <span key={tool} className="border border-gray-600 px-3 py-1 hover:text-white transition-colors duration-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6 border-b border-[#333] pb-4">Certifications</h3>
            <ul className="space-y-4 text-gray-300 text-sm md:text-base tracking-widest">
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Foundations of UX Design
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Start the UX Design Process: Empathize, Define, Ideate
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Build Wireframes and Low-Fidelity Prototypes
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Create High-Fidelity Designs and Prototypes in Figma
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                AWS Certification
              </li>
            </ul>

            <div className="mt-16">
              <a href="mailto:vibektamang12@gmail.com" className="text-2xl border-b-2 border-white pb-1 hover:border-transparent transition-all text-white">
                INITIATE CONTACT
              </a>
            </div>
          </div>
        </div>
        
      <div className="hidden md:flex flex-col justify-center items-center h-full">
        <div className="text-[15vw] xl:text-[20vw] font-black opacity-5 tracking-tighter pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 leading-none">
          04
        </div>
      </div>
    </section>
  );
}

