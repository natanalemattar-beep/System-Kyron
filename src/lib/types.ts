
export type Invoice = {
  id: string;
  userId?: string; // Added for Firestore rules
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
  userId?: string; // Added for Firestore rules
  date: string;
  description: string;
  amount: number;
  category: string;
};
