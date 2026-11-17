'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, MessageCircle, Utensils, Clock, ShieldCheck, Award, Smartphone, ExternalLink } from 'lucide-react';
import { BusinessConfig, PromoBanner } from '@/types';
import { Language, translations } from '@/lib/i18n';
import { getAssetUrl } from '@/lib/assets';

interface HeroBannerProps {
  config: BusinessConfig;
  promos: PromoBanner[];
  lang: Language;
  onOpenApkModal: () => void;
  onOpenMenusModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  config,
  promos,
  lang,
  onOpenApkModal,
  onOpenMenusModal,
}) => {
  const t = translations[lang];

  return (
    <div className="bg-[#0c0d0e] border-b border-[#242832] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#16181d] border border-[#2a2e38] text-amber-500 px-3 py-1 rounded-md text-xs font-semibold tracking-wide">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'es' ? 'Tradición Parrillera al Carbón' : 'Tradição em Churrasco na Brasa'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {lang === 'es' ? (
                <>
                  El Verdadero <span className="text-amber-500">Churrasco</span> a la Brasa
                </>
              ) : (
                <>
                  O Verdadeiro <span className="text-amber-500">Churrasco</span> na Brasa
                </>
              )}
            </h1>

            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {lang === 'es'
                ? 'Picanha a R$ 75, Churrasco Misto a R$ 70, Contra Filé a R$ 65, Pollo Asado los fines de semana, quentinhas del día a día y bebidas heladas.'
                : 'Picanha por R$ 75, Churrasco Misto R$ 70, Contra Filé R$ 65, Frango Assado fim de semana, quentinhas do dia a dia e bebidas trincando de geladas.'}
            </p>

            {/* CTAs including APK button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1">
              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  lang === 'es'
                    ? 'Hola Churrasco Colombia, quiero hacer un pedido a domicilio.'
                    : 'Ola Churrasco Colombia, gostaria de fazer um pedido de entrega.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.orderWhatsApp}</span>
              </a>

              <button
                type="button"
                onClick={onOpenApkModal}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-all shadow-sm active:scale-95"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t.downloadApk}</span>
              </button>

              <a
                href="#menu"
                className="flex items-center gap-2 bg-[#16181d] hover:bg-[#1f2229] border border-[#2a2e38] text-zinc-300 font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-colors"
              >
                <Utensils className="w-4 h-4 text-amber-500" />
                <span>{t.viewMenu}</span>
              </a>

              <a
                href="https://pedido.zesto.menu/pt-BR/store/churrasco-colombia/xulufimrsmrkvjmvk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#16181d] hover:bg-[#1f2229] border border-[#2a2e38] text-zinc-300 font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-amber-500" />
                <span>Zesto Menu</span>
              </a>
            </div>

            {/* Original leaflets quick link */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-xs text-zinc-400 pt-1">
              <button
                type="button"
                onClick={onOpenMenusModal}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-[#181b22] border border-[#2a2f3a] px-2.5 py-1 rounded-md transition-colors"
              >
                <span>{lang === 'es' ? 'Ver Cartas Físicas (3)' : 'Ver Folhetos Oficiais (3)'}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <a
                href={getAssetUrl('/menu1.jpeg')}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 underline underline-offset-2 flex items-center gap-1 font-medium text-zinc-400 text-[11px]"
              >
                <span>Menu 1</span>
              </a>
              <span className="text-zinc-600">•</span>
              <a
                href={getAssetUrl('/menu2.jpeg')}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 underline underline-offset-2 flex items-center gap-1 font-medium text-zinc-400 text-[11px]"
              >
                <span>Menu 2</span>
              </a>
              <span className="text-zinc-600">•</span>
              <a
                href={getAssetUrl('/menu3.jpeg')}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 underline underline-offset-2 flex items-center gap-1 font-medium text-zinc-400 text-[11px]"
              >
                <span>Menu 3</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-[#242832] max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-[10px] sm:text-[11px] text-zinc-500 font-medium">{t.deliveryFee}</span>
                <span className="text-xs sm:text-sm font-bold text-amber-500">
                  {config.deliveryFee > 0 ? `${config.currencySymbol} ${config.deliveryFee.toFixed(2)}` : t.freeDelivery}
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-[10px] sm:text-[11px] text-zinc-500 font-medium">{t.minOrder}</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {config.currencySymbol} {config.minOrder.toFixed(2)}
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-[10px] sm:text-[11px] text-zinc-500 font-medium">{t.estimatedTime}</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center justify-center lg:justify-start gap-1">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400" />
                  {config.estimatedDeliveryTime}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dark Logo Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-[#2a2e38] bg-[#16181d] p-3 flex flex-col items-center justify-center shadow-lg">
              <div className="relative w-full h-full">
                <Image
                  src={getAssetUrl(config.logo || '/logo.jpeg')}
                  alt={config.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-bold text-white block">
                {config.name}
              </span>
              <span className="text-[11px] text-zinc-500">
                {config.address}, {config.city}
              </span>
            </div>
          </div>
        </div>

        {/* Minimalist Trust Badges */}
        <div className="mt-8 pt-6 border-t border-[#242832] grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs text-zinc-300">
          <div className="flex items-center gap-2 bg-[#16181d] p-2.5 sm:p-3 rounded-lg border border-[#242832]">
            <Flame className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">{t.trustBadge1}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#16181d] p-2.5 sm:p-3 rounded-lg border border-[#242832]">
            <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">{t.trustBadge2}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#16181d] p-2.5 sm:p-3 rounded-lg border border-[#242832]">
            <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">{t.trustBadge3}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#16181d] p-2.5 sm:p-3 rounded-lg border border-[#242832]">
            <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">{t.trustBadge4}</span>
          </div>
        </div>

        {/* Highlighted Promo Banners */}
        {promos && promos.length > 0 && (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {promos.map((p) => (
              <a
                key={p.id}
                href={p.link || '#menu'}
                className="relative overflow-hidden rounded-xl border border-[#242832] hover:border-[#383d4c] transition-colors group bg-[#16181d] flex flex-col sm:flex-row h-auto sm:h-36 shadow-sm"
              >
                <div className="relative w-full sm:w-44 h-32 sm:h-full bg-[#121418] flex-shrink-0">
                  <Image
                    src={getAssetUrl(p.image)}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3.5 sm:p-4 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-1">
                    {p.badge}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-white group-hover:text-amber-500 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-2 mt-1">
                    {p.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
