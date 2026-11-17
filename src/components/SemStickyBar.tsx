'use client';

import React from 'react';
import { MessageCircle, ShoppingBag, Smartphone } from 'lucide-react';
import { BusinessConfig } from '@/types';
import { Language, translations } from '@/lib/i18n';

interface SemStickyBarProps {
  config: BusinessConfig;
  cartCount: number;
  onOpenCart: () => void;
  onOpenApkModal: () => void;
  lang: Language;
}

export const SemStickyBar: React.FC<SemStickyBarProps> = ({
  config,
  cartCount,
  onOpenCart,
  onOpenApkModal,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121418]/95 backdrop-blur-md border-t border-[#242832] p-2.5 sm:hidden shadow-2xl flex items-center gap-2">
      {/* APK button */}
      <button
        type="button"
        onClick={onOpenApkModal}
        title={t.downloadApk}
        className="flex items-center justify-center bg-[#1a1d24] active:bg-[#252a35] text-amber-400 p-2.5 rounded-lg border border-[#2e3442] shadow-sm flex-shrink-0"
      >
        <Smartphone className="w-4 h-4" />
      </button>

      {/* Quick WhatsApp Order */}
      <a
        href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
          lang === 'es' ? 'Hola Churrasco Colombia, quiero pedir a domicilio.' : 'Ola Churrasco Colombia, gostaria de pedir entrega.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 active:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow-sm"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp</span>
      </a>

      {/* Cart Button */}
      <button
        type="button"
        onClick={onOpenCart}
        className="flex-1 flex items-center justify-center gap-2 bg-[#1f2229] active:bg-[#282c35] text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow-sm border border-[#2e3442] relative"
      >
        <ShoppingBag className="w-4 h-4 text-amber-500" />
        <span>{t.cartTitle}</span>
        {cartCount > 0 && (
          <span className="bg-amber-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
