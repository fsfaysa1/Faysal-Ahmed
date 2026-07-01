import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  User, 
  Briefcase, 
  Cpu, 
  Settings, 
  Rocket, 
  Folder, 
  Lightbulb, 
  Phone 
} from "lucide-react";

interface SideIndicatorProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const SECTIONS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "tech-stack", label: "Tech Stack", icon: Settings },
  { id: "featured-projects", label: "Featured Projects", icon: Rocket },
  { id: "all-projects", label: "All Projects", icon: Folder },
  { id: "services", label: "Services", icon: Lightbulb },
  { id: "contact", label: "Contact", icon: Phone }
];

export default function SideIndicator({ activeSection, onNavClick }: SideIndicatorProps) {
  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 bg-slate-950/40 backdrop-blur-md border border-slate-800/80 p-3.5 rounded-full shadow-2xl transition-all hover:bg-slate-950/60"
      id="side-step-indicator"
    >
      {SECTIONS.map((sec, index) => {
        const isActive = activeSection === sec.id;
        const IconComponent = sec.icon;

        return (
          <div key={sec.id} className="relative group flex items-center justify-center">
            {/* Tooltip */}
            <div className="absolute right-12 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 pointer-events-none transition-all duration-200 origin-right flex items-center">
              <div className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <IconComponent className="w-3.5 h-3.5 text-sky-400" />
                <span>{sec.label}</span>
              </div>
              <div className="w-2 h-2 bg-slate-900 border-r border-t border-slate-800 rotate-45 -translate-x-1" />
            </div>

            {/* Indicator Dot */}
            <button
              onClick={() => onNavClick(sec.id)}
              className="relative p-1.5 rounded-full transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-sky-500/50"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Pulse Outer Ring */}
              {isActive && (
                <motion.span 
                  layoutId="activeDotRing"
                  className="absolute inset-0 rounded-full bg-sky-500/20 border border-sky-400/40"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Central Core Dot */}
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-tr from-sky-400 to-indigo-500 scale-125 shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
                    : "bg-slate-700 hover:bg-slate-400 hover:scale-110"
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
