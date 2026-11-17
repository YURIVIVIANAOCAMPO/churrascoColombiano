'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Flame, Award } from 'lucide-react';
import { Product, BusinessConfig } from '@/types';
import { Language, translations } from '@/lib/i18n';
import { getAssetUrl } from '@/lib/assets';

interface ProductCardProps {
  product: Product;
  config: BusinessConfig;
  lang: Language;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  config,
  lang,
  onSelect,
}) => {
  const [imgError, setImgError] = useState(false);
  const t = translations[lang];

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-[#16181d] rounded-xl overflow-hidden border border-[#242832] hover:border-[#383d4c] transition-all duration-200 shadow-sm flex flex-col cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#121418]">
        {!imgError && product.image ? (
          <Image
            src={getAssetUrl(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-103 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#121418] text-zinc-600">
            <Flame className="w-8 h-8 text-amber-500 mb-1" />
            <span className="text-xs font-semibold">{product.name}</span>
          </div>
        )}

        {/* Minimalist Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-[#0e1013]/90 backdrop-blur-sm border border-[#2a2e38] text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-400" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Calories / Weight */}
        {product.calories && (
          <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-zinc-300 text-[10px] font-medium px-2 py-0.5 rounded">
            {product.calories}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add Button */}
        <div className="mt-4 pt-3 border-t border-[#242832] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 font-medium block">
              {lang === 'es' ? 'Precio' : 'Preço'}
            </span>
            <span className="text-base font-black text-amber-400">
              {config.currencySymbol} {product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex items-center gap-1.5 bg-[#20232a] hover:bg-[#282c35] text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-[#303542]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
