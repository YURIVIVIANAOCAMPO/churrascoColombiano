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

  const handleClick = (id: string) => {
    onSelectCategory(id);
    // Smoothly ensure menu is in view without jumping or clipping under header
    const menuEl = document.getElementById('menu-content');
    if (menuEl) {
      const yOffset = -90;
      const y = menuEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="menu" className="relative z-10 bg-[#101217] border-y border-[#242832] py-3.5 my-2 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {/* All button */}
          <button
            type="button"
            onClick={() => handleClick('all')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#181a20] text-zinc-300 hover:text-white hover:bg-[#22252e] border border-[#262b36]'
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
                onClick={() => handleClick(cat.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-[#181a20] text-zinc-300 hover:text-white hover:bg-[#22252e] border border-[#262b36]'
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
