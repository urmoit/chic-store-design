import { Link } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem, isLoading } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;

  const isWishlisted = isInWishlist(node.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });

    toast.success(t('cart.addedToCart'), {
      description: node.title,
      position: 'top-center'
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleItem({
      id: node.id,
      handle: node.handle,
      title: node.title,
      imageUrl: image?.url,
      price: price
    });

    toast.success(isWishlisted ? t('wishlist.removed') : t('wishlist.added'), {
      description: isWishlisted ? undefined : node.title,
      position: 'top-center'
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] bg-secondary rounded-xl overflow-hidden mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        
        {/* Wishlist button - always visible */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
            isWishlisted 
              ? "bg-destructive/20 backdrop-blur-sm" 
              : "bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted ? "fill-destructive text-destructive" : "text-foreground"
            )} 
          />
        </button>
        
        {/* Quick add button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            className="w-full rounded-xl" 
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                {t('products.addToCart')}
              </>
            )}
          </Button>
        </div>

        {/* Sold out badge */}
        {firstVariant && !firstVariant.availableForSale && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
            {t('product.soldOut')}
          </div>
        )}
      </div>

      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors mb-1 truncate">
        {node.title}
      </h3>
      
      <p className="text-muted-foreground font-medium">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
    </Link>
  );
}
