import React from "react";
import { User, Award, BookOpen, Brain, Languages, Compass } from "lucide-react";
import { ProfileData } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface AboutProps {
  profile: ProfileData;
}

export default function About({ profile }: AboutProps) {
  const { language, t } = useLanguage();

  const translateSoftSkill = (s: string) => {
    if (language === "en") return s;
    const dict: Record<string, string> = {
      "problem solving": "সমস্যা সমাধান",
      "continuous learning": "ক্রমাগত শেখা",
      "team collaboration": "দলগত সহযোগিতা",
      "communication": "যোগাযোগ দক্ষতা",
      "time management": "সময় ব্যবস্থাপনা",
      "adaptability": "অভিযোজনযোগ্যতা",
      "attention to detail": "বিশদ বিবরণীর প্রতি মনোযোগ",
      "critical thinking": "বিশ্লেষণাত্মক চিন্তা",
      "self motivation": "স্বতঃস্ফূর্ততা"
    };
    return dict[s.toLowerCase()] || s;
  };

  const translateAchievement = (a: string) => {
    if (language === "en") return a;
    const l = a.toLowerCase();
    if (l.includes("bftv player") || l.includes("iptv") || l.includes("custom streaming")) {
      return "আইপিটিভি প্লেয়ার এবং কাস্টম স্ট্রিমিং মডিউলগুলোর সফল বাস্তবায়ন।";
    }
    if (l.includes("automatic pdf") || l.includes("billing") || l.includes("ledger")) {
      return "সম্পূর্ণ স্বয়ংক্রিয় বিলিং এবং পুনরাবৃত্তিমূলক সাবস্ক্রিপশন সিস্টেম ডিজাইন।";
    }
    if (l.includes("isp support ticket") || l.includes("ticket") || l.includes("operators")) {
      return "রিয়েল-টাইম এলার্ট সহ আইএসপি টিকেট ও হেল্পডেস্ক ক্লায়েন্ট সমাধান।";
    }
    if (l.includes("responsive web interface") || l.includes("quran") || l.includes("reciter")) {
      return "অডিও প্লেয়ার এবং দ্বৈত অনুবাদ সহ পবিত্র কোরআন শোনার আধুনিক প্ল্যাটফর্ম।";
    }
    return a;
  };

  const translateInterest = (i: string) => {
    if (language === "en") return i;
    const dict: Record<string, string> = {
      "open source": "ওপেন সোর্স অবদান",
      "reading tech blogs": "প্রযুক্তি ব্লগ পড়া",
      "playing strategy games": "কৌশলগত গেম খেলা",
      "ui/ux exploration": "ইউআই/ইউএক্স অন্বেষণ",
      "audio technology": "অডিও প্রযুক্তি",
      "networking": "নেটওয়ার্কিং ও আইপিটিভি",
      "automation": "স্বয়ংক্রিয়করণ ও স্ক্রিপ্টিং"
    };
    return dict[i.toLowerCase()] || i;
  };

  return (
    <section id="about" className="py-24 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-4">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("about.title")}</h2>
          <div className="h-1 w-12 bg-sky-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Card */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-sky-400 font-mono">01.</span> {t("about.story")}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
              {t("profile.aboutMe")}
            </p>

            {/* Achievements Sub-Section */}
            <div className="border-t border-slate-800/60 pt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-sky-400 font-mono mb-4 flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-sky-400" /> {t("about.milestones")}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-sky-400 font-bold">✓</span>
                    <span>{translateAchievement(achievement)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Side Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education & Language */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> {t("about.education")}
              </h3>
              <div className="border-l-2 border-indigo-500/40 pl-4 py-1 mb-6">
                <h4 className="text-sm font-bold text-white">{t("edu.degree")}</h4>
                <p className="text-xs text-indigo-400 font-mono mt-0.5">{t("edu.department")}</p>
                <p className="text-xs text-slate-400 mt-1">{t("edu.institute")}</p>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-t border-slate-800/50 pt-5">
                <Languages className="w-5 h-5 text-emerald-400" /> {t("about.languages")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {profile.languages.map((lang, index) => {
                  const isEng = lang.name.toLowerCase().includes("english");
                  const displayName = isEng ? t("lang.english") : t("lang.bengali");
                  const displayLevel = isEng ? t("lang.english.level") : t("lang.bengali.level");

                  return (
                    <div key={index} className="bg-slate-950/60 border border-slate-800/40 rounded-xl p-3">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        {language === "en" ? "Language" : "ভাষা"}
                      </span>
                      <span className="block text-sm font-bold text-white mt-0.5">{displayName}</span>
                      <span className="inline-block text-[10px] text-emerald-400 font-mono mt-1 px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/30">
                        {displayLevel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-sky-400" /> {t("about.softskills")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-950 border border-slate-800/60 text-slate-300 px-3 py-1.5 rounded-lg font-medium"
                  >
                    {translateSoftSkill(skill)}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-400" /> {t("about.interests")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="text-xs bg-purple-950/20 border border-purple-900/30 text-purple-300 px-3 py-1.5 rounded-lg font-medium"
                  >
                    {translateInterest(interest)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

