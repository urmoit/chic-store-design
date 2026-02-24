import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters, FilterState } from '@/components/ProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopifyProduct } from '@/lib/shopify';
import { Badge } from '@/components/ui/badge';
import { Grid3X3, LayoutGrid, Shirt, Baby, Snowflake, Palette, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Category display config with icons and order
const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; order: number }> = {
  'T-Shirt': { icon: Shirt, order: 1 },
  'Hoodie': { icon: Snowflake, order: 2 },
  'Sweatshirt': { icon: Shirt, order: 3 },
  'Kids clothes': { icon: Baby, order: 4 },
  'All Over Prints': { icon: Palette, order: 5 },
  'Outerwear': { icon: Snowflake, order: 6 },
  'Trousers': { icon: Footprints, order: 7 },
};

export default function CollectionsPage() {
  const { t } = useLanguage();
  usePageTitle('Collections');
  const { data: products, isLoading, error } = useProducts(250);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    sortBy: 'default',
  });
  const [gridSize, setGridSize] = useState<'normal' | 'large'>('normal');

  // Extract unique categories sorted by config order
  const categories = useMemo(() => {
    if (!products) return [];
    const categorySet = new Set<string>();
    products.forEach((product: ShopifyProduct) => {
      const productType = product.node.productType || 'Other';
      if (productType) categorySet.add(productType);
    });
    return Array.from(categorySet).sort((a, b) => {
      const orderA = CATEGORY_CONFIG[a]?.order ?? 99;
      const orderB = CATEGORY_CONFIG[b]?.order ?? 99;
      return orderA - orderB;
    });
  }, [products]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    if (!products) return {};
    const counts: Record<string, number> = { all: products.length };
    products.forEach((product: ShopifyProduct) => {
      const productType = product.node.productType || 'Other';
      counts[productType] = (counts[productType] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (filters.category !== 'all') {
      result = result.filter((product: ShopifyProduct) => {
        const productType = product.node.productType || 'Other';
        return productType === filters.category;
      });
    }

    if (filters.priceRange !== 'all') {
      result = result.filter((product: ShopifyProduct) => {
        const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
        switch (filters.priceRange) {
          case '0-25': return price >= 0 && price < 25;
          case '25-50': return price >= 25 && price < 50;
          case '50-100': return price >= 50 && price < 100;
          case '100+': return price >= 100;
          default: return true;
        }
      });
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
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

  const getCategoryLabel = (category: string) => {
    const key = `collections.category.${category.toLowerCase().replace(/\s+/g, '')}`;
    const translated = t(key);
    return translated !== key ? translated : category;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-secondary/40 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {t('collections.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('collections.subtitle')}
            </p>
            {!isLoading && products && (
              <p className="text-sm text-muted-foreground mt-3">
                {products.length} {t('collections.totalProducts')}
              </p>
            )}
          </div>
        </section>

        {/* Category Cards */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  filters.category === 'all'
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]'
                    : 'bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
                <span className="text-sm font-medium">{t('collections.allProducts')}</span>
                <Badge variant={filters.category === 'all' ? 'outline' : 'secondary'} className="text-xs">
                  {categoryCounts.all || 0}
                </Badge>
              </button>
              {categories.map((category) => {
                const config = CATEGORY_CONFIG[category];
                const Icon = config?.icon || Shirt;
                return (
                  <button
                    key={category}
                    onClick={() => setFilters(prev => ({ ...prev, category }))}
                    className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      filters.category === category
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]'
                        : 'bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium text-center leading-tight">{getCategoryLabel(category)}</span>
                    <Badge variant={filters.category === category ? 'outline' : 'secondary'} className="text-xs">
                      {categoryCounts[category] || 0}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} {t('collections.items')}
                </p>
                <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                  <Button
                    variant={gridSize === 'normal' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridSize('normal')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridSize === 'large' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridSize('large')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ProductFilters 
                filters={filters} 
                onFilterChange={setFilters}
                categories={categories}
                hideCategory={true}
              />
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className={`grid gap-6 ${
                gridSize === 'large' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {Array.from({ length: 12 }).map((_, i) => (
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
              <div className={`grid gap-6 ${
                gridSize === 'large' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {filteredProducts.map((product: ShopifyProduct) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">{t('products.noProducts')}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({ category: 'all', priceRange: 'all', sortBy: 'default' })}
                >
                  {t('filter.clearFilters')}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
