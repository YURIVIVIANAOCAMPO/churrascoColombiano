'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Settings,
  Utensils,
  FolderTree,
  ShoppingBag,
  Save,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  CheckCircle,
  Globe,
  Flame,
  X,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { AppStoreData, Product, Category, BusinessConfig, SeoConfig, Order } from '@/types';
import { initialStoreData } from '@/data/initialStore';
import { Language, translations } from '@/lib/i18n';
import { sanitizeString, sanitizeNumber } from '@/lib/security';
import { getAssetUrl } from '@/lib/assets';

export default function AdminPage() {
  const [store, setStore] = useState<AppStoreData>(initialStoreData);
  const [lang, setLang] = useState<Language>('pt');
  const [activeTab, setActiveTab] = useState<'config' | 'products' | 'categories' | 'seo' | 'orders'>('config');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    try {
      const localStore = localStorage.getItem('churrasco_store_override');
      if (localStore) {
        const parsed = JSON.parse(localStore);
        if (parsed && parsed.config) {
          setStore(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load local store:', e);
    }

    try {
      const savedLang = localStorage.getItem('churrasco_lang') as Language;
      if (savedLang === 'es' || savedLang === 'pt') setLang(savedLang);
    } catch (e) {}
  }, []);

  const t = translations[lang];

  const handleSaveAll = async (overrideData?: AppStoreData) => {
    setIsSaving(true);
    setSaveMessage(null);

    const payload = overrideData || store;

    try {
      localStorage.setItem('churrasco_store_override', JSON.stringify(payload));
      setStore(payload);
      setSaveMessage(t.changesSaved);
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (e) {
      console.error('Error saving data:', e);
      alert('Error al guardar datos.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfigField = (field: keyof BusinessConfig, value: any) => {
    setStore((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: value,
      },
    }));
  };

  const updateSeoField = (field: keyof SeoConfig, value: string) => {
    setStore((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = store.orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    const updatedStore = { ...store, orders: updatedOrders };
    setStore(updatedStore);
    await handleSaveAll(updatedStore);
  };

  const handleSaveProductModal = () => {
    if (!editingProduct) return;

    if (!editingProduct.name.trim()) {
      alert('El nombre del producto es obligatorio.');
      return;
    }

    const cleanProduct: Product = {
      ...editingProduct,
      name: sanitizeString(editingProduct.name, 100),
      description: sanitizeString(editingProduct.description, 400),
      price: sanitizeNumber(editingProduct.price, 0, 100000000, 0),
      badge: sanitizeString(editingProduct.badge || '', 40),
      image: sanitizeString(editingProduct.image || '', 300),
    };

    let updatedProducts: Product[];
    if (isNewProduct) {
      cleanProduct.id = `prod-${Date.now().toString().slice(-6)}`;
      updatedProducts = [...store.products, cleanProduct];
    } else {
      updatedProducts = store.products.map((p) =>
        p.id === cleanProduct.id ? cleanProduct : p
      );
    }

    const updatedStore = { ...store, products: updatedProducts };
    setStore(updatedStore);
    setEditingProduct(null);
    setIsNewProduct(false);
    handleSaveAll(updatedStore);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm(t.deleteProduct)) {
      const updatedProducts = store.products.filter((p) => p.id !== productId);
      const updatedStore = { ...store, products: updatedProducts };
      setStore(updatedStore);
      handleSaveAll(updatedStore);
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCat: Category = {
      id: sanitizeString(newCategoryName.toLowerCase().replace(/\s+/g, '-'), 50),
      name: sanitizeString(newCategoryName, 60),
      order: store.categories.length + 1,
      active: true,
    };
    const updatedStore = {
      ...store,
      categories: [...store.categories, newCat],
    };
    setStore(updatedStore);
    setNewCategoryName('');
    handleSaveAll(updatedStore);
  };

  const handleToggleCategory = (catId: string) => {
    const updatedCategories = store.categories.map((c) =>
      c.id === catId ? { ...c, active: !c.active } : c
    );
    const updatedStore = { ...store, categories: updatedCategories };
    setStore(updatedStore);
    handleSaveAll(updatedStore);
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm(t.deleteCategory)) {
      const updatedCategories = store.categories.filter((c) => c.id !== catId);
      const updatedStore = { ...store, categories: updatedCategories };
      setStore(updatedStore);
      handleSaveAll(updatedStore);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1013] text-zinc-100 flex flex-col">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-[#16181d] border-b border-[#242832] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 bg-[#1d2027] hover:bg-[#252932] text-zinc-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Volver a la Web' : 'Voltar ao Site'}</span>
          </Link>
          <div className="h-5 w-px bg-[#242832] hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#363c4a] bg-black">
              <Image src={getAssetUrl(store.config.logo || '/logo.jpeg')} alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">{store.config.name}</h1>
              <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider block">
                {t.adminTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Lang */}
        <div className="flex items-center gap-3">
          {/* Segmented Language Switcher */}
          <div className="flex items-center bg-[#101216] rounded-lg p-0.5 border border-[#242832]">
            <button
              type="button"
              onClick={() => setLang('es')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                lang === 'es' ? 'bg-[#242832] text-white shadow-sm' : 'text-zinc-500'
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                lang === 'pt' ? 'bg-[#242832] text-white shadow-sm' : 'text-zinc-500'
              }`}
            >
              PT
            </button>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Guardando...' : t.saveChanges}</span>
          </button>
        </div>
      </header>

      {/* Save Notification */}
      {saveMessage && (
        <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center animate-fadeIn flex items-center justify-center gap-2">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#242832] mb-8 no-scrollbar">
          {[
            { id: 'config', label: t.tabGeneral, icon: Settings },
            { id: 'products', label: t.tabMenu, icon: Utensils, count: store.products.length },
            { id: 'categories', label: t.tabCategories, icon: FolderTree, count: store.categories.length },
            { id: 'seo', label: t.tabSeo, icon: Globe },
            { id: 'orders', label: t.tabOrders, icon: ShoppingBag, count: store.orders?.length || 0 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-[#16181d] hover:bg-[#1f2229] text-zinc-300 border border-[#242832]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                      isActive ? 'bg-amber-700 text-white' : 'bg-[#242832] text-zinc-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: General Business Config */}
        {activeTab === 'config' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <div className="bg-[#16181d] p-6 rounded-xl border border-[#242832] shadow-sm space-y-4">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-500" />
                <span>{lang === 'es' ? 'Datos del Restaurante' : 'Dados do Restaurante'}</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Nombre Comercial</label>
                  <input
                    type="text"
                    value={store.config.name}
                    onChange={(e) => updateConfigField('name', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Eslogan</label>
                  <input
                    type="text"
                    value={store.config.slogan}
                    onChange={(e) => updateConfigField('slogan', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Teléfono Público</label>
                    <input
                      type="text"
                      value={store.config.phone}
                      onChange={(e) => updateConfigField('phone', e.target.value)}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">WhatsApp para Pedidos (Sólo dígitos)</label>
                    <input
                      type="text"
                      value={store.config.whatsapp}
                      onChange={(e) => updateConfigField('whatsapp', e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-amber-400 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Dirección</label>
                  <input
                    type="text"
                    value={store.config.address}
                    onChange={(e) => updateConfigField('address', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Ciudad / País</label>
                  <input
                    type="text"
                    value={store.config.city}
                    onChange={(e) => updateConfigField('city', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Horario de Atención</label>
                  <input
                    type="text"
                    value={store.config.openingHours}
                    onChange={(e) => updateConfigField('openingHours', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                {/* State Open / Closed */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-[#101216] rounded-lg border border-[#242832]">
                    <input
                      type="checkbox"
                      checked={store.config.isOpen}
                      onChange={(e) => updateConfigField('isOpen', e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-0"
                    />
                    <div>
                      <span className="font-bold text-white block">
                        {store.config.isOpen ? 'Restaurante ABIERTO para pedidos' : 'Restaurante CERRADO temporalmente'}
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        Controla el badge visual de disponibilidad en la web
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Config */}
            <div className="bg-[#16181d] p-6 rounded-xl border border-[#242832] shadow-sm space-y-4">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-500" />
                <span>{lang === 'es' ? 'Tarifas y Formas de Pago' : 'Taxas e Formas de Pagamento'}</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Moneda (Código)</label>
                    <input
                      type="text"
                      value={store.config.currency}
                      onChange={(e) => updateConfigField('currency', e.target.value.toUpperCase())}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Símbolo Monetario</label>
                    <input
                      type="text"
                      value={store.config.currencySymbol}
                      onChange={(e) => updateConfigField('currencySymbol', e.target.value)}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-amber-400 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Tarifa de Domicilio</label>
                    <input
                      type="number"
                      step="0.5"
                      value={store.config.deliveryFee}
                      onChange={(e) => updateConfigField('deliveryFee', Number(e.target.value))}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Pedido Mínimo</label>
                    <input
                      type="number"
                      value={store.config.minOrder}
                      onChange={(e) => updateConfigField('minOrder', Number(e.target.value))}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Tiempo Estimado de Entrega</label>
                  <input
                    type="text"
                    value={store.config.estimatedDeliveryTime}
                    onChange={(e) => updateConfigField('estimatedDeliveryTime', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Métodos de Pago Aceptados</label>
                  <div className="space-y-1.5">
                    {store.config.paymentMethods.map((pm, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={pm}
                          onChange={(e) => {
                            const updated = [...store.config.paymentMethods];
                            updated[idx] = e.target.value;
                            updateConfigField('paymentMethods', updated);
                          }}
                          className="flex-1 bg-[#101216] border border-[#2a2e38] rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = store.config.paymentMethods.filter((_, i) => i !== idx);
                            updateConfigField('paymentMethods', updated);
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        updateConfigField('paymentMethods', [...store.config.paymentMethods, 'Novo Metodo']);
                      }}
                      className="text-xs text-amber-500 hover:underline font-semibold flex items-center gap-1 mt-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Agregar método de pago' : 'Adicionar forma de pagamento'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Products Manager */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'es' ? 'Gestión de Productos del Menú' : 'Gerenciamento de Produtos'}
                </h2>
                <p className="text-xs text-zinc-400">
                  {store.products.length} {lang === 'es' ? 'platos registrados' : 'pratos cadastrados'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProduct({
                    id: '',
                    name: '',
                    categoryId: store.categories[0]?.id || 'cortes-premium',
                    description: '',
                    price: 35.0,
                    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
                    badge: '',
                    available: true,
                  });
                  setIsNewProduct(true);
                }}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.newProduct}</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.products.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#16181d] p-4 rounded-xl border border-[#242832] flex gap-3 items-start justify-between hover:border-[#383d4c] transition-colors shadow-sm"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#121418] flex-shrink-0">
                    {p.image ? (
                      <Image src={getAssetUrl(p.image)} alt={p.name} fill className="object-cover" />
                    ) : (
                      <Flame className="w-5 h-5 m-auto text-amber-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">{p.name}</h4>
                      {p.badge && (
                        <span className="bg-[#242832] text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#2e3340]">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{p.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-black text-amber-400">
                        {store.config.currencySymbol} {p.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-zinc-600">•</span>
                      <span className="text-[10px] text-zinc-400">
                        {store.categories.find((c) => c.id === p.categoryId)?.name || p.categoryId}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto ${
                          p.available ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/60' : 'bg-red-950/60 text-red-400 border border-red-900/60'
                        }`}
                      >
                        {p.available ? 'Disponível' : 'Esgotado'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 ml-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct({ ...p });
                        setIsNewProduct(false);
                      }}
                      className="p-1.5 bg-[#1f2229] hover:bg-[#282c35] text-zinc-300 rounded-md transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-1.5 bg-[#1f2229] hover:bg-red-950/60 text-zinc-500 hover:text-red-400 rounded-md transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Categories Manager */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl">
            <h2 className="text-lg font-bold text-white">
              {lang === 'es' ? 'Gestión de Categorías' : 'Gerenciamento de Categorias'}
            </h2>

            {/* Add Category Form */}
            <div className="bg-[#16181d] p-4 rounded-xl border border-[#242832] shadow-sm flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={lang === 'es' ? 'Nombre de nueva categoría' : 'Nome da categoria'}
                className="flex-1 bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Agregar' : 'Adicionar'}</span>
              </button>
            </div>

            {/* Categories List */}
            <div className="space-y-2">
              {store.categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#16181d] p-3.5 rounded-xl border border-[#242832] shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-500">#{cat.order}</span>
                    <span className="font-bold text-xs sm:text-sm text-white">{cat.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        cat.active ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/60' : 'bg-[#20232a] text-zinc-500'
                      }`}
                    >
                      {cat.active ? 'Ativa' : 'Oculta'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleCategory(cat.id)}
                      className="text-xs bg-[#20232a] px-2.5 py-1 rounded text-zinc-300 hover:text-white"
                    >
                      {cat.active ? 'Ocultar' : 'Ativar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SEO & SEM Configuration */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            {/* SEO Form */}
            <div className="bg-[#16181d] p-6 rounded-xl border border-[#242832] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-500">
                <Globe className="w-4 h-4" />
                <h2 className="font-bold text-base text-white">
                  {lang === 'es' ? 'Optimización SEO Orgánico' : 'Otimização SEO Orgânico'}
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-zinc-400 font-semibold">Meta Título (Title Tag)</label>
                    <span className="text-zinc-500 text-[10px]">{store.seo.metaTitle.length}/60 car.</span>
                  </div>
                  <input
                    type="text"
                    value={store.seo.metaTitle}
                    onChange={(e) => updateSeoField('metaTitle', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-zinc-400 font-semibold">Meta Descripción (SERP Snippet)</label>
                    <span className="text-zinc-500 text-[10px]">{store.seo.metaDescription.length}/160 car.</span>
                  </div>
                  <textarea
                    rows={3}
                    value={store.seo.metaDescription}
                    onChange={(e) => updateSeoField('metaDescription', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Palabras Clave (Keywords separadas por coma)</label>
                  <input
                    type="text"
                    value={store.seo.keywords}
                    onChange={(e) => updateSeoField('keywords', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">URL Canónica (Dominio Oficial)</label>
                  <input
                    type="text"
                    value={store.seo.canonicalUrl}
                    onChange={(e) => updateSeoField('canonicalUrl', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Google SERP Simulator */}
              <div className="mt-4 p-4 bg-[#101216] rounded-lg border border-[#242832]">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1.5">
                  Visualização no Google
                </span>
                <div className="space-y-1">
                  <span className="text-xs text-emerald-400 block truncate">
                    {store.seo.canonicalUrl} › churrasco-colombia
                  </span>
                  <h3 className="text-sm font-bold text-blue-400 hover:underline line-clamp-1 cursor-pointer">
                    {store.seo.metaTitle || 'Churrasco Colômbia'}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {store.seo.metaDescription || 'Cardápio digital e pedidos via WhatsApp...'}
                  </p>
                </div>
              </div>
            </div>

            {/* SEM & Paid Tracking Suite */}
            <div className="bg-[#16181d] p-6 rounded-xl border border-[#242832] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-500">
                <TrendingUp className="w-4 h-4" />
                <h2 className="font-bold text-base text-white">
                  {lang === 'es' ? 'Suite SEM, Anuncios & Conversiones' : 'Suite SEM, Anúncios & Conversões'}
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Google Analytics 4 ID (GA4)</label>
                  <input
                    type="text"
                    placeholder="G-XXXXXXXXXX"
                    value={store.seo.googleAnalyticsId}
                    onChange={(e) => updateSeoField('googleAnalyticsId', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Google Ads Conversion ID</label>
                  <input
                    type="text"
                    placeholder="AW-XXXXXXXXX"
                    value={store.seo.googleAdsId}
                    onChange={(e) => updateSeoField('googleAdsId', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Meta / Facebook Pixel ID</label>
                  <input
                    type="text"
                    placeholder="123456789012345"
                    value={store.seo.facebookPixelId}
                    onChange={(e) => updateSeoField('facebookPixelId', e.target.value)}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="p-3 bg-[#101216] rounded-lg border border-[#242832] text-zinc-400 space-y-1">
                  <span className="font-bold text-white block text-xs">Evento de Conversão:</span>
                  <code className="text-amber-400 text-[11px] block">{store.seo.conversionEventName}</code>
                  <p className="text-[11px] text-zinc-500">
                    Disparado automaticamente quando o cliente envia o pedido para o WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Orders Manager */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {lang === 'es' ? 'Historial de Pedidos Recibidos' : 'Histórico de Pedidos'}
                </h2>
                <p className="text-xs text-zinc-400">
                  {store.orders?.length || 0} {lang === 'es' ? 'pedidos registrados' : 'pedidos registrados'}
                </p>
              </div>
            </div>

            {(!store.orders || store.orders.length === 0) ? (
              <div className="text-center py-16 bg-[#16181d] rounded-xl border border-[#242832] shadow-sm">
                <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-zinc-400">
                  {lang === 'es' ? 'Aún no hay pedidos registrados' : 'Nenhum pedido recebido ainda'}
                </h3>
              </div>
            ) : (
              <div className="space-y-3">
                {store.orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-[#16181d] p-4 sm:p-5 rounded-xl border border-[#242832] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">#{ord.id}</span>
                        <span className="text-xs text-zinc-500">
                          {new Date(ord.createdAt).toLocaleString()}
                        </span>
                        <span className="text-[10px] font-semibold text-amber-400 bg-[#1f2229] border border-[#2a2e38] px-2 py-0.5 rounded uppercase">
                          {ord.deliveryType}
                        </span>
                      </div>

                      <div className="text-xs text-zinc-300">
                        <span className="font-bold text-white">{ord.customerName}</span> •{' '}
                        <a
                          href={`https://wa.me/${ord.customerPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 font-semibold hover:underline"
                        >
                          {ord.customerPhone}
                        </a>
                        {ord.deliveryAddress && <span> • {ord.deliveryAddress}</span>}
                      </div>

                      <div className="text-xs text-zinc-400 pt-0.5">
                        {ord.items.map((it, i) => (
                          <span key={i} className="inline-block mr-2">
                            {it.quantity}x {it.name}
                            {it.notes ? ` (${it.notes})` : ''}
                            {i < ord.items.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-[#242832]">
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 block uppercase font-medium">Total</span>
                        <span className="text-sm font-black text-amber-400">
                          {store.config.currencySymbol} {ord.total.toFixed(2)}
                        </span>
                      </div>

                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                        className="text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-[#2a2e38] bg-[#121418] text-white focus:outline-none"
                      >
                        <option value="pendiente">{t.statusPending}</option>
                        <option value="preparando">{t.statusPreparing}</option>
                        <option value="en_camino">{t.statusOnWay}</option>
                        <option value="entregado">{t.statusDelivered}</option>
                        <option value="cancelado">{t.statusCanceled}</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit / New Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#16181d] border border-[#2a2e38] rounded-xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl text-white">
            <div className="flex items-center justify-between pb-2 border-b border-[#242832]">
              <h3 className="font-bold text-base text-white">
                {isNewProduct ? t.newProduct : t.editProduct}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Nombre del Plato / Producto</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Categoría</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  >
                    {store.categories.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#101216] text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Precio ({store.config.currencySymbol})</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-amber-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Descripción</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Badge Promocional (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: Mais Pedido, Especial"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Calorías / Peso (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: 400g, 820 kcal"
                    value={editingProduct.calories || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, calories: e.target.value })}
                    className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">URL de la Foto</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.available}
                    onChange={(e) => setEditingProduct({ ...editingProduct, available: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600"
                  />
                  <span className="font-bold text-white">Disponible en Stock</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#242832]">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-3.5 py-2 rounded-lg text-xs text-zinc-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveProductModal}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs"
              >
                Guardar Producto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
