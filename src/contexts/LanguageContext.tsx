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
    'nav.language': 'Language',
    
    // Search
    'search.title': 'Search',
    'search.placeholder': 'Search products...',
    'search.hint': 'Press ⌘K to open search anytime',
    'search.loading': 'Loading...',
    'search.startTyping': 'Start typing to search products',
    'search.noResults': 'No products found',
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
    'cart.checkoutError': 'Checkout is not available right now. Please try again.',
    'cart.addedToCart': 'Added to cart',
    'cart.viewCart': 'View Cart',
    'cart.product': 'Product',
    'cart.price': 'Price',
    'cart.total': 'Total',
    'cart.remove': 'Remove',
    'cart.orderSummary': 'Order Summary',
    'cart.shipping': 'Shipping',
    'cart.calculatedAtCheckout': 'Calculated at checkout',
    'cart.proceedToCheckout': 'Proceed to Checkout',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.backToCart': 'Back to cart',
    'checkout.contact': 'Contact Information',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.shippingAddress': 'Shipping Address',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal Code',
    'checkout.country': 'Country',
    'checkout.payNow': 'Continue to Payment',
    'checkout.redirectNote': 'You will be redirected to our secure payment partner to complete your order.',
    'checkout.fillRequired': 'Please fill in all required fields.',
    
    // Product Page
    'product.backToShop': 'Back to shop',
    'product.notFound': 'Product not found',
    'product.returnToShop': 'Return to shop',
    'product.quantity': 'Quantity',
    'product.soldOut': 'Sold Out',
    'product.freeShipping': 'Free shipping on orders over $100',
    'product.returnPolicy': '30-day return policy',
    'product.secureCheckout': 'Secure checkout',
    'product.sizeGuide': 'Size Guide',
    'product.sizeGuideDescription': 'Find your perfect fit with our size chart',
    'product.size': 'Size',
    'product.chest': 'Chest',
    'product.waist': 'Waist',
    'product.hips': 'Hips',
    'product.howToMeasure': 'How to Measure',
    'product.chestMeasure': 'Measure around the fullest part of your chest',
    'product.waistMeasure': 'Measure around your natural waistline',
    'product.hipsMeasure': 'Measure around the fullest part of your hips',
     'product.relatedProducts': 'You May Also Like',
    'product.buyNow': 'Buy Now',
    
    // Wishlist
    'wishlist.added': 'Added to wishlist',
    'wishlist.removed': 'Removed from wishlist',
    'wishlist.addToWishlist': 'Add to Wishlist',
    'wishlist.inWishlist': 'In Wishlist',
    'wishlist.title': 'My Wishlist',
    'wishlist.item': 'item',
    'wishlist.items': 'items',
    'wishlist.clearAll': 'Clear All',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDescription': 'Save your favorite items to your wishlist and they will show up here.',
    'wishlist.startShopping': 'Start Shopping',
    
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
    'faq.a4': 'Once your order ships, you\'ll receive an email with tracking information. You can also contact us at chilli@chillhous.com for order updates.',
    'faq.q5': 'What sizes do you offer?',
    'faq.a5': 'We offer sizes XS through 3XL in most styles. Each product page includes a detailed size guide to help you find your perfect fit.',
    'faq.q6': 'How do I care for my ChillHous items?',
    'faq.a6': 'We recommend washing in cold water and tumble drying on low heat. Specific care instructions are included on each garment\'s label.',
    'faq.q7': 'Will you offer gift cards?',
    'faq.a7': 'Gift cards are coming soon! Stay tuned — we\'re working on making them available. Follow us on social media for updates.',
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
    'nav.language': 'Keel',
    
    // Search
    'search.title': 'Otsi',
    'search.placeholder': 'Otsi tooteid...',
    'search.hint': 'Vajuta ⌘K otsingu avamiseks',
    'search.loading': 'Laadimine...',
    'search.startTyping': 'Alusta kirjutamist toodete otsimiseks',
    'search.noResults': 'Tooteid ei leitud',
    
    // Hero
    'hero.badge': 'Uus kollektsioon saadaval',
    'hero.title1': 'OLE',
    'hero.title2': 'CHILL',
    'hero.description': 'Kvaliteetne tänavamoerõivastus ja igapäevased riided. Loodud mugavuseks, disainitud stiilselt.',
    'hero.shopNow': 'Osta kohe',
    'hero.viewLookbook': 'Vaata lookbooki',
    
    // Products
    'products.title': 'Populaarsed tooted',
    'products.subtitle': 'Meie enim armastatud tooted',
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
    'filter.priceLowHigh': 'Hind: odavamad enne',
    'filter.priceHighLow': 'Hind: kallimad enne',
    'filter.nameAZ': 'Nimi: A-st Z-ni',
    'filter.nameZA': 'Nimi: Z-st A-ni',
    'filter.clearFilters': 'Tühjenda filtrid',
    
    // Cart
    'cart.title': 'Sinu ostukorv',
    'cart.empty': 'Sinu ostukorv on tühi',
    'cart.continueShopping': 'Jätka ostlemist, et lisada tooteid.',
    'cart.subtotal': 'Kokku',
    'cart.checkout': 'Vormista tellimus',
    'cart.checkoutError': 'Tellimuse vormistamine pole hetkel võimalik. Palun proovi uuesti.',
    'cart.addedToCart': 'Lisatud ostukorvi',
    'cart.viewCart': 'Vaata ostukorvi',
    'cart.product': 'Toode',
    'cart.price': 'Hind',
    'cart.total': 'Kokku',
    'cart.remove': 'Eemalda',
    'cart.orderSummary': 'Tellimuse kokkuvõte',
    'cart.shipping': 'Kohaletoimetamine',
    'cart.calculatedAtCheckout': 'Arvutatakse kassas',
    'cart.proceedToCheckout': 'Jätka tellimust',

    // Checkout
    'checkout.title': 'Tellimuse vormistamine',
    'checkout.backToCart': 'Tagasi ostukorvi',
    'checkout.contact': 'Kontaktandmed',
    'checkout.email': 'E-post',
    'checkout.phone': 'Telefon',
    'checkout.shippingAddress': 'Kohaletoimetamise aadress',
    'checkout.firstName': 'Eesnimi',
    'checkout.lastName': 'Perekonnanimi',
    'checkout.address': 'Aadress',
    'checkout.city': 'Linn',
    'checkout.postalCode': 'Postiindeks',
    'checkout.country': 'Riik',
    'checkout.payNow': 'Jätka maksmisega',
    'checkout.redirectNote': 'Sind suunatakse meie turvalise maksepartneri juurde tellimuse lõpetamiseks.',
    'checkout.fillRequired': 'Palun täida kõik kohustuslikud väljad.',
    
    // Product Page
    'product.backToShop': 'Tagasi poodi',
    'product.notFound': 'Toodet ei leitud',
    'product.returnToShop': 'Tagasi poodi',
    'product.quantity': 'Kogus',
    'product.soldOut': 'Läbi müüdud',
    'product.freeShipping': 'Tasuta kohaletoimetamine alates 100€',
    'product.returnPolicy': '30-päevane tagastusõigus',
    'product.secureCheckout': 'Turvaline maksmine',
    'product.sizeGuide': 'Suuruste tabel',
    'product.sizeGuideDescription': 'Leia oma õige suurus meie suuruste tabeli abil',
    'product.size': 'Suurus',
    'product.chest': 'Rinnaümbermõõt',
    'product.waist': 'Vööümbermõõt',
    'product.hips': 'Puusaümbermõõt',
    'product.howToMeasure': 'Kuidas mõõta',
    'product.chestMeasure': 'Mõõda ümber rindkere kõige laiema koha',
    'product.waistMeasure': 'Mõõda ümber oma vöökoha',
    'product.hipsMeasure': 'Mõõda ümber puusade kõige laiema koha',
    'product.relatedProducts': 'Sulle võib meeldida ka',
    'product.buyNow': 'Osta kohe',
    
    // Wishlist
    'wishlist.added': 'Lisatud soovinimekirja',
    'wishlist.removed': 'Eemaldatud soovinimekirjast',
    'wishlist.addToWishlist': 'Lisa soovinimekirja',
    'wishlist.inWishlist': 'Soovinimekirjas',
    'wishlist.title': 'Minu soovinimekiri',
    'wishlist.item': 'toode',
    'wishlist.items': 'toodet',
    'wishlist.clearAll': 'Tühjenda kõik',
    'wishlist.empty': 'Sinu soovinimekiri on tühi',
    'wishlist.emptyDescription': 'Salvesta oma lemmiktooted soovinimekirja ja need kuvatakse siin.',
    'wishlist.startShopping': 'Alusta ostlemist',
    
    // Footer
    'footer.description': 'Kvaliteetne tänavamoerõivastus ja igapäevased riided. Loodud mugavuseks, disainitud stiilselt. Liitu meiega.',
    'footer.shop': 'Pood',
    'footer.allProducts': 'Kõik tooted',
    'footer.hoodies': 'Kapuutsiga pluusid',
    'footer.sweatshirts': 'Dressipluusid',
    'footer.outerwear': 'Ülerõivad',
    'footer.help': 'Abi',
    'footer.shippingInfo': 'Kohaletoimetamine',
    'footer.returns': 'Tagastused',
    'footer.faq': 'KKK',
    'footer.contact': 'Kontakt',
    'footer.copyright': '© 2026 ChillHous. Kõik õigused kaitstud.',
    'footer.privacy': 'Privaatsuspoliitika',
    'footer.terms': 'Kasutustingimused',
    
    // About Page
    'about.title': 'Meist',
    'about.subtitle': 'Meie lugu',
    'about.story': 'ChillHous sai alguse lihtsast ideest – luua riideid, mis on sama head seljas kui nad paistavad. Me usume eneseväljendusse läbi moe ja meie eesmärk on pakkuda kvaliteetset tänavamoodi, mis laseb sul olla sina ise.',
    'about.mission.title': 'Meie missioon',
    'about.mission.text': 'Luua jätkusuutlikku ja kvaliteetset tänavamoerõivastust, mis annab inimestele võimaluse väljendada oma isikupärast stiili, tehes samal ajal loodusele head.',
    'about.values.title': 'Meie väärtused',
    'about.values.quality': 'Kvaliteet',
    'about.values.qualityText': 'Kasutame ainult parimaid materjale ja teeme koostööd oskuslike meistritega, et iga toode vastaks meie kõrgetele standarditele.',
    'about.values.sustainability': 'Jätkusuutlikkus',
    'about.values.sustainabilityText': 'Alates loodussõbralikest materjalidest kuni eetilise tootmiseni – oleme pühendunud oma keskkonnamõju vähendamisele.',
    'about.values.community': 'Kogukond',
    'about.values.communityText': 'Me oleme rohkem kui bränd – oleme sarnaste vaadetega inimeste kogukond, keda ühendab armastus stiili ja mugavuse vastu.',
    
    // Collections Page
    'collections.title': 'Kollektsioonid',
    'collections.subtitle': 'Sirvi meie valikut',
    'collections.viewAll': 'Vaata kõiki',
    'collections.items': 'toodet',
    
    // FAQ Page
    'faq.title': 'KKK',
    'faq.subtitle': 'Korduma kippuvad küsimused',
    'faq.q1': 'Milline on teie tagastuspoliitika?',
    'faq.a1': 'Pakume 30-päevast tagastusõigust kõigile kandmata toodetele, millel on originaalsildid küljes. Tagastuse algatamiseks kirjuta meile aadressil chilli@chillhous.com.',
    'faq.q2': 'Kui kaua kohaletoimetamine aega võtab?',
    'faq.a2': 'Tavaline kohaletoimetamine Eesti piires võtab aega kuni 7 tööpäeva. Kiirkulleri teenus (kuni 5 tööpäeva) on saadaval tellimuse vormistamisel.',
    'faq.q3': 'Kas te saadade ka välismaale?',
    'faq.a3': 'Jah! Toimetame tellimusi kohale rohkem kui 50 riiki üle maailma. Rahvusvahelise kohaletoimetamise hinnad ja ajad arvutatakse tellimuse vormistamisel vastavalt sinu asukohale.',
    'faq.q4': 'Kuidas ma saan oma tellimust jälgida?',
    'faq.a4': 'Kui sinu tellimus on teele pandud, saad e-kirja koos jälgimislingiga. Küsimuste korral kirjuta meile aadressil chilli@chillhous.com.',
    'faq.q5': 'Milliseid suurusi te pakute?',
    'faq.a5': 'Pakume suurusi XS kuni 3XL enamiku toodete puhul. Iga toote lehel on suuruste tabel, mis aitab sul leida õige suuruse.',
    'faq.q6': 'Kuidas ChillHousi tooteid hooldada?',
    'faq.a6': 'Soovitame pesta külma veega ja kuivatada madalal temperatuuril. Täpsemad hooldusjuhised leiad iga rõivaeseme sildilt.',
    'faq.q7': 'Kas kinkekaardid on saadaval?',
    'faq.a7': 'Kinkekaardid tulevad peagi! Jälgi meid sotsiaalmeedias, et olla esimesena kursis.',
    'faq.q8': 'Kuidas saab klienditoega ühendust?',
    'faq.a8': 'Meie klienditoega saad ühendust e-posti teel aadressil chilli@chillhous.com. Vastame üldjuhul 24 tunni jooksul.',
    'faq.stillQuestions': 'Kas sul on veel küsimusi?',
    'faq.emailUs': 'Kirjuta meile',
    'faq.printifyTitle': 'Meie toodete kohta',
    'faq.printifyQ': 'Kuidas teie tooteid valmistatakse ja kohale toimetatakse?',
    'faq.printifyA': 'Meie tooted valmistatakse koostöös Printifyga, mis on usaldusväärne trükiteenuse pakkuja. Printify tegeleb trükkimise ja kohaletoimetamisega otse sinuni, tagades kvaliteetsed tooted ja kindla kohaletoimetamise.',

    // Privacy Page
    'privacy.title': 'Privaatsuspoliitika',
    'privacy.subtitle': 'Kuidas me sinu andmeid käitleme',
    'privacy.section1Title': 'Milliseid andmeid me kogume',
    'privacy.section1Text': 'Kogume andmeid, mida sa meile ise esitad, näiteks nimi, e-posti aadress, kohaletoimetamise aadress ja makseandmed ostu sooritamisel. Samuti kogume andmeid sinu tegevuse kohta meie veebilehel.',
    'privacy.section2Title': 'Kuidas me sinu andmeid kasutame',
    'privacy.section2Text': 'Kasutame kogutud andmeid tellimuste töötlemiseks, sinuga suhtlemiseks ostude osas, turundusteadete saatmiseks (sinu nõusolekul) ja oma teenuste parandamiseks.',
    'privacy.section3Title': 'Andmete jagamine',
    'privacy.section3Text': 'Jagame sinu andmeid teenusepakkujatega, kes aitavad meie tegevust korraldada, näiteks makseteenuse pakkujad ja kullerteenused. Me ei müü sinu isikuandmeid kolmandatele osapooltele.',
    'privacy.section4Title': 'Andmeturve',
    'privacy.section4Text': 'Kasutame asjakohaseid turvameetmeid, et kaitsta sinu isikuandmeid volitamata juurdepääsu, muutmise, avalikustamise või hävitamise eest.',
    'privacy.section5Title': 'Sinu õigused',
    'privacy.section5Text': 'Sul on õigus oma isikuandmetega tutvuda, neid parandada või kustutada. Samuti saad igal ajal loobuda turundusteadetest, võttes meiega ühendust.',
    'privacy.contact': 'Privaatsusküsimuste korral kirjuta meile aadressil',
    'privacy.lastUpdated': 'Viimati uuendatud: jaanuar 2026',

    // Terms Page
    'terms.title': 'Kasutustingimused',
    'terms.subtitle': 'Meie teenuste kasutamise tingimused',
    'terms.section1Title': 'Tingimustega nõustumine',
    'terms.section1Text': 'ChillHousi veebilehe ja teenuste kasutamisega nõustud nende kasutustingimustega. Kui sa tingimustega ei nõustu, palun ära kasuta meie teenuseid.',
    'terms.section2Title': 'Tooted ja tellimused',
    'terms.section2Text': 'Kõik tooted sõltuvad saadavusest. Jätame endale õiguse piirata koguseid, keelduda tellimustest või tühistada tellimusi oma äranägemise järgi. Hinnad võivad muutuda ette teatamata.',
    'terms.section3Title': 'Maksmine',
    'terms.section3Text': 'Makse tuleb sooritada ostu hetkel. Aktsepteerime peamisi krediitkaarte ja muid makseviise, mis on kassas kuvatud. Kõik maksed töödeldakse turvaliselt.',
    'terms.section4Title': 'Kohaletoimetamine',
    'terms.section4Text': 'Kohaletoimetamise ajad ja kulud sõltuvad asukohast ja valitud viisist. Me ei vastuta viivituste eest, mis on põhjustatud tollist, ilmast või muudest asjaoludest, mis ei ole meie kontrolli all.',
    'terms.section5Title': 'Tagastused ja tagasimaksed',
    'terms.section5Text': 'Pakume 30-päevast tagastusõigust kandmata toodetele koos originaalsiltidega. Tagasimaksed töödeldakse 7–10 tööpäeva jooksul pärast tagastatud kauba kättesaamist.',
    'terms.section6Title': 'Intellektuaalomand',
    'terms.section6Text': 'Kogu selle veebilehe sisu, sealhulgas pildid, tekstid, logod ja kujundused, kuulub ChillHousile ning on kaitstud autoriõiguse ja kaubamärgiseadustega.',
    'terms.contact': 'Tingimuste kohta küsimuste korral kirjuta meile aadressil',
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
