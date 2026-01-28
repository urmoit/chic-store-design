import { Link } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { SearchDialog } from './SearchDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWishlistStore } from '@/stores/wishlistStore';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';

export function Header() {
  const { t } = useLanguage();
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ChillHous" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-tight">CHILLHOUS</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.collections')}
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.faq')}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <SearchDialog />
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>
          <LanguageSwitcher />
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
