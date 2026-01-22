import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts(50);

  if (error) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">Failed to load products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Our Collection
            </h2>
            <p className="text-muted-foreground">
              Explore our latest drops and timeless essentials
            </p>
          </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add products to your Shopify store to see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
