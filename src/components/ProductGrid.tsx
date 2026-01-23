import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ProductFilters, FilterState } from './ProductFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShopifyProduct } from '@/lib/shopify';

export function ProductGrid() {
  const { t } = useLanguage();
  const { data: products, isLoading, error } = useProducts(50);
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
        </div>

        {/* Filters */}
        <ProductFilters 
          filters={filters} 
          onFilterChange={setFilters}
          categories={categories}
        />

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
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: ShopifyProduct) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
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
