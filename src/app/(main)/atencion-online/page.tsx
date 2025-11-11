
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LifeBuoy, Send, Clock, Star, MessageSquare, Instagram, Mail } from "lucide-react";
import { countries } from "@/lib/countries";
import Image from "next/image";

// WhatsApp Icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.38 1.25 4.85L2 22l5.3-1.38c1.41.74 3.01 1.18 4.71 1.18h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m-1.27 15.26c-.27.13-1.42.69-2.99-1.22-1.57-1.91-2.09-3.23-2.18-3.41-.1-."/>
    </svg>
);

// Facebook Messenger Icon
const MessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.63-.1 2.4-.29-.16-.36-.3-.74-.4-1.15-.31-.05-.62-.06-.94-.06-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8c0 1.25-.29 2.42-.81 3.45l1.45 1.45C19.43 15.48 20 13.82 20 12c0-4.42-3.58-8-8-8zm-2.01 11.87l-3.32-3.32c-.41-.41-.41-1.07 0-1.48.41-.41 1.07-.41 1.48 0L10 12.58l4.82-4.82c.41-.41 1.07-.41 1.48 0 .41.41.41 1.07 0 1.48L11.48 14l-1.49-1.48v.01z"/>
  </svg>
);


const kpis = [
    { title: "Tickets Abiertos", value: "12", icon: LifeBuoy },
    { title: "Tiempo de Respuesta Promedio", value: "5m 32s", icon: Clock },
    { title: "Satisfacción del Cliente (CSAT)", value: "92%", icon: Star },
];

const conversations = {
    whatsapp: [
        { id: 1, name: "Ana Pérez", lastMessage: "¡Hola! Tengo una duda sobre mi última factura...", time: "2m", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Luis Gómez", lastMessage: "Buenos días, necesito soporte técnico por favor.", time: "15m", avatar: "https://i.pravatar.cc/150?img=2" },
    ],
    instagram: [
        { id: 3, name: "Marketing Pro", lastMessage: "Nos interesa una alianza, ¿podemos hablar?", time: "1h", avatar: "https://i.pravatar.cc/150?img=3" },
    ],
    facebook: [],
    email: [
        { id: 4, name: "Gerencia Constructora XYZ", lastMessage: "Asunto: Solicitud de Cotización Urgente", time: "Ayer", avatar: "https://i.pravatar.cc/150?img=4" },
    ],
};

const chatHistory = [
    { from: "client", text: "¡Hola! Tengo una duda sobre mi última factura..." },
    { from: "agent", text: "¡Hola Ana! Claro, con gusto te ayudo. ¿Podrías indicarme el número de la factura por favor?" },
];

export default function AtencionOnlinePage() {
    const [selectedCountry, setSelectedCountry] = useState("VEN");

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <MessageSquare className="h-8 w-8" />
                Centro de Atención Online
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestiona todas las interacciones con clientes desde un solo lugar.
            </p>
        </div>
        <div className="w-full sm:w-auto">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filtrar por país..." />
                </SelectTrigger>
                <SelectContent>
                    {countries.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                            <div className="flex items-center gap-2">
                                <Image src={c.flag} alt={c.name} width={20} height={15} />
                                <span>{c.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map(kpi => (
            <Card key={kpi.title} className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>
      
      {/* Main Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-8 h-[60vh]">
        <Card className="lg:col-span-1 flex flex-col bg-card/50 backdrop-blur-sm">
             <CardHeader>
                <CardTitle>Bandeja de Entrada</CardTitle>
             </CardHeader>
             <CardContent className="flex-grow p-0 overflow-hidden">
                <Tabs defaultValue="whatsapp" className="h-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-4 px-4">
                        <TabsTrigger value="whatsapp"><WhatsAppIcon className="h-5 w-5" /></TabsTrigger>
                        <TabsTrigger value="instagram"><Instagram className="h-5 w-5" /></TabsTrigger>
                        <TabsTrigger value="facebook"><MessengerIcon className="h-5 w-5" /></TabsTrigger>
                        <TabsTrigger value="email"><Mail className="h-5 w-5" /></TabsTrigger>
                    </TabsList>
                    <div className="flex-grow overflow-y-auto">
                        {Object.entries(conversations).map(([key, convos]) => (
                             <TabsContent value={key} key={key} className="m-0">
                                {convos.length > 0 ? (
                                    convos.map(convo => (
                                        <div key={convo.id} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/50 border-b">
                                            <Avatar>
                                                <AvatarImage src={convo.avatar} />
                                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold truncate">{convo.name}</p>
                                                    <p className="text-xs text-muted-foreground">{convo.time}</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-8 text-muted-foreground">No hay conversaciones en este canal.</div>
                                )}
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
             </CardContent>
        </Card>
        <Card className="lg:col-span-2 flex flex-col bg-card/50 backdrop-blur-sm">
             <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                        <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>Ana Pérez</CardTitle>
                        <CardDescription>Conversación de WhatsApp</CardDescription>
                    </div>
                </div>
                <Button variant="outline">Cerrar Ticket</Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto bg-secondary/30 p-4 space-y-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.from === 'agent' ? 'justify-end' : ''}`}>
                        {msg.from === 'client' && <Avatar className="h-8 w-8"><AvatarImage src="https://i.pravatar.cc/150?img=1" /></Avatar>}
                        <div className={`max-w-md rounded-lg px-4 py-2 ${msg.from === 'agent' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                            <p>{msg.text}</p>
                        </div>
                        {msg.from === 'agent' && <Avatar className="h-8 w-8"><AvatarFallback>TÚ</AvatarFallback></Avatar>}
                    </div>
                ))}
            </CardContent>
            <CardFooter className="p-4 border-t">
                 <div className="relative w-full">
                    <Textarea placeholder="Escribe tu respuesta..." className="pr-16" rows={2}/>
                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
                        <Send className="h-5 w-5"/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
