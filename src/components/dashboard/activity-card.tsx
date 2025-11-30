
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

type Activity = {
    description: string;
    time: string;
    icon: React.ElementType;
    iconColor: string;
};

export function ActivityCard({ recentActivities }: { recentActivities: Activity[] }) {
  return (
    <Card className="lg:col-span-1 flex flex-col bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {recentActivities.map((activity, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary">
                  <div className="p-2 bg-background rounded-full mt-1">
                    <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-tight">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </li>
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
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
