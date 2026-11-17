'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, CheckCircle, ShieldCheck, MapPin, Bike, Store, UtensilsCrossed } from 'lucide-react';
import { CartItem, BusinessConfig } from '@/types';
import { Language, translations } from '@/lib/i18n';
import { sanitizeString } from '@/lib/security';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  config: BusinessConfig;
  lang: Language;
  onUpdateQuantity: (index: number, qty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  config,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(config.paymentMethods[0] || 'Dinheiro');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;
  const t = translations[lang];

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryCost = deliveryType === 'delivery' ? (config.deliveryFee || 0) : 0;
  const total = subtotal + deliveryCost;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      alert(lang === 'es' ? 'Por favor ingresa tu nombre y teléfono.' : 'Por favor informe seu nome e telefone.');
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      alert(lang === 'es' ? 'Por favor ingresa la dirección de entrega.' : 'Por favor informe o endereço de entrega.');
      return;
    }

    setIsSubmitting(true);

    const cleanName = sanitizeString(customerName, 80);
    const cleanPhone = sanitizeString(customerPhone, 30);
    const cleanAddress = sanitizeString(address, 200);
    const cleanNotes = sanitizeString(notes, 250);

    const orderPayload = {
      customerName: cleanName,
      customerPhone: cleanPhone,
      deliveryType,
      deliveryAddress: cleanAddress,
      paymentMethod,
      notes: cleanNotes,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        notes: [i.selectedDoneness, ...(i.extras || []), i.notes].filter(Boolean).join(' - '),
      })),
      subtotal,
      deliveryFee: deliveryCost,
      total,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();
      const orderId = data?.order?.id || `ORD-${Date.now().toString().slice(-4)}`;

      const typeLabel =
        deliveryType === 'delivery'
          ? (lang === 'es' ? 'Domicilio' : 'Entrega Delivery')
          : deliveryType === 'takeaway'
          ? (lang === 'es' ? 'Recoger en Restaurante' : 'Retirada no Restaurante')
          : (lang === 'es' ? 'Consumo en Mesa' : 'Consumo no Salão');

      let msg = `*NOVO PEDIDO - ${config.name.toUpperCase()}*\n`;
      msg += `*Pedido:* #${orderId}\n`;
      msg += `*Cliente:* ${cleanName}\n`;
      msg += `*Telefone:* ${cleanPhone}\n`;
      msg += `*Modalidade:* ${typeLabel}\n`;
      if (deliveryType === 'delivery') {
        msg += `*Endereco:* ${cleanAddress}\n`;
      }
      msg += `*Forma de Pagamento:* ${paymentMethod}\n`;
      if (cleanNotes) {
        msg += `*Observacoes:* ${cleanNotes}\n`;
      }
      msg += `\n*ITENS DO PEDIDO:*\n`;

      items.forEach((item, idx) => {
        msg += `${idx + 1}. *${item.quantity}x ${item.product.name}* - ${config.currencySymbol} ${(
          item.product.price * item.quantity
        ).toFixed(2)}\n`;
        if (item.selectedDoneness) {
          msg += `   - Ponto: ${item.selectedDoneness}\n`;
        }
        if (item.extras && item.extras.length > 0) {
          item.extras.forEach((extra) => {
            msg += `   - ${extra}\n`;
          });
        }
        if (item.notes) {
          msg += `   - Obs: ${item.notes}\n`;
        }
      });

      msg += `\n*Subtotal:* ${config.currencySymbol} ${subtotal.toFixed(2)}\n`;
      if (deliveryCost > 0) {
        msg += `*Taxa de Entrega:* ${config.currencySymbol} ${deliveryCost.toFixed(2)}\n`;
      }
      msg += `*TOTAL:* ${config.currencySymbol} ${total.toFixed(2)}\n\n`;
      msg += `Pedido enviado atraves do site oficial de ${config.name}`;

      const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      setOrderSuccess(true);
      setTimeout(() => {
        onClearCart();
        setOrderSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Checkout error:', err);
      setIsSubmitting(false);
      alert('Error al enviar pedido.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#14161b] border-l border-[#242832] flex flex-col shadow-2xl text-white">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#242832] flex items-center justify-between bg-[#16181d]">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{t.cartTitle}</h2>
              <span className="bg-[#242832] text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <CheckCircle className="w-14 h-14 text-emerald-500" />
              <h3 className="text-lg font-bold text-white">{t.orderSentSuccess}</h3>
              <p className="text-xs text-zinc-400">{t.secureCheckout}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <UtensilsCrossed className="w-12 h-12 text-zinc-600" />
              <h3 className="text-base font-bold text-zinc-400">{t.emptyCart}</h3>
              <p className="text-xs text-zinc-500 max-w-xs">{t.emptyCartSubtitle}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs"
              >
                {t.viewMenu}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#242832]">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="pt-3 first:pt-0 flex items-start gap-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-xs sm:text-sm text-white">{item.product.name}</h4>
                      {item.selectedDoneness && (
                        <p className="text-[11px] text-amber-400 font-semibold mt-0.5">
                          {item.selectedDoneness}
                        </p>
                      )}
                      {item.extras && item.extras.length > 0 && (
                        <div className="space-y-0.5 mt-0.5">
                          {item.extras.map((extra, exIdx) => (
                            <p key={exIdx} className="text-[10px] text-zinc-300">
                              • {extra}
                            </p>
                          ))}
                        </div>
                      )}
                      {item.notes && (
                        <p className="text-[11px] text-zinc-400 italic">{item.notes}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-[#181a20] rounded-md border border-[#2a2e38] p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-[#22252e] text-zinc-400 hover:text-white rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-[#22252e] text-zinc-400 hover:text-white rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-amber-400">
                          {config.currencySymbol} {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(index)}
                      className="text-zinc-500 hover:text-red-400 p-1 rounded"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Checkout Details Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="pt-4 space-y-3">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                    {t.deliveryType}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2 rounded-lg border text-center text-[11px] font-bold flex flex-col items-center gap-1 transition-colors ${
                        deliveryType === 'delivery'
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'bg-[#181a20] border-[#2a2e38] text-zinc-300 hover:bg-[#22252e]'
                      }`}
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Domicilio' : 'Delivery'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('takeaway')}
                      className={`p-2 rounded-lg border text-center text-[11px] font-bold flex flex-col items-center gap-1 transition-colors ${
                        deliveryType === 'takeaway'
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'bg-[#181a20] border-[#2a2e38] text-zinc-300 hover:bg-[#22252e]'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Recoger' : 'Retirada'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('dinein')}
                      className={`p-2 rounded-lg border text-center text-[11px] font-bold flex flex-col items-center gap-1 transition-colors ${
                        deliveryType === 'dinein'
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'bg-[#181a20] border-[#2a2e38] text-zinc-300 hover:bg-[#22252e]'
                      }`}
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'En Mesa' : 'No Salão'}</span>
                    </button>
                  </div>

                  {/* Customer info */}
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      required
                      value={customerName}
                      maxLength={80}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      maxLength={30}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />

                    {deliveryType === 'delivery' && (
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="text"
                          required
                          value={address}
                          maxLength={200}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder={t.addressPlaceholder}
                          className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">{t.paymentMethod}</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        {config.paymentMethods.map((pm) => (
                          <option key={pm} value={pm} className="bg-[#101216] text-white">
                            {pm}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      value={notes}
                      maxLength={200}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.specialInstructionsPlaceholder}
                      className="w-full bg-[#101216] border border-[#2a2e38] focus:border-amber-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* Drawer Footer with Totals */}
              <div className="p-4 bg-[#16181d] border-t border-[#242832] space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>{t.subtotal}</span>
                    <span className="font-semibold text-white">{config.currencySymbol} {subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-zinc-400">
                      <span>{t.deliveryCost}</span>
                      <span className="font-semibold text-white">
                        {deliveryCost > 0 ? `${config.currencySymbol} ${deliveryCost.toFixed(2)}` : t.freeDelivery}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-[#242832]">
                    <span>{t.total}</span>
                    <span className="text-amber-400">{config.currencySymbol} {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-sm disabled:opacity-50"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isSubmitting ? 'Processando...' : t.sendOrderWhatsApp}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.secureCheckout}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
