import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('privacy.subtitle')}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-invert max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('privacy.section1Title')}</h2>
                <p className="text-muted-foreground">{t('privacy.section1Text')}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('privacy.section2Title')}</h2>
                <p className="text-muted-foreground">{t('privacy.section2Text')}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('privacy.section3Title')}</h2>
                <p className="text-muted-foreground">{t('privacy.section3Text')}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('privacy.section4Title')}</h2>
                <p className="text-muted-foreground">{t('privacy.section4Text')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">{t('privacy.section5Title')}</h2>
                <p className="text-muted-foreground">{t('privacy.section5Text')}</p>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {t('privacy.contact')}: chilli@chillhous.com
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('privacy.lastUpdated')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
