import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShopifyProduct } from '@/lib/shopify';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ProductGrid() {
  const { t } = useLanguage();
  // Only fetch 8 products for the homepage (most popular)
  const { data: products, isLoading, error } = useProducts(8);

  if (error) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">{t('products.loadError')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {t('products.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('products.subtitle')}
            </p>
          </div>
          <Link to="/collections">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: ShopifyProduct) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10 md:hidden">
              <Link to="/collections">
                <Button variant="outline" className="items-center gap-2">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t('products.noProducts')}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('products.addProducts')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
