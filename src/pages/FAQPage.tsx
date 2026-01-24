import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: t('faq.a8') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('faq.subtitle')}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-secondary/30 rounded-lg px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Printify Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">{t('faq.printifyTitle')}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="printify"
                  className="bg-secondary/30 rounded-lg px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    {t('faq.printifyQ')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {t('faq.printifyA')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Email CTA */}
            <div className="mt-16 text-center bg-secondary/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">{t('faq.stillQuestions')}</h2>
              <a href="mailto:chilli@chillhous.com">
                <Button size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  {t('faq.emailUs')}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
