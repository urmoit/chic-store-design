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
import { SizeGuide } from '@/components/SizeGuide';
import { RelatedProducts } from '@/components/RelatedProducts';
import { WishlistButton } from '@/components/WishlistButton';
import { ArrowLeft, Minus, Plus, Loader2, ShoppingBag, Truck, RotateCcw, Shield, ExternalLink, Check } from 'lucide-react';
import { toast } from 'sonner';

const SHOP_APP_STORE_URL = 'https://shop.app/m/04a7c9zdw5?dynamicFilterVAvailability=%7B"available"%3Atrue%7D&sortBy=MOST_SALES';

// Shop App Icon
const ShopAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// Parse and format product description into sections
const formatProductDescription = (text: string) => {
  if (!text) return null;
  
  const sections: { title: string; content: string; bullets?: string[] }[] = [];
  
  const formatBulletPoints = (section: string) => {
    if (section.includes(' - ')) {
      const parts = section.split(' - ').filter(p => p.trim());
      if (parts.length > 2) {
        return parts;
      }
    }
    return null;
  };
  
  const featuresMatch = text.match(/Product features\s*[-–:]?\s*(.*?)(?=Care instructions|Product information|Warnings|Hazard|$)/is);
  const careMatch = text.match(/Care instructions\s*[-–:]?\s*(.*?)(?=Product information|Warnings|Hazard|Non-chlorine|$)/is);
  const infoMatch = text.match(/Product information\s*[-–:]?\s*(.*?)(?=Warnings|Hazard|$)/is);
  const mainDescMatch = text.match(/^(.*?)(?=Product features|Care instructions|Product information|$)/is);
  
  if (mainDescMatch && mainDescMatch[1].trim()) {
    sections.push({
      title: 'About This Product',
      content: mainDescMatch[1].trim()
    });
  }
  
  if (featuresMatch && featuresMatch[1].trim()) {
    const featuresText = featuresMatch[1].trim();
    const bullets = formatBulletPoints(featuresText);
    sections.push({
      title: 'Features',
      content: bullets ? '' : featuresText,
      bullets: bullets || undefined
    });
  }
  
  if (careMatch && careMatch[1].trim()) {
    const careText = careMatch[1].trim();
    const bullets = formatBulletPoints(careText);
    sections.push({
      title: 'Care Instructions',
      content: bullets ? '' : careText,
      bullets: bullets || undefined
    });
  }
  
  if (infoMatch && infoMatch[1].trim()) {
    sections.push({
      title: 'Product Information',
      content: infoMatch[1].trim()
    });
  }
  
  if (sections.length === 0) {
    sections.push({
      title: 'About This Product',
      content: text
    });
  }
  
  return sections;
};

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
    window.open(SHOP_APP_STORE_URL, '_blank');
  };

  const wishlistProduct = {
    id: product.id,
    handle: product.handle,
    title: product.title,
    imageUrl: images[0]?.node?.url,
    price: selectedVariant?.price || product.priceRange?.minVariantPrice
  };

  const descriptionSections = formatProductDescription(product.description || '');

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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Image gallery - Takes 7 columns */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-square bg-secondary/30 rounded-3xl overflow-hidden relative group">
                {currentImage ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                {selectedVariant?.availableForSale === false && (
                  <Badge variant="destructive" className="absolute top-6 left-6 px-4 py-1.5 text-sm">
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
                      className={`w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
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

            {/* Product info - Takes 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              {/* Header section */}
              <div className="space-y-4">
                {product.productType && (
                  <Badge variant="secondary" className="text-xs uppercase tracking-wider">
                    {product.productType}
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* Price section - Prominent placement */}
              <div className="flex items-baseline gap-4 py-4 border-y border-border">
                <span className="text-4xl font-bold text-foreground">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </span>
                {selectedVariant?.availableForSale && (
                  <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                    In Stock
                  </Badge>
                )}
              </div>
              {/* Short description */}
              {descriptionSections && descriptionSections[0] && (
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {descriptionSections[0].content.slice(0, 150)}
                  {descriptionSections[0].content.length > 150 ? '...' : ''}
                </p>
              )}

              {/* Options */}
              <div className="space-y-6">
                {options.map((option: { name: string; values: string[] }) => (
                  <div key={option.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold uppercase tracking-wide">
                        {option.name}
                        <span className="ml-2 text-muted-foreground font-normal normal-case">
                          — {selectedOptions[option.name]}
                        </span>
                      </label>
                      {option.name.toLowerCase() === 'size' && <SizeGuide />}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
                            selectedOptions[option.name] === value
                              ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
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
                <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1 w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 py-7 text-base font-semibold rounded-xl"
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
                  <WishlistButton product={wishlistProduct} />
                </div>

                {/* Shop App Button */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full py-7 text-base font-semibold rounded-xl border-2"
                  onClick={handleBuyWithShopApp}
                >
                  <ShopAppIcon className="h-5 w-5 mr-2" />
                  Buy with Shop
                  <ExternalLink className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </div>

              {/* Trust Badges - Compact */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium">{t('product.freeShipping')}</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium">{t('product.returnPolicy')}</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium">{t('product.secureCheckout')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description Section - Full width below */}
          {descriptionSections && descriptionSections.length > 0 && (
            <section className="mt-20 pt-16 border-t border-border">
              <div className="max-w-4xl">
                <h2 className="text-3xl font-bold mb-12">Product Details</h2>
                <div className="space-y-12">
                  {descriptionSections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Check className="h-4 w-4 text-accent" />
                        </div>
                        {section.title}
                      </h3>
                      {section.content && (
                        <p className="text-muted-foreground leading-relaxed text-lg pl-11">
                          {section.content}
                        </p>
                      )}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="pl-11 space-y-3">
                          {section.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span className="text-base leading-relaxed">{bullet.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related Products */}
          <RelatedProducts 
            currentProductHandle={handle || ''} 
            productType={product.productType} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
