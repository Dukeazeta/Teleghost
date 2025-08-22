"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is TeleGhost?",
    answer: "TeleGhost is an ad network that connects African Telegram channel owners to advertisers."
  },
  {
    question: "How do I register my channel on TeleGhost?",
    answer: "Create a publishers account, click on add channels then follow the further instructions correctly."
  },
  {
    question: "What payment methods are supported?",
    answer: "Payments are made in USDT cryptocurrency."
  },
  {
    question: "Is this platform available outside Africa?",
    answer: "Yes it is."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="px-6 py-16 sm:py-24 bg-white dark:bg-black" aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold">FAQ</h2>
        </Reveal>
        <div className="mt-6 space-y-0">
          {faqData.map((item, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="border-b border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 text-left flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors duration-200 focus:outline-none focus:bg-neutral-50 dark:focus:bg-neutral-900/50"
                  aria-expanded={openItems.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="font-semibold text-lg pr-4">{item.question}</h3>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index) 
                      ? 'max-h-96 opacity-100 pb-6' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

