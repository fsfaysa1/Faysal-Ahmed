import React from "react";
import { Briefcase, Building2, Calendar, CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import { ProfileData } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ExperienceProps {
  profile: ProfileData;
}

export default function Experience({ profile }: ExperienceProps) {
  const { language, t } = useLanguage();

  const translateDuration = (dur: string) => {
    if (language === "en") return dur;
    let out = dur;
    out = out.replace(/Jan/g, "জানুয়ারি").replace(/Feb/g, "ফেব্রুয়ারি").replace(/Mar/g, "মার্চ")
             .replace(/Apr/g, "এপ্রিল").replace(/May/g, "মে").replace(/Jun/g, "জুন")
             .replace(/Jul/g, "জুলাই").replace(/Aug/g, "আগস্ট").replace(/Sep/g, "সেপ্টেম্বর")
             .replace(/Oct/g, "অক্টোবর").replace(/Nov/g, "নভেম্বর").replace(/Dec/g, "ডিসেম্বর")
             .replace(/Present/g, "বর্তমান");
    // Translate digits
    const digits: Record<string, string> = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
    };
    return out.split("").map(char => digits[char] || char).join("");
  };

  const translatePosition = (p: string) => {
    if (language === "en") return p;
    if (p.toLowerCase().includes("junior software engineer")) return "জুনিয়র সফটওয়্যার ইঞ্জিনিয়ার";
    if (p.toLowerCase().includes("network support")) return "আইটি ও নেটওয়ার্ক সাপোর্ট অ্যাসিস্ট্যান্ট";
    return p;
  };

  const translateCompany = (c: string) => {
    if (language === "en") return c;
    if (c.toLowerCase().includes("mymensingh online")) return "ময়মনসিংহ অনলাইন (আইএসপি)";
    return c;
  };

  const translateResponsibility = (r: string) => {
    if (language === "en") return r;
    const l = r.toLowerCase();
    if (l.includes("iptv portal")) return "আইপিটিভি পোর্টাল মিডিয়া স্ট্রিম এবং প্লেলিস্ট কনফিগারেশন তৈরি করা।";
    if (l.includes("php scripts") || l.includes("accounting")) return "স্বয়ংক্রিয় হিসাবরক্ষণ এবং পিডিএফ ইনভয়েস তৈরির জন্য কাস্টম পিএইচপি স্ক্রিপ্ট তৈরি।";
    if (l.includes("network issues") || l.includes("router")) return "গ্রাহকদের নেটওয়ার্ক সমস্যা সমাধান এবং রাউটার কনফিগারেশন পরিচালনা।";
    if (l.includes("client-facing") || l.includes("dashboard")) return "গ্রাহকদের ব্যবহারের জন্য ওয়েব প্যানেল এবং ড্যাশবোর্ড তৈরি করা।";
    if (l.includes("senior administrators") || l.includes("maintenance")) return "সার্ভার রক্ষণাবেক্ষণ এবং ডাটাবেস নিয়ে সিনিয়র অ্যাডমিনিস্ট্রেটরদের সহায়তা করা।";
    if (l.includes("optical fiber") || l.includes("diagnostics")) return "অপটিক্যাল ফাইবার নেটওয়ার্ক রাউটিং ডায়াগনস্টিকস এবং অপারেশনসে সহায়তা।";
    return r;
  };

  return (
    <section id="experience" className="py-24 border-t border-slate-900 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("exp.title")}</h2>
          <div className="h-1 w-12 bg-indigo-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("exp.subtitle")}
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-transparent" />

          {profile.experience.map((exp, index) => (
            <div key={index} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-12">
              {/* Left Side Content (Empty spacer on desktop if right-aligned, or holds company branding) */}
              <div className="hidden md:block w-[45%] text-right pr-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-sky-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{translateDuration(exp.duration)}</span>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm font-bold text-slate-400">
                    {language === "en" ? "ISP & IT Operations" : "আইএসপি ও আইটি অপারেশনস"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === "en" 
                      ? "Full-stack system integrations, subscriber logistics, and networking config." 
                      : "ফুল-স্ট্যাক সিস্টেম ইন্টিগ্রেশন, সাবস্ক্রাইবার লজিস্টিকস এবং নেটওয়ার্ক কনফিগারেশন।"}
                  </p>
                </div>
              </div>

              {/* Timeline Center Badge */}
              <div className="absolute left-2 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-950 border-4 border-indigo-500 z-10 shadow-lg shadow-indigo-500/20" />

              {/* Right Side Content (The Main details card) */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0 md:text-left">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/80 transition-all duration-300 backdrop-blur-sm shadow-md">
                  {/* Title and Company */}
                  <div className="flex items-center gap-1 text-xs text-indigo-400 font-semibold font-mono mb-2 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{translateCompany(exp.company)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                    {translatePosition(exp.position)}
                  </h3>

                  {/* Date Badge for Mobile View */}
                  <div className="inline-flex md:hidden items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-sky-400 font-mono mt-1.5 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>{translateDuration(exp.duration)}</span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
                    {language === "en"
                      ? "Developing business apps, IPTV panels, and optimizing workflow frameworks while managing router support and network systems."
                      : "রাউটার সাপোর্ট এবং নেটওয়ার্কিং সিস্টেম পরিচালনার পাশাপাশি ব্যবসায়িক অ্যাপ, আইপিটিভি প্যানেল এবং কাজের গতি বাড়াতে বিভিন্ন ফ্রেমওয়ার্ক উন্নয়ন করা।"}
                  </p>

                  <div className="h-px bg-slate-800/50 my-4" />

                  {/* Core Responsibilities Bullet Grid */}
                  <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider font-mono mb-3">
                    {language === "en" ? "Key Responsibilities:" : "প্রধান দায়িত্বসমূহ:"}
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{translateResponsibility(resp)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

