'use client';

import React, { Fragment } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';


const featureGroups = [
  {
    name: 'Contabilidad y Fiscal',
    features: [
      { name: 'Facturación Electrónica', plans: [true, true, true] },
      { name: 'Libros de Ventas / Compras', plans: [true, true, true] },
      { name: 'Sincronización Bancaria', plans: [false, true, true] },
      { name: 'Declaración IVA SENIAT (Forma 30)', plans: [true, true, true] },
      { name: 'Ajuste por Inflación Fiscal', plans: [false, false, true] },
    ]
  },
  {
    name: 'Gestión de Talento',
    features: [
      { name: 'Nómina Quincenal LOTTT', plans: [true, true, true] },
      { name: 'Cálculo de Prestaciones (Art. 142)', plans: [false, true, true] },
      { name: 'Solvencias IVSS / FAOV', plans: [false, true, true] },
      { name: 'Autogestión de Empleados', plans: [false, true, true] },
    ]
  },
  {
    name: 'Inteligencia Artificial',
    features: [
      { name: 'Assistant Kyron Base', plans: [true, true, true] },
      { name: 'IA Jurídica Avanzada', plans: [false, true, true] },
      { name: 'CFO Analytics Virtual', plans: [false, false, true] },
      { name: 'Escaneo de Documentos con OCR', plans: [false, true, true] },
    ]
  },
  {
    name: 'Infraestructura y Soporte',
    features: [
      { name: 'Bóveda de Documentos', plans: ['1GB', '50GB', 'Ilimitada'] },
      { name: 'Alerta WhatsApp / SMS', plans: [false, true, true] },
      { name: 'Soporte Prioritario', plans: ['Email', 'Chat 24/7', 'Account Manager'] },
      { name: 'Acceso API / Webhooks', plans: [false, false, true] },
    ]
  }
];

export function PricingFeatureTable() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-8 text-sm font-bold text-white uppercase tracking-wider">Características Detalladas</th>
              <th className="px-6 py-8 text-center text-sm font-bold text-white uppercase tracking-wider">Start</th>
              <th className="px-6 py-8 text-center text-sm font-bold text-blue-400 uppercase tracking-wider">Business</th>
              <th className="px-6 py-8 text-center text-sm font-bold text-indigo-400 uppercase tracking-wider">Elite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {featureGroups.map((group) => (
              <Fragment key={group.name}>

                <tr className="bg-white/[0.02]">
                  <td colSpan={4} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                    {group.name}
                  </td>
                </tr>
                {group.features.map((feature) => (
                  <tr key={feature.name} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-5 text-sm font-medium text-slate-300">{feature.name}</td>
                    {feature.plans.map((value, i) => (
                      <td key={i} className="px-6 py-5 text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="h-5 w-5 text-blue-500 mx-auto" strokeWidth={3} />
                          ) : (
                            <Minus className="h-4 w-4 text-slate-700 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs font-bold text-white">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

