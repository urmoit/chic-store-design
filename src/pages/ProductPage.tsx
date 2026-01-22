import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Minus, Plus, Loader2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductPage() {
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
              <Skeleton className="aspect-square rounded-lg" />
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
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/" className="text-accent hover:underline">
              Return to shop
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

    toast.success('Added to cart', {
      description: `${product.title} × ${quantity}`,
      position: 'top-center'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                {currentImage ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img: { node: { url: string; altText: string | null } }, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        index === selectedImageIndex ? 'border-accent' : 'border-transparent'
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
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Options */}
              {options.map((option: { name: string; values: string[] }) => (
                <div key={option.name} className="space-y-3">
                  <label className="text-sm font-medium">
                    {option.name}: <span className="text-muted-foreground">{selectedOptions[option.name]}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value: string) => (
                      <button
                        key={value}
                        onClick={() => handleOptionChange(option.name, value)}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                          selectedOptions[option.name] === value
                            ? 'border-accent bg-accent text-accent-foreground'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                className="w-full py-6 text-base font-semibold"
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant?.availableForSale}
              >
                {cartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : !selectedVariant?.availableForSale ? (
                  'Sold Out'
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              {/* Additional info */}
              <div className="pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
