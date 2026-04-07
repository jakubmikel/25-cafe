import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EarOff, Wifi, Brain, MapPin, Clock, Instagram, Send } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-accent selection:text-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 mix-blend-difference">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-serif font-bold text-2xl tracking-tighter text-foreground">
            25<span className="text-accent">.</span>
          </div>
          <div className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
            18:00 — 01:00
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-20" />
          <img 
            src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2940&auto=format&fit=crop" 
            alt="Night working" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[slowZoom_30s_ease-in-out_infinite_alternate]"
          />
        </div>

        <div className="container relative z-30 px-6 mt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-[7rem] font-serif font-black leading-[0.9] text-foreground mb-8 tracking-tight"
            >
              KDYŽ MĚSTO USÍNÁ,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">TVŮJ DEADLINE NE.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mb-12 leading-relaxed"
            >
              Knihovna zavřela. V baru je hluk. Doma tě ničí prokrastinace. Vítej v 25 Cafe – prvním nočním deep-work azylu v Liberci. Místo, které ožívá v 18:00 a chrání tvé soustředění až do 1:00 ráno.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-none px-8 py-8 text-sm font-bold tracking-widest uppercase transition-all hover:scale-105" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                Získat Black Card (VIP Waitlist)
              </Button>
              <span className="text-muted-foreground text-sm mt-3 sm:mt-0 sm:ml-4 sm:self-center font-medium">
                Otevíráme brzy.<br/>Kapacita prvních členů je omezená.
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        >
          <div className="w-[1px] h-16 bg-muted-foreground/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="py-32 relative bg-background">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                OSTATNÍ ZAVÍRAJÍ.<br/>
                <span className="text-muted-foreground">MY ZAČÍNÁME.</span>
              </h2>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-lg text-foreground/80 leading-relaxed space-y-6 font-light"
            >
              <p>
                Znáš ten pocit. Je 20:00. Potřebuješ nutně pracovat, učit se nebo tvořit. Ale denní kavárny zvedají židle. Zbývají ti jen dvě možnosti: jít do hospody, kde přes křik neslyšíš vlastní myšlenky, nebo jít domů, kde na tebe zírá postel a hlučný spolubydlící.
              </p>
              <p className="text-xl text-accent font-medium">
                My jsme si řekli DOST.
              </p>
              <p>
                Rozhodli jsme se vytvořit 25. hodinu tvého dne. Čas, který existuje mimo prostor a hluk běžného světa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ARSENAL */}
      <section className="py-32 bg-card relative border-y border-border">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20 text-center"
          >
            <h2 className="text-sm tracking-[0.3em] text-accent font-bold uppercase mb-4">Arzenál</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold">TVOJE PRODUKTIVITA JAKO SLUŽBA</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: EarOff,
                title: "Zóna absolutního ticha",
                desc: "Žádné cinkání nádobí. Žádné hlasité skupinky. Naším hlavním pravidlem je respekt k tvému 'flow'. U nás uslyšíš jen tichý lo-fi ambient a klapání klávesnic."
              },
              {
                icon: Wifi,
                title: "Infrastruktura bez kompromisů",
                desc: "Zapomeň na boj o jednu zástrčku v rohu. Ergonomické sezení stavěné na 4 hodiny práce a Wi-Fi, která nepadá, ani když všichni najednou renderují video."
              },
              {
                icon: Brain,
                title: "Brain-Food místo fastfoodu",
                desc: "Alkohol a těžká jídla zabíjejí mozek. Náš bar míchá prémiovou matchu, yerbu maté, adaptogenní nápoje a podává lehké noční snacky, které tě udrží bdělého, ale nezkazí ti spánek."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } }
                }}
                className="bg-background p-10 border border-border group hover:border-accent/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-accent mb-8 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h4 className="text-2xl font-serif font-bold mb-4">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MANIFESTO */}
      <section className="py-40 bg-background relative">
        {/* Decorative giant number */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-border/20 pointer-events-none select-none z-0">
          25
        </div>

        <div className="container px-6 mx-auto relative z-10 max-w-4xl">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-4xl md:text-5xl font-serif font-bold mb-20 text-accent"
          >
            PRAVIDLA 25. HODINY
          </motion.h2>

          <div className="space-y-16">
            {[
              {
                title: "Chráníme tvůj klid",
                desc: "Jsme ochotni nekompromisně vykázat hlučnou skupinu lidí, abychom ochránili tvé soustředění. Ticho je u nás svaté."
              },
              {
                title: "The Submit Bell",
                desc: "Znáš ten pocit úlevy? Pokud u nás o půlnoci odevzdáš bakalářku nebo klikneš na 'Publikovat', zazvoň na barový zvonec. Náš personál ti okamžitě naleje oslavný shot matchy na účet podniku."
              },
              {
                title: "Focus Lockbox",
                desc: "Chceš se odpojit od sítí? Zamkni si u nás na baru telefon. Pokud vydržíš 2 hodiny offline v čistém soustředění, máš od nás 10% slevu na celý účet."
              }
            ].map((rule, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-baseline"
              >
                <div className="text-3xl font-serif font-bold text-muted-foreground/30 min-w-[3rem]">
                  0{i+1}.
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold mb-4">{rule.title}</h3>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">{rule.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FOOTER / CTA */}
      <section id="waitlist" className="py-32 bg-card border-t border-border">
        <div className="container px-6 mx-auto text-center max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-black mb-8">
              PŘIPRAV SE NA<br/>NOČNÍ SMĚNU.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-light mb-12">
              Nebuď sám ve tmě svého pokoje. Přidej se ke komunitě nočních sov, freelancerů a studentů, kteří posouvají Liberec dopředu.
            </motion.p>

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-24">
              <Input 
                type="email" 
                placeholder="Tvůj email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-border h-14 rounded-none text-lg px-6 focus-visible:ring-accent"
              />
              <Button type="submit" size="lg" className="h-14 rounded-none bg-accent hover:bg-accent/90 text-accent-foreground px-8 font-bold tracking-widest uppercase">
                {submitted ? 'Jsi na seznamu' : 'Chci být in'}
              </Button>
            </motion.form>

            {submitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent text-sm -mt-16 mb-20 font-medium">
                Děkujeme. Očekávej zprávu ve tmě.
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border text-sm text-muted-foreground font-medium uppercase tracking-widest">
              <div className="flex flex-col items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Liberec (Poblíž kampusu)</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <span>18:00 – 01:00</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-accent transition-colors"><SiTiktok className="w-5 h-5" /></a>
                </div>
                <span className="text-xs">© 2025 25 Cafe.<br/>The night belongs to you.</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
