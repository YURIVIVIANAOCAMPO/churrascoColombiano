'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { Product, BusinessConfig, CartItem } from '@/types';
import { Language, translations } from '@/lib/i18n';
import { sanitizeString } from '@/lib/security';
import { getAssetUrl } from '@/lib/assets';

interface ProductModalProps {
  product: Product | null;
  config: BusinessConfig;
  lang: Language;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  config,
  lang,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product && product.options) {
      const defaults: Record<string, string> = {};
      product.options.forEach((opt) => {
        if (opt.choices.length > 0) {
          defaults[opt.name] = opt.choices[0];
        }
      });
      setSelectedOptions(defaults);
    } else {
      setSelectedOptions({});
    }
    setQuantity(1);
    setNotes('');
  }, [product]);

  if (!product) return null;
  const t = translations[lang];

  const handleOptionChange = (optionName: string, choice: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: choice,
    }));
  };

  const handleAdd = () => {
    const cleanNotes = sanitizeString(notes, 200);
    const extras: string[] = Object.entries(selectedOptions).map(
      ([name, choice]) => `${name}: ${choice}`
    );

    onAddToCart({
      product,
      quantity,
      selectedDoneness: selectedOptions['Ponto da carne'] || selectedOptions['3. Ponto da carne'],
      extras,
      notes: cleanNotes,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#14161b] border border-[#262b36] rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-20 bg-black/70 hover:bg-black text-zinc-300 hover:text-white p-1.5 rounded-full border border-zinc-700/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-40 sm:h-52 w-full bg-[#0d0e11] flex-shrink-0">
          {product.image ? (
            <Image
              src={getAssetUrl(product.image)}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Flame className="w-10 h-10 text-amber-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14161b] via-transparent to-transparent" />
          {product.badge && (
            <div className="absolute bottom-2.5 left-3.5 bg-black/80 border border-[#2a2e38] text-amber-400 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md shadow-sm">
              {product.badge}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-lg sm:text-xl font-black text-amber-400">
                {config.currencySymbol} {(product.price * quantity).toFixed(2)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dynamic Options: Escolha seu arroz, aipim/batata, etc. */}
          {product.options && product.options.length > 0 && (
            <div className="space-y-3 pt-2.5 border-t border-[#242832]">
              {product.options.map((opt) => (
                <div key={opt.name} className="space-y-1.5">
                  <label className="block text-[11px] sm:text-xs font-bold text-amber-500 uppercase tracking-wide">
                    {opt.name}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {opt.choices.map((choice) => {
                      const isSelected = selectedOptions[opt.name] === choice;
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => handleOptionChange(opt.name, choice)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold border text-left transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-600/20 border-amber-500 text-amber-300 font-bold'
                              : 'bg-[#181a20] border-[#282d38] text-zinc-300 hover:bg-[#20232b]'
                          }`}
                        >
                          <span className="truncate">{choice}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1 pt-2 border-t border-[#242832]">
            <label className="block text-[11px] sm:text-xs font-bold text-zinc-300 uppercase tracking-wide">
              {t.specialInstructions}
            </label>
            <input
              type="text"
              value={notes}
              maxLength={200}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.specialInstructionsPlaceholder}
              className="w-full bg-[#0d0e11] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#101216] border-t border-[#242832] flex items-center justify-between gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center bg-[#181a20] rounded-lg border border-[#2a2e38] p-0.5">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 hover:bg-[#20232b] text-zinc-300 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-xs font-bold text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(20, quantity + 1))}
              className="p-1.5 hover:bg-[#20232b] text-zinc-300 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 font-bold py-2.5 px-3 sm:px-4 rounded-lg text-xs transition-all shadow-sm active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t.productAdded}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addToCart} • {config.currencySymbol} {(product.price * quantity).toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
