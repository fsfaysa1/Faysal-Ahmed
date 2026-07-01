import React, { useState } from "react";
import { Phone, Mail, Globe, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ProfileData } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface ContactProps {
  profile: ProfileData;
}

export default function Contact({ profile }: ContactProps) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate sending email/form data to Faysal
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-900 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("contact.title")}</h2>
          <div className="h-1 w-12 bg-sky-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4">
                {language === "en" ? "Direct Communication Channels" : "সরাসরি যোগাযোগ মাধ্যম"}
              </h3>
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-950/40 border border-sky-950 flex items-center justify-center text-sky-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {language === "en" ? "Call / Contact" : "কল / যোগাযোগ"}
                  </span>
                  <a href={`tel:${profile.contact.phone}`} className="block text-sm font-bold text-white hover:text-sky-400 mt-0.5 font-mono">
                    {profile.contact.phone}
                  </a>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === "en" ? "Response standard phone lines" : "সাধারণ ফোন লাইন উত্তর"}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 border-t border-slate-800/50 pt-5">
                <div className="w-10 h-10 rounded-lg bg-indigo-950/40 border border-indigo-950 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {language === "en" ? "Email Address" : "ইমেইল এড্রেস"}
                  </span>
                  <a href={`mailto:${profile.contact.email}`} className="block text-sm font-bold text-white hover:text-indigo-400 mt-0.5 font-mono">
                    {profile.contact.email}
                  </a>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === "en" ? "Inquire within 24 hours" : "২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হবে"}
                  </span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 border-t border-slate-800/50 pt-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {language === "en" ? "WhatsApp Chat" : "হোয়াটসঅ্যাপ চ্যাট"}
                  </span>
                  <a href={profile.whatsapp.directLink} target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-white hover:text-emerald-400 mt-0.5 font-mono">
                    @{profile.whatsapp.username}
                  </a>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === "en" ? "Instantly active for discussion" : "তাৎক্ষণিক আলোচনার জন্য সক্রিয়"}
                  </span>
                </div>
              </div>

              {/* Personal Web */}
              <div className="flex items-start gap-4 border-t border-slate-800/50 pt-5">
                <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-950 flex items-center justify-center text-purple-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">
                    {language === "en" ? "Official Website" : "অফিসিয়াল ওয়েবসাইট"}
                  </span>
                  <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-white hover:text-purple-400 mt-0.5 font-mono">
                    faysal.kesug.com/contact
                  </a>
                </div>
              </div>
            </div>

            {/* Social Grid block */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono mb-4">
                {language === "en" ? "Follow Faysal Online" : "অনলাইনে ফয়সালকে ফলো করুন"}
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 hover:bg-indigo-950/20 border border-slate-800 hover:border-indigo-500/30 rounded-xl font-medium text-slate-300 hover:text-indigo-400 transition-all">
                  LinkedIn
                </a>
                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl font-medium text-slate-300 hover:text-white transition-all">
                  GitHub
                </a>
                <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 hover:bg-sky-950/20 border border-slate-800 hover:border-sky-500/30 rounded-xl font-medium text-slate-300 hover:text-sky-400 transition-all">
                  Facebook
                </a>
                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl font-medium text-slate-300 hover:text-white transition-all">
                  X / Twitter
                </a>
                <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 hover:bg-pink-950/20 border border-slate-800 hover:border-pink-500/30 rounded-xl font-medium text-slate-300 hover:text-pink-400 transition-all">
                  Instagram
                </a>
                <a href={profile.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-950 hover:bg-rose-950/20 border border-slate-800 hover:border-rose-500/30 rounded-xl font-medium text-slate-300 hover:text-rose-400 transition-all">
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "en" ? "Send a Message" : "বার্তা পাঠান"}
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {language === "en" 
                  ? "Fill out the secure messaging form below and your message will immediately queue for Faysal's inbox review."
                  : "নিচের ফর্মটি পূরণ করুন এবং আপনার বার্তাটি সরাসরি ফয়সালের ইনবক্সে চলে যাবে।"}
              </p>

              <form id="contact-message-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="form-name" className="block text-[11px] font-semibold text-slate-400 font-mono uppercase">
                      {language === "en" ? "Full Name *" : "সম্পূর্ণ নাম *"}
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-sky-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="block text-[11px] font-semibold text-slate-400 font-mono uppercase">
                      {language === "en" ? "Email Address *" : "ইমেইল এড্রেস *"}
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-sky-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="form-subject" className="block text-[11px] font-semibold text-slate-400 font-mono uppercase">
                    {language === "en" ? "Subject" : "বিষয়"}
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={language === "en" ? "Project Inquiry / Job Opening" : "প্রজেক্ট সম্পর্কিত আলোচনা / চাকরির সুযোগ"}
                    className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="form-message" className="block text-[11px] font-semibold text-slate-400 font-mono uppercase">
                    {language === "en" ? "Your Message *" : "আপনার বার্তা *"}
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={language === "en" ? "Write details of your project context..." : "আপনার প্রকল্পের বিবরণ এখানে লিখুন..."}
                    className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                    required
                  />
                </div>

                {/* Alert Panels */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-900/30 rounded-xl text-xs text-emerald-400 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold">
                        {language === "en" ? "Message Queued Successfully!" : "বার্তা সফলভাবে পাঠানো হয়েছে!"}
                      </span>
                      <span>
                        {language === "en" 
                          ? "Thank you. Your inquiry has been sent. You can also contact Faysal directly on WhatsApp for instant replies."
                          : "ধন্যবাদ। আপনার বার্তা পাঠানো হয়েছে। দ্রুত উত্তরের জন্য আপনি সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।"}
                      </span>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-rose-950/40 border border-rose-900/30 rounded-xl text-xs text-rose-400 flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold">
                        {language === "en" ? "Incomplete Message!" : "অসম্পূর্ণ বার্তা!"}
                      </span>
                      <span>
                        {language === "en"
                          ? "Please fill out all required fields with valid contents before submitting."
                          : "দয়া করে পাঠানোর আগে সমস্ত প্রয়োজনীয় তথ্য সঠিক উপায়ে পূরণ করুন।"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  id="btn-contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  {isSubmitting ? (
                    <span>{language === "en" ? "Sending message..." : "পাঠানো হচ্ছে..."}</span>
                  ) : (
                    <>
                      <span>{language === "en" ? "Submit Inquiry" : "বার্তা পাঠান"}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick WhatsApp backup nudge */}
            <div className="mt-8 pt-5 border-t border-slate-800/40 text-center">
              <span className="text-xs text-slate-500 block">
                {language === "en" ? "Preferred follow-up:" : "পছন্দসই যোগাযোগ মাধ্যম:"}
              </span>
              <a
                href={profile.whatsapp.directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:text-emerald-300 mt-1 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {language === "en" ? "Open direct WhatsApp Chat" : "সরাসরি হোয়াটসঅ্যাপে কথা বলুন"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

