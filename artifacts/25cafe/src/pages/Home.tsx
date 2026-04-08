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
  const [activeTab, setActiveTab] = useState('Espresso & Káva');
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
                image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
              },
              {
                id: 'relax',
                label: '02 / RELAX',
                title: 'Zpomal. Nikam nespěchej.',
                desc: 'Měkká křesla, tlumené světlo. Prostor pro čtení, rozhovor nebo prosté bytí.',
                image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
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

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 font-sans text-xs md:text-sm uppercase tracking-widest">
            {['Espresso & Káva', 'Alternativní přípravy', 'Nápoje', 'Jídlo', 'Noční snacky'].map((tab) => (
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

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Espresso & Káva' && (
                <motion.div key="espresso" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-x-20 gap-y-6 font-sans">
                  <MenuItem name="Espresso" desc="Klasická italská příprava" price="75" />
                  <MenuItem name="Doppio" desc="Dvojitý espresso" price="90" />
                  <MenuItem name="Ristretto" desc="Koncentrovaný, intenzivní" price="80" />
                  <MenuItem name="Americano" desc="Espresso s horkou vodou" price="85" />
                  <MenuItem name="Cappuccino" desc="Espresso, pára, hedvábná pěna" price="95" />
                  <MenuItem name="Flat White" desc="Silné espresso s hladkým mlékem" price="105" />
                  <MenuItem name="Latte" desc="Jemný a krémový, 300 ml" price="105" />
                  <MenuItem name="Cortado" desc="Espresso s trochou studeného mléka" price="95" />
                  <MenuItem name="Macchiato" desc="Espresso, kapka mléčné pěny" price="80" />
                  <MenuItem name="Affogato" desc="Espresso přes vanilkový zmrzlinový kopeček" price="130" />
                </motion.div>
              )}
              {activeTab === 'Alternativní přípravy' && (
                <motion.div key="alt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-x-20 gap-y-6 font-sans">
                  <MenuItem name="V60 Pour Over" desc="Váš výběr ze single origin" price="115" />
                  <MenuItem name="Chemex" desc="Elegantní příprava pro dva" price="130" />
                  <MenuItem name="AeroPress" desc="Plné tělo, čistá chuť" price="110" />
                  <MenuItem name="Francouzský press" desc="Tradiční, bohatý, plný" price="105" />
                  <MenuItem name="Cold Brew" desc="24 hodin louhovaný, 300 ml" price="115" />
                  <MenuItem name="Cold Brew Tonic" desc="Cold brew, tonic, pomeranč" price="135" />
                  <MenuItem name="Nitro Cold Brew" desc="Dusíkový cold brew na čepu" price="145" />
                  <MenuItem name="Sifon" desc="Vakuová příprava, vzdušná chuť" price="125" />
                </motion.div>
              )}
              {activeTab === 'Nápoje' && (
                <motion.div key="napoje" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-x-20 gap-y-6 font-sans">
                  <MenuItem name="Ceremonial Matcha" desc="Přímý dovoz z Japonska, oat milk" price="125" />
                  <MenuItem name="Matcha Latte" desc="Šlehaná matcha, teplé mléko" price="115" />
                  <MenuItem name="Yerba Maté" desc="Tradiční jihoamerická energie" price="95" />
                  <MenuItem name="Chai Latte" desc="Koření, skořice, kardamom" price="115" />
                  <MenuItem name="Golden Latte" desc="Kurkuma, zázvor, kokosové mléko" price="115" />
                  <MenuItem name="Horká čokoláda" desc="Belgická 72%, husté a tmavé" price="105" />
                  <MenuItem name="Domácí limonáda" desc="Citron, máta, cukrový sirup" price="85" />
                  <MenuItem name="Sparkling Water" desc="Perlivá, 330 ml" price="55" />
                  <MenuItem name="Still Water" desc="Neperlivá, 330 ml" price="45" />
                  <MenuItem name="Džus" desc="Pomerančový nebo jablečný, čerstvý" price="95" />
                </motion.div>
              )}
              {activeTab === 'Jídlo' && (
                <motion.div key="jidlo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-x-20 gap-y-6 font-sans">
                  <MenuItem name="Avocado Toast" desc="Žitný chléb, vejce, microgreens, citron" price="175" />
                  <MenuItem name="Smoked Salmon Bagel" desc="Losos, cream cheese, kapary, červená cibule" price="195" />
                  <MenuItem name="Grilled Cheese" desc="Čedar, hořčicový dresing, křupavý chléb" price="155" />
                  <MenuItem name="Club Sandwich" desc="Kuřecí, slanina, rajče, ledový salát" price="175" />
                  <MenuItem name="Hummus Bowl" desc="Domácí hummus, zelenina, pita, olive" price="155" />
                  <MenuItem name="Overnight Oats" desc="Ovesné vločky, lesní ovoce, med, ořechy" price="135" />
                  <MenuItem name="Granola Bowl" desc="Domácí granola, kokosový jogurt, mango" price="145" />
                  <MenuItem name="Quiche du Jour" desc="Denní výběr — zeptejte se baristi" price="165" />
                </motion.div>
              )}
              {activeTab === 'Noční snacky' && (
                <motion.div key="snacky" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid md:grid-cols-2 gap-x-20 gap-y-6 font-sans">
                  <MenuItem name="Dark Chocolate 72%" desc="Belgická čokoláda, ručně lámaná" price="85" />
                  <MenuItem name="Banana Bread" desc="Domácí recept, vlahý, s ořechy" price="105" />
                  <MenuItem name="Energy Bites" desc="Datlový základ, kešu, kakao" price="95" />
                  <MenuItem name="Cheese & Crackers" desc="Výběr sýrů, hrozny, ořechy" price="145" />
                  <MenuItem name="Mixed Nuts & Seeds" desc="Pražená směs, himálajská sůl" price="85" />
                  <MenuItem name="Granola Bar" desc="Ovesná, med, mandle, tmavá čokoláda" price="80" />
                  <MenuItem name="Fruit Plate" desc="Sezónní ovoce, máta" price="115" />
                  <MenuItem name="Tiramisu" desc="Klasický italský, espresso, mascarpone" price="135" />
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
