'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Clock, ShieldCheck, Lock, Instagram } from 'lucide-react';
import { BusinessConfig } from '@/types';
import { Language, translations } from '@/lib/i18n';
import { getAssetUrl } from '@/lib/assets';

interface FooterProps {
  config: BusinessConfig;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ config, lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#0b0c0f] border-t border-[#242832] mt-16 pt-12 pb-24 sm:pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#363c4a] bg-black">
                <Image
                  src={getAssetUrl(config.logo || '/logo.jpeg')}
                  alt={config.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{config.name}</h3>
                <span className="text-[11px] text-amber-500 font-medium">
                  {lang === 'es' ? 'Tradición Parrillera & Cortes Nobres' : 'Tradição em Churrasco & Cortes Nobres'}
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {config.slogan}
            </p>

            {/* Instagram Link */}
            {config.social?.instagram && (
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#16181d] hover:bg-[#20232a] text-zinc-200 border border-[#2a2e38] font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@churrasco_colombiano</span>
              </a>
            )}

            <div className="flex items-center gap-2 text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.securityShieldActive}</span>
            </div>
          </div>

          {/* Col 2: Contact & Location */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide">
              {t.location}
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
              <span>{config.address}, {config.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <a href={`tel:${config.whatsapp}`} className="hover:text-white transition-colors">
                {config.phone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
              <span>{config.openingHours}</span>
            </div>
          </div>

          {/* Col 3: Payment Methods */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide">
              {t.paymentMethod}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {config.paymentMethods.map((pm) => (
                <span
                  key={pm}
                  className="bg-[#16181d] border border-[#2a2e38] px-2 py-1 rounded text-[11px] text-zinc-300"
                >
                  {pm}
                </span>
              ))}
            </div>
            <p className="text-zinc-500 text-[11px] pt-1">
              {lang === 'es'
                ? 'Pagos directos al momento de la entrega o transferencia Pix.'
                : 'Pagamentos na entrega ou transferência Pix.'}
            </p>
          </div>

          {/* Col 4: Administrable & Direct Access */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wide">
              {t.adminPanel}
            </h4>
            <p className="text-zinc-400 text-xs">
              {lang === 'es'
                ? 'Panel 100% autogestionable para actualización de menú, precios, pedidos y SEO.'
                : 'Painel 100% administrável para atualização de cardápio, preços, pedidos e SEO.'}
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 bg-[#16181d] hover:bg-[#20232a] text-white border border-[#2a2e38] px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Acceder al Panel Admin' : 'Acessar Painel Admin'}</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[#242832] flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {config.name}. {t.footerCopyright}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              {t.viewMenu}
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition-colors">
              {t.adminPanel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
