import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
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
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t('footer.contactUs')}</Link></li>
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
            <a href="#" className="hover:text-foreground transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
