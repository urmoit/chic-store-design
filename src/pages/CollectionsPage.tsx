import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters, FilterState } from '@/components/ProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopifyProduct } from '@/lib/shopify';

export default function CollectionsPage() {
  const { t } = useLanguage();
  const { data: products, isLoading, error } = useProducts(100);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });

  // Extract unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    const categorySet = new Set<string>();
    products.forEach((product: ShopifyProduct) => {
      // Extract category from product type or tags
      const productType = product.node.productType || 'Other';
      if (productType) categorySet.add(productType);
    });
    return Array.from(categorySet).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((product: ShopifyProduct) => {
        const productType = product.node.productType || 'Other';
        return productType === filters.category;
      });
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      result = result.filter((product: ShopifyProduct) => {
        const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
        switch (filters.priceRange) {
          case '0-25':
            return price >= 0 && price < 25;
          case '25-50':
            return price >= 25 && price < 50;
          case '50-100':
            return price >= 50 && price < 100;
          case '100+':
            return price >= 100;
          default:
            return true;
        }
      });
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-desc':
        result.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'name-asc':
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }

    return result;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {t('collections.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('collections.subtitle')}
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <ProductFilters 
              filters={filters} 
              onFilterChange={setFilters}
              categories={categories}
            />

            {/* Products Grid */}
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
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive">{t('products.loadError')}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {filteredProducts.length} {t('collections.items')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product: ShopifyProduct) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">{t('products.noProducts')}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
