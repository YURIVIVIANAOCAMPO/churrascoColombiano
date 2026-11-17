'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, Phone, ShieldCheck, Flame, Smartphone, Download, ExternalLink } from 'lucide-react';
import { BusinessConfig } from '@/types';
import { Language, translations } from '@/lib/i18n';

interface HeaderProps {
  config: BusinessConfig;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenApkModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  lang,
  onLanguageChange,
  searchTerm,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenApkModal,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#242832]">
      {/* Top Banner Notice */}
      <div className="bg-[#14161a] border-b border-[#242832] text-zinc-400 text-xs py-1.5 px-3 sm:px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-zinc-300 text-[11px] sm:text-xs truncate max-w-[280px] sm:max-w-none">
            {t.badge} • {config.slogan}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-400">
          <button
            type="button"
            onClick={onOpenApkModal}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-bold text-[11px]"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.downloadApk}</span>
          </button>
          <span className="text-zinc-600">|</span>
          <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.securityShieldActive}</span>
          </span>
          <span className="text-zinc-600">|</span>
          <Link
            href="/admin"
            className="text-zinc-300 hover:text-white font-semibold text-[11px] underline underline-offset-2"
          >
            {t.adminPanel}
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-amber-600/60 shadow-md flex-shrink-0 bg-black">
              <Image
                src={config.logo || '/logo.jpeg'}
                alt={config.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-lg text-white tracking-tight group-hover:text-amber-400 transition-colors leading-tight">
                {config.name}
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    config.isOpen ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                  {config.isOpen ? t.openNow : t.closedNow}
                </span>
                <span className="text-xs text-zinc-600">•</span>
                <span className="text-[11px] sm:text-xs text-amber-500 font-medium hidden xs:inline">
                  {config.city}
                </span>
              </div>
            </div>
          </Link>

          {/* Search Box on Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#16181d] border border-[#2a2e38] focus:border-amber-500 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* APK Button for Mobile & Desktop */}
            <button
              type="button"
              onClick={onOpenApkModal}
              className="flex items-center gap-1 bg-[#1a1d24] hover:bg-[#222630] border border-amber-600/40 text-amber-400 font-bold px-2.5 py-1.5 sm:py-2 rounded-lg text-xs transition-colors shadow-sm"
              title="Baixar App APK Android"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">App APK</span>
            </button>

            {/* Zesto Menu Direct Link */}
            <a
              href="https://pedido.zesto.menu/pt-BR/store/churrasco-colombia/xulufimrsmrkvjmvk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-[#181a20] hover:bg-[#20232a] border border-[#2b303c] text-zinc-300 hover:text-white px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-colors"
              title="Acessar Zesto Menu Online"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              <span>Zesto Menu</span>
            </a>

            {/* Segmented Language Switcher */}
            <div className="flex items-center bg-[#16181d] rounded-lg p-0.5 border border-[#2a2e38]">
              <button
                type="button"
                onClick={() => onLanguageChange('es')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  lang === 'es'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('pt')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  lang === 'pt'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Português"
              >
                PT
              </button>
            </div>

            {/* Direct WhatsApp Call */}
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                lang === 'es' ? 'Hola Churrasco Colombia, quisiera información del menú.' : 'Ola Churrasco Colombia, gostaria de informacoes do cardapio.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">{t.cartTitle}</span>
              {cartCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#16181d] border border-[#2a2e38] focus:border-amber-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
