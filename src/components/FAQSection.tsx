import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FAQItem } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface FAQSectionProps {
  faqList: FAQItem[];
}

export default function FAQSection({ faqList }: FAQSectionProps) {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const translateFAQ = (item: FAQItem) => {
    if (language === "en") return item;

    const q = item.question.toLowerCase();
    if (q.includes("who is faysal")) {
      return {
        question: "ফয়সাল আহমেদ কে?",
        answer: "ফয়সাল আহমেদ ময়মনসিংহ, বাংলাদেশের একজন জুনিয়র সফটওয়্যার ইঞ্জিনিয়ার, ওয়েব ডেভেলপার এবং ইউআই/ইউএক্স ডিজাইনার। তিনি কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজিতে ডিপ্লোমা সম্পন্ন করেছেন এবং ব্যবসায়িক ওয়েব অ্যাপ্লিকেশন, আইপিটিভি স্ট্রিমিং সলিউশন, বিলিং প্ল্যাটফর্ম এবং আইএসপি সিস্টেম তৈরিতে তার ২ বছরেরও বেশি অভিজ্ঞতা রয়েছে।"
      };
    }
    if (q.includes("current position")) {
      return {
        question: "ফয়সালের বর্তমান কর্মক্ষেত্র কী?",
        answer: "ফয়সাল বর্তমানে ২০২৪ সাল থেকে 'মাধবপুর তিতিল ডট নেট' (Madhabpur Titil Dot Net)-এ জুনিয়র সফটওয়্যার ইঞ্জিনিয়ার এবং ফিল্ড সাপোর্ট ইঞ্জিনিয়ার হিসেবে কাজ করছেন।"
      };
    }
    if (q.includes("technical skills")) {
      return {
        question: "ফয়সালের মূল প্রযুক্তিগত দক্ষতাগুলো কী কী?",
        answer: "তার প্রধান দক্ষতার মধ্যে রয়েছে ফ্রন্টএন্ড প্রযুক্তি (HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap), ব্যাকএন্ড সিস্টেম (PHP, REST APIs, Node.js/Express), ডাটাবেস (MySQL, Firestore), এবং গিট, গিটহাব, ভিএস কোড, পোস্টম্যান এবং ফিগমার মতো ডেভেলপমেন্ট টুলস। এছাড়াও তার রাউটার কনফিগারেশন, বেসিক লিনাক্স এবং অন-ফিল্ড ট্রাবলশুটিংয়ে চমৎকার অভিজ্ঞতা রয়েছে।"
      };
    }
    if (q.includes("completed")) {
      return {
        question: "ফয়সাল কতগুলো প্রজেক্ট সম্পন্ন করেছেন?",
        answer: "ফয়সাল সফলভাবে ২৭টিরও বেশি প্রজেক্ট সম্পন্ন করেছেন এবং ৭+ সন্তুষ্ট ক্লায়েন্টের সাথে কাজ করেছেন। তার প্রধান প্রজেক্টগুলোর মধ্যে রয়েছে ফয়সাল টিভি (একটি আইপিটিভি প্ল্যাটফর্ম), স্বয়ংক্রিয় বিলিং ও ইনভয়েসিং সিস্টেম এবং আইএসপি টিকিট ও ক্লায়েন্ট সাপোর্ট ড্যাশবোর্ড।"
      };
    }
    if (q.includes("available for freelance")) {
      return {
        question: "ফয়সাল কি ফ্রিল্যান্স বা ফুল-টাইম কাজের জন্য উপলব্ধ?",
        answer: "হ্যাঁ! ফয়সাল ফ্রিল্যান্স প্রজেক্ট, দূরবর্তী (রিমোট) ফুল-টাইম ডেভেলপার ভূমিকা বা চুক্তিভিত্তিক কোলাবরেশনের জন্য উপলব্ধ। তিনি সাধারণত ২৪ ঘণ্টার মধ্যে সাড়া দেন।"
      };
    }
    if (q.includes("contact faysal directly")) {
      return {
        question: "আমি কীভাবে সরাসরি ফয়সালের সাথে যোগাযোগ করতে পারি?",
        answer: "আপনি সরাসরি তাকে ফোন বা হোয়াটসঅ্যাপ করতে পারেন ০১৭৩৬৭০৫১৫৬ (+৮৮০১৭৩৬৭০৫১৫৬) নম্বরে। তার ইমেইল ঠিকানা হলো fa2626813@gmail.com। এছাড়াও আপনি তার লিঙ্কডইন (faysal-ahmed-b81a03398) বা গিটহাব (fsfaysa1)-এ সংযুক্ত হতে পারেন।"
      };
    }
    if (q.includes("faysal tv project")) {
      return {
        question: "ফয়সাল টিভি প্রজেক্টটি সম্পর্কে বলতে পারেন?",
        answer: "ফয়সাল টিভি হলো একটি আধুনিক এবং দৃষ্টিনন্দন ওয়েব-ভিত্তিক আইপিটিভি মিডিয়া প্লেয়ার প্ল্যাটফর্ম যা M3U8 লাইভ মিডিয়া লিংক পার্স করতে এবং নির্বিঘ্নে যেকোনো লাইভ চ্যানেল সম্প্রচার করতে অত্যন্ত নিখুঁতভাবে তৈরি করা হয়েছে।"
      };
    }
    if (q.includes("billing & invoicing")) {
      return {
        question: "ফয়সালের তৈরি বিলিং ও ইনভয়েসিং সিস্টেমটি কী?",
        answer: "এটি পিএইচপি এবং মাইএসকিউএল ভিত্তিক একটি চমৎকার অটোমেটেড ড্যাশবোর্ড যা গ্রাহকদের বিল ট্র্যাকিং, পেমেন্ট রেকর্ড করা, বকেয়া ব্যালেন্স সংরক্ষণ এবং স্বয়ংক্রিয়ভাবে পেশাদার পিডিএফ রশিদ ও লাভ-ক্ষতির আর্থিক প্রতিবেদন তৈরি করে।"
      };
    }

    return item;
  };

  return (
    <section id="faq-accordions" className="py-24 border-t border-slate-900 bg-slate-950/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{t("faq.title")}</h2>
          <div className="h-1 w-12 bg-sky-500 rounded mt-3 mb-4" />
          <p className="text-sm text-slate-400 max-w-xl">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const translated = translateFAQ(faq);
            return (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Trigger button */}
                <button
                  id={`faq-btn-trigger-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-slate-200 hover:text-white cursor-pointer hover:bg-slate-900/20 transition-all"
                >
                  <span className="text-sm sm:text-base font-bold tracking-tight">
                    {translated.question}
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated Body panel */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-900/50 leading-relaxed whitespace-pre-line bg-slate-950/25">
                    {translated.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

