'use client';

import React from 'react';
import { Category } from '@/types';
import { Language, translations } from '@/lib/i18n';
import { Utensils } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  lang: Language;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  lang,
}) => {
  const t = translations[lang];
  const activeCategories = categories.filter((c) => c.active);

  return (
    <div id="menu" className="sticky top-[105px] sm:top-[77px] z-30 bg-[#0e1013]/95 backdrop-blur-md py-3 border-b border-[#242832]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {/* All button */}
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-[#16181d] text-zinc-300 hover:text-white hover:bg-[#1f2229] border border-[#242832]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{t.allCategories}</span>
          </button>

          {/* Category Pills */}
          {activeCategories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-[#16181d] text-zinc-300 hover:text-white hover:bg-[#1f2229] border border-[#242832]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
