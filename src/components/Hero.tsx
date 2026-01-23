import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-2 mb-6 text-xs font-medium tracking-widest uppercase bg-secondary rounded-full text-muted-foreground">
          {t('hero.badge')}
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
          {t('hero.title1')}
          <span className="block text-accent">{t('hero.title2')}</span>
        </h1>
        
        <p className="max-w-md mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="px-8 py-6 text-base font-semibold group"
            onClick={scrollToProducts}
          >
            {t('hero.shopNow')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-base">
            {t('hero.viewLookbook')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full p-1">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
