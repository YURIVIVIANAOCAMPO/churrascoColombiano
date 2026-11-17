'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ExternalLink, FileText } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface PhysicalMenusModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PhysicalMenusModal: React.FC<PhysicalMenusModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'menu3' | 'menu1' | 'menu2'>('menu3');

  if (!isOpen) return null;

  const menus = [
    {
      id: 'menu3',
      title: lang === 'es' ? 'Carta 3: Pratos Feitos' : 'Folheto 3: Pratos Feitos',
      subtitle: lang === 'es' ? 'Arroz, Aipim/Batata e Carnes' : 'Arroz, Aipim/Batata e Carnes',
      src: '/menu3.jpeg',
    },
    {
      id: 'menu1',
      title: lang === 'es' ? 'Carta 1: Dia a Dia' : 'Folheto 1: Dia a Dia',
      subtitle: lang === 'es' ? 'Churrasco & Quentinhas' : 'Churrasco & Quentinhas',
      src: '/menu1.jpeg',
    },
    {
      id: 'menu2',
      title: lang === 'es' ? 'Carta 2: Bebidas & Outros' : 'Folheto 2: Bebidas & Outros',
      subtitle: lang === 'es' ? 'Bebidas, Espetos e Cortes' : 'Bebidas, Espetos e Cortes',
      src: '/menu2.jpeg',
    },
  ];

  const currentMenu = menus.find((m) => m.id === activeTab) || menus[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#121418] border border-[#262b36] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-[#242832] flex items-center justify-between bg-[#16181e]">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-base font-bold text-white truncate">
                {lang === 'es' ? 'Cartas Físicas del Restaurante' : 'Cardápios Físicos Oficiais'}
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 truncate">
                {lang === 'es'
                  ? 'Folletos impresos originales de Churrasco Colômbia'
                  : 'Folhetos impressos originais do Churrasco Colômbia'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#20232b] hover:bg-[#2b303c] border border-[#2e3442] flex items-center justify-center text-zinc-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#242832] bg-[#0f1115] overflow-x-auto no-scrollbar">
          {menus.map((menu) => (
            <button
              key={menu.id}
              type="button"
              onClick={() => setActiveTab(menu.id as any)}
              className={`flex-1 min-w-[120px] sm:min-w-[160px] py-2.5 px-3 text-left text-xs font-semibold transition-colors border-b-2 ${
                activeTab === menu.id
                  ? 'border-amber-500 text-amber-400 bg-[#161920]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-[#13151a]'
              }`}
            >
              <div className="font-bold text-white text-[11px] sm:text-[13px] truncate">{menu.title}</div>
              <div className="text-[9px] sm:text-[11px] text-zinc-400 truncate">{menu.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Image Preview Area */}
        <div className="flex-1 overflow-auto p-3 sm:p-6 bg-[#0a0b0d] flex flex-col items-center justify-center">
          <div className="relative w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-[#242832] bg-black shadow-lg">
            <Image
              src={currentMenu.src}
              alt={currentMenu.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <a
              href={currentMenu.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1a1d24] hover:bg-[#242832] text-zinc-200 border border-[#2e3442] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'es' ? 'Abrir imagen en alta resolución' : 'Abrir imagem em alta resolução'}</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#14161a] border-t border-[#242832] flex items-center justify-between text-xs text-zinc-400">
          <span className="text-[11px] text-zinc-400 truncate pr-2">
            {lang === 'es' ? 'Precios del menú actualizados' : 'Preços atualizados no cardápio'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors text-xs flex-shrink-0"
          >
            {lang === 'es' ? 'Volver al Menú' : 'Voltar ao Cardápio'}
          </button>
        </div>
      </div>
    </div>
  );
};
