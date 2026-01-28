import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/stores/wishlistStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface WishlistButtonProps {
  product: {
    id: string;
    handle: string;
    title: string;
    imageUrl?: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
  variant?: 'icon' | 'default';
  className?: string;
}

export function WishlistButton({ product, variant = 'icon', className }: WishlistButtonProps) {
  const { t } = useLanguage();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleItem(product);
    
    if (isWishlisted) {
      toast.success(t('wishlist.removed'), {
        position: 'top-center',
      });
    } else {
      toast.success(t('wishlist.added'), {
        description: product.title,
        position: 'top-center',
      });
    }
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        className={cn(
          'rounded-full transition-all duration-200',
          isWishlisted && 'bg-destructive/10 border-destructive/30 hover:bg-destructive/20',
          className
        )}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all duration-200',
            isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleToggle}
      className={cn(
        'rounded-xl transition-all duration-200',
        isWishlisted && 'bg-destructive/10 border-destructive/30 hover:bg-destructive/20',
        className
      )}
    >
      <Heart
        className={cn(
          'h-5 w-5 mr-2 transition-all duration-200',
          isWishlisted ? 'fill-destructive text-destructive' : ''
        )}
      />
      {isWishlisted ? t('wishlist.inWishlist') : t('wishlist.addToWishlist')}
    </Button>
  );
}
