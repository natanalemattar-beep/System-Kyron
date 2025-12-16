import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockInvoices } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

export function RecentInvoices() {
  const recentInvoices = mockInvoices.slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>
          You have {mockInvoices.filter((i) => i.status === "Sent" || i.status === "Overdue").length} pending invoices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentInvoices.map((invoice) => (
          <div key={invoice.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{invoice.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {invoice.customer}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(invoice.date)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {formatCurrency(invoice.amount)}
            </div>
          </div>
        ))}
         <Button asChild className="w-full">
            <Link href="/(admin)/invoices">
              View All Invoices <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
      </CardContent>
    </Card>
  );
}
