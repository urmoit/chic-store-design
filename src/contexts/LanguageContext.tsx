import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'et';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.collections': 'Collections',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    
    // Hero
    'hero.badge': 'New Collection Available',
    'hero.title1': 'STAY',
    'hero.title2': 'CHILL',
    'hero.description': 'Premium streetwear and everyday essentials. Designed for comfort, made for style.',
    'hero.shopNow': 'Shop Now',
    'hero.viewLookbook': 'View Lookbook',
    
    // Products
    'products.title': 'Popular Products',
    'products.subtitle': 'Our most loved items',
    'products.noProducts': 'No products found',
    'products.addProducts': 'Add products to your Shopify store to see them here.',
    'products.loadError': 'Failed to load products. Please try again later.',
    'products.addToCart': 'Add to Cart',
    'products.quickView': 'Quick View',
    
    // Filters
    'filter.category': 'Category',
    'filter.allCategories': 'All Categories',
    'filter.priceRange': 'Price Range',
    'filter.allPrices': 'All Prices',
    'filter.sortBy': 'Sort By',
    'filter.default': 'Default',
    'filter.priceLowHigh': 'Price: Low to High',
    'filter.priceHighLow': 'Price: High to Low',
    'filter.nameAZ': 'Name: A to Z',
    'filter.nameZA': 'Name: Z to A',
    'filter.clearFilters': 'Clear Filters',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue shopping to add items.',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Checkout',
    'cart.addedToCart': 'Added to cart',
    
    // Product Page
    'product.backToShop': 'Back to shop',
    'product.notFound': 'Product not found',
    'product.returnToShop': 'Return to shop',
    'product.quantity': 'Quantity',
    'product.soldOut': 'Sold Out',
    'product.freeShipping': 'Free shipping on orders over $100',
    'product.returnPolicy': '30-day return policy',
    'product.secureCheckout': 'Secure checkout',
    
    // Footer
    'footer.description': 'Premium streetwear and everyday essentials. Designed for comfort, made for style. Join the movement.',
    'footer.shop': 'Shop',
    'footer.allProducts': 'All Products',
    'footer.hoodies': 'Hoodies',
    'footer.sweatshirts': 'Sweatshirts',
    'footer.outerwear': 'Outerwear',
    'footer.help': 'Help',
    'footer.shippingInfo': 'Shipping Info',
    'footer.returns': 'Returns',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 ChillHous. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'about.story': 'ChillHous was born from a simple idea: create clothing that feels as good as it looks. We believe in the power of self-expression through fashion, and our mission is to provide premium quality streetwear that lets you be authentically you.',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To create sustainable, high-quality streetwear that empowers individuals to express their unique style while making a positive impact on the planet.',
    'about.values.title': 'Our Values',
    'about.values.quality': 'Quality',
    'about.values.qualityText': 'We source only the finest materials and work with skilled craftspeople to ensure every piece meets our high standards.',
    'about.values.sustainability': 'Sustainability',
    'about.values.sustainabilityText': 'From eco-friendly materials to ethical manufacturing, we\'re committed to reducing our environmental footprint.',
    'about.values.community': 'Community',
    'about.values.communityText': 'We\'re more than a brand - we\'re a community of like-minded individuals who share a passion for style and comfort.',
    
    // Collections Page
    'collections.title': 'Collections',
    'collections.subtitle': 'Browse our curated collections',
    'collections.viewAll': 'View All',
    'collections.items': 'items',
    
    // FAQ Page
    'faq.title': 'FAQ',
    'faq.subtitle': 'Frequently Asked Questions',
    'faq.q1': 'What is your return policy?',
    'faq.a1': 'We offer a 30-day return policy on all unworn items with original tags attached. Simply contact us at chilli@chillhous.com to initiate a return.',
    'faq.q2': 'How long does shipping take?',
    'faq.a2': 'Standard shipping takes 7 business days within Estonia. Express shipping (5 business days) is available at checkout. International shipping times vary by location.',
    'faq.q3': 'Do you ship internationally?',
    'faq.a3': 'Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times are calculated at checkout based on your location.',
    'faq.q4': 'How do I track my order?',
    'faq.a4': 'Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account on our website.',
    'faq.q5': 'What sizes do you offer?',
    'faq.a5': 'We offer sizes XS through 3XL in most styles. Each product page includes a detailed size guide to help you find your perfect fit.',
    'faq.q6': 'How do I care for my ChillHous items?',
    'faq.a6': 'We recommend washing in cold water and tumble drying on low heat. Specific care instructions are included on each garment\'s label.',
    'faq.q7': 'Do you offer gift cards?',
    'faq.a7': 'Yes! Digital gift cards are available in various denominations and never expire. They make the perfect gift for any ChillHous fan.',
    'faq.q8': 'How can I contact customer support?',
    'faq.a8': 'You can reach our support team via email at chilli@chillhous.com. We typically respond within 24 hours.',
    'faq.stillQuestions': 'Still have questions?',
    'faq.emailUs': 'Email Us',
    'faq.printifyTitle': 'About Our Products',
    'faq.printifyQ': 'How are your products made and shipped?',
    'faq.printifyA': 'Our products are made using Printify, a trusted print-on-demand service. Printify handles all printing and shipping directly to you, ensuring high-quality products and reliable delivery.',

    // Privacy Page
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'How we handle your data',
    'privacy.section1Title': 'Information We Collect',
    'privacy.section1Text': 'We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase. We also collect information about your browsing behavior on our website.',
    'privacy.section2Title': 'How We Use Your Information',
    'privacy.section2Text': 'We use the information we collect to process your orders, communicate with you about your purchases, send you marketing communications (with your consent), and improve our services.',
    'privacy.section3Title': 'Information Sharing',
    'privacy.section3Text': 'We share your information with third-party service providers who help us operate our business, including payment processors and shipping carriers. We do not sell your personal information to third parties.',
    'privacy.section4Title': 'Data Security',
    'privacy.section4Text': 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    'privacy.section5Title': 'Your Rights',
    'privacy.section5Text': 'You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time by contacting us.',
    'privacy.contact': 'For privacy inquiries, contact us at',
    'privacy.lastUpdated': 'Last updated: January 2026',

    // Terms Page
    'terms.title': 'Terms of Service',
    'terms.subtitle': 'Terms and conditions for using our services',
    'terms.section1Title': 'Acceptance of Terms',
    'terms.section1Text': 'By accessing and using the ChillHous website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    'terms.section2Title': 'Products and Orders',
    'terms.section2Text': 'All products are subject to availability. We reserve the right to limit quantities, refuse orders, or cancel orders at our discretion. Prices are subject to change without notice.',
    'terms.section3Title': 'Payment',
    'terms.section3Text': 'Payment must be made at the time of purchase. We accept major credit cards and other payment methods as displayed at checkout. All payments are processed securely.',
    'terms.section4Title': 'Shipping and Delivery',
    'terms.section4Text': 'Shipping times and costs vary based on location and shipping method selected. We are not responsible for delays caused by customs, weather, or other circumstances beyond our control.',
    'terms.section5Title': 'Returns and Refunds',
    'terms.section5Text': 'We offer a 30-day return policy for unworn items with original tags. Refunds will be processed within 7-10 business days after we receive the returned item.',
    'terms.section6Title': 'Intellectual Property',
    'terms.section6Text': 'All content on this website, including images, text, logos, and designs, is the property of ChillHous and is protected by copyright and trademark laws.',
    'terms.contact': 'For questions about these terms, contact us at',
    'terms.lastUpdated': 'Last updated: January 2026',
  },
  et: {
    // Navigation
    'nav.home': 'Avaleht',
    'nav.collections': 'Kollektsioonid',
    'nav.about': 'Meist',
    'nav.faq': 'KKK',
    
    // Hero
    'hero.badge': 'Uus kollektsioon saadaval',
    'hero.title1': 'OLE',
    'hero.title2': 'CHILL',
    'hero.description': 'Premium tänavamoee ja igapäevased riided. Disainitud mugavuseks, loodud stiiliks.',
    'hero.shopNow': 'Osta Kohe',
    'hero.viewLookbook': 'Vaata Lookbooki',
    
    // Products
    'products.title': 'Populaarsed tooted',
    'products.subtitle': 'Meie kõige armastatumad tooted',
    'products.noProducts': 'Tooteid ei leitud',
    'products.addProducts': 'Lisa tooteid oma Shopify poodi, et neid siin näha.',
    'products.loadError': 'Toodete laadimine ebaõnnestus. Palun proovi hiljem uuesti.',
    'products.addToCart': 'Lisa ostukorvi',
    'products.quickView': 'Kiirvaade',
    
    // Filters
    'filter.category': 'Kategooria',
    'filter.allCategories': 'Kõik kategooriad',
    'filter.priceRange': 'Hinnavahemik',
    'filter.allPrices': 'Kõik hinnad',
    'filter.sortBy': 'Sorteeri',
    'filter.default': 'Vaikimisi',
    'filter.priceLowHigh': 'Hind: madalaim enne',
    'filter.priceHighLow': 'Hind: kõrgeim enne',
    'filter.nameAZ': 'Nimi: A-Z',
    'filter.nameZA': 'Nimi: Z-A',
    'filter.clearFilters': 'Tühista filtrid',
    
    // Cart
    'cart.title': 'Sinu ostukorv',
    'cart.empty': 'Sinu ostukorv on tühi',
    'cart.continueShopping': 'Jätka ostlemist, et lisada tooteid.',
    'cart.subtotal': 'Vahesumma',
    'cart.checkout': 'Vormista tellimus',
    'cart.addedToCart': 'Lisatud ostukorvi',
    
    // Product Page
    'product.backToShop': 'Tagasi poodi',
    'product.notFound': 'Toodet ei leitud',
    'product.returnToShop': 'Tagasi poodi',
    'product.quantity': 'Kogus',
    'product.soldOut': 'Otsas',
    'product.freeShipping': 'Tasuta tarne tellimustel üle 100€',
    'product.returnPolicy': '30-päevane tagastusõigus',
    'product.secureCheckout': 'Turvaline maksmine',
    
    // Footer
    'footer.description': 'Premium tänavamoee ja igapäevased riided. Disainitud mugavuseks, loodud stiiliks. Liitu liikumisega.',
    'footer.shop': 'Pood',
    'footer.allProducts': 'Kõik tooted',
    'footer.hoodies': 'Dressipluusid',
    'footer.sweatshirts': 'Kampsunid',
    'footer.outerwear': 'Ülerõivad',
    'footer.help': 'Abi',
    'footer.shippingInfo': 'Tarneinfo',
    'footer.returns': 'Tagastused',
    'footer.faq': 'KKK',
    'footer.contact': 'Kontakt',
    'footer.copyright': '© 2026 ChillHous. Kõik õigused kaitstud.',
    'footer.privacy': 'Privaatsuspoliitika',
    'footer.terms': 'Kasutustingimused',
    
    // About Page
    'about.title': 'Meist',
    'about.subtitle': 'Meie lugu',
    'about.story': 'ChillHous sündis lihtsast ideest: luua riideid, mis näevad sama head välja kui tunduvad seljas. Me usume eneseväljendusse läbi moe ja meie missioon on pakkuda kvaliteetset tänavamoodi, mis laseb sul olla autentselt sina.',
    'about.mission.title': 'Meie missioon',
    'about.mission.text': 'Luua jätkusuutlikku, kvaliteetset tänavamoodi, mis võimaldab inimestel väljendada oma unikaalset stiili, tehes samal ajal planeedile head.',
    'about.values.title': 'Meie väärtused',
    'about.values.quality': 'Kvaliteet',
    'about.values.qualityText': 'Me kasutame ainult parimaid materjale ja töötame koos oskuslike meistritega, et tagada iga toote kõrge kvaliteet.',
    'about.values.sustainability': 'Jätkusuutlikkus',
    'about.values.sustainabilityText': 'Alates keskkonnasõbralikest materjalidest kuni eetilise tootmiseni - me oleme pühendunud oma ökoloogilise jalajälje vähendamisele.',
    'about.values.community': 'Kogukond',
    'about.values.communityText': 'Me oleme rohkem kui bränd - me oleme sarnaselt mõtlevate inimeste kogukond, keda ühendab kirg stiili ja mugavuse vastu.',
    
    // Collections Page
    'collections.title': 'Kollektsioonid',
    'collections.subtitle': 'Sirvi meie kureeritud kollektsioone',
    'collections.viewAll': 'Vaata kõiki',
    'collections.items': 'toodet',
    
    // FAQ Page
    'faq.title': 'KKK',
    'faq.subtitle': 'Korduma Kippuvad Küsimused',
    'faq.q1': 'Milline on teie tagastuspoliitika?',
    'faq.a1': 'Pakume 30-päevast tagastusõigust kõigile kandmata toodetele, millel on originaalsildid küljes. Tagastuse alustamiseks kirjuta meile aadressil chilli@chillhous.com.',
    'faq.q2': 'Kui kaua tarne aega võtab?',
    'faq.a2': 'Standardtarne võtab Eestis 7 tööpäeva. Ekspressarne (5 tööpäeva) on saadaval tellimuse vormistamisel.',
    'faq.q3': 'Kas te tarnite rahvusvaheliselt?',
    'faq.a3': 'Jah! Me tarnime üle 50 riiki üle maailma. Rahvusvahelised tarnehinnad ja -ajad arvutatakse tellimuse vormistamisel sinu asukoha põhjal.',
    'faq.q4': 'Kuidas ma oma tellimust jälgin?',
    'faq.a4': 'Kui su tellimus on teele saadetud, saad e-kirja jälgimisnumbriga. Samuti saad oma tellimust jälgida, logides sisse oma kontole meie veebisaidil.',
    'faq.q5': 'Milliseid suurusi te pakute?',
    'faq.a5': 'Pakume suurusi XS kuni 3XL enamikes stiilides. Iga toote lehel on detailne suuruste juhend, mis aitab leida sobiva suuruse.',
    'faq.q6': 'Kuidas ChillHousi tooteid hooldada?',
    'faq.a6': 'Soovitame pesta külma veega ja kuivatada madalal temperatuuril. Konkreetsed hooldusjuhised on igal rõival sildil.',
    'faq.q7': 'Kas te pakute kinkekaarte?',
    'faq.a7': 'Jah! Digitaalsed kinkekaardid on saadaval erinevates väärtustes ja neil pole aegumistähtaega. Need on ideaalne kingitus igale ChillHousi fännile.',
    'faq.q8': 'Kuidas ma saan klienditoega ühendust võtta?',
    'faq.a8': 'Saad meie klienditoega ühendust võtta e-posti teel aadressil chilli@chillhous.com. Vastame tavaliselt 24 tunni jooksul.',
    'faq.stillQuestions': 'On veel küsimusi?',
    'faq.emailUs': 'Kirjuta meile',
    'faq.printifyTitle': 'Meie toodete kohta',
    'faq.printifyQ': 'Kuidas teie tooteid valmistatakse ja tarnitakse?',
    'faq.printifyA': 'Meie tooted valmistatakse Printify abil, mis on usaldusväärne trükiteenuse pakkuja. Printify tegeleb kogu trükkimise ja tarnimisega otse teile, tagades kvaliteetsed tooted ja usaldusväärse kohaletoimetamise.',

    // Privacy Page
    'privacy.title': 'Privaatsuspoliitika',
    'privacy.subtitle': 'Kuidas me sinu andmeid käsitleme',
    'privacy.section1Title': 'Kogutav teave',
    'privacy.section1Text': 'Me kogume teavet, mida sa meile otse annad, näiteks nimi, e-posti aadress, tarneaadress ja makseandmed, kui sooritad ostu. Samuti kogume teavet sinu sirvimiskäitumise kohta meie veebisaidil.',
    'privacy.section2Title': 'Kuidas me sinu andmeid kasutame',
    'privacy.section2Text': 'Kasutame kogutud teavet tellimuste töötlemiseks, sinuga suhtlemiseks ostude kohta, turundussõnumite saatmiseks (sinu nõusolekul) ja meie teenuste parandamiseks.',
    'privacy.section3Title': 'Teabe jagamine',
    'privacy.section3Text': 'Jagame sinu teavet kolmandate osapoolte teenusepakkujatega, kes aitavad meil oma äri juhtida, sealhulgas makseteenuste pakkujate ja kullerfirmadega. Me ei müü sinu isikuandmeid kolmandatele osapooltele.',
    'privacy.section4Title': 'Andmeturve',
    'privacy.section4Text': 'Rakendame asjakohaseid turvameetmeid, et kaitsta sinu isikuandmeid volitamata juurdepääsu, muutmise, avalikustamise või hävitamise eest.',
    'privacy.section5Title': 'Sinu õigused',
    'privacy.section5Text': 'Sul on õigus oma isikuandmetele juurde pääseda, neid parandada või kustutada. Samuti saad igal ajal loobuda turundussõnumitest, võttes meiega ühendust.',
    'privacy.contact': 'Privaatsuspäringute korral võta meiega ühendust aadressil',
    'privacy.lastUpdated': 'Viimati uuendatud: jaanuar 2026',

    // Terms Page
    'terms.title': 'Kasutustingimused',
    'terms.subtitle': 'Meie teenuste kasutamise tingimused',
    'terms.section1Title': 'Tingimuste aktsepteerimine',
    'terms.section1Text': 'ChillHousi veebisaidi ja teenuste kasutamisega nõustud järgima neid kasutustingimusi. Kui sa nende tingimustega ei nõustu, palun ära kasuta meie teenuseid.',
    'terms.section2Title': 'Tooted ja tellimused',
    'terms.section2Text': 'Kõik tooted sõltuvad saadavusest. Jätame endale õiguse piirata koguseid, keelduda tellimustest või tühistada tellimusi oma äranägemise järgi. Hinnad võivad muutuda etteteatamata.',
    'terms.section3Title': 'Makse',
    'terms.section3Text': 'Makse tuleb sooritada ostu hetkel. Aktsepteerime peamisi krediitkaarte ja muid makseviise, nagu kassas kuvatakse. Kõik maksed töödeldakse turvaliselt.',
    'terms.section4Title': 'Tarne ja kohaletoimetamine',
    'terms.section4Text': 'Tarneajad ja -kulud varieeruvad sõltuvalt asukohast ja valitud tarneviisist. Me ei vastuta viivituste eest, mille põhjustavad toll, ilm või muud meie kontrolli alt väljas olevad asjaolud.',
    'terms.section5Title': 'Tagastused ja tagasimaksed',
    'terms.section5Text': 'Pakume 30-päevast tagastusõigust kandmata toodetele koos originaalsiltidega. Tagasimaksed töödeldakse 7-10 tööpäeva jooksul pärast tagastatud toote kättesaamist.',
    'terms.section6Title': 'Intellektuaalomand',
    'terms.section6Text': 'Kogu selle veebisaidi sisu, sealhulgas pildid, tekst, logod ja kujundused, on ChillHousi omand ning on kaitstud autoriõiguse ja kaubamärgiseadustega.',
    'terms.contact': 'Nende tingimuste kohta küsimuste korral võta meiega ühendust aadressil',
    'terms.lastUpdated': 'Viimati uuendatud: jaanuar 2026',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('chillhous-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('chillhous-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
