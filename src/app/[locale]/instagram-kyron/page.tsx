'use client';

import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  CircleCheck,
  Share2,
  Zap,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';

export default function InstagramPostPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8 font-[family-name:var(--font-outfit)]">
      {/* Ambient background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#09090b] border border-zinc-800/50 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="h-full w-full rounded-full bg-black p-[2px]">
                <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src="/images/logo-black.png" alt="Kyron Logo" className="w-6 h-6 object-contain brightness-0 invert" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-white uppercase tracking-tight">system_kyron</span>
                <CircleCheck className="h-3 w-3 text-cyan-400 fill-cyan-400/20" />
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Caracas, Venezuela</p>
            </div>
          </div>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Media Content (Visual Representation of Kyron) */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
          {/* Futuristic UI Mockup inside the "photo" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-cyan-500/10 blur-2xl rounded-full" />
              <Cpu className="h-24 w-24 text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </motion.div>
            
            <div className="mt-8 space-y-2">
              <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Genesis <span className="text-cyan-400">v1.0</span></h4>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Neural Business Network</p>
            </div>

            {/* Floating HUD elements */}
            <div className="absolute top-6 left-6 p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="h-1 w-8 bg-cyan-500 rounded-full mb-1" />
              <div className="h-1 w-4 bg-zinc-700 rounded-full" />
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-900/50 border border-white/5 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Action Bar */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-zinc-200 hover:text-red-500 transition-colors">
                <Heart className="h-7 w-7" />
              </button>
              <button className="text-zinc-200 hover:text-cyan-400 transition-colors">
                <MessageCircle className="h-7 w-7" />
              </button>
              <button className="text-zinc-200 hover:text-cyan-400 transition-colors">
                <Send className="h-7 w-7" />
              </button>
            </div>
            <button className="text-zinc-200 hover:text-white transition-colors">
              <Bookmark className="h-7 w-7" />
            </button>
          </div>

          {/* Likes */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-5 w-5 rounded-full border-2 border-black bg-zinc-800" />
              ))}
            </div>
            <p className="text-xs font-bold text-white">
              Les gusta a <span className="font-black">saime_oficial</span> y <span className="font-black">1.284 personas más</span>
            </p>
          </div>

          {/* Caption */}
          <div className="space-y-1">
            <p className="text-sm text-zinc-300 leading-snug">
              <span className="font-black text-white mr-2">system_kyron</span>
              Desde el año 2000, visionando la automatización total de los procesos corporativos. El futuro no se predice, se construye. 🚀💎
            </p>
            <p className="text-xs text-cyan-400 font-medium">#SystemKyron #Legacy #Tech #Ecosistema #Venezuela</p>
          </div>

          {/* Comments */}
          <button className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Ver los 42 comentarios</button>

          {/* Date - THE KEY REQUEST */}
          <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
            15 DE MAYO DE 2000
          </p>
        </div>

        {/* Comment Input */}
        <div className="px-4 py-3 border-t border-zinc-800/30 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-lg opacity-50">😊</span>
            <input 
              type="text" 
              placeholder="Añadir un comentario..." 
              className="bg-transparent border-none text-sm text-white focus:ring-0 w-full placeholder:text-zinc-600 font-medium"
            />
          </div>
          <button className="text-sm font-black text-cyan-500 opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest">Publicar</button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="fixed bottom-8 flex flex-col items-center gap-2 opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">Kyron Heritage Archive</p>
        <Link href="/" className="text-[10px] text-cyan-400 hover:underline font-bold">Volver al Ecosistema</Link>
      </div>
    </div>
  );
}
