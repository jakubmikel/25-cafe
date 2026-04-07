import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Instagram, Moon, Focus, Armchair, Users, ChevronRight } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({
    zone: '',
    date: '',
    time: '',
    guests: '',
    name: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.zone) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ zone: '', date: '', time: '', guests: '', name: '', email: '' });
      setSubmitted(false);
    }, 5000);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-accent selection:text-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 sm:p-8 mix-blend-difference">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-2xl tracking-tighter text-foreground">
            Café 25<span className="text-accent">.</span>
          </div>
          <div className="text-xs tracking-widest uppercase text-foreground/80 font-medium">
            18:00 — 04:00
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/70 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 z-20" />
          <motion.div 
            animate={{ opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent/5 mix-blend-overlay z-15"
          />
          <img 
            src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?auto=format&fit=crop&w=1920&q=80" 
            alt="Cinematic night cafe interior" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="container relative z-30 px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1 
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-8"
            >
              Tvoje místo,<br />
              <span className="text-accent">když svět zpomalí.</span>
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-none px-10 py-7 text-sm font-bold tracking-widest uppercase transition-all" onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth' })}>
                Objev prostor
              </Button>
              <Button size="lg" variant="outline" className="border-foreground/20 hover:border-accent hover:bg-transparent rounded-none px-10 py-7 text-sm font-bold tracking-widest uppercase transition-all" onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}>
                Rezervace
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. CONCEPT SECTION */}
      <section className="py-32 relative bg-background">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Útěk z denního chaosu.
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-8 text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
                <p>
                  Jsme noční režim ve fyzické podobě. Místo, kde čas plyne jinak a kde tě nikdo neruší.
                </p>
                <p>
                  Vytvořili jsme prostor, který respektuje tvoji potřebu pracovat, tvořit nebo jen tiše existovat, když zbytek města spí. Zde nenajdeš polední shon ani cinkání lžiček o hrneček.
                </p>
                <p className="text-accent font-medium">
                  Vyber si, jak chceš fungovat.
                </p>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-[600px] w-full"
            >
              <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80" alt="Warm lamp light studying" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THREE ZONES SECTION */}
      <section id="zones" className="py-32 bg-secondary relative overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20"
          >
            <h2 className="text-xs tracking-[0.2em] text-accent font-bold uppercase mb-4">Prostory</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Zvol svůj mód.</h3>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                id: 'coworking',
                icon: Users,
                title: "COWORKING",
                subtitle: "Pracuj, ale nejsi sám.",
                desc: "Sdílené stoly, lehká a živá atmosféra. Ideální pro kolaboraci nebo práci, při které ti pomáhá jemný ruch okolí.",
                image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=800&q=80",
                glowColor: "rgba(201, 169, 110, 0.15)"
              },
              {
                id: 'relax',
                icon: Armchair,
                title: "RELAX",
                subtitle: "Zpomal. Nikam nespěchej.",
                desc: "Měkké sezení, tlumené světlo. Zóna bez stresu pro čtení, rozhovor nebo prosté odpojení po dlouhém dni.",
                image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=80",
                glowColor: "rgba(201, 169, 110, 0.1)"
              },
              {
                id: 'focus',
                icon: Focus,
                title: "FOCUS",
                subtitle: "Deep work mode.",
                desc: "Absolutní ticho. Individuální kóje, kde tě nebudou rušit pohledy ani zvuky. Čistá koncentrace.",
                image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
                glowColor: "rgba(201, 169, 110, 0.25)"
              }
            ].map((zone, i) => (
              <motion.div 
                key={zone.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative bg-background border border-border overflow-hidden cursor-pointer transition-all duration-700"
                style={{ '--hover-glow': zone.glowColor } as React.CSSProperties}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                     style={{ boxShadow: `inset 0 0 80px var(--hover-glow)` }} />
                
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-700 z-10" />
                  <img src={zone.image} alt={zone.title} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0" />
                </div>
                
                <div className="p-10 relative z-20">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold tracking-widest text-accent">{zone.title}</h4>
                    <zone.icon className="w-6 h-6 text-foreground/30 group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <p className="text-2xl font-semibold mb-4 tracking-tight">{zone.subtitle}</p>
                  <p className="text-foreground/60 font-light leading-relaxed">{zone.desc}</p>
                  
                  <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-foreground/40 group-hover:text-accent transition-colors duration-500">
                    Rezervovat <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NIGHT MODE SECTION */}
      <section className="py-40 bg-background relative border-y border-border/50">
        <motion.div 
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.05)_0%,_transparent_70%)]"
        />
        <div className="container px-6 mx-auto text-center max-w-3xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <Moon className="w-12 h-12 text-accent" strokeWidth={1} />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Jiná energie.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-foreground/70 font-light leading-relaxed mb-12">
              Zatímco se město ukládá ke spánku, my roztáčíme kávovar a tlumíme světla. Noc přináší soustředění, které přes den nenajdeš. Žádné rozptýlení, jen ty a tvé myšlenky.
            </motion.p>
            <motion.div variants={fadeUp} className="inline-block border border-accent/30 bg-accent/5 px-12 py-6 text-center">
              <div className="text-sm tracking-[0.2em] text-accent font-bold uppercase mb-2">Otevírací doba</div>
              <div className="text-4xl font-bold tracking-tight">18:00 – 04:00</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. MENU SECTION */}
      <section className="py-32 bg-secondary relative">
        <div className="container px-6 mx-auto max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20 text-center"
          >
             <h3 className="text-4xl font-bold tracking-tight">Menu</h3>
             <p className="mt-4 text-foreground/60 font-light">Kvalita nad kvantitou. Palivo pro tvou noc.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h4 className="text-xl font-bold text-accent mb-8 tracking-widest uppercase border-b border-border pb-4">Káva & Stimulanty</h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-baseline"><span className="text-lg">Cold Brew</span><span className="text-foreground/50 text-sm">95 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">Ceremonial Matcha</span><span className="text-foreground/50 text-sm">115 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">Yerba Maté Shot</span><span className="text-foreground/50 text-sm">85 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">V60 Filter</span><span className="text-foreground/50 text-sm">105 CZK</span></li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 className="text-xl font-bold text-accent mb-8 tracking-widest uppercase border-b border-border pb-4">Malé jídlo</h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-baseline"><span className="text-lg">Avocado Toast</span><span className="text-foreground/50 text-sm">165 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">Grilled Cheese</span><span className="text-foreground/50 text-sm">145 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">Overnight Oats</span><span className="text-foreground/50 text-sm">125 CZK</span></li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 className="text-xl font-bold text-accent mb-8 tracking-widest uppercase border-b border-border pb-4">Noční snacky</h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-baseline"><span className="text-lg">Energy Bites (3ks)</span><span className="text-foreground/50 text-sm">85 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">Dark Chocolate 80%</span><span className="text-foreground/50 text-sm">95 CZK</span></li>
                <li className="flex justify-between items-baseline"><span className="text-lg">Almonds & Walnuts</span><span className="text-foreground/50 text-sm">75 CZK</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. RESERVATION SECTION */}
      <section id="reservation" className="py-32 bg-background border-t border-border relative">
        <div className="container px-6 mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Rezervace místa</h2>
            <p className="text-foreground/60 font-light">Zajisti si svůj stůl předem. Kapacita je omezená.</p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Zóna</label>
                <select
                  value={formData.zone}
                  onChange={handleChange('zone')}
                  className="w-full bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-lg text-foreground focus:outline-none focus:border-accent appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-background text-foreground/50">Vyber zónu</option>
                  <option value="coworking" className="bg-background text-foreground">Coworking</option>
                  <option value="relax" className="bg-background text-foreground">Relax</option>
                  <option value="focus" className="bg-background text-foreground">Focus</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Počet osob</label>
                <Input 
                  type="number" 
                  min="1" 
                  max="6"
                  placeholder="Např. 2"
                  value={formData.guests}
                  onChange={handleChange('guests')}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-lg focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Datum</label>
                <Input 
                  type="date" 
                  value={formData.date}
                  onChange={handleChange('date')}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-lg focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Čas příchodu</label>
                <Input 
                  type="time" 
                  value={formData.time}
                  onChange={handleChange('time')}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-lg focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Jméno</label>
                <Input 
                  type="text" 
                  required
                  placeholder="Tvé jméno"
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-lg focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold">Email</label>
                <Input 
                  type="email" 
                  required
                  placeholder="pro potvrzení"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 text-lg focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
            </div>

            <div className="pt-8">
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-none h-16 text-sm font-bold tracking-widest uppercase transition-all">
                {submitted ? 'Rezervace přijata' : 'Potvrdit rezervaci'}
              </Button>
            </div>
            
            {submitted && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent text-center font-medium mt-4">
                Děkujeme. Potvrzení jsme odeslali na email.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-background py-16 border-t border-border">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-foreground/50 font-light">
            <div className="md:col-span-2">
              <div className="font-bold text-2xl tracking-tighter text-foreground mb-6">
                Café 25<span className="text-accent">.</span>
              </div>
              <p className="max-w-xs leading-relaxed">
                Noční deep-work azyl. Místo, kde čas plyne jinak.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Kontakt</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                  <span>Liberec<br/>Poblíž kampusu</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>18:00 – 04:00</span>
                </li>
                <li>
                  <a href="mailto:hello@cafe25.cz" className="hover:text-accent transition-colors">hello@cafe25.cz</a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Sledujte nás</h5>
              <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-accent transition-colors"><SiTiktok className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-foreground/30">
            <span>© 2025 Café 25</span>
            <span>The night belongs to you.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
