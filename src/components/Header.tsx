import React, { useState, useEffect } from "react";
import { Menu, X, Bot, Code, Terminal, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const MENU_ITEMS_RAW = [
  { id: "home", icon: "🏠", tKey: "nav.home" as const },
  { id: "about", icon: "👤", tKey: "nav.about" as const },
  { id: "experience", icon: "💼", tKey: "nav.experience" as const },
  { id: "skills", icon: "🛠", tKey: "nav.skills" as const },
  { id: "tech-stack", icon: "⚙", tKey: "nav.tech-stack" as const },
  { id: "featured-projects", icon: "🚀", tKey: "nav.featured-projects" as const },
  { id: "all-projects", icon: "📂", tKey: "nav.all-projects" as const },
  { id: "services", icon: "💡", tKey: "nav.services" as const },
  { id: "contact", icon: "📞", tKey: "nav.contact" as const }
];

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      {/* Thin animated scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-900/20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => onNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md group-hover:scale-105 transition-all">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-white font-bold tracking-tight text-sm block leading-tight">{t("name")}</span>
              <span className="text-sky-400 font-mono text-[10px] block leading-tight tracking-wider uppercase">
                {t("nav.home") === "Home" ? "Software Engineer" : "সফটওয়্যার ইঞ্জিনিয়ার"}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {MENU_ITEMS_RAW.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onNavClick(item.id)}
                className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer hover:bg-slate-900/60 ${
                  activeSection === item.id
                    ? "text-sky-400 bg-sky-950/40 border border-sky-900/40 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{t(item.tKey)}</span>
              </button>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-2.5 py-1.5 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-sky-400 hover:text-sky-300 font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Switch Language / ভাষা পরিবর্তন করুন"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "BN" : "EN"}</span>
            </button>

            {/* Quick Bot shortcut */}
            <button
              onClick={() => {
                const widgetBtn = document.getElementById("btn-toggle-chat");
                if (widgetBtn) widgetBtn.click();
              }}
              className="ml-3 px-3 py-1.5 rounded-lg text-xs bg-gradient-to-r from-sky-500/10 to-indigo-600/10 hover:from-sky-500/20 hover:to-indigo-600/20 border border-sky-500/20 text-sky-400 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              {t("nav.ask-ai")}
            </button>
          </nav>

          {/* Mobile menu button / tools */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Language Switcher Mobile */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-900/80 border border-slate-800/80 text-sky-400 font-mono font-bold flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-4 h-4 mr-1" />
              <span>{language === "en" ? "BN" : "EN"}</span>
            </button>

            <button
              onClick={() => {
                const widgetBtn = document.getElementById("btn-toggle-chat");
                if (widgetBtn) widgetBtn.click();
              }}
              className="p-1.5 rounded-lg bg-sky-950/40 border border-sky-900/40 text-sky-400 hover:text-white transition-all cursor-pointer"
              title="Ask AI Assistant"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-900">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {MENU_ITEMS_RAW.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => {
                  onNavClick(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${
                  activeSection === item.id
                    ? "text-sky-400 bg-sky-950/60 border border-sky-900/40"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{t(item.tKey)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

