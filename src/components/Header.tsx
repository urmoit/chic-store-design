import { Link } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          CHILLHOUS
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.shop')}
          </Link>
          <Link to="/collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.collections')}
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.contact')}
          </Link>
          <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.faq')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
