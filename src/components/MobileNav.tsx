import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/collections', label: t('nav.collections') },
    { to: '/about', label: t('nav.about') },
    { to: '/faq', label: t('nav.faq') },
  ];

  const legalLinks = [
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/terms', label: t('footer.terms') },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl font-bold tracking-tight">
            CHILLHOUS
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-3 text-lg font-medium text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="my-4 border-t border-border" />
          
          {legalLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('nav.language') || 'Language'}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
