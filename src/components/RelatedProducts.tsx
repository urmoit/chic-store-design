import { useProducts, ShopifyProduct } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedProductsProps {
  currentProductHandle: string;
  productType?: string;
}

export function RelatedProducts({ currentProductHandle, productType }: RelatedProductsProps) {
  const { t } = useLanguage();
  
  // Fetch products, optionally filtered by product type
  const query = productType ? `product_type:${productType}` : undefined;
  const { data: products, isLoading } = useProducts(12, query);

  // Filter out the current product and limit to 4 items
  const relatedProducts = products
    ?.filter((p: ShopifyProduct) => p.node.handle !== currentProductHandle)
    .slice(0, 4) || [];

  // Don't render if no related products
  if (!isLoading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{t('product.relatedProducts')}</h2>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product: ShopifyProduct) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
