import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import FAQSection from "./components/FAQSection";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";
import ResumeModal from "./components/ResumeModal";
import SideIndicator from "./components/SideIndicator";

// Import data files directly to provide immediate fallback content
import profileJson from "./data/profile.json";
import projectsJson from "./data/projects.json";
import servicesJson from "./data/services.json";
import skillsJson from "./data/skills.json";
import faqJson from "./data/faq.json";

import { ProfileData, ProjectsData, ServiceItem, SkillsData, FAQItem } from "./types";

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(profileJson as ProfileData);
  const [projects, setProjects] = useState<ProjectsData>(projectsJson as ProjectsData);
  const [services, setServices] = useState<ServiceItem[]>(servicesJson as ServiceItem[]);
  const [skills, setSkills] = useState<SkillsData>(skillsJson as SkillsData);
  const [faq, setFaq] = useState<FAQItem[]>(faqJson as FAQItem[]);

  const [activeSection, setActiveSection] = useState<string>("home");
  const [showResume, setShowResume] = useState<boolean>(false);

  // Fetch server data on mount to ensure dynamic integration
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.profile) setProfile(data.profile);
          if (data.projects) setProjects(data.projects);
          if (data.services) setServices(data.services);
          if (data.skills) setSkills(data.skills);
          if (data.faq) setFaq(data.faq);
        }
      } catch (err) {
        console.warn("Could not connect to backend API for data, using static bundle fallbacks.", err);
      }
    };
    fetchData();
  }, []);

  // Section Tracking via IntersectionObserver
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "experience",
      "skills",
      "tech-stack",
      "featured-projects",
      "all-projects",
      "services",
      "contact"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when section fills a comfortable viewport range
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll height for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden">
      
      {/* Header bar */}
      <Header activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Home */}
        <Hero
          profile={profile}
          onNavClick={handleNavClick}
          onViewResume={() => setShowResume(true)}
        />

        {/* About */}
        <About profile={profile} />

        {/* Experience */}
        <Experience profile={profile} />

        {/* Skills & Tech Stack */}
        <Skills skills={skills} />

        {/* Featured Projects & All Projects */}
        <Projects projects={projects} onNavClick={handleNavClick} />

        {/* Services */}
        <Services services={services} />

        {/* Frequently Asked Questions */}
        <FAQSection faqList={faq} />

        {/* Contact info & form */}
        <Contact profile={profile} />
      </main>

      {/* Persistent Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-sm font-semibold text-slate-400">
            Designed & Developed by <span className="text-sky-400 font-sans font-bold">{profile.name}</span>
          </p>
          <p className="text-[11px] text-slate-500 italic max-w-md mx-auto leading-relaxed">
            "Turning ideas into practical web solutions with speed, scalability, and security."
          </p>
          <div className="h-px w-10 bg-slate-800 mx-auto my-3" />
          <p className="text-[10px] tracking-wider uppercase">
            © 2026 All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Floating Interactive Chat Widget */}
      <ChatWidget profile={profile} />

      {/* Side step indicator dots */}
      <SideIndicator activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Full Resume modal overlay */}
      {showResume && (
        <ResumeModal profile={profile} onClose={() => setShowResume(false)} />
      )}
    </div>
  );
}
