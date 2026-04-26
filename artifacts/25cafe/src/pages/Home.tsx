import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Clock, Moon, Check, Instagram, ChevronLeft, ChevronRight, Star, Users } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import logoSrc from '@assets/cafe25-logo-nobg.png';
import zoneCoworking from '@assets/coworking2_1776104113344.png';
import zoneRelax from '@assets/relax_2_1776104113346.png';
import zoneFocus from '@assets/focus_2_1776104113345.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TRANSLATIONS, PRICES, EVENTS, getOccupancy, type CalT, type Lang, type CafeEvent } from './home-content';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function BookingCalendar({ lang, tc, onDateSelect }: { lang: Lang; tc: CalT; onDateSelect: (date: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Mon=0 offset
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: (string | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(viewYear, viewMonth, i + 1);
      return d.toISOString().slice(0, 10);
    }),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsOnDay = (date: string) => EVENTS.filter(e => e.date === date);
  const isPast = (date: string) => new Date(date) < today;
  const isToday = (date: string) => date === today.toISOString().slice(0, 10);

  const selectedEvents = selected ? eventsOnDay(selected) : [];
  const selectedOccupancy = selected && !isPast(selected) ? getOccupancy(selected) : null;

  const occColor = (occ: ReturnType<typeof getOccupancy>) => {
    if (occ === 'full') return 'bg-red-900/40 text-red-300';
    if (occ === 'partial') return 'bg-amber-900/40 text-amber-300';
    return 'bg-emerald-900/30 text-emerald-300';
  };

  const eventTypeColor = (type: CafeEvent['type']) => {
    if (type === 'workshop') return 'bg-accent/20 text-accent border-accent/30';
    if (type === 'special') return 'bg-purple-900/30 text-purple-300 border-purple-500/30';
    return 'bg-blue-900/30 text-blue-300 border-blue-500/30';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={prevMonth} className="p-2 hover:text-accent transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg tracking-widest uppercase font-light">
          {tc.months[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="p-2 hover:text-accent transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {tc.days.map(d => (
          <div key={d} className="text-center text-[10px] uppercase tracking-widest text-foreground/30 pb-2">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} />;
          const past = isPast(date);
          const occ = past ? null : getOccupancy(date);
          const events = eventsOnDay(date);
          const hasEvent = events.length > 0;
          const isSelected = selected === date;
          const isTodayDate = isToday(date);

          let bg = 'bg-secondary/60 hover:bg-secondary';
          if (past) bg = 'opacity-30 cursor-default bg-secondary/30';
          else if (isSelected) bg = 'bg-accent/20 ring-1 ring-accent';
          else if (occ === 'full') bg = 'bg-red-900/20 hover:bg-red-900/30';
          else if (occ === 'partial') bg = 'bg-amber-900/20 hover:bg-amber-900/30';
          else bg = 'bg-emerald-900/10 hover:bg-emerald-900/20';

          return (
            <button
              key={date}
              disabled={past}
              onClick={() => {
                if (past) return;
                setSelected(prev => prev === date ? null : date);
                onDateSelect(date);
              }}
              className={`relative flex flex-col items-center justify-start pt-2 pb-1 min-h-[52px] rounded-sm transition-all duration-200 ${bg} ${!past ? 'cursor-pointer' : ''}`}
            >
              <span className={`text-xs font-medium leading-none mb-1 ${isTodayDate ? 'text-accent font-bold' : isSelected ? 'text-accent' : past ? 'text-foreground/30' : 'text-foreground/80'}`}>
                {new Date(date).getDate()}
              </span>
              <div className="flex gap-0.5 flex-wrap justify-center">
                {hasEvent && events.map((ev, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full ${ev.type === 'workshop' ? 'bg-accent' : ev.type === 'special' ? 'bg-purple-400' : 'bg-blue-400'}`} />
                ))}
              </div>
              {occ === 'full' && !past && (
                <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-red-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 text-[10px] uppercase tracking-widest text-foreground/40">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-900/30 inline-block" />{tc.legendAvail}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-900/30 inline-block" />{tc.legendPartial}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-900/30 inline-block" />{tc.legendFull}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-accent inline-block" />{tc.legendEvent} (workshop)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-purple-400 inline-block" />Special</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-blue-400 inline-block" />Event</span>
      </div>

      {/* Selected day detail */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-6"
          >
            <div className="border border-border/30 p-6 bg-secondary/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-foreground/50">
                  {new Date(selected).toLocaleDateString(lang === 'cz' ? 'cs-CZ' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                {selectedOccupancy && (
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-medium ${occColor(selectedOccupancy)}`}>
                    {tc.occupancy}: {selectedOccupancy === 'full' ? tc.full : selectedOccupancy === 'partial' ? tc.legendPartial : tc.legendAvail}
                  </span>
                )}
              </div>

              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3">{tc.eventOn}</p>
                  {selectedEvents.map((ev, i) => (
                    <div key={i} className={`flex gap-3 items-start p-3 border rounded-sm ${eventTypeColor(ev.type)}`}>
                      <div className="flex-shrink-0 mt-0.5">
                        {ev.type === 'workshop' ? <Star className="w-4 h-4" /> : ev.type === 'special' ? <Moon className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{lang === 'cz' ? ev.titleCz : ev.titleEn}</div>
                        <div className="text-[11px] opacity-70 mt-0.5">{ev.time} · {lang === 'cz' ? ev.descCz : ev.descEn}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-foreground/40 italic">{tc.noEvents}</p>
              )}

              <button
                onClick={() => onDateSelect(selected)}
                className="mt-5 text-xs uppercase tracking-widest text-accent hover:text-accent/70 transition-colors border-b border-accent/30 pb-0.5"
              >
                {tc.selectDate} →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('cafe25-lang');
      if (stored === 'cz' || stored === 'en') return stored;
    }
    return 'cz';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cafe25-lang', lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formState, setFormState] = useState({ zone: '', date: '', time: '', guests: '', name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveTab(0);
  }, [lang]);

  const scrollTo = (e: React.MouseEvent<HTMLElement>, selector: string) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ zone: '', date: '', time: '', guests: '', name: '', email: '' });
    }, 4000);
  };

  const menuSections = [
    t.menu.focus.map((item, i) => ({ ...item, price: PRICES.focus[i] })),
    t.menu.boosters.map((item, i) => ({ ...item, price: PRICES.boosters[i] })),
    t.menu.fuel.map((item, i) => ({ ...item, price: PRICES.fuel[i] })),
    t.menu.reward.map((item, i) => ({ ...item, price: PRICES.reward[i] })),
    t.menu.kits.map((item, i) => ({ ...item, price: PRICES.kits[i] })),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-[#0D0D0D]/85 backdrop-blur-[20px] border-border/50 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <a href="/" onClick={(e) => scrollTo(e, 'body')} className="flex-shrink-0" aria-label="Café 25 — domů">
            <img src={logoSrc} alt="Café 25" className="h-12 w-12 object-contain" />
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.15em] font-light">
            {[t.nav.zones, t.nav.menu, t.nav.reservation].map((label, i) => (
              <a
                key={label}
                href={['#zones', '#menu', '#reservation'][i]}
                onClick={(e) => scrollTo(e, ['#zones', '#menu', '#reservation'][i])}
                className="hover:text-accent transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <div className="text-sm tracking-[0.2em] font-light text-foreground/80 flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent hidden sm:block" />
              16:00 — 01:00
            </div>
            <button
              onClick={() => setLang(l => l === 'cz' ? 'en' : 'cz')}
              aria-label={lang === 'cz' ? 'Přepnout jazyk do angličtiny' : 'Switch language to Czech'}
              className="flex items-center gap-1 text-xs tracking-widest font-medium border border-border/40 hover:border-accent px-3 py-1.5 transition-colors"
            >
              <span className={lang === 'cz' ? 'text-accent' : 'text-foreground/40'}>CZ</span>
              <span className="text-foreground/20 mx-0.5">/</span>
              <span className={lang === 'en' ? 'text-accent' : 'text-foreground/40'}>EN</span>
            </button>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-20" />
          <img
            src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?auto=format&fit=crop&w=2000&q=80"
            alt="Night café"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="container relative z-30 px-6 flex flex-col items-center text-center mt-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl w-full flex flex-col items-center">
            <motion.img variants={fadeUp} src={logoSrc} alt="Café 25" className="h-24 w-24 object-contain mb-8 opacity-90" />
            <AnimatePresence mode="wait">
              <motion.h1
                key={lang + 'hero'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-6xl sm:text-7xl md:text-[100px] leading-[0.95] tracking-tight mb-8"
              >
                {t.hero.line1}<br />
                <span className="text-accent italic font-light">{t.hero.line2}</span>
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={lang + 'sub'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl font-sans font-light tracking-wide text-foreground/80 mb-12 max-w-xl mx-auto uppercase"
              >
                {t.hero.sub}
              </motion.p>
            </AnimatePresence>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-background px-12 py-7 rounded-none uppercase tracking-widest text-sm font-medium transition-all" onClick={(e) => scrollTo(e, '#zones')}>
                {t.hero.cta1}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-foreground hover:bg-foreground hover:text-background px-12 py-7 rounded-none uppercase tracking-widest text-sm font-medium transition-all" onClick={(e) => scrollTo(e, '#reservation')}>
                {t.hero.cta2}
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </motion.div>
      </section>
      {/* CONCEPT */}
      <section className="py-32 md:py-48 bg-background relative z-10">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="space-y-10">
              <AnimatePresence mode="wait">
                <motion.h2 key={lang + 'ct'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-5xl md:text-7xl font-semibold leading-tight">
                  {t.concept.title1}<br />{t.concept.title2}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div key={lang + 'cp'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-7 font-sans font-light text-lg md:text-xl text-foreground/80 leading-loose md:leading-loose">
                  <p>{t.concept.p1}</p>
                  <p>{t.concept.p2}</p>
                  <p className="text-accent uppercase tracking-widest text-sm pt-4 font-medium">{t.concept.p3}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: 'easeOut' }} viewport={{ once: true }} className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80" alt="Relax zone" loading="lazy" className="w-full h-full object-cover grayscale-[20%]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* THREE ZONES */}
      <section id="zones" className="py-32 md:py-40 bg-secondary relative">
        <div className="container px-6 mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
            <AnimatePresence mode="wait">
              <motion.h2 key={lang + 'zh'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-5xl md:text-7xl font-semibold">
                {t.zones.heading}
              </motion.h2>
            </AnimatePresence>
            <div className="w-16 h-[1px] bg-accent mx-auto mt-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
            {[
              { image: zoneCoworking },
              { image: zoneRelax },
              { image: zoneFocus },
            ].map((zone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative flex flex-col bg-background min-h-[600px] overflow-hidden cursor-pointer"
              >
                <div className="h-[340px] w-full relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={zone.image} alt={t.zones.items[i].title} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 grayscale-[30%] group-hover:grayscale-0" />
                </div>
                <div className="p-8 lg:p-10 flex-1 flex flex-col justify-start border-l-2 border-transparent group-hover:border-accent transition-all duration-300 relative bg-background z-20 group-hover:-translate-y-2">
                  <div className="text-accent font-sans text-xs tracking-[0.2em] mb-4">{t.zones.items[i].label}</div>
                  <AnimatePresence mode="wait">
                    <motion.h3 key={lang + 'zt' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="text-3xl lg:text-4xl mb-4 leading-tight">
                      {t.zones.items[i].title}
                    </motion.h3>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p key={lang + 'zd' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="font-sans font-light text-sm lg:text-base text-foreground/70 leading-relaxed">
                      {t.zones.items[i].desc}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* NIGHT HOURS */}
      <section className="py-40 bg-background text-center relative flex flex-col items-center justify-center border-y border-border/30">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container px-6 flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-10">
            <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <Moon className="w-16 h-16 text-accent mx-auto" strokeWidth={1} />
            </motion.div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-serif tracking-widest text-foreground font-light mb-8">16:00 — 01:00</motion.h2>
          <AnimatePresence mode="wait">
            <motion.p key={lang + 'ns'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="font-sans font-light text-xl md:text-2xl text-foreground/60 max-w-2xl">
              {t.night.sub}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </section>
      {/* MENU */}
      <section id="menu" className="py-32 md:py-48 bg-secondary">
        <div className="container px-6 mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <AnimatePresence mode="wait">
              <motion.h2 key={lang + 'mh'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-5xl md:text-7xl font-semibold mb-6">{t.menu.heading}</motion.h2>
            </AnimatePresence>
            <div className="w-16 h-[1px] bg-accent mx-auto mb-8" />
            <AnimatePresence mode="wait">
              <motion.p key={lang + 'ms'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="font-sans text-foreground/50 font-light max-w-xl mx-auto text-sm leading-relaxed italic">{t.menu.sub}</motion.p>
            </AnimatePresence>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 font-sans text-xs md:text-sm uppercase tracking-widest">
            {t.menu.tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`pb-2 transition-all relative ${activeTab === i ? 'text-accent' : 'text-foreground/50 hover:text-foreground'}`}
              >
                {tab}
                {activeTab === i && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={lang + activeTab}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid md:grid-cols-2 gap-x-20 gap-y-6 font-sans"
              >
                {menuSections[activeTab].map((item) => (
                  <MenuItem key={item.name} name={item.name} desc={item.desc} price={item.price} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* RESERVATION */}
      <section id="reservation" className="py-32 md:py-48 bg-background border-t border-border/30">
        <div className="container px-6 mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <AnimatePresence mode="wait">
              <motion.h2 key={lang + 'rh'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-5xl md:text-7xl font-semibold mb-6">
                {t.reservation.title}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p key={lang + 'rs'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="font-sans text-foreground/60 font-light max-w-md mx-auto">
                {t.reservation.sub}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <BookingCalendar
            lang={lang}
            tc={t.cal as CalT}
            onDateSelect={(date) => setFormState(prev => ({ ...prev, date }))}
          />

          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} onSubmit={handleFormSubmit} className="space-y-12 font-sans">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">{t.reservation.zone}</label>
                <select name="zone" value={formState.zone} onChange={handleFormChange} required className="w-full bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus:ring-0 focus:border-accent outline-none appearance-none cursor-pointer rounded-none">
                  <option value="" disabled className="bg-background text-foreground/50">{t.reservation.zonePlaceholder}</option>
                  <option value="coworking" className="bg-background">Coworking</option>
                  <option value="relax" className="bg-background">Relax</option>
                  <option value="focus" className="bg-background">Focus</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">{t.reservation.date}</label>
                <Input type="date" name="date" value={formState.date} onChange={handleFormChange} required className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0" />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">{t.reservation.time}</label>
                <Input type="time" name="time" value={formState.time} onChange={handleFormChange} required className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0" />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">{t.reservation.guests}</label>
                <Input type="number" name="guests" min="1" max="8" placeholder={t.reservation.guestsPlaceholder} value={formState.guests} onChange={handleFormChange} required className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0" />
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">{t.reservation.name}</label>
                <Input type="text" name="name" placeholder={t.reservation.namePlaceholder} value={formState.name} onChange={handleFormChange} required className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0" />
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">{t.reservation.email}</label>
                <Input type="email" name="email" placeholder={t.reservation.emailPlaceholder} value={formState.email} onChange={handleFormChange} required className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0" />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitted} className="w-full bg-accent hover:bg-accent/80 text-background py-8 rounded-none text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 font-medium">
              {isSubmitted ? (
                <><Check className="w-5 h-5" /> {t.reservation.confirmed}</>
              ) : (
                t.reservation.submit
              )}
            </Button>
          </motion.form>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-secondary pt-24 pb-12 font-sans text-sm">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-20"
          >
            <div className="aspect-[21/9] w-full overflow-hidden border border-border/40 grayscale-[40%] hover:grayscale-0 transition-all duration-700">
              <iframe
                title="Café 25 — kampus TUL Liberec"
                src="https://www.google.com/maps?q=Studentsk%C3%A1+1402%2F2%2C+Liberec&hl=cs&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <img src={logoSrc} alt="Café 25" className="h-20 w-20 object-contain mb-8 opacity-80" />
              <AnimatePresence mode="wait">
                <motion.p key={lang + 'ft'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="font-serif text-2xl lg:text-3xl text-foreground mb-4">
                  {t.footer.tagline}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p key={lang + 'fd'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="text-foreground/50 max-w-sm font-light">
                  {t.footer.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2 text-foreground/70 font-light">
                <span className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">{t.footer.location}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {t.footer.address}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> 16:00 – 01:00</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2 text-foreground/70 font-light">
                <span className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">{t.footer.contact}</span>
                <a href="mailto:hello@cafe25.cz" className="hover:text-accent transition-colors">hello@cafe25.cz</a>
                <div className="flex items-center gap-4 mt-4">
                  <a href="#" aria-label="Instagram Café 25" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" aria-label="TikTok Café 25" className="hover:text-accent transition-colors"><SiTiktok className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/40 text-xs tracking-widest uppercase font-light">
            <p>{t.footer.copyright}</p>
            <p>{t.footer.night}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuItem({ name, desc, price }: { name: string; desc?: string; price: string }) {
  return (
    <div className="flex items-start justify-between gap-4 group border-b border-border/20 pb-5 hover:border-accent/30 transition-colors">
      <div className="flex-1">
        <div className="text-base text-foreground group-hover:text-accent transition-colors font-medium">{name}</div>
        {desc && <div className="text-xs text-foreground/40 mt-0.5 font-light italic">{desc}</div>}
      </div>
      <span className="text-foreground/70 whitespace-nowrap text-sm font-medium tabular-nums">{price} <span className="text-xs text-foreground/40">Kč</span></span>
    </div>
  );
}
