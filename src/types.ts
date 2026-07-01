export interface WhatsAppInfo {
  username: string;
  directLink: string;
  phone: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
}

export interface SocialLinks {
  facebook: string;
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
  tiktok: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface ExperienceItem {
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface EducationInfo {
  degree: string;
  department: string;
  institute: string;
}

export interface ProfileData {
  name: string;
  title: string;
  heroDescription: string;
  profileImage: string;
  address: string;
  availability: string;
  responseTime: string;
  whatsappAvailability: string;
  whatsapp: WhatsAppInfo;
  contact: ContactInfo;
  socialLinks: SocialLinks;
  stats: StatItem[];
  aboutMe: string;
  experience: ExperienceItem[];
  achievements: string[];
  softSkills: string[];
  languages: LanguageItem[];
  education: EducationInfo;
  interests: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  previewImage: string;
  description: string;
}

export interface OtherProject {
  title: string;
  category: string;
}

export interface ProjectsData {
  featured: FeaturedProject[];
  other: OtherProject[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
