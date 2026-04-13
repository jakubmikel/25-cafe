import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Clock, Moon, Check, Instagram, ChevronLeft, ChevronRight, Star, Users } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import logoSrc from '@assets/cafe25-logo-nobg.png';
import zoneCoworking from '@assets/coworking2_1776104113344.png';
import zoneRelax from '@assets/relax_2_1776104113346.png';
import zoneFocus from '@assets/focus_2_1776104113345.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

type Lang = 'cz' | 'en';

const T = {
  cz: {
    nav: { zones: 'Zóny', menu: 'Menu', reservation: 'Rezervace' },
    hero: {
      line1: 'Tvoje místo,',
      line2: 'když svět zpomalí.',
      sub: 'Noční kavárna. Tři prostory. Jedna hodina navíc.',
      cta1: 'Objev prostory',
      cta2: 'Rezervace',
    },
    concept: {
      title1: 'Jiný čas.',
      title2: 'Jiné tempo.',
      p1: 'Jsme noční režim ve fyzické podobě. Místo, kde čas plyne jinak a kde tě nikdo neruší. Když město utichne, my začínáme.',
      p2: 'Vytvořili jsme prostor, který respektuje tvoji potřebu pracovat, tvořit nebo jen tiše existovat. Žádný ranní shon, žádné cinkání lžiček. Jen ty, tvé myšlenky a perfektní káva.',
      p3: 'Tři zóny. Tři způsoby bytí.',
    },
    zones: {
      heading: 'Zvol si svůj prostor.',
      items: [
        { label: '01 / COWORKING', title: 'Pracuj, ale nejsi sám.', desc: 'Sdílené stoly, jemný ruch. Ideální pro kolaboraci nebo projekty, při kterých ti pomáhá vědomí ostatních.' },
        { label: '02 / RELAX', title: 'Zpomal. Nikam nespěchej.', desc: 'Měkká křesla, tlumené světlo. Prostor pro čtení, rozhovor nebo prosté bytí.' },
        { label: '03 / FOCUS', title: 'Deep work mode.', desc: 'Absolutní ticho. Individuální místo s notebookem, kde přijdou nejlepší nápady.' },
      ],
    },
    night: { sub: 'Zatímco se město ukládá ke spánku, my roztáčíme kávovar.' },
    menu: {
      heading: 'Menu',
      tabs: ['Espresso & Káva', 'Alternativní přípravy', 'Nápoje', 'Jídlo', 'Noční snacky'],
      espresso: [
        { name: 'Espresso', desc: 'Klasická italská příprava' },
        { name: 'Doppio', desc: 'Dvojitý espresso' },
        { name: 'Ristretto', desc: 'Koncentrovaný, intenzivní' },
        { name: 'Americano', desc: 'Espresso s horkou vodou' },
        { name: 'Cappuccino', desc: 'Espresso, pára, hedvábná pěna' },
        { name: 'Flat White', desc: 'Silné espresso s hladkým mlékem' },
        { name: 'Latte', desc: 'Jemný a krémový, 300 ml' },
        { name: 'Cortado', desc: 'Espresso s trochou studeného mléka' },
        { name: 'Macchiato', desc: 'Espresso, kapka mléčné pěny' },
        { name: 'Affogato', desc: 'Espresso přes vanilkový zmrzlinový kopeček' },
      ],
      alt: [
        { name: 'V60 Pour Over', desc: 'Váš výběr ze single origin' },
        { name: 'Chemex', desc: 'Elegantní příprava pro dva' },
        { name: 'AeroPress', desc: 'Plné tělo, čistá chuť' },
        { name: 'Francouzský press', desc: 'Tradiční, bohatý, plný' },
        { name: 'Cold Brew', desc: '24 hodin louhovaný, 300 ml' },
        { name: 'Cold Brew Tonic', desc: 'Cold brew, tonic, pomeranč' },
        { name: 'Nitro Cold Brew', desc: 'Dusíkový cold brew na čepu' },
        { name: 'Sifon', desc: 'Vakuová příprava, vzdušná chuť' },
      ],
      drinks: [
        { name: 'Ceremonial Matcha', desc: 'Přímý dovoz z Japonska, oat milk' },
        { name: 'Matcha Latte', desc: 'Šlehaná matcha, teplé mléko' },
        { name: 'Yerba Maté', desc: 'Tradiční jihoamerická energie' },
        { name: 'Chai Latte', desc: 'Koření, skořice, kardamom' },
        { name: 'Golden Latte', desc: 'Kurkuma, zázvor, kokosové mléko' },
        { name: 'Horká čokoláda', desc: 'Belgická 72%, husté a tmavé' },
        { name: 'Domácí limonáda', desc: 'Citron, máta, cukrový sirup' },
        { name: 'Sparkling Water', desc: 'Perlivá, 330 ml' },
        { name: 'Still Water', desc: 'Neperlivá, 330 ml' },
        { name: 'Džus', desc: 'Pomerančový nebo jablečný, čerstvý' },
      ],
      food: [
        { name: 'Avocado Toast', desc: 'Žitný chléb, vejce, microgreens, citron' },
        { name: 'Smoked Salmon Bagel', desc: 'Losos, cream cheese, kapary, červená cibule' },
        { name: 'Grilled Cheese', desc: 'Čedar, hořčicový dresing, křupavý chléb' },
        { name: 'Club Sandwich', desc: 'Kuřecí, slanina, rajče, ledový salát' },
        { name: 'Hummus Bowl', desc: 'Domácí hummus, zelenina, pita, olive' },
        { name: 'Overnight Oats', desc: 'Ovesné vločky, lesní ovoce, med, ořechy' },
        { name: 'Granola Bowl', desc: 'Domácí granola, kokosový jogurt, mango' },
        { name: 'Quiche du Jour', desc: 'Denní výběr — zeptejte se baristi' },
      ],
      snacks: [
        { name: 'Dark Chocolate 72%', desc: 'Belgická čokoláda, ručně lámaná' },
        { name: 'Banana Bread', desc: 'Domácí recept, vlahý, s ořechy' },
        { name: 'Energy Bites', desc: 'Datlový základ, kešu, kakao' },
        { name: 'Cheese & Crackers', desc: 'Výběr sýrů, hrozny, ořechy' },
        { name: 'Mixed Nuts & Seeds', desc: 'Pražená směs, himálajská sůl' },
        { name: 'Granola Bar', desc: 'Ovesná, med, mandle, tmavá čokoláda' },
        { name: 'Fruit Plate', desc: 'Sezónní ovoce, máta' },
        { name: 'Tiramisu', desc: 'Klasický italský, espresso, mascarpone' },
      ],
    },
    reservation: {
      title: 'Rezervace',
      sub: 'Prostor je omezený, soustředění nikoliv. Zajisti si své místo na dnešní noc.',
      zone: 'Zóna',
      date: 'Datum',
      time: 'Čas',
      guests: 'Osob',
      name: 'Jméno',
      email: 'E-mail',
      zonePlaceholder: 'Vyberte prostor',
      guestsPlaceholder: 'Počet hostů',
      namePlaceholder: 'Jak vás máme oslovit?',
      emailPlaceholder: 'Kam pošleme potvrzení?',
      submit: 'Odeslat rezervaci',
      confirmed: 'Rezervace potvrzena',
    },
    cal: {
      heading: 'Dostupnost & Události',
      sub: 'Klikni na den pro zobrazení detailů a předvyplnění data.',
      prev: 'Předchozí',
      next: 'Další',
      days: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
      months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
      legendAvail: 'Volno',
      legendPartial: 'Částečně obsazeno',
      legendFull: 'Obsazeno',
      legendEvent: 'Akce / Workshop',
      eventOn: 'Události v tento den',
      noEvents: 'Žádné plánované akce.',
      occupancy: 'Obsazenost',
      selectDate: 'Vybrat pro rezervaci',
      past: 'Minulý den',
      full: 'Obsazeno',
    },
    footer: {
      tagline: 'Noční deep-work azyl.',
      desc: 'Místo pro ty, kteří nacházejí inspiraci až když se setmí.',
      location: 'Lokace',
      contact: 'Kontakt',
      address: 'Liberec, Poblíž kampusu',
      copyright: '© 2025 Café 25 — Liberec',
      night: 'The night belongs to you.',
    },
  },
  en: {
    nav: { zones: 'Spaces', menu: 'Menu', reservation: 'Book' },
    hero: {
      line1: 'Your place,',
      line2: 'when the world slows down.',
      sub: 'Night café. Three spaces. One extra hour.',
      cta1: 'Explore spaces',
      cta2: 'Reservation',
    },
    concept: {
      title1: 'Different time.',
      title2: 'Different pace.',
      p1: 'We are night mode in physical form. A place where time flows differently and no one disturbs you. When the city goes quiet, we come alive.',
      p2: 'We created a space that respects your need to work, create, or simply exist in silence. No morning rush, no clinking spoons. Just you, your thoughts, and a perfect coffee.',
      p3: 'Three zones. Three ways of being.',
    },
    zones: {
      heading: 'Choose your space.',
      items: [
        { label: '01 / COWORKING', title: 'Work, but not alone.', desc: 'Shared tables, a gentle hum. Ideal for collaboration or projects where the presence of others helps you focus.' },
        { label: '02 / RELAX', title: 'Slow down. No rush.', desc: 'Soft armchairs, dim light. Space for reading, conversation, or simply being.' },
        { label: '03 / FOCUS', title: 'Deep work mode.', desc: 'Absolute silence. An individual spot with your laptop, where the best ideas come.' },
      ],
    },
    night: { sub: 'While the city falls asleep, we fire up the coffee machine.' },
    menu: {
      heading: 'Menu',
      tabs: ['Espresso & Coffee', 'Alternative Brewing', 'Drinks', 'Food', 'Night Snacks'],
      espresso: [
        { name: 'Espresso', desc: 'Classic Italian preparation' },
        { name: 'Doppio', desc: 'Double espresso' },
        { name: 'Ristretto', desc: 'Concentrated, intense' },
        { name: 'Americano', desc: 'Espresso with hot water' },
        { name: 'Cappuccino', desc: 'Espresso, steam, silky foam' },
        { name: 'Flat White', desc: 'Strong espresso with smooth milk' },
        { name: 'Latte', desc: 'Gentle and creamy, 300 ml' },
        { name: 'Cortado', desc: 'Espresso with a touch of cold milk' },
        { name: 'Macchiato', desc: 'Espresso, a drop of milk foam' },
        { name: 'Affogato', desc: 'Espresso over a vanilla ice cream scoop' },
      ],
      alt: [
        { name: 'V60 Pour Over', desc: 'Your choice of single origin' },
        { name: 'Chemex', desc: 'Elegant preparation for two' },
        { name: 'AeroPress', desc: 'Full body, clean taste' },
        { name: 'French Press', desc: 'Traditional, rich, full-bodied' },
        { name: 'Cold Brew', desc: 'Steeped for 24 hours, 300 ml' },
        { name: 'Cold Brew Tonic', desc: 'Cold brew, tonic water, orange' },
        { name: 'Nitro Cold Brew', desc: 'Nitrogen-infused cold brew on tap' },
        { name: 'Siphon', desc: 'Vacuum brewing, airy flavour' },
      ],
      drinks: [
        { name: 'Ceremonial Matcha', desc: 'Direct import from Japan, oat milk' },
        { name: 'Matcha Latte', desc: 'Whisked matcha, warm milk' },
        { name: 'Yerba Maté', desc: 'Traditional South American energy' },
        { name: 'Chai Latte', desc: 'Spices, cinnamon, cardamom' },
        { name: 'Golden Latte', desc: 'Turmeric, ginger, coconut milk' },
        { name: 'Hot Chocolate', desc: 'Belgian 72%, thick and dark' },
        { name: 'House Lemonade', desc: 'Lemon, mint, sugar syrup' },
        { name: 'Sparkling Water', desc: 'Sparkling, 330 ml' },
        { name: 'Still Water', desc: 'Still, 330 ml' },
        { name: 'Fresh Juice', desc: 'Orange or apple, freshly pressed' },
      ],
      food: [
        { name: 'Avocado Toast', desc: 'Rye bread, egg, microgreens, lemon' },
        { name: 'Smoked Salmon Bagel', desc: 'Salmon, cream cheese, capers, red onion' },
        { name: 'Grilled Cheese', desc: 'Cheddar, mustard dressing, crispy bread' },
        { name: 'Club Sandwich', desc: 'Chicken, bacon, tomato, iceberg lettuce' },
        { name: 'Hummus Bowl', desc: 'House hummus, vegetables, pita, olives' },
        { name: 'Overnight Oats', desc: 'Rolled oats, forest berries, honey, nuts' },
        { name: 'Granola Bowl', desc: 'House granola, coconut yogurt, mango' },
        { name: 'Quiche du Jour', desc: 'Daily selection — ask your barista' },
      ],
      snacks: [
        { name: 'Dark Chocolate 72%', desc: 'Belgian chocolate, hand-broken' },
        { name: 'Banana Bread', desc: 'House recipe, moist, with walnuts' },
        { name: 'Energy Bites', desc: 'Date base, cashew, cacao' },
        { name: 'Cheese & Crackers', desc: 'Selection of cheeses, grapes, nuts' },
        { name: 'Mixed Nuts & Seeds', desc: 'Roasted blend, Himalayan salt' },
        { name: 'Granola Bar', desc: 'Oat, honey, almond, dark chocolate' },
        { name: 'Fruit Plate', desc: 'Seasonal fruit, mint' },
        { name: 'Tiramisu', desc: 'Classic Italian, espresso, mascarpone' },
      ],
    },
    reservation: {
      title: 'Reservation',
      sub: 'Space is limited, focus is not. Reserve your spot for tonight.',
      zone: 'Space',
      date: 'Date',
      time: 'Time',
      guests: 'Guests',
      name: 'Name',
      email: 'E-mail',
      zonePlaceholder: 'Choose a space',
      guestsPlaceholder: 'Number of guests',
      namePlaceholder: 'How should we address you?',
      emailPlaceholder: 'Where shall we send confirmation?',
      submit: 'Send reservation',
      confirmed: 'Reservation confirmed',
    },
    cal: {
      heading: 'Availability & Events',
      sub: 'Click a day to see details and pre-fill the reservation date.',
      prev: 'Previous',
      next: 'Next',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      legendAvail: 'Available',
      legendPartial: 'Partially booked',
      legendFull: 'Fully booked',
      legendEvent: 'Event / Workshop',
      eventOn: 'Events on this day',
      noEvents: 'No planned events.',
      occupancy: 'Occupancy',
      selectDate: 'Select for reservation',
      past: 'Past day',
      full: 'Fully booked',
    },
    footer: {
      tagline: 'Night deep-work refuge.',
      desc: 'A place for those who find inspiration after dark.',
      location: 'Location',
      contact: 'Contact',
      address: 'Liberec, Near campus',
      copyright: '© 2025 Café 25 — Liberec',
      night: 'The night belongs to you.',
    },
  },
} as const;

const PRICES = {
  espresso: ['75', '90', '80', '85', '95', '105', '105', '95', '80', '130'],
  alt: ['115', '130', '110', '105', '115', '135', '145', '125'],
  drinks: ['125', '115', '95', '115', '115', '105', '85', '55', '45', '95'],
  food: ['175', '195', '155', '175', '155', '135', '145', '165'],
  snacks: ['85', '105', '95', '145', '85', '80', '115', '135'],
};

interface CafeEvent {
  date: string;
  titleCz: string;
  titleEn: string;
  time: string;
  type: 'workshop' | 'event' | 'special';
  descCz: string;
  descEn: string;
}

function makeDate(offsetDays: number): string {
  const d = new Date('2026-04-08');
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const EVENTS: CafeEvent[] = [
  { date: makeDate(3),  titleCz: 'Latte Art Workshop', titleEn: 'Latte Art Workshop', time: '20:00', type: 'workshop', descCz: 'Nauč se kreslit do mléčné pěny s naším baristu. Max. 8 účastníků.', descEn: 'Learn to draw in milk foam with our barista. Max. 8 participants.' },
  { date: makeDate(7),  titleCz: 'Coffee Cupping', titleEn: 'Coffee Cupping', time: '19:00', type: 'workshop', descCz: 'Slepá degustace čtyř single-origin káv z různých kontinentů.', descEn: 'Blind tasting of four single-origin coffees from different continents.' },
  { date: makeDate(10), titleCz: 'Jazz & Espresso', titleEn: 'Jazz & Espresso', time: '21:00', type: 'event', descCz: 'Živá jazzová trojice + bar otevřen do 04:00. Vstup volný.', descEn: 'Live jazz trio + bar open until 04:00. Free entry.' },
  { date: makeDate(14), titleCz: 'Deep Work Night', titleEn: 'Deep Work Night', time: '18:00', type: 'special', descCz: 'Organizovaný blok soustředěné práce. Focus zóna vyhrazena, ticho zajištěno.', descEn: 'Organised deep focus block. Focus zone reserved, silence guaranteed.' },
  { date: makeDate(18), titleCz: 'V60 Masterclass', titleEn: 'V60 Masterclass', time: '19:30', type: 'workshop', descCz: 'Perfektní přelévaná káva krok za krokem. Přines si vlastní hrnek.', descEn: 'Perfect pour-over step by step. Bring your own mug.' },
  { date: makeDate(21), titleCz: 'Founders Evening', titleEn: 'Founders Evening', time: '20:00', type: 'event', descCz: 'Neformální večer pro zakladatele startupů. Networking + káva.', descEn: 'Informal evening for startup founders. Networking + coffee.' },
  { date: makeDate(25), titleCz: 'Latte Art Workshop', titleEn: 'Latte Art Workshop', time: '20:00', type: 'workshop', descCz: 'Opakování oblíbeného workshopu — nová série pro začátečníky.', descEn: 'Repeat of the popular workshop — new series for beginners.' },
  { date: makeDate(28), titleCz: 'Open Mic Night', titleEn: 'Open Mic Night', time: '21:00', type: 'event', descCz: 'Hudba, slovo, poezie. Přijď poslouchat nebo vystoupit.', descEn: 'Music, spoken word, poetry. Come to listen or perform.' },
  { date: makeDate(32), titleCz: 'Coffee Cupping #2', titleEn: 'Coffee Cupping #2', time: '19:00', type: 'workshop', descCz: 'Druhý díl degustační série — tentokrát africké specialty.', descEn: 'Second tasting series — this time African specialty coffees.' },
  { date: makeDate(35), titleCz: 'Slow Sunday Night', titleEn: 'Slow Sunday Night', time: '20:00', type: 'special', descCz: 'Klidný večer, vinyl, svíčky. Žádný program — jen atmosféra.', descEn: 'Quiet evening, vinyl, candles. No programme — just atmosphere.' },
  { date: makeDate(39), titleCz: 'Deep Work Night', titleEn: 'Deep Work Night', time: '18:00', type: 'special', descCz: 'Organizovaný blok soustředěné práce. Focus zóna vyhrazena.', descEn: 'Organised deep focus block. Focus zone reserved.' },
  { date: makeDate(43), titleCz: 'Chemex Brewing', titleEn: 'Chemex Brewing', time: '19:30', type: 'workshop', descCz: 'Příprava filtrované kávy metodou Chemex — elegance v pohybu.', descEn: 'Filter coffee preparation by Chemex — elegance in motion.' },
  { date: makeDate(46), titleCz: 'Jazz & Espresso', titleEn: 'Jazz & Espresso', time: '21:00', type: 'event', descCz: 'Měsíční jazzový večer. Živé trio, cocktail espresso, dobrá nálada.', descEn: 'Monthly jazz evening. Live trio, espresso cocktail, good vibes.' },
  { date: makeDate(50), titleCz: 'Community Evening', titleEn: 'Community Evening', time: '20:00', type: 'event', descCz: 'Večer naší komunity. Setkej se s lidmi, kteří pracují v noci jako ty.', descEn: 'Our community evening. Meet people who work at night, just like you.' },
];

function getOccupancy(dateStr: string): 'available' | 'partial' | 'full' {
  const d = new Date(dateStr);
  const dow = d.getDay();
  const seed = (d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % 100;
  const isWeekend = dow === 5 || dow === 6;
  const base = isWeekend ? 55 : 25;
  const val = (base + seed * 0.42) % 100;
  if (val > 80) return 'full';
  if (val > 45) return 'partial';
  return 'available';
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('cz');
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formState, setFormState] = useState({ zone: '', date: '', time: '', guests: '', name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = T[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveTab(0);
  }, [lang]);

  const scrollTo = (e: React.MouseEvent, selector: string) => {
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
    t.menu.espresso.map((item, i) => ({ ...item, price: PRICES.espresso[i] })),
    t.menu.alt.map((item, i) => ({ ...item, price: PRICES.alt[i] })),
    t.menu.drinks.map((item, i) => ({ ...item, price: PRICES.drinks[i] })),
    t.menu.food.map((item, i) => ({ ...item, price: PRICES.food[i] })),
    t.menu.snacks.map((item, i) => ({ ...item, price: PRICES.snacks[i] })),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-[#0D0D0D]/85 backdrop-blur-[20px] border-border/50 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <a href="#" onClick={(e) => scrollTo(e, 'body')} className="flex-shrink-0">
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
              18:00 — 04:00
            </div>
            <button
              onClick={() => setLang(l => l === 'cz' ? 'en' : 'cz')}
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
              <Button className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-background px-12 py-7 rounded-none uppercase tracking-widest text-sm font-medium transition-all" onClick={(e) => scrollTo(e as any, '#zones')}>
                {t.hero.cta1}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-foreground hover:bg-foreground hover:text-background px-12 py-7 rounded-none uppercase tracking-widest text-sm font-medium transition-all" onClick={(e) => scrollTo(e as any, '#reservation')}>
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
                <motion.div key={lang + 'cp'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-6 font-sans font-light text-lg md:text-xl text-foreground/80 leading-relaxed">
                  <p>{t.concept.p1}</p>
                  <p>{t.concept.p2}</p>
                  <p className="text-accent uppercase tracking-widest text-sm pt-4 font-medium">{t.concept.p3}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: 'easeOut' }} viewport={{ once: true }} className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80" alt="Relax zone" className="w-full h-full object-cover grayscale-[20%]" />
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
                className="group relative flex flex-col bg-background h-[600px] overflow-hidden cursor-pointer"
              >
                <div className="h-[340px] w-full relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={zone.image} alt={t.zones.items[i].title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 grayscale-[30%] group-hover:grayscale-0" />
                </div>
                <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center border-l-2 border-transparent group-hover:border-accent transition-all duration-300 relative bg-background z-20 group-hover:-translate-y-2">
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
          <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-serif tracking-widest text-foreground font-light mb-8">
            18:00 — 04:00
          </motion.h2>
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
            <h2 className="text-5xl md:text-7xl font-semibold mb-6">{t.menu.heading}</h2>
            <div className="w-16 h-[1px] bg-accent mx-auto" />
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
                <Input type="time" name="time" min="18:00" max="04:00" value={formState.time} onChange={handleFormChange} required className="bg-transparent border-0 border-b border-border/50 pb-3 text-lg focus-visible:ring-0 focus-visible:border-accent rounded-none px-0" />
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
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> 18:00 – 04:00</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2 text-foreground/70 font-light">
                <span className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">{t.footer.contact}</span>
                <a href="mailto:hello@cafe25.cz" className="hover:text-accent transition-colors">hello@cafe25.cz</a>
                <div className="flex items-center gap-4 mt-4">
                  <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-accent transition-colors"><SiTiktok className="w-4 h-4" /></a>
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
