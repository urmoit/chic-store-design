import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function CartPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, isLoading, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const currency = items[0]?.price.currencyCode || 'EUR';

  usePageTitle(t('cart.title'));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            {t('cart.continueShopping')}
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t('cart.title')}</h1>
        <p className="text-muted-foreground mb-10">
          {totalItems === 0 ? t('cart.empty') : `${totalItems} ${totalItems === 1 ? t('wishlist.item') : t('wishlist.items')}`}
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
            <p className="text-xl font-medium mb-2">{t('cart.empty')}</p>
            <p className="text-muted-foreground mb-8">{t('cart.continueShopping')}</p>
            <Button asChild size="lg">
              <Link to="/collections">{t('hero.shopNow')}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-1">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                <div className="col-span-6">{t('cart.product')}</div>
                <div className="col-span-2 text-center">{t('cart.price')}</div>
                <div className="col-span-2 text-center">{t('product.quantity')}</div>
                <div className="col-span-2 text-right">{t('cart.total')}</div>
              </div>

              {items.map((item) => (
                <div key={item.variantId} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-border items-center">
                  {/* Product info */}
                  <div className="md:col-span-6 flex gap-4">
                    <Link to={`/product/${item.product.node.handle}`} className="w-20 h-24 md:w-24 md:h-28 bg-secondary rounded-lg overflow-hidden flex-shrink-0 group">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </Link>
                    <div className="flex flex-col justify-center min-w-0">
                      <Link to={`/product/${item.product.node.handle}`} className="font-medium hover:text-accent transition-colors truncate">
                        {item.product.node.title}
                      </Link>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="text-sm text-muted-foreground mt-1">{item.variantTitle}</p>
                      )}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        disabled={isLoading}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors mt-2 inline-flex items-center gap-1 w-fit"
                      >
                        <Trash2 className="h-3 w-3" />
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">{t('cart.price')}:</span>
                    <span className="font-medium">{currency} {parseFloat(item.price.amount).toFixed(2)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center justify-center">
                    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        disabled={isLoading}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="md:col-span-2 text-right">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">{t('cart.total')}:</span>
                    <span className="font-semibold">{currency} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-6">{t('cart.orderSummary')}</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                    <span className="font-medium">{currency} {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.shipping')}</span>
                    <span className="text-muted-foreground">{t('cart.calculatedAtCheckout')}</span>
                  </div>
                </div>

                <div className="border-t border-border my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">{t('cart.total')}</span>
                  <span className="text-xl font-bold">{currency} {totalPrice.toFixed(2)}</span>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {t('cart.proceedToCheckout')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {t('product.secureCheckout')}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}