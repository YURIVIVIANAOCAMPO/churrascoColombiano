'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ExternalLink, FileText, ChevronRight } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'menu1' | 'menu2' | 'menu3'>('menu3');

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
      subtitle: lang === 'es' ? 'Churrasco com Guarnição & Quentinhas' : 'Churrasco com Guarnição & Quentinhas',
      src: '/menu1.jpeg',
    },
    {
      id: 'menu2',
      title: lang === 'es' ? 'Carta 2: Bebidas & Outros' : 'Folheto 2: Bebidas & Outros',
      subtitle: lang === 'es' ? 'Bebidas Geladas, Espetos e Acompanhamentos' : 'Bebidas Geladas, Espetos e Acompanhamentos',
      src: '/menu2.jpeg',
    },
  ];

  const currentMenu = menus.find((m) => m.id === activeTab) || menus[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#121418] border border-[#262b36] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#242832] flex items-center justify-between bg-[#16181e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'es' ? 'Cartas Físicas del Restaurante' : 'Cardápios Físicos Oficiais'}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'es'
                  ? 'Visualiza los folletos impresos originales de Churrasco Colômbia'
                  : 'Consulte os folhetos impressos originais do Churrasco Colômbia'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#20232b] hover:bg-[#2b303c] border border-[#2e3442] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#242832] bg-[#0f1115] overflow-x-auto">
          {menus.map((menu) => (
            <button
              key={menu.id}
              type="button"
              onClick={() => setActiveTab(menu.id as any)}
              className={`flex-1 min-w-[160px] py-3 px-4 text-left text-xs font-semibold transition-colors border-b-2 ${
                activeTab === menu.id
                  ? 'border-amber-500 text-amber-400 bg-[#161920]'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-[#13151a]'
              }`}
            >
              <div className="font-bold text-white text-[13px]">{menu.title}</div>
              <div className="text-[11px] text-zinc-400 truncate">{menu.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Image Preview Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#0a0b0d] flex flex-col items-center justify-center">
          <div className="relative w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-[#242832] bg-black shadow-lg">
            <Image
              src={currentMenu.src}
              alt={currentMenu.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={currentMenu.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1a1d24] hover:bg-[#242832] text-zinc-200 border border-[#2e3442] px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'es' ? 'Abrir imagen en alta resolución' : 'Abrir imagem em alta resolução'}</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#14161a] border-t border-[#242832] flex items-center justify-between text-xs text-zinc-400">
          <span>{lang === 'es' ? 'Precios del menú digital actualizados' : 'Preços atualizados no cardápio digital'}</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg transition-colors text-xs"
          >
            {lang === 'es' ? 'Volver al Menú' : 'Voltar ao Cardápio'}
          </button>
        </div>
      </div>
    </div>
  );
};
