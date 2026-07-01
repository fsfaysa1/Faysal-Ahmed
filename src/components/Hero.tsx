import React from "react";
import { ArrowRight, Download, Eye, Terminal, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { ProfileData } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  profile: ProfileData;
  onNavClick: (sectionId: string) => void;
  onViewResume: () => void;
}

export default function Hero({ profile, onNavClick, onViewResume }: HeroProps) {
  const { language, t } = useLanguage();

  // Map stats labels dynamically based on English labels in data
  const getStatLabel = (orig: string) => {
    const l = orig.toLowerCase();
    if (l.includes("project")) return t("stat.projects");
    if (l.includes("experience") || l.includes("year")) return t("stat.experience");
    if (l.includes("client")) return t("stat.clients");
    if (l.includes("support") || l.includes("ticket")) return t("stat.support");
    return orig;
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-24 overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      {/* Visual background lines and grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-sky-400 font-mono mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {t("profile.availability")}
        </motion.div>

        {/* Profile Image with modern rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-36 h-36 mb-8 group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
          <div className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-sky-500 via-slate-800 to-indigo-600">
            <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden relative">
              <img
                src={profile.profileImage}
                alt={t("name")}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback to initial/placeholder if image URL fails
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${profile.name}`;
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4"
        >
          {t("hero.greeting")} <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{t("name")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl font-medium text-slate-300 font-mono mb-6 max-w-2xl"
        >
          {t("title")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base text-slate-400 max-w-2xl leading-relaxed mb-8"
        >
          {t("hero.desc")}
        </motion.p>

        {/* Location / Field Support info block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400 mb-10 font-mono"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/50 border border-slate-800/60 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{language === "en" ? profile.address : "ময়মনসিংহ, বাংলাদেশ"}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/50 border border-slate-800/60 rounded-lg">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("profile.whatsappAvailability")}</span>
          </div>
        </motion.div>

        {/* Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mb-16"
        >
          <button
            id="hero-btn-projects"
            onClick={() => onNavClick("featured-projects")}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-sky-500/10 cursor-pointer group transition-all"
          >
            <span>{t("hero.action.projects")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-btn-resume"
            onClick={onViewResume}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>{t("hero.action.resume")}</span>
          </button>

          <button
            id="hero-btn-contact"
            onClick={() => onNavClick("contact")}
            className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>{t("hero.action.contact")}</span>
          </button>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm max-w-4xl w-full"
        >
          {profile.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </span>
              <span className="block text-xs text-slate-400 uppercase tracking-wider font-mono">
                {getStatLabel(stat.label)}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-500 cursor-pointer" onClick={() => onNavClick("about")} />
        </div>
      </div>
    </section>
  );
}

