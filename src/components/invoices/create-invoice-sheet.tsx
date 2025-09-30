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
  customer: z.string().min(1, "Customer name is required."),
  customerEmail: z.string().email("Invalid email address."),
  date: z.date({ required_error: "Invoice date is required." }),
  dueDate: z.date({ required_error: "Due date is required." }),
  items: z.array(z.object({
    description: z.string().min(1, "Item description is required."),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
    price: z.coerce.number().min(0.01, "Price must be positive."),
  })).min(1, "At least one item is required."),
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
        title: "Invoice Created",
        description: `Invoice for ${data.customer} has been drafted.`
    })
    // Here you would typically send the data to your backend
    form.reset();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-2xl w-full">
        <SheetHeader>
          <SheetTitle>Create Invoice</SheetTitle>
          <SheetDescription>
            Fill out the details to create a new invoice.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6 overflow-y-auto pr-6 h-[calc(100vh-10rem)]">
            <div className="grid grid-cols-2 gap-4">
               <FormField control={form.control} name="customer" render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl><Input placeholder="Client Corp." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="customerEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Email</FormLabel>
                  <FormControl><Input placeholder="billing@client.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice Date</FormLabel>
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
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                  <FormLabel>Due Date</FormLabel>
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
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
              <FormLabel>Invoice Items</FormLabel>
              <div className="space-y-4 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2">
                    <FormField control={form.control} name={`items.${index}.description`} render={({ field }) => (
                      <FormItem className="flex-grow">
                        {index === 0 && <FormLabel>Description</FormLabel>}
                        <FormControl><Input placeholder="SaaS Subscription" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                      <FormItem className="w-24">
                        {index === 0 && <FormLabel>Qty</FormLabel>}
                        <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
                         <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name={`items.${index}.price`} render={({ field }) => (
                      <FormItem className="w-32">
                        {index === 0 && <FormLabel>Price</FormLabel>}
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
                <PlusCircle className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
            
             <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </div>

            <SheetFooter>
                <Button type="submit" className="w-full">Save Invoice</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
