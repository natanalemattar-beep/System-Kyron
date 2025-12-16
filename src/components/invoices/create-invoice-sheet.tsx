
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn, formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const invoiceSchema = z.object({
  customer: z.string().min(1, "El nombre del cliente es requerido."),
  customerEmail: z.string().email("Dirección de correo electrónico inválida."),
  date: z.date({ required_error: "La fecha de la factura es requerida." }),
  dueDate: z.date({ required_error: "La fecha de vencimiento es requerida." }),
  items: z.array(z.object({
    description: z.string().min(1, "La descripción del item es requerida."),
    quantity: z.coerce.number().min(1, "La cantidad debe ser al menos 1."),
    price: z.coerce.number().min(0.01, "El precio debe ser positivo."),
  })).min(1, "Se requiere al menos un item."),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export function CreateInvoiceSheet({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer: "",
      customerEmail: "",
      items: [{ description: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  
  const watchedItems = form.watch("items");
  const totalAmount = watchedItems.reduce((acc, item) => acc + (item.quantity * item.price || 0), 0);

  function onSubmit(data: InvoiceFormValues) {
    console.log(data);
    toast({
        title: "Factura Creada",
        description: `Se ha creado el borrador de la factura para ${data.customer}.`
    })
    form.reset();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-2xl w-full">
        <SheetHeader>
          <SheetTitle>Crear Factura</SheetTitle>
          <SheetDescription>
            Completa los detalles para crear una nueva factura.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6 overflow-y-auto pr-6 h-[calc(100vh-10rem)]">
            <div className="grid grid-cols-2 gap-4">
               <FormField control={form.control} name="customer" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Cliente</FormLabel>
                  <FormControl><Input placeholder="Cliente Corporativo" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="customerEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo del Cliente</FormLabel>
                  <FormControl><Input placeholder="facturacion@cliente.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Factura</FormLabel>
                   <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Elige una fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dueDate" render={({ field }) => (
                 <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                   <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Elige una fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <div>
              <FormLabel>Items de la Factura</FormLabel>
              <div className="space-y-4 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2">
                    <FormField control={form.control} name={`items.${index}.description`} render={({ field }) => (
                      <FormItem className="flex-grow">
                        {index === 0 && <FormLabel>Descripción</FormLabel>}
                        <FormControl><Input placeholder="Suscripción SaaS" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                      <FormItem className="w-24">
                        {index === 0 && <FormLabel>Cant.</FormLabel>}
                        <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
                         <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name={`items.${index}.price`} render={({ field }) => (
                      <FormItem className="w-32">
                        {index === 0 && <FormLabel>Precio</FormLabel>}
                        <FormControl><Input type="number" placeholder="1500.00" {...field} /></FormControl>
                         <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
               <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ description: "", quantity: 1, price: 0 })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Item
              </Button>
            </div>
            
             <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between items-center font-bold text-lg">
                    <span>Monto Total</span>
                    <span>{formatCurrency(totalAmount, 'Bs.')}</span>
                </div>
            </div>

            <SheetFooter className="flex-col gap-2 pt-4">
                <Button type="submit" className="w-full">Guardar Factura</Button>
                <p className="text-xs text-muted-foreground text-center">
                    Nota: Los pagos vencidos estarán sujetos a recargos por mora según los artículos 108 del C. de Co. y 1.277 del C.C.V.
                </p>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
