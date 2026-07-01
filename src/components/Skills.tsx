import React, { useState } from "react";
import { Laptop, Cpu, Database, Wrench, Network, Layout, CheckCircle2 } from "lucide-react";
import { SkillsData } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface SkillsProps {
  skills: SkillsData;
}

const COMPETENCIES = [
  { name: "Web Application Development", percentage: 95, color: "from-sky-500 to-indigo-500" },
  { name: "Static Website Development", percentage: 98, color: "from-indigo-500 to-purple-500" },
  { name: "REST API Integration", percentage: 92, color: "from-emerald-500 to-teal-500" },
  { name: "IPTV & Streaming Platforms", percentage: 90, color: "from-amber-500 to-orange-500" },
  { name: "ISP Management & Billing", percentage: 94, color: "from-rose-500 to-pink-500" },
  { name: "UI/UX & Responsive Design", percentage: 96, color: "from-cyan-500 to-sky-500" }
];

export default function Skills({ skills }: SkillsProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", ...skills.categories.map((c) => c.name)];

  const translateCompetency = (name: string) => {
    if (language === "en") return name;
    const dict: Record<string, string> = {
      "web application development": "ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট",
      "static website development": "স্ট্যাটিক ওয়েবসাইট ডেভেলপমেন্ট",
      "rest api integration": "রেস্ট এপিআই ইন্টিগ্রেশন",
      "iptv & streaming platforms": "আইপিটিভি ও স্ট্রিমিং প্ল্যাটফর্ম",
      "isp management & billing": "আইএসপি ম্যানেজমেন্ট ও বিলিং",
      "ui/ux & responsive design": "ইউআই/ইউএক্স ও রেসপন্সিভ ডিজাইন"
    };
    return dict[name.toLowerCase()] || name;
  };

  const translateCategory = (name: string) => {
    if (language === "en") return name;
    const dict: Record<string, string> = {
      "all": "সব",
      "frontend": "ফ্রন্টএন্ড",
      "backend": "ব্যাকএন্ড",
      "database": "ডেটাবেস",
      "tools": "টুলস",
      "networking & sysadmin": "নেটওয়ার্কিং ও সিস্টেম অ্যাডমিন"
    };
    return dict[name.toLowerCase()] || name;
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Frontend":
        return <Laptop className="w-4 h-4 text-sky-400" />;
      case "Backend":
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case "Database":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "Tools":
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case "Networking & SysAdmin":
        return <Network className="w-4 h-4 text-rose-400" />;
      default:
        return <Layout className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Competencies Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-4">
            <Layout className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("skills.title")}</h2>
          <div className="h-1 w-12 bg-sky-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Core Competencies Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {COMPETENCIES.map((comp, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm font-bold text-white tracking-tight">{translateCompetency(comp.name)}</span>
                <span className="text-xs font-semibold text-sky-400 font-mono">{comp.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                <div
                  className={`h-full bg-gradient-to-r ${comp.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${comp.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Header */}
        <div id="tech-stack" className="flex flex-col items-center text-center pt-12 mb-12 scroll-mt-24">
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("skills.stack")}</h2>
          <div className="h-1 w-12 bg-indigo-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("skills.stack.subtitle")}
          </p>
        </div>

        {/* Tabs for Tech Stack Filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`tech-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              onClick={() => setActiveTab(cat)}
              className={`text-xs px-4 py-2 rounded-xl border transition-all cursor-pointer font-medium ${
                activeTab === cat
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                  : "bg-slate-900 border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              {translateCategory(cat)}
            </button>
          ))}
        </div>

        {/* Tabbed Tech Stack Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.categories
            .filter((cat) => activeTab === "All" || cat.name === activeTab)
            .map((cat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col hover:border-slate-700/80 transition-all group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5 border-b border-slate-800/60 pb-4">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                    {getCategoryIcon(cat.name)}
                  </div>
                  <h3 className="text-sm font-extrabold tracking-wider text-slate-200 uppercase font-mono">
                    {translateCategory(cat.name)}
                  </h3>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-medium hover:text-white transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

