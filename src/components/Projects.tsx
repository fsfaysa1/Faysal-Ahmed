import React, { useState } from "react";
import { Folder, Play, ArrowUpRight, Cpu, Tv, Receipt, Ticket, Book, Info, X, ExternalLink } from "lucide-react";
import { ProjectsData, FeaturedProject } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ProjectsProps {
  projects: ProjectsData;
  onNavClick: (sectionId: string) => void;
}

export default function Projects({ projects, onNavClick }: ProjectsProps) {
  const { language, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  const translateProjectTitle = (id: string, def: string) => {
    if (language === "en") return def;
    const dict: Record<string, string> = {
      "faysal-tv": "ফয়সাল টিভি - M3U8 আইপিটিভি ওয়েব প্লেয়ার",
      "billing-system": "স্বয়ংক্রিয় বিলিং ও ইনভয়েসিং সিস্টেম",
      "isp-ticket-support": "আইএসপি সাপোর্ট টিকিট ও গ্রাহক সিস্টেম",
      "quran-listening-reading": "ইন্টারেক্টিভ কোরআন লিসেনিং প্ল্যাটফর্ম"
    };
    return dict[id] || def;
  };

  const translateProjectDesc = (id: string, def: string) => {
    if (language === "en") return def;
    const dict: Record<string, string> = {
      "faysal-tv": "মাল্টি-চ্যানেল লাইভ স্ট্রিমিং এবং উন্নত M3U8 প্লেলিস্ট রেন্ডারিং সহ কাস্টম-টেইলর্ড হাই-পারফরম্যান্স আইপিটিভি মিডিয়া প্যানেল।",
      "billing-system": "স্বয়ংক্রিয় গ্রাহক হিসাবরক্ষণ, পুনরাবৃত্তিমূলক পিডিএফ রশিদ জেনারেটর এবং অপ্টিমাইজড ব্যালেন্স ট্র্যাকিং ডাটাবেস।",
      "isp-ticket-support": "রিয়েল-টাইম অপারেশনাল লগ, টেলিগ্রাম এলার্ট ইন্টিগ্রেশন এবং কাস্টম কাস্টমার সিআরএম সহ সাপোর্ট ড্যাশবোর্ড।",
      "quran-listening-reading": "অডিও প্লেব্যাক, প্রিয় তেলাওয়াতকারী নির্বাচন এবং দ্বৈত অনুবাদ ট্র্যাক সহ ইন্টারেক্টিভ ও আধুনিকভাবে ডিজাইনকৃত কোরআন প্ল্যাটফর্ম।"
    };
    return dict[id] || def;
  };

  const translateProjectCategory = (cat: string) => {
    if (language === "en") return cat;
    const dict: Record<string, string> = {
      "iptv player / streaming": "আইপিটিভি প্লেয়ার / স্ট্রিমিং",
      "finance / automation": "অর্থসংস্থান / স্বয়ংক্রিয়করণ",
      "isp crm / crm utilities": "আইএসপি সিআরএম / টিকেটিং সমাধান",
      "religious portal / audio stream": "ধর্মীয় পোর্টাল / অডিও স্ট্রিমিং",
      "iptv portal / streaming": "আইপিটিভি প্লেয়ার / স্ট্রিমিং",
      "utility / tools": "ইউটিলিটি / টুলস",
      "frontend utility": "ফ্রন্টএন্ড ইউটিলিটি",
      "security": "নিরাপত্তা ও স্ক্রিপ্ট",
      "productivity": "উত্পাদনশীলতা",
      "networking": "নেটওয়ার্কিং"
    };
    return dict[cat.toLowerCase()] || cat;
  };

  const translateOtherProjectTitle = (title: string) => {
    if (language === "en") return title;
    const t = title.toLowerCase();
    if (t.includes("bftv-player") || t.includes("bftv player")) return "বিএফটিভি আইপিটিভি প্লেয়ার";
    if (t.includes("automatic ledgers")) return "স্বয়ংক্রিয় লেজার ও হিসাব খাতা";
    if (t.includes("isp helper script")) return "আইএসপি হেল্পার ও রিকনসিলিয়েশন স্ক্রিপ্টস";
    if (t.includes("reciter custom web player")) return "পছন্দসই তেলাওয়াতকারী ওয়েব প্লেয়ার";
    if (t.includes("telegram notification integration")) return "টেলিগ্রাম নোটিফিকেশন গেটওয়ে";
    if (t.includes("bootstrap layout optimization")) return "বুটস্ট্র্যাপ রেসপন্সিভ লেআউট অপ্টিমাইজেশন";
    return title;
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "faysal-tv":
        return <Tv className="w-5 h-5 text-sky-400" />;
      case "billing-system":
        return <Receipt className="w-5 h-5 text-indigo-400" />;
      case "isp-ticket-support":
        return <Ticket className="w-5 h-5 text-emerald-400" />;
      case "quran-listening-reading":
        return <Book className="w-5 h-5 text-amber-400" />;
      default:
        return <Folder className="w-5 h-5 text-slate-400" />;
    }
  };

  const getProjectTags = (id: string) => {
    switch (id) {
      case "faysal-tv":
        return ["IPTV", "M3U8", "PHP", "Tailwind CSS", "REST API"];
      case "billing-system":
        return ["PHP", "MySQL", "Billing", "PDF Invoices", "Bootstrap"];
      case "isp-ticket-support":
        return ["Ticketing", "ISP Operations", "CRM", "AJAX", "MySQL"];
      case "quran-listening-reading":
        return ["React", "Tailwind CSS", "Web Audio API", "JSON", "Islamic App"];
      default:
        return ["Web App", "Custom Tech"];
    }
  };

  return (
    <section id="featured-projects" className="py-24 border-t border-slate-900 bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Projects Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-4">
            <Tv className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("proj.featured.title")}</h2>
          <div className="h-1 w-12 bg-sky-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("proj.featured.subtitle")}
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
          {projects.featured.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl overflow-hidden backdrop-blur-sm transition-all flex flex-col h-full shadow-lg"
            >
              {/* Card Image Cover with overlay play button */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-slate-800/60">
                <img
                  src={project.previewImage}
                  alt={translateProjectTitle(project.id, project.title)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60`;
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-3.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-lg transition-transform scale-90 group-hover:scale-100 duration-300 cursor-pointer"
                  >
                    <Info className="w-5.5 h-5.5" />
                  </button>
                </div>
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-sky-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {translateProjectCategory(project.category)}
                </span>
              </div>

              {/* Content Card */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                      {getProjectIcon(project.id)}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                      {translateProjectTitle(project.id, project.title)}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {translateProjectDesc(project.id, project.description)}
                  </p>
                </div>

                <div>
                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {getProjectTags(project.id).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-3 border-t border-slate-800/40">
                    <button
                      id={`btn-project-details-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-3 py-2.5 rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t("proj.case.details")}</span>
                    </button>

                    <button
                      onClick={() => onNavClick("contact")}
                      className="flex-1 text-xs bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 px-3 py-2.5 rounded-xl border border-sky-500/20 font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{t("proj.inquire")}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Projects Header */}
        <div id="all-projects" className="flex flex-col items-center text-center pt-12 mb-12 scroll-mt-24">
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4">
            <Folder className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("proj.all.title")}</h2>
          <div className="h-1 w-12 bg-indigo-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("proj.all.subtitle")}
          </p>
        </div>

        {/* Other Projects Index Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {projects.other.map((proj, idx) => (
            <div
              key={idx}
              className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded bg-indigo-950/40 border border-indigo-900/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Folder className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">
                  {translateProjectCategory(proj.category)}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5 leading-snug">
                  {translateOtherProjectTitle(proj.title)}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === "en" ? "Full-stack functional release • Production deployed" : "ফুল-স্ট্যাক ফাংশনাল রিলিজ • প্রোডাকশনে নিয়োজিত"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative cursor-default"
          >
            
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full bg-slate-950">
              <img
                src={selectedProject.previewImage}
                alt={translateProjectTitle(selectedProject.id, selectedProject.title)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60`;
                }}
              />
              <button
                id="btn-close-project-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-800/80 cursor-pointer hover:bg-slate-950"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-4 bg-sky-600 border border-sky-400 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                {translateProjectCategory(selectedProject.category)}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {getProjectIcon(selectedProject.id)}
                <span>{translateProjectTitle(selectedProject.id, selectedProject.title)}</span>
              </h3>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {getProjectTags(selectedProject.id).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-sky-400 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="h-px bg-slate-800/60 my-4" />

              <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider font-mono mb-2">
                {language === "en" ? "Project Overview:" : "প্রকল্প পরিচিতি:"}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {translateProjectDesc(selectedProject.id, selectedProject.description)} {language === "en" ? "This application was designed as a production solution to optimize workflows, simplify client and account billing pipelines, and enable frictionless operations. Engineered with clean frontend markup and a modular backend to guarantee extreme speeds and zero downtime under dense visitor volume." : "এই অ্যাপ্লিকেশনটি কাজের গতি বাড়াতে, গ্রাহক ও হিসাব বিলিং পাইপলাইন সহজ করতে এবং কোনো বাধা ছাড়াই অপারেশন সচল রাখতে একটি কার্যকর সমাধান হিসাবে তৈরি করা হয়েছিল। দর্শনার্থীদের ঘন চাপের মধ্যেও অতি দ্রুত গতি এবং ডাউনটাইম এড়াতে নিখুঁত ফ্রন্টএন্ড এবং মডুলার ব্যাকএন্ড সহ এটি ডিজাইন করা হয়েছে।"}
              </p>

              {/* Core Features */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider font-mono mb-3">
                  {language === "en" ? "Core Integrated Features:" : "প্রধান সংহত বৈশিষ্ট্যসমূহ:"}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {language === "en" ? "Real-Time API endpoints" : "রিয়েল-টাইম এপিআই এন্ডপয়েন্ট"}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {language === "en" ? "Highly responsive UI layout" : "অত্যন্ত রেসপন্সিভ ইউআই লেআউট"}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {language === "en" ? "Safe database connectivity" : "নিরাপদ ডাটাবেস সংযোগ"}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {language === "en" ? "Integrated admin monitoring" : "সংহত অ্যাডমিন মনিটরিং"}
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onNavClick("contact");
                  }}
                  className="flex-1 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer shadow-md"
                >
                  {language === "en" ? "Contact Faysal About This App" : "এই অ্যাপটি সম্পর্কে ফয়সালের সাথে যোগাযোগ করুন"}
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  {language === "en" ? "Close Case" : "বন্ধ করুন"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

