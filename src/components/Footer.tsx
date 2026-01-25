import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    width="20" 
    height="20"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight mb-4">CHILLHOUS</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://www.instagram.com/chillhous26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@chillhous26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
            {/* Email Contact */}
            <a 
              href="mailto:chilli@chillhous.com" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              chilli@chillhous.com
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.shop')}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/collections" className="hover:text-foreground transition-colors">{t('footer.allProducts')}</Link></li>
              <li><Link to="/collections" className="hover:text-foreground transition-colors">{t('footer.hoodies')}</Link></li>
              <li><Link to="/collections" className="hover:text-foreground transition-colors">{t('footer.sweatshirts')}</Link></li>
              <li><Link to="/collections" className="hover:text-foreground transition-colors">{t('footer.outerwear')}</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.help')}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground transition-colors">{t('footer.shippingInfo')}</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">{t('footer.returns')}</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">{t('footer.faq')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
