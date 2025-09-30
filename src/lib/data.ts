import type { Invoice, Transaction } from './types';

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    customer: 'Alpha Inc.',
    customerEmail: 'contact@alpha.inc',
    date: '2024-06-01',
    dueDate: '2024-07-01',
    amount: 250.0,
    status: 'Paid',
    items: [{ description: 'Web Design Consultation', quantity: 1, price: 250 }],
  },
  {
    id: 'INV-002',
    customer: 'Beta Co.',
    customerEmail: 'accounts@betaco.com',
    date: '2024-06-15',
    dueDate: '2024-07-15',
    amount: 1500.0,
    status: 'Sent',
    items: [{ description: 'SaaS Subscription - Yearly', quantity: 1, price: 1500 }],
  },
  {
    id: 'INV-003',
    customer: 'Gamma LLC',
    customerEmail: 'gamma@gamma.llc',
    date: '2024-05-20',
    dueDate: '2024-06-20',
    amount: 350.5,
    status: 'Overdue',
    items: [
      { description: 'Graphic Design Services', quantity: 5, price: 50.1 },
      { description: 'Stock Photos License', quantity: 1, price: 100 },
    ],
  },
  {
    id: 'INV-004',
    customer: 'Delta Solutions',
    customerEmail: 'support@deltasolutions.org',
    date: '2024-07-01',
    dueDate: '2024-08-01',
    amount: 750.0,
    status: 'Draft',
    items: [{ description: 'SEO Audit', quantity: 1, price: 750 }],
  },
  {
    id: 'INV-005',
    customer: 'Epsilon Services',
    customerEmail: 'billing@epsilon.serv',
    date: '2024-06-28',
    dueDate: '2024-07-28',
    amount: 5200.0,
    status: 'Sent',
    items: [{ description: 'Custom Software Development', quantity: 1, price: 5200 }],
  },
];

export const mockTransactions: Transaction[] = [
  { id: 'TR-001', date: '2024-07-15', description: 'Stripe Payout', amount: 1800.0, category: 'Income' },
  { id: 'TR-002', date: '2024-07-14', description: 'DigitalOcean', amount: -50.0, category: 'Utilities' },
  { id: 'TR-003', date: '2024-07-13', description: 'Lunch at The Corner Cafe', amount: -25.5, category: 'Food' },
  { id: 'TR-004', date: '2024-07-12', description: 'Figma Subscription', amount: -15.0, category: 'Software' },
  { id: 'TR-005', date: '2024-07-11', description: 'Client Payment - Beta Co.', amount: 1500.0, category: 'Income' },
  { id: 'TR-006', date: '2024-07-10', description: 'Office Supplies from Amazon', amount: -75.2, category: 'Office Supplies' },
  { id: 'TR-007', date: '2024-07-09', description: 'Gasoline', amount: -45.0, category: 'Transportation' },
  { id: 'TR-008', date: '2024-07-08', description: 'Uncategorized Expense', amount: -120.0, category: 'Uncategorized' },
];

export const financialChartData = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 5000, expenses: 3800 },
  { month: 'Apr', income: 2780, expenses: 1908 },
  { month: 'May', income: 1890, expenses: 800 },
  { month: 'Jun', income: 4390, expenses: 2800 },
  { month: 'Jul', income: 3490, expenses: 2100 },
];

export const mockMovableAssets = [
  { id: 'ASSET-M-001', name: 'Laptop Corporativa', purchaseDate: '2023-01-15', cost: 1200, usefulLife: 5, accumulatedDepreciation: 360, bookValue: 840 },
  { id: 'ASSET-M-002', name: 'Vehículo de reparto', purchaseDate: '2022-03-20', cost: 25000, usefulLife: 10, accumulatedDepreciation: 6250, bookValue: 18750 },
  { id: 'ASSET-M-003', name: 'Mobiliario de Oficina', purchaseDate: '2021-06-01', cost: 5000, usefulLife: 7, accumulatedDepreciation: 2143, bookValue: 2857 },
];

export const mockImmovableAssets = [
    { id: 'ASSET-I-001', name: 'Oficina Principal', purchaseDate: '2018-01-01', cost: 250000, usefulLife: 40, accumulatedDepreciation: 39062.5, bookValue: 210937.5 },
    { id: 'ASSET-I-002', name: 'Almacén', purchaseDate: '2020-05-10', cost: 150000, usefulLife: 25, accumulatedDepreciation: 26000, bookValue: 124000 },
];
