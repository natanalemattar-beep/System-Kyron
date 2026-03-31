
export type Invoice = {
  id: string;
  userId?: string;
  customer: string;
  customerEmail: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Pagada' | 'Enviada' | 'Borrador' | 'Vencida';
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
};

export type Transaction = {
  id: string;
  userId?: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};
