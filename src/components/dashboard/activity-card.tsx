'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Bell, Clock } from 'lucide-react';

type Activity = {
    description: string;
    time: string;
    icon: React.ElementType;
    iconColor: string;
};

export function ActivityCard({ recentActivities }: { recentActivities: Activity[] }) {
  return (
    <Card className="glass-card border-none flex flex-col h-full">
      <CardHeader className="p-10 border-b border-white/5">
        <div className="flex items-center justify-between">
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Operaciones en Vivo</CardTitle>
            <Clock className="h-5 w-5 text-primary/30" />
        </div>
      </CardHeader>
      <CardContent className="p-10 flex-grow">
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <li className="flex items-start gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-300 group">
                  <div className="p-4 bg-white/[0.03] rounded-2xl group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    <activity.icon className={`h-6 w-6 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-sm leading-tight text-white/90 group-hover:text-primary transition-colors">{activity.description}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20">{activity.time}</p>
                  </div>
                </li>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] border-white/10 bg-black/90 backdrop-blur-3xl">
                  <DialogHeader>
                      <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Detalle Operativo</DialogTitle>
                      <DialogDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Registro inmutable de actividad</DialogDescription>
                  </DialogHeader>
                  <div className="py-10 space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                        <p className="text-sm font-medium leading-relaxed">{activity.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest">
                        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-white/40">Timestamp: <span className="text-white ml-2">{activity.time}</span></div>
                        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-white/40">Status: <span className="text-emerald-400 ml-2">VERIFIED</span></div>
                      </div>
                  </div>
                  <DialogFooter>
                      <DialogTrigger asChild>
                        <Button className="w-full h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">Cerrar Expediente</Button>
                      </DialogTrigger>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}