"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, Globe, Printer, Languages } from 'lucide-react';
import { Link } from '@/navigation';

type Lang = 'en' | 'bg';

const COPY = {
  en: {
    backLabel: 'Back to Brand Kit',
    printLabel: 'Print / PDF',
    langLabel: 'Български',
    dateLabel: 'Date of Issue',
    recipientLabel: 'To',
    subject: 'Subject: Strategic Partnership Proposal',
    salutation: 'Dear Team at Ameru AI,',
    intro: `I am writing to you on behalf of System Kyron, a corporate intelligence ecosystem based in Venezuela. We specialize in SaaS/ERP solutions for business management, legal compliance, and sustainability. Our platform integrates artificial intelligence to help small and medium-sized businesses across Latin America operate more efficiently.`,
    synergy: `After a thorough review of Ameru AI's technology and market position, I am convinced there is real synergia between our companies. System Kyron has already built a dedicated module called Sostenibilidad Ameru. The module manages Eco-Credits, carbon footprint tracking, and corporate recycling analytics. It reflects our shared vision of using technology for measurable environmental impact.`,
    proposal: `Through this letter, I formally propose a strategic alliance under the following terms:`,
    terms: [
      { title: 'Technology Integration', desc: 'Connect Ameru AI smart bin data and waste classification intelligence directly into the System Kyron platform.' },
      { title: 'Commercial Partnership', desc: 'Co-sell our integrated solution to companies across Latin America looking for automated sustainability management.' },
      { title: 'Joint R&D', desc: 'Collaborate on AI-driven waste management research and circular economy models.' },
      { title: 'Co-Branding', desc: 'Feature both brands in joint communications, technical white papers, and industry events.' },
    ],
    impact: `This partnership will accelerate smart waste management adoption across the region and create a differentiated value proposition for both companies.`,
    meeting: `I would be happy to schedule a call at your earliest convenience to go through the proposal in detail and define next steps toward a formal agreement.`,
    thanks: `Thank you for considering this opportunity. I look forward to your response.`,
    closing: 'Sincerely,',
    name: 'Carlos Mattar',
    role: 'Chief Executive Officer',
    company: 'System Kyron',
    contactWebsite: 'systemkyron.com',
    contactEmail: 'info@systemkyron.com',
    contactPhone: '+58 424-184-6016',
  },
  bg: {
    backLabel: 'Обратно към Brand Kit',
    printLabel: 'Принтирай / PDF',
    langLabel: 'English',
    dateLabel: 'Дата на издаване',
    recipientLabel: 'До',
    subject: 'Относно: Предложение за стратегическо партньорство',
    salutation: 'Уважаеми екип на Ameru AI,',
    intro: `Обръщам се към вас от името на System Kyron — екосистема за корпоративен интелект, базирана във Венецуела. Специализирани сме в SaaS/ERP решения за бизнес управление, правно съответствие и устойчиво развитие. Нашата платформа използва изкуствен интелект, за да помага на малки и средни предприятия в Латинска Америка да работят по-ефективно.`,
    synergy: `След задълбочен анализ на технологията и пазарната позиция на Ameru AI, съм убеден, че съществува реална синергия между нашите компании. System Kyron вече изгради специален модул, наречен Sostenibilidad Ameru, който управлява еко-кредити, проследява въглеродния отпечатък и анализира корпоративното рециклиране. Този модул отразява споделената ни визия за използване на технологиите за измеримо въздействие върху околната среда.`,
    proposal: `С настоящото писмо официално предлагам стратегически съюз при следните условия:`,
    terms: [
      { title: 'Технологична интеграция', desc: 'Свързване на данните от умните кошчета на Ameru AI и класификационния интелект директно в платформата на System Kyron.' },
      { title: 'Търговско партньорство', desc: 'Съвместно предлагане на интегрираното решение на компании в Латинска Америка, които търсят автоматизирано управление на устойчивостта.' },
      { title: 'Съвместни изследвания', desc: 'Сътрудничество в областта на управлението на отпадъци, задвижвано от ИИ, и модели за кръгова икономика.' },
      { title: 'Кобрандиране', desc: 'Представяне на двете марки в съвместни комуникации, технически доклади и индустриални събития.' },
    ],
    impact: `Това партньорство ще ускори внедряването на интелигентно управление на отпадъци в региона и ще създаде диференцирана стойност и за двете компании.`,
    meeting: `Ще се радвам да насрочим разговор в удобно за вас време, за да обсъдим предложението в детайли и да определим следващите стъпки към официално споразумение.`,
    thanks: `Благодаря ви, че разглеждате тази възможност. Очаквам вашия отговор.`,
    closing: 'С уважение,',
    name: 'Карлос Матар',
    role: 'Главен изпълнителен директор',
    company: 'System Kyron',
    contactWebsite: 'systemkyron.com',
    contactEmail: 'info@systemkyron.com',
    contactPhone: '+58 424-184-6016',
  },
};

export default function AlianzaAmeruPage() {
  const [lang, setLang] = useState<Lang>('en');
  const t = COPY[lang];

  const handlePrint = () => window.print();

  const toggleLang = () => setLang(prev => prev === 'en' ? 'bg' : 'en');

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans selection:bg-cyan-100">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 py-3 flex justify-between items-center print:hidden">
        <Link
          href="/brand-kit"
          className="flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-cyan-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t.backLabel}</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors shadow-sm"
          >
            <Languages className="h-3.5 w-3.5" />
            {t.langLabel}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-cyan-600 transition-colors shadow-sm"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.printLabel}</span>
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white shadow-xl sm:shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-zinc-200 print:shadow-none print:border-none"
          >
            <div className="p-6 sm:p-12 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 uppercase">System Kyron</h1>
                <p className="text-xs sm:text-sm text-cyan-600 font-bold uppercase tracking-widest mt-1">
                  {lang === 'en' ? 'Corporate Intelligence' : 'Корпоративен интелект'}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">{t.dateLabel}</p>
                <p className="text-sm sm:text-base font-medium text-zinc-600">
                  {new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-12 space-y-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.recipientLabel}</p>
                <p className="text-lg font-bold text-zinc-900">Ameru AI Team</p>
                <p className="text-sm text-zinc-500">Munich, Germany</p>
                <p className="text-sm text-cyan-600 font-medium">contact@ameru.ai</p>
              </div>

              <div className="bg-zinc-50 p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                  {t.subject}
                </p>
              </div>

              <div className="space-y-6 text-zinc-600 leading-relaxed text-sm sm:text-base">
                <p>{t.salutation}</p>
                <p className="font-medium">{t.intro}</p>
                <p className="font-medium">{t.synergy}</p>
                <p className="font-medium">{t.proposal}</p>

                <div className="grid gap-4 sm:gap-6">
                  {t.terms.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                      <span className="h-6 w-6 shrink-0 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-medium">{t.impact}</p>
                <p className="font-medium">{t.meeting}</p>
                <p className="font-medium">{t.thanks}</p>
              </div>

              <div className="pt-8 border-t border-zinc-100 mt-8">
                <p className="text-zinc-900 font-bold mb-6">{t.closing}</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 bg-zinc-100 rounded-full flex items-center justify-center text-xl sm:text-2xl font-black text-zinc-400 border-2 border-white shadow-sm">
                    CM
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-black text-zinc-900">{t.name}</p>
                    <p className="text-xs sm:text-sm text-cyan-600 font-bold uppercase tracking-widest">{t.role}</p>
                    <p className="text-xs sm:text-sm text-zinc-500 font-medium">{t.company}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 p-4 sm:p-6 rounded-lg flex flex-wrap gap-4 sm:gap-8 justify-center text-xs sm:text-sm font-medium text-zinc-500 border border-zinc-100">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-500" />
                  {t.contactWebsite}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-500" />
                  {t.contactEmail}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-cyan-500" />
                  {t.contactPhone}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
