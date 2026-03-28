'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '584149377068';
const WHATSAPP_MESSAGE = encodeURIComponent(
  '¡Hola! Me interesa conocer más sobre System Kyron. ¿Pueden brindarme información?'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const EXPANDED_DURATION = 17000;

export function WhatsAppButton() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpanded(false);
    }, EXPANDED_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-28 right-6 z-[99]">
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] transition-all duration-500"
        style={{
          padding: expanded ? '12px 20px 12px 16px' : '14px',
          gap: expanded ? '10px' : '0px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 shrink-0"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.855L.055 23.454a.5.5 0 0 0 .491.546.499.499 0 0 0 .153-.024l5.788-1.851A11.937 11.937 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.872 9.872 0 0 1-5.031-1.376l-.36-.214-3.733 1.194 1.215-3.63-.235-.374A9.856 9.856 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118c5.466 0 9.882 4.415 9.882 9.882 0 5.467-4.416 9.882-9.882 9.882z"/>
        </svg>

        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden"
            >
              Escríbenos
            </motion.span>
          )}
        </AnimatePresence>

        <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-300 rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full" />
      </motion.a>
    </div>
  );
}
