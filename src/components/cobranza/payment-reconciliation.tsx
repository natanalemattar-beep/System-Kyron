
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  method: 'transferencia' | 'tarjeta' | 'efectivo' | 'punto_venta' | 'cripto';
  status: 'pending' | 'completed' | 'failed' | 'reconciled';
  date: Date;
  reference: string;
  bank?: string;
  reconciliationDate?: Date;
}

interface PaymentMethod {
  method: string;
  count: number;
  amount: number;
  fee: number;
  netAmount: number;
}

export const PaymentReconciliation = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const paymentData: Payment[] = [
      {
        id: 'pay-001',
        clientId: 'cl-001',
        clientName: 'TechSolutions Corp',
        amount: 15000,
        method: 'transferencia',
        status: 'reconciled',
        date: new Date('2024-05-15'),
        reference: 'TRF-20240515-001',
        bank: 'Bancamiga',
        reconciliationDate: new Date('2024-05-16')
      },
      {
        id: 'pay-002',
        clientId: 'cl-004',
        clientName: 'Consultores Asociados',
        amount: 20000,
        method: 'tarjeta',
        status: 'completed',
        date: new Date('2024-05-28'),
        reference: 'TCD-20240528-001'
      },
      {
        id: 'pay-003',
        clientId: 'cl-002',
        clientName: 'Distribuidora La Económica',
        amount: 8000,
        method: 'punto_venta',
        status: 'pending',
        date: new Date('2024-05-30'),
        reference: 'POS-20240530-001'
      },
      {
        id: 'pay-004',
        clientId: 'cl-003',
        clientName: 'Constructora Norte',
        amount: 25000,
        method: 'transferencia',
        status: 'failed',
        date: new Date('2024-05-25'),
        reference: 'TRF-20240525-001',
        bank: 'Venezuela'
      }
    ];

    setPayments(paymentData);
    
    const methods: { [key: string]: PaymentMethod } = {};

    paymentData.forEach(payment => {
      if (!methods[payment.method]) {
        methods[payment.method] = { method: payment.method, count: 0, amount: 0, fee: 0, netAmount: 0 };
      }

      methods[payment.method].count++;
      methods[payment.method].amount += payment.amount;
      
      const feeRate = { 'transferencia': 0.01, 'tarjeta': 0.03, 'punto_venta': 0.02, 'efectivo': 0, 'cripto': 0.015 }[payment.method] || 0;
      methods[payment.method].fee += payment.amount * feeRate;
      methods[payment.method].netAmount += payment.amount * (1 - feeRate);
    });

    setPaymentMethods(Object.values(methods));

  }, []);

  const reconcilePayment = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'reconciled', reconciliationDate: new Date() }
        : payment
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reconciled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'transferencia': return '🏦';
      case 'tarjeta': return '💳';
      case 'efectivo': return '💰';
      case 'punto_venta': return '💻';
      case 'cripto': return '₿';
      default: return '💸';
    }
  };

  const filteredPayments = filterStatus === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === filterStatus);

  const totalCollected = payments.filter(p => p.status === 'reconciled' || p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingReconciliation = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sistema de Pagos y Conciliación</h2>
          <p className="text-muted-foreground">Gestión automatizada de cobros y conciliación bancaria</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="reconciled">Conciliados</option>
            <option value="completed">Completados</option>
            <option value="pending">Pendientes</option>
            <option value="failed">Fallidos</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">${(totalCollected / 1000).toFixed(0)}K</div>
          <div className="text-sm text-green-800">Total Cobrado</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">${(pendingReconciliation / 1000).toFixed(0)}K</div>
          <div className="text-sm text-blue-800">Por Conciliar</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{payments.filter(p => p.status === 'reconciled').length}</div>
          <div className="text-sm text-purple-800">Pagos Conciliados</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Transacciones Recientes</h3>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getMethodIcon(payment.method)}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{payment.clientName}</h4>
                      <p className="text-sm text-muted-foreground">{payment.reference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${payment.amount.toLocaleString()}</div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Método:</span>
                    <div className="font-medium capitalize">{payment.method}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fecha:</span>
                    <div className="font-medium">{payment.date.toLocaleDateString()}</div>
                  </div>
                  {payment.bank && (<div><span className="text-muted-foreground">Banco:</span><div className="font-medium">{payment.bank}</div></div>)}
                  {payment.reconciliationDate && (<div><span className="text-muted-foreground">Conciliado:</span><div className="font-medium">{payment.reconciliationDate.toLocaleDateString()}</div></div>)}
                </div>

                {payment.status === 'completed' && (
                  <Button onClick={() => reconcilePayment(payment.id)} size="sm" className="w-full">Conciliar Pago</Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Métodos de Pago</h3>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.method} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getMethodIcon(method.method)}</span>
                    <h4 className="font-medium text-gray-900 capitalize">{method.method}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{method.count}</div>
                    <div className="text-xs text-muted-foreground">transacciones</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Monto Total:</span><span className="font-medium">${method.amount.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Comisiones:</span><span className="font-medium text-red-600">-${method.fee.toLocaleString()}</span></div>
                  <div className="flex justify-between border-t pt-2"><span className="text-muted-foreground font-medium">Neto:</span><span className="font-bold text-green-600">${method.netAmount.toLocaleString()}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
