import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data: products, isLoading } = useProducts();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredProducts = products?.filter((product) =>
    product.node.title.toLowerCase().includes(query.toLowerCase()) ||
    product.node.productType?.toLowerCase().includes(query.toLowerCase())
  ) || [];

  const handleSelect = (handle: string) => {
    navigate(`/product/${handle}`);
    setOpen(false);
    setQuery('');
  };

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5" />
          <span className="sr-only">{t('search.title')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-lg">{t('search.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('search.placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t('search.hint')}
          </p>
        </div>

        <div className="max-h-[300px] overflow-y-auto border-t border-border">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              {t('search.loading')}
            </div>
          ) : query.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {t('search.startTyping')}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {t('search.noResults')}
            </div>
          ) : (
            <div className="py-2">
              {filteredProducts.slice(0, 8).map((product) => (
                <button
                  key={product.node.id}
                  onClick={() => handleSelect(product.node.handle)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
                >
                  {product.node.images.edges[0] && (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.node.title}</p>
                    <p className="text-sm text-muted-foreground">
                      €{parseFloat(product.node.variants.edges[0]?.node.price.amount || '0').toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
