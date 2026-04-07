import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Coffee, Croissant, Wifi, Menu as MenuIcon, X, MapPin, Phone, Mail, Instagram, Facebook, Star, Clock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ----------------------------------------------------------------------
// Animations
// ----------------------------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// ----------------------------------------------------------------------
// Nav Component
// ----------------------------------------------------------------------
function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('O nás', 'About') },
    { href: '#process', label: t('Náš proces', 'Our Process') },
    { href: '#menu', label: t('Menu', 'Menu') },
    { href: '#gallery', label: t('Galerie', 'Gallery') },
    { href: '#contact', label: t('Kontakt', 'Contact') }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md py-3 shadow-sm border-border/50' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className={`font-serif text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>
          25 Cafe<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href}
                className={`transition-colors hover:text-accent ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={`flex items-center space-x-4 border-l pl-6 ${isScrolled ? 'border-border' : 'border-white/20'}`}>
            <div className={`flex items-center rounded-full p-1 ${isScrolled ? 'bg-secondary' : 'bg-white/20 backdrop-blur-sm'}`}>
              <button 
                onClick={() => setLanguage('CZ')}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${language === 'CZ' ? (isScrolled ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-white text-primary shadow-sm') : (isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/70 hover:text-white')}`}
              >
                CZ
              </button>
              <button 
                onClick={() => setLanguage('EN')}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${language === 'EN' ? (isScrolled ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-white text-primary shadow-sm') : (isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/70 hover:text-white')}`}
              >
                EN
              </button>
            </div>
            
            <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 border-none">
              {t('Rezervace', 'Bookings')}
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-primary' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-serif text-2xl font-bold text-primary">25 Cafe<span className="text-accent">.</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-2xl font-serif mb-12">
              {navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-muted-foreground">{t('Jazyk', 'Language')}</span>
                <div className="flex items-center bg-secondary rounded-full p-1">
                  <button 
                    onClick={() => setLanguage('CZ')}
                    className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${language === 'CZ' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                  >
                    CZ
                  </button>
                  <button 
                    onClick={() => setLanguage('EN')}
                    className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${language === 'EN' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                  >
                    EN
                  </button>
                </div>
              </div>
              
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-lg">
                {t('Rezervace', 'Bookings')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ----------------------------------------------------------------------
// Hero Section
// ----------------------------------------------------------------------
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2047&ixlib=rb-4.0.3" 
          alt="Cafe interior" 
          className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <span className="text-accent tracking-[0.2em] uppercase text-xs font-bold border border-accent/30 rounded-full px-4 py-1 bg-black/20 backdrop-blur-sm">
              Liberec, Czech Republic
            </span>
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl"
          >
            {t('Vaše denní dávka dokonalosti.', 'Your daily dose of perfection.')}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-2xl text-white/90 font-light mb-10 max-w-2xl mx-auto drop-shadow-md"
          >
            {t('Výběrová káva a domácí dezerty v srdci města.', 'Specialty coffee and homemade pastries in the heart of the city.')}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-6 text-lg w-full sm:w-auto shadow-lg shadow-accent/20 transition-transform hover:scale-105">
              {t('Naše nabídka', 'Our Menu')}
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg w-full sm:w-auto backdrop-blur-sm transition-transform hover:scale-105">
              {t('O nás', 'About Us')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70"
      >
        <span className="text-xs tracking-widest uppercase mb-2">{t('Objevte více', 'Scroll to discover')}</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 48] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ----------------------------------------------------------------------
// About Section
// ----------------------------------------------------------------------
function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative text */}
      <div className="absolute top-10 left-10 text-[15rem] font-serif font-bold text-secondary/30 pointer-events-none select-none leading-none -z-10">
        25
      </div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="text-accent font-semibold tracking-wider uppercase text-sm flex items-center">
                <span className="w-8 h-px bg-accent mr-3"></span>
                {t('O nás', 'About Us')}
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8 leading-tight">
              {t('Vítejte ve 25 Cafe', 'Welcome to 25 Cafe')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t(
                'Naše cesta začala vášní pro tu nejlepší zrnkovou kávu. Každý šálek připravujeme s precizností a láskou, aby váš zážitek byl pokaždé výjimečný. Jsme ideálním místem pro ranní práci, odpolední relaxaci nebo setkání s nejbližšími.',
                'Our journey began with a passion for the finest coffee beans. Every cup is prepared with precision and love to ensure your experience is exceptional every time. We are the perfect place for morning work, afternoon relaxation, or meeting loved ones.'
              )}
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border">
              <motion.div variants={fadeInUp} className="flex flex-col items-start space-y-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-primary">{t('Výběrová káva', 'Specialty Coffee')}</h3>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-start space-y-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent">
                  <Croissant className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-primary">{t('Domácí dezerty', 'Home Pastries')}</h3>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-start space-y-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent">
                  <Wifi className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-primary">{t('Wi-Fi zdarma', 'Free Wi-Fi')}</h3>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000" 
                alt="Barista pouring coffee" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-br-3xl -z-10 hidden md:block"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 border border-border rounded-tl-3xl -z-10 hidden md:block bg-secondary/50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Process / Quality Section
// ----------------------------------------------------------------------
function Process() {
  const { t } = useLanguage();
  return (
    <section id="process" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block"
          >
            {t('Naše kvalita', 'Our Quality')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight"
          >
            {t('Z farmy až do vašeho šálku', 'From Farm to Your Cup')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: '01',
              title: t('Pečlivý výběr', 'Careful Selection'),
              desc: t('Vybíráme pouze zrna s jasným původem a nejvyšším cupping skóre.', 'We select only beans with clear origin and the highest cupping score.')
            },
            {
              step: '02',
              title: t('Lokální pražení', 'Local Roasting'),
              desc: t('Naše zrna pražíme v malých dávkách, abychom zaručili absolutní čerstvost.', 'We roast our beans in small batches to guarantee absolute freshness.')
            },
            {
              step: '03',
              title: t('Precizní příprava', 'Precise Preparation'),
              desc: t('Každý nápoj je připravován zkušenými baristy s důrazem na detail.', 'Every drink is prepared by experienced baristas with attention to detail.')
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl font-serif font-bold text-accent/30 absolute top-4 right-6 pointer-events-none">
                {item.step}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4 mt-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Menu Section
// ----------------------------------------------------------------------
function Menu() {
  const { t } = useLanguage();

  const espressoBar = [
    { name: 'Espresso', price: '55 Kč', desc: 'Single origin, double shot' },
    { name: 'Cappuccino', price: '75 Kč', desc: 'Espresso, steamed milk, microfoam' },
    { name: 'Flat White', price: '85 Kč', desc: 'Double ristretto, fine microfoam' },
    { name: 'Batch Brew', price: '65 Kč', desc: 'Filter coffee, changing daily' },
  ];

  const sweet = [
    { name: 'Croissant', price: '45 Kč', desc: 'Butter croissant, baked fresh' },
    { name: 'New York Cheesecake', price: '95 Kč', desc: 'Classic recipe, berry coulis' },
  ];

  const savory = [
    { name: 'Avocado Toast', price: '165 Kč', desc: 'Sourdough, poached egg, chili flakes' },
    { name: 'Club Sandwich', price: '145 Kč', desc: 'Roasted chicken, bacon, lettuce, mayo' },
  ];

  const renderItems = (items: {name: string, price: string, desc: string}[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mt-12">
      {items.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col border-b border-border/50 pb-5 group"
        >
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xl font-serif text-primary group-hover:text-accent transition-colors font-bold">{item.name}</span>
            <div className="flex-1 border-b border-dotted border-border mx-4 relative top-[-6px]"></div>
            <span className="text-lg font-medium text-primary">{item.price}</span>
          </div>
          <span className="text-sm text-muted-foreground">{item.desc}</span>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="menu" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary -z-10 hidden lg:block"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center justify-center"
          >
            <span className="w-8 h-px bg-accent mr-3"></span>
            {t('Naše nabídka', 'Our Menu')}
            <span className="w-8 h-px bg-accent ml-3"></span>
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6"
          >
            {t('Ochutnejte dokonalost', 'Taste Perfection')}
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            {t('Všechny naše produkty jsou připravovány z těch nejkvalitnějších surovin s maximální péčí.', 'All our products are prepared from the highest quality ingredients with utmost care.')}
          </p>
        </div>

        <div className="bg-background rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 max-w-5xl mx-auto border border-border">
          <Tabs defaultValue="espresso" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 md:gap-4 bg-transparent mb-12 h-auto p-0">
              <TabsTrigger 
                value="espresso" 
                className="text-base md:text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 md:px-8 py-3 bg-secondary/50 text-primary border border-transparent data-[state=active]:border-primary"
              >
                Espresso Bar
              </TabsTrigger>
              <TabsTrigger 
                value="sweet"
                className="text-base md:text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 md:px-8 py-3 bg-secondary/50 text-primary border border-transparent data-[state=active]:border-primary"
              >
                Sweet
              </TabsTrigger>
              <TabsTrigger 
                value="savory"
                className="text-base md:text-lg font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 md:px-8 py-3 bg-secondary/50 text-primary border border-transparent data-[state=active]:border-primary"
              >
                Savory
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="espresso" className="focus-visible:outline-none animate-in fade-in duration-500">
              {renderItems(espressoBar)}
            </TabsContent>
            <TabsContent value="sweet" className="focus-visible:outline-none animate-in fade-in duration-500">
              {renderItems(sweet)}
            </TabsContent>
            <TabsContent value="savory" className="focus-visible:outline-none animate-in fade-in duration-500">
              {renderItems(savory)}
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 text-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8">
              {t('Stáhnout kompletní menu (PDF)', 'Download Full Menu (PDF)')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Reviews / Testimonials Section
// ----------------------------------------------------------------------
function Reviews() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1521017430209-f609ce5b66b4?auto=format&fit=crop&q=80&w=1000" 
              alt="People enjoying coffee" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
              {t('Co říkají naši hosté', 'What Our Guests Say')}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-primary mb-12">
              {t('Kavárna, kterou si zamilujete', 'A Cafe You Will Fall in Love With')}
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="bg-secondary/50 p-8 rounded-2xl relative">
              <div className="text-6xl text-accent absolute top-4 left-6 opacity-30 font-serif">"</div>
              <div className="flex gap-1 mb-4 relative z-10">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent text-accent" />)}
              </div>
              <p className="text-lg italic text-foreground mb-6 relative z-10 font-serif leading-relaxed">
                {t('Nejlepší káva v Liberci! Obsluha je vždy usměvavá, atmosféra je neuvěřitelně útulná a jejich domácí cheesecake je prostě božský. Chodím sem pravidelně a nikdy nezklamou.', 
                'Best coffee in Liberec! The staff is always smiling, the atmosphere is incredibly cozy, and their homemade cheesecake is simply divine. I come here regularly and they never disappoint.')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-serif font-bold text-primary">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-primary">Martina N.</h4>
                  <span className="text-sm text-muted-foreground">{t('Pravidelný host', 'Regular Guest')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Gallery Section
// ----------------------------------------------------------------------
function Gallery() {
  const { t } = useLanguage();
  
  const images = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1495474472207-bf5e2b023533?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4"
            >
              {t('Sledujte nás na Instagramu', 'Follow us on Instagram')}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground text-lg">
              {t('Sdílejte s námi své chvíle pomocí #25Cafe', 'Share your moments with us using #25Cafe')}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Button variant="outline" className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground group bg-transparent h-12 px-6">
              <Instagram className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              @25Cafe
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`aspect-square rounded-2xl overflow-hidden group cursor-pointer relative shadow-md ${i % 2 !== 0 ? 'lg:translate-y-8' : ''}`}
            >
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center text-white p-6 text-center">
                <Instagram className="w-8 h-8 text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                <p className="font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {t('Krásné ráno ve 25 Cafe!', 'Beautiful morning at 25 Cafe!')}
                </p>
              </div>
              <img 
                src={src} 
                alt={`Gallery image ${i+1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Footer / Contact
// ----------------------------------------------------------------------
function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-24 pb-12 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">{t('Přijďte nás navštívit', 'Come Visit Us')}</h3>
              <p className="text-white/70 mb-8 max-w-md text-lg">
                {t('Ať už potřebujete klid na práci, nebo místo pro setkání s přáteli, vždy vás rádi uvidíme.', 'Whether you need a quiet place to work or a spot to meet friends, we are always happy to see you.')}
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
                {t('Zobrazit na mapě', 'View on Map')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/5">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-semibold mb-2 text-white">{t('Adresa', 'Address')}</h4>
                <p className="text-white/70">
                  Náměstí 25<br />
                  Liberec, 460 01<br />
                  Czech Republic
                </p>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/5">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-semibold mb-2 text-white">{t('Otevírací doba', 'Opening Hours')}</h4>
                <ul className="text-white/70 space-y-1">
                  <li className="flex justify-between">
                    <span>{t('Po-Pá', 'Mon-Fri')}</span>
                    <span>7:30 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t('So-Ne', 'Sat-Sun')}</span>
                    <span>9:00 - 17:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-4xl font-bold mb-6 text-white">25 Cafe<span className="text-accent">.</span></h3>
            <p className="text-primary-foreground/70 mb-8 max-w-sm text-lg">
              {t('Výběrová káva a domácí dezerty v srdci města.', 'Specialty coffee and homemade pastries in the heart of the city.')}
            </p>
            <div className="mt-8 text-2xl font-serif text-accent italic">
              {t('Těšíme se na vás!', 'We look forward to seeing you!')}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-white">{t('Kontakt', 'Contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-primary-foreground/80">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <a href="tel:+420123456789" className="hover:text-white transition-colors">+420 123 456 789</a>
              </li>
              <li className="flex items-center text-primary-foreground/80">
                <Mail className="w-5 h-5 mr-3 text-accent" />
                <a href="mailto:hello@25cafe.cz" className="hover:text-white transition-colors">hello@25cafe.cz</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-xl font-semibold mb-6 text-white">{t('Sledujte nás', 'Follow Us')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all hover:scale-110 text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all hover:scale-110 text-white">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} 25 Cafe. {t('Všechna práva vyhrazena.', 'All rights reserved.')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t('Ochrana osobních údajů', 'Privacy Policy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('Podmínky použití', 'Terms of Service')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Process />
        <Menu />
        <Reviews />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
