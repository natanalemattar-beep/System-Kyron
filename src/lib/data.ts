
import type { Invoice, Transaction } from './types';

// This data is now for demonstration purposes only.
// The application should fetch data from Firestore.

export const mockInvoices: Invoice[] = [
    {
      id: 'INV-001',
      customer: 'Tech Solutions LLC',
      customerEmail: 'billing@techsolutions.com',
      date: '2024-07-20',
      dueDate: '2024-08-19',
      amount: 5000,
      status: 'Enviada',
      items: [{ description: 'Consultoría de Software', quantity: 20, price: 250 }],
    },
    {
      id: 'INV-002',
      customer: 'Innovate Corp',
      customerEmail: 'accounts@innovatecorp.com',
      date: '2024-07-18',
      dueDate: '2024-08-17',
      amount: 12000,
      status: 'Pagada',
      items: [{ description: 'Desarrollo de App Móvil', quantity: 1, price: 12000 }],
    },
    {
      id: 'INV-003',
      customer: 'Marketing Pro',
      customerEmail: 'contact@marketingpro.net',
      date: '2024-06-25',
      dueDate: '2024-07-25',
      amount: 2500,
      status: 'Vencida',
      items: [{ description: 'Campaña en Redes Sociales', quantity: 1, price: 2500 }],
    },
     {
      id: 'INV-004',
      customer: 'Constructora XYZ',
      customerEmail: 'pagos@constructoraxyz.com',
      date: '2024-07-22',
      dueDate: '2024-08-21',
      amount: 7500,
      status: 'Borrador',
      items: [{ description: 'Planos Arquitectónicos', quantity: 3, price: 2500 }],
    },
     {
      id: 'INV-005',
      customer: 'Epsilon Services',
      customerEmail: 'admin@epsilon.com',
      date: '2024-07-15',
      dueDate: '2024-08-14',
      amount: 800,
      status: 'Enviada',
      items: [{ description: 'Mantenimiento de Servidores', quantity: 1, price: 800 }],
    },
];

export const mockTransactions: Transaction[] = [
  { id: 'TXN-001', date: '2024-07-22', description: 'Suscripción a Adobe Creative Cloud', amount: -59.99, category: 'Software' },
  { id: 'TXN-002', date: '2024-07-21', description: 'Pago de Cliente - Factura INV-002', amount: 12000, category: 'Ingreso' },
  { id: 'TXN-003', date: '2024-07-20', description: 'Compra de Suministros de Oficina', amount: -125.50, category: 'Suministros de Oficina' },
  { id: 'TXN-004', date: '2024-07-20', description: 'Almuerzo de equipo', amount: -85.75, category: 'Comida' },
  { id: 'TXN-005', date: '2024-07-19', description: 'Pago de servicio de internet', amount: -75.00, category: 'Servicios Públicos' },
  { id: 'TXN-006', date: '2024-07-18', description: 'Viaje en taxi para reunión con cliente', amount: -22.30, category: 'Transporte' },
  { id: 'TXN-007', date: '2024-07-17', description: 'Ingreso por consultoría menor', amount: 500, category: 'Ingreso' },
  { id: 'TXN-008', date: '2024-07-16', description: 'Reembolso por producto devuelto', amount: -45.00, category: 'Sin Categorizar' },
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
