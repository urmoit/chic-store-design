import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Leaf, Users } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('about.values.quality'),
      description: t('about.values.qualityText'),
    },
    {
      icon: Leaf,
      title: t('about.values.sustainability'),
      description: t('about.values.sustainabilityText'),
    },
    {
      icon: Users,
      title: t('about.values.community'),
      description: t('about.values.communityText'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.story')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.mission.text')}
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-secondary/30 rounded-lg p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
