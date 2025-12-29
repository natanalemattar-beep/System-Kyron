
import type { Invoice, Transaction } from './types';

// This data is now for demonstration purposes only.
// The application should fetch data from Firestore.

export const mockInvoices: Invoice[] = [];

export const mockTransactions: Transaction[] = [];


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
