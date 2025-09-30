export type Invoice = {
  id: string;
  customer: string;
  customerEmail: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Sent' | 'Draft' | 'Overdue';
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};
