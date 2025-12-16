
import type { Invoice, Transaction } from './types';

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    customer: 'Alpha Inc.',
    customerEmail: 'contact@alpha.inc',
    date: '2024-06-01',
    dueDate: '2024-07-01',
    amount: 250.0,
    status: 'Pagada',
    items: [{ description: 'Web Design Consultation', quantity: 1, price: 250 }],
  },
  {
    id: 'INV-002',
    customer: 'Beta Co.',
    customerEmail: 'accounts@betaco.com',
    date: '2024-06-15',
    dueDate: '2024-07-15',
    amount: 1500.0,
    status: 'Enviada',
    items: [{ description: 'SaaS Subscription - Yearly', quantity: 1, price: 1500 }],
  },
  {
    id: 'INV-003',
    customer: 'Gamma LLC',
    customerEmail: 'gamma@gamma.llc',
    date: '2024-05-20',
    dueDate: '2024-06-20',
    amount: 350.5,
    status: 'Vencida',
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
    status: 'Borrador',
    items: [{ description: 'SEO Audit', quantity: 1, price: 750 }],
  },
  {
    id: 'INV-005',
    customer: 'Epsilon Services',
    customerEmail: 'billing@epsilon.serv',
    date: '2024-06-28',
    dueDate: '2024-07-28',
    amount: 5200.0,
    status: 'Enviada',
    items: [{ description: 'Custom Software Development', quantity: 1, price: 5200 }],
  },
];

export const mockTransactions: Transaction[] = [
  { id: 'TR-001', date: '2024-07-15', description: 'Pago de Stripe', amount: 1800.0, category: 'Ingreso' },
  { id: 'TR-002', date: '2024-07-14', description: 'DigitalOcean', amount: -50.0, category: 'Servicios Públicos' },
  { id: 'TR-003', date: '2024-07-13', description: 'Almuerzo en The Corner Cafe', amount: -25.5, category: 'Comida' },
  { id: 'TR-004', date: '2024-07-12', description: 'Suscripción de Figma', amount: -15.0, category: 'Software' },
  { id: 'TR-005', date: '2024-07-11', description: 'Pago de Cliente - Beta Co.', amount: 1500.0, category: 'Ingreso' },
  { id: 'TR-006', date: '2024-07-10', description: 'Suministros de Oficina de Amazon', amount: -75.2, category: 'Suministros de Oficina' },
  { id: 'TR-007', date: '2024-07-09', description: 'Gasolina', amount: -45.0, category: 'Transporte' },
  { id: 'TR-008', date: '2024-07-08', description: 'Gasto no categorizado', amount: -120.0, category: 'Sin Categorizar' },
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

export const financialChartData = [
  { month: "Feb '24", completed: 5, pending: 3 },
  { month: "Mar '24", completed: 8, pending: 2 },
  { month: "Abr '24", completed: 6, pending: 4 },
  { month: "May '24", completed: 10, pending: 1 },
  { month: "Jun '24", completed: 7, pending: 3 },
  { month: "Jul '24", completed: 5, pending: 2 },
];

export const dailyChartData = [
    { date: "15/07", completed: 2, pending: 1 },
    { date: "16/07", completed: 3, pending: 2 },
    { date: "17/07", completed: 1, pending: 3 },
    { date: "18/07", completed: 4, pending: 1 },
    { date: "19/07", completed: 2, pending: 4 },
    { date: "20/07", completed: 5, pending: 2 },
    { date: "21/07", completed: 3, pending: 1 },
    { date: "22/07", completed: 1, pending: 2 },
];
