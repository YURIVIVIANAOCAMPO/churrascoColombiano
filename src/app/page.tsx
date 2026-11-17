'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { SemStickyBar } from '@/components/SemStickyBar';
import { Footer } from '@/components/Footer';
import { ApkModal } from '@/components/ApkModal';
import { PhysicalMenusModal } from '@/components/PhysicalMenusModal';
import { AppStoreData, Product, CartItem } from '@/types';
import { initialStoreData } from '@/data/initialStore';
import { Language, translations } from '@/lib/i18n';
import { Utensils, Search, Flame } from 'lucide-react';

export default function HomePage() {
  const [store, setStore] = useState<AppStoreData>(initialStoreData);
  const [lang, setLang] = useState<Language>('pt');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isMenusModalOpen, setIsMenusModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load latest data from /api/data and cart from localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/data', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.config) {
            setStore(data);
          }
        }
      } catch (e) {
        console.error('Failed to load live data, using fallback:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();

    try {
      const savedCart = localStorage.getItem('churrasco_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedLang = localStorage.getItem('churrasco_lang') as Language;
      if (savedLang === 'es' || savedLang === 'pt') setLang(savedLang);
    } catch (e) {}
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('churrasco_cart', JSON.stringify(newCart));
    } catch (e) {}
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('churrasco_lang', newLang);
    } catch (e) {}
  };

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(
      (ci) =>
        ci.product.id === item.product.id &&
        ci.selectedDoneness === item.selectedDoneness &&
        ci.notes === item.notes
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += item.quantity;
      updateCart(updated);
    } else {
      updateCart([...cart, item]);
    }
  };

  const handleUpdateQuantity = (index: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(index);
    } else {
      const updated = [...cart];
      updated[index].quantity = qty;
      updateCart(updated);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const handleClearCart = () => {
    updateCart([]);
  };

  // Filter products by category and search keyword
  const filteredProducts = useMemo(() => {
    return store.products.filter((product) => {
      if (!product.available) return false;

      if (selectedCategoryId !== 'all' && product.categoryId !== selectedCategoryId) {
        return false;
      }

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }

      return true;
    });
  }, [store.products, selectedCategoryId, searchTerm]);

  // Group by category when viewing all
  const groupedCategories = useMemo(() => {
    if (selectedCategoryId !== 'all' || searchTerm.trim()) return [];

    return store.categories
      .filter((cat) => cat.active)
      .map((cat) => ({
        category: cat,
        items: store.products.filter((p) => p.categoryId === cat.id && p.available),
      }))
      .filter((group) => group.items.length > 0);
  }, [store.categories, store.products, selectedCategoryId, searchTerm]);

  const t = translations[lang];
  const cartTotalCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0e1013] text-zinc-100">
      {/* Header */}
      <Header
        config={store.config}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />

      {/* Hero & SEM Banner */}
      <HeroBanner
        config={store.config}
        promos={store.promos}
        lang={lang}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onOpenMenusModal={() => setIsMenusModalOpen(true)}
      />

      {/* Sticky Category Navigation */}
      <CategoryNav
        categories={store.categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => {
          setSelectedCategoryId(id);
          setSearchTerm('');
        }}
        lang={lang}
      />

      {/* Main Content: Digital Menu Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {searchTerm.trim() ? (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-4 h-4 text-zinc-500" />
              <h2 className="text-lg font-bold text-white">
                {lang === 'es' ? 'Resultados para:' : 'Resultados para:'}{' '}
                <span className="font-extrabold text-amber-500">“{searchTerm}”</span>
              </h2>
              <span className="text-xs text-zinc-500">({filteredProducts.length})</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#16181d] rounded-xl border border-[#242832]">
                <Utensils className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <h3 className="text-base font-bold text-zinc-400">
                  {lang === 'es' ? 'No encontramos productos con esa búsqueda' : 'Nenhum produto encontrado'}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {lang === 'es' ? 'Intenta buscar picanha, churrasco, combos o bebidas.' : 'Tente buscar por picanha, churrasco ou bebidas.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs"
                >
                  {lang === 'es' ? 'Limpiar búsqueda' : 'Limpar busca'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    config={store.config}
                    lang={lang}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        ) : selectedCategoryId !== 'all' ? (
          /* Single Category Selected */
          <div>
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#242832]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-amber-600 rounded-full" />
                <h2 className="text-xl font-bold text-white">
                  {store.categories.find((c) => c.id === selectedCategoryId)?.name || t.allCategories}
                </h2>
              </div>
              <span className="text-xs font-semibold text-zinc-400 bg-[#16181d] px-2.5 py-1 rounded-md border border-[#242832]">
                {filteredProducts.length} {lang === 'es' ? 'platos' : 'itens'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  config={store.config}
                  lang={lang}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        ) : (
          /* All Categories Grouped */
          <div className="space-y-12">
            {groupedCategories.map((group) => (
              <section key={group.category.id} id={group.category.id} className="scroll-mt-36">
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#242832]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-amber-600 rounded-full" />
                    <h2 className="text-xl font-bold text-white">
                      {group.category.name}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 bg-[#16181d] px-2.5 py-1 rounded-md border border-[#242832]">
                    {group.items.length} {lang === 'es' ? 'platos' : 'itens'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      config={store.config}
                      lang={lang}
                      onSelect={setSelectedProduct}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        config={store.config}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        config={store.config}
        lang={lang}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* SEM Mobile Floating Bar */}
      <SemStickyBar
        config={store.config}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        lang={lang}
      />

      {/* APK Download Modal */}
      <ApkModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        lang={lang}
      />

      {/* Physical Menus Lightbox Modal */}
      <PhysicalMenusModal
        isOpen={isMenusModalOpen}
        onClose={() => setIsMenusModalOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <Footer config={store.config} lang={lang} />
    </div>
  );
}
