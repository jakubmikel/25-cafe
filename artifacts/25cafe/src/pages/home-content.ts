export type Lang = 'cz' | 'en';

export const TRANSLATIONS = {
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
      heading: 'Menu 25. hodiny',
      sub: 'Zapomeň na cukrový crash a těžký žaludek. Naše menu je sestavené tak, aby tvůj mozek fungoval na maximum, i když zbytek města spí.',
      tabs: ['Tekutý Focus', 'Brain-Boosters', 'Deep-Work Fuel', 'The Reward', 'Survival Kits'],
      focus: [
        { name: 'Espresso / Lungo', desc: 'Rychlý start. Čistá energie, žádné zbytečnosti.' },
        { name: 'Batch Brew – Filtrovaná káva', desc: 'Velký hrnek černého zlata na dlouhé čtení skript.' },
        { name: 'Flat White / Cappuccino', desc: 'Jemnější přistání. Ovesné mléko samozřejmostí — v noci se tráví lépe.' },
        { name: 'Midnight Decaf – Bezkofeinový filtr', desc: 'Chuť kávy, ale bez bušení srdce ve 3 ráno. Ideální, když už máš hotovo, ale chceš ještě posedět.' },
        { name: 'Doppio', desc: 'Dvojitý espresso pro ty, co potřebují extra kopanec. Intenzivní a nekompromisní.' },
        { name: 'Cold Brew On Tap', desc: '24 hodin louhovaný za studena. Čepovaný přímo do skla. Hladký, silný, bez hořkosti.' },
        { name: 'Cortado', desc: 'Espresso s kapkou teplého mléka. Rychlá pauza, která nezpomalí.' },
      ],
      boosters: [
        { name: 'The "25 Boost"', desc: 'Náš signature drink. Cold brew, infuzovaný citrus, kapka javorového sirupu a přírodní extrakt z guarany.' },
        { name: 'Zen Matcha Latte', desc: 'Prémiová japonská matcha ceremonial grade. Kofein se uvolňuje postupně díky L-theaninu = 4 hodiny čisté hlavy.' },
        { name: 'Yerba Maté Lemonade', desc: 'Jemně perlivá, ledová a osvěžující. Pro kodéry, co potřebují psát rychlé řádky.' },
        { name: 'Adaptogenní Reishi Kakao', desc: 'Husté kakao obohacené o medicinální houbu Reishi. Nulový kofein. Perfektní pro Relax zónu.' },
        { name: 'Golden Turmeric Tonic', desc: 'Kurkuma, zázvor, černý pepř a med. Protizánětlivý boost bez kofeinu.' },
        { name: 'Lion\'s Mane Latte', desc: 'Ovesné mléko s extraktem z houby Lion\'s Mane. Podpora paměti a koncentrace.' },
        { name: 'Chaga Chai', desc: 'Kořeněný chai s adaptogenní houbou Chaga. Imunita + energie bez nervozity.' },
      ],
      fuel: [
        { name: 'Noční Protein Toast', desc: 'Nasucho opečený kváskový chléb, plátky krůtího masa, avokádo, chilli vločky a kapka limety.' },
        { name: 'Deadline Bowl', desc: 'Miska, co tě zachrání. Quinoa, edamame, pečená dýně, špenát, ořechy a tahini dresink. Bez lepku.' },
        { name: 'Brain-Hack Nut Mix', desc: 'Mistička prémiových vlašských a pekanových ořechů s kousky 80% hořké čokolády.' },
        { name: 'Midnight Wrap', desc: 'Celozrnná tortilla, hummus, grilované kuře, rukola a sušená rajčata. Kompaktní a sytí.' },
        { name: 'Smoked Salmon Rye', desc: 'Žitný chléb, uzený losos, cream cheese, kapary a čerstvý kopr. Omega-3 pro mozek.' },
        { name: 'Edamame & Miso Bowl', desc: 'Teplá miso polévka s edamame, tofu, wakame a sezamem. Lehký a zahřívající.' },
        { name: 'Overnight Oats Jar', desc: 'Ovesné vločky louhované přes noc v ovesném mléce s chia, borůvkami a mandlovým máslem.' },
      ],
      reward: [
        { name: 'Midnight Banana Bread', desc: 'Náš vlastní, nepřeslazený. S kousky tmavé čokolády a ořechovým máslem navrch.' },
        { name: 'Raw Energy Ball', desc: 'Malá kulička z datlí, kakaa a espressa. Instantní záchrana, když padá víka.' },
        { name: 'Dark Chocolate Mousse', desc: 'Belgická 80% čokoláda, lehký a vzdušný. Sladká tečka bez výčitek.' },
        { name: 'Espresso Affogato', desc: 'Kopeček vanilkového gelata zalitý horkým espressem. Odměna za odeslaný projekt.' },
        { name: 'Mini Cheesecake', desc: 'Malý cheesecake s borůvkami a malinami. Jemný, lehký, tak akorát sladký.' },
        { name: 'Matcha Bliss Ball', desc: 'Kulička z kešu, matchy a kokosu. Zelená energie na závěr.' },
      ],
      kits: [
        { name: '„Těžká Noc" Combo', desc: 'The "25 Boost" + Noční Protein Toast. Palivo na hrubou práci.' },
        { name: '„Čisté Flow" Combo', desc: 'Zen Matcha Latte + Deadline Bowl. Pro kreativní práci a design.' },
        { name: '„Už jen čtu" Combo', desc: 'Adaptogenní Kakao + Banana Bread + Brain-Hack Nut Mix. Zklidnění před koncem.' },
        { name: '„Startup Mode" Combo', desc: 'Doppio + Midnight Wrap + Raw Energy Ball. Pro ty, co jedou na plný plyn.' },
        { name: '„Study Session" Combo', desc: 'Batch Brew + Overnight Oats + Dark Chocolate Mousse. Dlouhé učení bez hladu.' },
        { name: '„Night Owl" Combo', desc: 'Cold Brew On Tap + Smoked Salmon Rye + Espresso Affogato. Premium noční menu.' },
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
      address: 'Studentská 1402/2, Liberec — kampus TUL',
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
      heading: 'The 25th Hour Menu',
      sub: 'Forget sugar crashes and heavy stomachs. Our menu is calibrated so your brain runs at peak performance, even when the rest of the city sleeps.',
      tabs: ['Liquid Focus', 'Brain-Boosters', 'Deep-Work Fuel', 'The Reward', 'Survival Kits'],
      focus: [
        { name: 'Espresso / Lungo', desc: 'Quick start. Pure energy, no nonsense.' },
        { name: 'Batch Brew – Filter Coffee', desc: 'A big mug of black gold for long study sessions.' },
        { name: 'Flat White / Cappuccino', desc: 'Softer landing. Oat milk is default — easier to digest at night.' },
        { name: 'Midnight Decaf – Decaf Filter', desc: 'All the taste, none of the heart-pounding at 3 AM. Perfect when you\'re done but want to linger.' },
        { name: 'Doppio', desc: 'Double espresso for those who need an extra kick. Intense and uncompromising.' },
        { name: 'Cold Brew On Tap', desc: 'Cold-steeped for 24 hours. Poured straight from the tap. Smooth, strong, no bitterness.' },
        { name: 'Cortado', desc: 'Espresso with a drop of warm milk. A quick break that won\'t slow you down.' },
      ],
      boosters: [
        { name: 'The "25 Boost"', desc: 'Our signature drink. Cold brew infused with citrus, a drop of maple syrup and natural guarana extract.' },
        { name: 'Zen Matcha Latte', desc: 'Premium Japanese ceremonial grade matcha. Caffeine releases gradually via L-theanine = 4 hours of pure focus.' },
        { name: 'Yerba Maté Lemonade', desc: 'Lightly sparkling, icy and refreshing. For coders who need to write fast lines.' },
        { name: 'Adaptogenic Reishi Cacao', desc: 'Rich cacao enriched with medicinal Reishi mushroom. Zero caffeine. Perfect for the Relax zone.' },
        { name: 'Golden Turmeric Tonic', desc: 'Turmeric, ginger, black pepper and honey. Anti-inflammatory boost without caffeine.' },
        { name: 'Lion\'s Mane Latte', desc: 'Oat milk with Lion\'s Mane mushroom extract. Memory and concentration support.' },
        { name: 'Chaga Chai', desc: 'Spiced chai with adaptogenic Chaga mushroom. Immunity + energy without the jitters.' },
      ],
      fuel: [
        { name: 'Night Protein Toast', desc: 'Dry-toasted sourdough, sliced turkey, smashed avocado, chilli flakes and a squeeze of lime.' },
        { name: 'Deadline Bowl', desc: 'The bowl that saves you. Quinoa, edamame, roasted pumpkin, spinach, nuts and tahini dressing. Gluten-free.' },
        { name: 'Brain-Hack Nut Mix', desc: 'A dish of premium walnuts and pecans with chunks of 80% dark chocolate.' },
        { name: 'Midnight Wrap', desc: 'Whole-grain tortilla, hummus, grilled chicken, arugula and sun-dried tomatoes. Compact and filling.' },
        { name: 'Smoked Salmon Rye', desc: 'Rye bread, smoked salmon, cream cheese, capers and fresh dill. Omega-3 for the brain.' },
        { name: 'Edamame & Miso Bowl', desc: 'Warm miso soup with edamame, tofu, wakame and sesame. Light and warming.' },
        { name: 'Overnight Oats Jar', desc: 'Oats soaked overnight in oat milk with chia, blueberries and almond butter.' },
      ],
      reward: [
        { name: 'Midnight Banana Bread', desc: 'Our own recipe, not too sweet. With dark chocolate chunks and nut butter on top.' },
        { name: 'Raw Energy Ball', desc: 'A small ball of dates, cacao and espresso. Instant rescue when your eyelids are dropping.' },
        { name: 'Dark Chocolate Mousse', desc: 'Belgian 80% chocolate, light and airy. A sweet finish without the guilt.' },
        { name: 'Espresso Affogato', desc: 'A scoop of vanilla gelato drowned in hot espresso. Reward for a shipped project.' },
        { name: 'Mini Cheesecake', desc: 'Individual cheesecake with forest berries. Creamy, not too sweet.' },
        { name: 'Matcha Bliss Ball', desc: 'Cashew, matcha and coconut ball. Green energy for the finish line.' },
      ],
      kits: [
        { name: '"Heavy Night" Combo', desc: 'The "25 Boost" + Night Protein Toast. Fuel for heavy-lifting work.' },
        { name: '"Clean Flow" Combo', desc: 'Zen Matcha Latte + Deadline Bowl. For creative work and design.' },
        { name: '"Just Reading" Combo', desc: 'Adaptogenic Cacao + Banana Bread + Brain-Hack Nut Mix. Wind down before closing time.' },
        { name: '"Startup Mode" Combo', desc: 'Doppio + Midnight Wrap + Raw Energy Ball. For those running at full throttle.' },
        { name: '"Study Session" Combo', desc: 'Batch Brew + Overnight Oats + Dark Chocolate Mousse. Long studying without hunger.' },
        { name: '"Night Owl" Combo', desc: 'Cold Brew On Tap + Smoked Salmon Rye + Espresso Affogato. Premium night menu.' },
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
      address: 'Studentská 1402/2, Liberec — TUL Campus',
      copyright: '© 2025 Café 25 — Liberec',
      night: 'The night belongs to you.',
    },
  },
} as const;

export const PRICES = {
  focus: ['55', '75', '85', '85', '70', '95', '75'],
  boosters: ['115', '110', '85', '95', '90', '105', '95'],
  fuel: ['145', '185', '75', '155', '175', '135', '115'],
  reward: ['65', '45', '95', '105', '85', '55'],
  kits: ['250', '295', '235', '265', '255', '345'],
};

export interface CafeEvent {
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

export const EVENTS: CafeEvent[] = [
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

export function getOccupancy(dateStr: string): 'available' | 'partial' | 'full' {
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

export type CalT = typeof TRANSLATIONS.cz.cal;

