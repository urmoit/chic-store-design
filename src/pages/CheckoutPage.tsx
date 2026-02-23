import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Loader2, Lock, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, isLoading, getCheckoutUrl, syncCart, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const currency = items[0]?.price.currencyCode || 'EUR';
  const [isProcessing, setIsProcessing] = useState(false);

  usePageTitle(t('checkout.title'));

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    // Validate required fields
    if (!form.email || !form.firstName || !form.lastName) {
      toast.error(t('checkout.fillRequired'));
      return;
    }

    setIsProcessing(true);
    try {
      await syncCart();
      const checkoutUrl = getCheckoutUrl();
      if (checkoutUrl) {
        // Append buyer info as URL params so Shopify pre-fills the checkout
        const url = new URL(checkoutUrl);
        if (form.email) url.searchParams.set('checkout[email]', form.email);
        if (form.firstName) url.searchParams.set('checkout[shipping_address][first_name]', form.firstName);
        if (form.lastName) url.searchParams.set('checkout[shipping_address][last_name]', form.lastName);
        if (form.address) url.searchParams.set('checkout[shipping_address][address1]', form.address);
        if (form.city) url.searchParams.set('checkout[shipping_address][city]', form.city);
        if (form.postalCode) url.searchParams.set('checkout[shipping_address][zip]', form.postalCode);
        if (form.country) url.searchParams.set('checkout[shipping_address][country]', form.country);
        if (form.phone) url.searchParams.set('checkout[shipping_address][phone]', form.phone);
        
        window.open(url.toString(), '_blank');
      } else {
        toast.error(t('cart.checkoutError'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(t('cart.checkoutError'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
            <p className="text-xl font-medium mb-2">{t('cart.empty')}</p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/collections">{t('hero.shopNow')}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Back to cart */}
        <div className="mb-8">
          <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            {t('checkout.backToCart')}
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">{t('checkout.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact */}
            <section>
              <h2 className="text-lg font-semibold mb-4">{t('checkout.contact')}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">{t('checkout.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('checkout.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+372 ..."
                    className="mt-1.5"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-semibold mb-4">{t('checkout.shippingAddress')}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t('checkout.firstName')} *</Label>
                    <Input
                      id="firstName"
                      value={form.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('checkout.lastName')} *</Label>
                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">{t('checkout.address')}</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t('checkout.city')}</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">{t('checkout.postalCode')}</Label>
                    <Input
                      id="postalCode"
                      value={form.postalCode}
                      onChange={(e) => updateField('postalCode', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">{t('checkout.country')}</Label>
                  <Input
                    id="country"
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    placeholder="Estonia"
                    className="mt-1.5"
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
              disabled={isProcessing || isLoading}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              {t('checkout.payNow')}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {t('checkout.redirectNote')}
            </p>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">{t('cart.orderSummary')}</h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3">
                    <div className="w-16 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0 relative">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.node.title}</p>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                      )}
                    </div>
                    <p className="text-sm font-medium flex-shrink-0">
                      {currency} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                  <span>{currency} {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('cart.shipping')}</span>
                  <span className="text-muted-foreground">{t('cart.calculatedAtCheckout')}</span>
                </div>
              </div>

              <div className="border-t border-border my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{t('cart.total')}</span>
                <span className="text-xl font-bold">{currency} {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}