

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

type Activity = {
    description: string;
    time: string;
    icon: React.ElementType;
    iconColor: string;
};

export function ActivityCard({ recentActivities }: { recentActivities: Activity[] }) {
  return (
    <Card className="lg:col-span-1 bg-card/80 backdrop-blur-sm flex flex-col">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
            <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
              <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalle de la Actividad</DialogTitle>
                        <DialogDescription>{activity.description}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p><strong>Fecha:</strong> {activity.time}</p>
                        <p><strong>Estado:</strong> Completado</p>
                    </div>
                    <DialogFooter>
                        <Button>Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
