import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Moon, Check, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import logoSrc from '@assets/cafe25-logo-nobg.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const navLinks = [
  { name: 'Zóny', href: '#zones' },
  { name: 'Menu', href: '#menu' },
  { name: 'Rezervace', href: '#reservation' },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Káva & Stimulanty');
  const [formState, setFormState] = useState({
    zone: '',
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
          scrolled ? 'bg-[#0D0D0D]/85 backdrop-blur-[20px] border-border/50 shadow-lg' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex-shrink-0" onClick={(e) => handleNavClick(e, 'body')}>
            <img src={logoSrc} alt="Café 25" className="h-12 w-12 object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.15em] font-light">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-accent transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="text-sm tracking-[0.2em] font-light text-foreground/80 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent hidden sm:block" />
            18:00 — 04:00
          </div>
        </div>
      </nav>
      {/* HERO SECTION */}
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl w-full flex flex-col items-center"
          >
            <motion.img
              variants={fadeUp}
              src={logoSrc}
              alt="Café 25"
              className="h-24 w-24 object-contain mb-8 opacity-90 bg-[#141010b5]"
            />
            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-7xl md:text-[100px] leading-[0.95] tracking-tight mb-8"
            >
              Tvoje místo,<br />
              <span className="text-accent italic font-light">když svět zpomalí.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl font-sans font-light tracking-wide text-foreground/80 mb-12 max-w-xl mx-auto uppercase"
            >
              Noční kavárna. Tři prostory. Jedna hodina navíc.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-background px-12 py-7 rounded-none uppercase tracking-widest text-sm font-medium transition-all"
                onClick={(e) => handleNavClick(e as any, '#zones')}
              >
                Objev prostory
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-foreground hover:bg-foreground hover:text-background px-12 py-7 rounded-none uppercase tracking-widest text-sm font-medium transition-all"
                onClick={(e) => handleNavClick(e as any, '#reservation')}
              >
                Rezervace
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </motion.div>
      </section>
      {/* CONCEPT SECTION */}
      <section className="py-32 md:py-48 bg-background relative z-10">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-10"
            >
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-semibold leading-tight">
                Jiný čas.<br />Jiné tempo.
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-6 font-sans font-light text-lg md:text-xl text-foreground/80 leading-relaxed">
                <p>
                  Jsme noční režim ve fyzické podobě. Místo, kde čas plyne jinak a kde tě nikdo neruší. Když město utichne, my začínáme.
                </p>
                <p>
                  Vytvořili jsme prostor, který respektuje tvoji potřebu pracovat, tvořit nebo jen tiše existovat. Žádný ranní shon, žádné cinkání lžiček. Jen ty, tvé myšlenky a perfektní káva.
                </p>
                <p className="text-accent uppercase tracking-widest text-sm pt-4 font-medium">
                  Tři zóny. Tři způsoby bytí.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none"
            >
              <img
                src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1000&q=80"
                alt="Atmospheric light"
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* THREE ZONES SECTION */}
      <section id="zones" className="py-32 md:py-40 bg-secondary relative">
        <div className="container px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-semibold">Zvol svůj prostor.</h2>
            <div className="w-16 h-[1px] bg-accent mx-auto mt-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
            {[
              {
                id: 'coworking',
                label: '01 / COWORKING',
                title: 'Pracuj, ale nejsi sám.',
                desc: 'Sdílené stoly, jemný ruch. Ideální pro kolaboraci nebo projekty, při kterých ti pomáhá vědomí ostatních.',
                image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
              },
              {
                id: 'relax',
                label: '02 / RELAX',
                title: 'Zpomal. Nikam nespěchej.',
                desc: 'Měkká křesla, tlumené světlo. Prostor pro čtení, rozhovor nebo prosté bytí.',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
              },
              {
                id: 'focus',
                label: '03 / FOCUS',
                title: 'Deep work mode.',
                desc: 'Absolutní ticho. Individuální místo s notebookem, kde přijdou nejlepší nápady.',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
              }
            ].map((zone, i) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative flex flex-col bg-background h-[600px] overflow-hidden cursor-pointer"
              >
                <div className="h-[60%] w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                </div>
                <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center border-l-2 border-transparent group-hover:border-accent transition-all duration-300 relative bg-background z-20 group-hover:-translate-y-2">
                  <div className="text-accent font-sans text-xs tracking-[0.2em] mb-4">
                    {zone.label}
                  </div>
                  <h3 className="text-3xl lg:text-4xl mb-4 leading-tight">{zone.title}</h3>
                  <p className="font-sans font-light text-sm lg:text-base text-foreground/70 leading-relaxed">
                    {zone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* NIGHT HOURS SECTION */}
      <section className="py-40 bg-background text-center relative flex flex-col items-center justify-center border-y border-border/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container px-6 flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Moon className="w-16 h-16 text-accent mx-auto" strokeWidth={1} />
            </motion.div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-serif tracking-widest text-foreground font-light mb-8">
            18:00 — 04:00
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans font-light text-xl md:text-2xl text-foreground/60 max-w-2xl">
            Zatímco se město ukládá ke spánku, my roztáčíme kávovar.
          </motion.p>
        </motion.div>
      </section>
      {/* MENU SECTION */}
      <section id="menu" className="py-32 md:py-48 bg-secondary">
        <div className="container px-6 mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6">Menu</h2>
            <div className="w-16 h-[1px] bg-accent mx-auto" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16 font-sans text-sm md:text-base uppercase tracking-widest">
            {['Káva & Stimulanty', 'Jídlo', 'Noční snacky'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition-all relative ${
                  activeTab === tab ? 'text-accent' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Káva & Stimulanty' && (
                <motion.div
                  key="kava"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-x-20 gap-y-8 font-sans"
                >
                  <MenuItem name="Cold Brew" price="95" />
                  <MenuItem name="Ceremonial Matcha" price="115" />
                  <MenuItem name="Yerba Maté Shot" price="85" />
                  <MenuItem name="V60 Filter" price="105" />
                  <MenuItem name="Espresso" price="75" />
                  <MenuItem name="Cappuccino" price="85" />
                </motion.div>
              )}
              {activeTab === 'Jídlo' && (
                <motion.div
                  key="jidlo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-x-20 gap-y-8 font-sans"
                >
                  <MenuItem name="Avocado Toast" price="165" />
                  <MenuItem name="Grilled Cheese" price="145" />
                  <MenuItem name="Overnight Oats" price="125" />
                </motion.div>
              )}
              {activeTab === 'Noční snacky' && (
                <motion.div
                  key="snacky"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-x-20 gap-y-8 font-sans"
                >
                  <MenuItem name="Energy Bites" price="85" />
                  <MenuItem name="Dark Chocolate 80%" price="95" />
                  <MenuItem name="Mixed Nuts" price="75" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* RESERVATION SECTION */}
      <section id="reservation" className="py-32 md:py-48 bg-background border-t border-border/30">
        <div className="container px-6 mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6">Rezervace</h2>
            <p className="font-sans text-foreground/60 font-light max-w-md mx-auto">
              Prostor je omezený, soustředění nikoliv. Zajisti si své místo na dnešní noc.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleFormSubmit}
            className="space-y-12 font-sans"
          >
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">Zóna</label>
                <div className="relative">
                  <select
                    name="zone"
                    value={formState.zone}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus:ring-0 focus:border-accent outline-none appearance-none cursor-pointer rounded-none"
                  >
                    <option value="" disabled className="bg-background text-foreground/50">Vyberte prostor</option>
                    <option value="coworking" className="bg-background">Coworking</option>
                    <option value="relax" className="bg-background">Relax</option>
                    <option value="focus" className="bg-background">Focus</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">Datum</label>
                <Input
                  type="date"
                  name="date"
                  value={formState.date}
                  onChange={handleFormChange}
                  required
                  className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">Čas</label>
                <Input
                  type="time"
                  name="time"
                  min="18:00"
                  max="04:00"
                  value={formState.time}
                  onChange={handleFormChange}
                  required
                  className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">Osob</label>
                <Input
                  type="number"
                  name="guests"
                  min="1"
                  max="8"
                  placeholder="Počet hostů"
                  value={formState.guests}
                  onChange={handleFormChange}
                  required
                  className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0"
                />
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">Jméno</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Jak vás máme oslovit?"
                  value={formState.name}
                  onChange={handleFormChange}
                  required
                  className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0"
                />
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/50">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Kam pošleme potvrzení?"
                  value={formState.email}
                  onChange={handleFormChange}
                  required
                  className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-accent hover:bg-accent/80 text-background py-8 rounded-none text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 font-medium"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-5 h-5" /> Rezervace potvrzena
                </>
              ) : (
                'Odeslat rezervaci'
              )}
            </Button>
          </motion.form>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-secondary pt-24 pb-12 font-sans text-sm">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <img src={logoSrc} alt="Café 25" className="h-20 w-20 object-contain mb-8 opacity-80" />
              <p className="font-serif text-2xl lg:text-3xl text-foreground mb-4">Noční deep-work azyl.</p>
              <p className="text-foreground/50 max-w-sm font-light">Místo pro ty, kteří nacházejí inspiraci až když se setmí.</p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2 text-foreground/70 font-light">
                <span className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">Lokace</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Liberec, Poblíž kampusu</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> 18:00 – 04:00</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2 text-foreground/70 font-light">
                <span className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">Kontakt</span>
                <a href="mailto:hello@cafe25.cz" className="hover:text-accent transition-colors">hello@cafe25.cz</a>
                <div className="flex items-center gap-4 mt-4">
                  <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-accent transition-colors"><SiTiktok className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/40 text-xs tracking-widest uppercase font-light">
            <p>© 2025 Café 25 — Liberec</p>
            <p>The night belongs to you.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuItem({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex items-end justify-between gap-4 group">
      <div className="flex-1 relative">
        <span className="text-lg text-foreground pr-4 relative bg-secondary z-10">{name}</span>
        <div className="absolute bottom-1.5 left-0 w-full h-[1px] bg-border/40 group-hover:bg-accent/40 transition-colors" />
      </div>
      <span className="text-foreground/60">{price} <span className="text-xs">CZK</span></span>
    </div>
  );
}
