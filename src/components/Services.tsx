import React from "react";
import * as Icons from "lucide-react";
import { ServiceItem } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ServicesProps {
  services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
  const { language, t } = useLanguage();

  // Safe helper to dynamically resolve icons from the imported list
  const getIconComponent = (iconName: string) => {
    const LucideIcon = (Icons as any)[iconName];
    if (LucideIcon) {
      return <LucideIcon className="w-6 h-6" />;
    }
    return <Icons.HelpCircle className="w-6 h-6" />;
  };

  const translateService = (service: ServiceItem) => {
    const titleLower = service.title.toLowerCase();
    if (titleLower.includes("iptv") || titleLower.includes("streaming")) {
      return {
        title: t("serv.iptv.title"),
        description: t("serv.iptv.desc")
      };
    }
    if (titleLower.includes("billing") || titleLower.includes("invoicing")) {
      return {
        title: t("serv.billing.title"),
        description: t("serv.billing.desc")
      };
    }
    if (titleLower.includes("isp") || titleLower.includes("ticket")) {
      return {
        title: t("serv.isp.title"),
        description: t("serv.isp.desc")
      };
    }
    if (titleLower.includes("full-stack") || titleLower.includes("web development")) {
      return {
        title: t("serv.fullstack.title"),
        description: t("serv.fullstack.desc")
      };
    }
    if (titleLower.includes("ui/ux") || titleLower.includes("design")) {
      return {
        title: t("serv.uiux.title"),
        description: t("serv.uiux.desc")
      };
    }
    if (titleLower.includes("consulting") || titleLower.includes("api")) {
      return {
        title: t("serv.consulting.title"),
        description: t("serv.consulting.desc")
      };
    }
    return {
      title: service.title,
      description: service.description
    };
  };

  return (
    <section id="services" className="py-24 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4">
            <Icons.Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("serv.title")}</h2>
          <div className="h-1 w-12 bg-indigo-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("serv.subtitle")}
          </p>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const translated = translateService(service);
            return (
              <div
                key={index}
                className="group bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/50 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container with glowing effects */}
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 mb-5 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-indigo-600 group-hover:border-transparent transition-all">
                    {getIconComponent(service.icon)}
                  </div>

                  <h3 className="text-base font-bold text-slate-200 mb-2 group-hover:text-sky-400 transition-colors">
                    {translated.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {translated.description}
                  </p>
                </div>

                {/* Action/Indicator Line */}
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider text-sky-500 group-hover:text-sky-400 transition-colors uppercase mt-auto">
                  <span>{t("serv.tag")}</span>
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

