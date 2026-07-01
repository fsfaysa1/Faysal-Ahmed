import React from "react";
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react";
import { ProfileData } from "../types";

interface ResumeModalProps {
  profile: ProfileData;
  onClose: () => void;
}

export default function ResumeModal({ profile, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Header toolbar */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-400" />
            <h3 className="text-white font-bold text-sm">Faysal Ahmed - Professional CV</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold transition-all"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Container */}
        <div id="printable-resume-area" className="p-6 sm:p-10 text-slate-300 font-sans space-y-8 overflow-y-auto">
          
          {/* Top Banner Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white">{profile.name}</h1>
              <p className="text-sm font-mono text-sky-400 mt-1">{profile.title}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">{profile.heroDescription}</p>
            </div>
            
            <div className="space-y-1.5 text-xs font-mono text-slate-400 md:text-right">
              <div className="flex items-center gap-2 md:justify-end">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <a href={`mailto:${profile.contact.email}`} className="hover:underline">{profile.contact.email}</a>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${profile.contact.phone}`} className="hover:underline">{profile.contact.phone}</a>
              </div>
            </div>
          </div>

          {/* About & Profile Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">{profile.aboutMe}</p>
          </div>

          {/* Education & Experience Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800/50 pt-6">
            
            {/* Left Col: Experience */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" /> Employment History
              </h3>
              
              {profile.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-slate-800 pl-4 py-1">
                  <div>
                    <h4 className="text-sm font-bold text-white">{exp.position}</h4>
                    <span className="text-xs text-sky-400 font-mono">{exp.company} | {exp.duration}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400 list-disc ml-4">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right Col: Education & Accomplishments */}
            <div className="space-y-6">
              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                  <GraduationCap className="w-4.5 h-4.5 text-emerald-400" /> Academic Qualifications
                </h3>
                <div className="border-l-2 border-slate-800 pl-4 py-1">
                  <h4 className="text-sm font-bold text-white">{profile.education.degree}</h4>
                  <p className="text-xs text-emerald-400 font-mono">{profile.education.department}</p>
                  <p className="text-xs text-slate-400 mt-1">{profile.education.institute}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 font-mono">Language Fluency</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {profile.languages.map((lang, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="block font-bold text-white">{lang.name}</span>
                      <span className="block text-slate-500 font-mono text-[10px] mt-0.5">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical and Soft Skills block */}
          <div className="border-t border-slate-800/50 pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Core Skill & Tech Stack Matrix</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800/60 pb-1.5 mb-2.5">Frontend</h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">HTML5</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">CSS3</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">JavaScript</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Tailwind CSS</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Bootstrap</span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800/60 pb-1.5 mb-2.5">Backend & Database</h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">PHP</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">REST APIs</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Node.js</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Express</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">MySQL</span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl col-span-1 sm:col-span-2 md:col-span-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800/60 pb-1.5 mb-2.5">Tools & Operations</h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Git & GitHub</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Linux CLI</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Figma</span>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded">Networking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer transition-colors"
          >
            Close Resume View
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Resume CV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
