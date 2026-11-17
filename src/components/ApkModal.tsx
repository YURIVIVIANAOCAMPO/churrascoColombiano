'use client';

import React from 'react';
import { X, Download, Smartphone, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface ApkModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ApkModal: React.FC<ApkModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#16181d] border border-[#2a2e38] rounded-2xl overflow-hidden shadow-2xl p-6 text-white space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold block">
              {t.apkBadge}
            </span>
            <h3 className="font-extrabold text-lg text-white">
              {t.downloadApk}
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          {t.apkSubtitle}
        </p>

        {/* Instructions */}
        <div className="bg-[#101216] p-4 rounded-xl border border-[#242832] space-y-2.5 text-xs">
          <span className="font-bold text-white block text-xs">
            {t.apkHowToInstall}
          </span>
          <div className="flex items-start gap-2 text-zinc-300">
            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>{t.apkStep1}</span>
          </div>
          <div className="flex items-start gap-2 text-zinc-300">
            <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>{t.apkStep2}</span>
          </div>
          <div className="flex items-start gap-2 text-zinc-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{t.apkStep3}</span>
          </div>
        </div>

        {/* Download Action Button */}
        <a
          href="/churrasco-colombia.apk"
          download="churrasco-colombia.apk"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>{t.apkDownloadBtn} (APK Android)</span>
        </a>

        {/* Security badge & original leaflets links */}
        <div className="pt-2 border-t border-[#242832] flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verificado & Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/menu1.jpeg"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Menu 1</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="/menu2.jpeg"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Menu 2</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
