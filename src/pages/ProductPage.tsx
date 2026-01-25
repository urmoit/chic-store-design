import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Minus, Plus, Loader2, ShoppingBag, Truck, RotateCcw, Shield, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const SHOPIFY_STORE_DOMAIN = 'aeuy9r-dc.myshopify.com';

// Shop App Icon
const ShopAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

export default function ProductPage() {
  const { t } = useLanguage();
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProduct(handle || '');
  const { addItem, isLoading: cartLoading } = useCartStore();
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Skeleton className="aspect-square rounded-2xl" />
                <div className="flex gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">{t('product.notFound')}</h1>
            <Link to="/" className="text-accent hover:underline">
              {t('product.returnToShop')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const options = product.options || [];

  // Find matching variant based on selected options
  const findMatchingVariant = () => {
    if (options.length === 0) return variants[0]?.node;
    
    return variants.find((v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) => {
      return v.node.selectedOptions.every(
        (opt: { name: string; value: string }) => selectedOptions[opt.name] === opt.value
      );
    })?.node || variants[0]?.node;
  };

  const selectedVariant = findMatchingVariant();
  const currentImage = images[selectedImageIndex]?.node;

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  // Initialize selected options on first render
  if (options.length > 0 && Object.keys(selectedOptions).length === 0) {
    const initialOptions: Record<string, string> = {};
    options.forEach((opt: { name: string; values: string[] }) => {
      initialOptions[opt.name] = opt.values[0];
    });
    setSelectedOptions(initialOptions);
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });

    toast.success(t('cart.addedToCart'), {
      description: `${product.title} × ${quantity}`,
      position: 'top-center'
    });
  };

  const handleBuyWithShopApp = () => {
    // Open Shop app universal link
    const shopAppUrl = `https://shop.app/search?q=${encodeURIComponent(product.title)}&shop=${SHOPIFY_STORE_DOMAIN}`;
    window.open(shopAppUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/collections" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('product.backToShop')}
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden relative group">
                {currentImage ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                {selectedVariant?.availableForSale === false && (
                  <Badge variant="destructive" className="absolute top-4 left-4">
                    Sold Out
                  </Badge>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img: { node: { url: string; altText: string | null } }, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-transparent hover:border-muted-foreground/30'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <div>
                {product.productType && (
                  <Badge variant="secondary" className="mb-3">
                    {product.productType}
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {product.title}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              )}

              {/* Options */}
              <div className="space-y-5">
                {options.map((option: { name: string; values: string[] }) => (
                  <div key={option.name} className="space-y-3">
                    <label className="text-sm font-semibold uppercase tracking-wide">
                      {option.name}: <span className="text-muted-foreground font-normal normal-case">{selectedOptions[option.name]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                            selectedOptions[option.name] === value
                              ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                              : 'border-border bg-secondary/50 hover:border-muted-foreground hover:bg-secondary'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wide">{t('product.quantity')}</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 rounded-lg"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-14 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 rounded-lg"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  size="lg"
                  className="w-full py-6 text-base font-semibold rounded-xl"
                  onClick={handleAddToCart}
                  disabled={cartLoading || !selectedVariant?.availableForSale}
                >
                  {cartLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : !selectedVariant?.availableForSale ? (
                    t('product.soldOut')
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      {t('products.addToCart')}
                    </>
                  )}
                </Button>

                {/* Shop App Button */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full py-6 text-base font-semibold rounded-xl border-2"
                  onClick={handleBuyWithShopApp}
                >
                  <ShopAppIcon className="h-5 w-5 mr-2" />
                  Buy with Shop
                  <ExternalLink className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-secondary rounded-lg">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t('product.freeShipping')}</p>
                      <p className="text-xs text-muted-foreground">On all orders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-secondary rounded-lg">
                      <RotateCcw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t('product.returnPolicy')}</p>
                      <p className="text-xs text-muted-foreground">Easy returns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-secondary rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t('product.secureCheckout')}</p>
                      <p className="text-xs text-muted-foreground">SSL encrypted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
