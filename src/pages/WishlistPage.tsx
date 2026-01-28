import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { t } = useLanguage();
  const { items, removeItem, clearWishlist } = useWishlistStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-xl">
                <Heart className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{t('wishlist.title')}</h1>
                <p className="text-muted-foreground">
                  {items.length} {items.length === 1 ? t('wishlist.item') : t('wishlist.items')}
                </p>
              </div>
            </div>
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={clearWishlist}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t('wishlist.clearAll')}
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{t('wishlist.empty')}</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t('wishlist.emptyDescription')}
              </p>
              <Button asChild size="lg" className="rounded-xl">
                <Link to="/collections">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {t('wishlist.startShopping')}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-300"
                >
                  <Link to={`/product/${item.handle}`}>
                    <div className="aspect-square bg-secondary/30 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>

                  <div className="p-4">
                    <Link to={`/product/${item.handle}`}>
                      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-lg">
                        {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                      </p>
                      <Button asChild size="sm" variant="secondary" className="rounded-lg">
                        <Link to={`/product/${item.handle}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
