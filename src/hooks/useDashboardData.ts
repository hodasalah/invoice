import {
	collection,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/firebaseConfigs/firebase';

interface DashboardStats {
  revenue: number;
  outstanding: number;
  clients: number;
  payments: number;
  invoices: number;
  walletBalance: number;
  averageInvoice: number;
  collectionRate: number;
}

interface RevenueMonth {
  name: string;
  revenue: number;
}

export const useDashboardData = (
  uid?: string
) => {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
  useState<DashboardStats>({
    revenue: 0,
    outstanding: 0,
    clients: 0,
    payments: 0,
    invoices: 0,
    walletBalance: 0,
    averageInvoice: 0,
    collectionRate: 0,
  });

  const [invoiceStatus, setInvoiceStatus] =
    useState({
      paid: 0,
      unpaid: 0,
    });

  const [revenueChart, setRevenueChart] =
    useState<RevenueMonth[]>([]);

  const [recentInvoices, setRecentInvoices] =
    useState<any[]>([]);

  const [recentPayments, setRecentPayments] =
    useState<any[]>([]);

  const [topClients, setTopClients] =
    useState<any[]>([]);

  const [bestClient, setBestClient] =
    useState<any | null>(null);

  useEffect(() => {
    if (!uid) return;

    let invoices: any[] = [];
    let clients: any[] = [];
    let payments: any[] = [];

    const calculateDashboard = () => {

      // ==================
      // Revenue
      // ==================

      const revenue = invoices
        .filter(
          invoice =>
            invoice.status === 'paid'
        )
        .reduce(
          (sum, invoice) =>
            sum + (invoice.total || 0),
          0
        );

      // ==================
      // Outstanding
      // ==================

      const outstanding = invoices
        .filter(
          invoice =>
            invoice.status === 'unpaid'
        )
        .reduce(
          (sum, invoice) =>
            sum + (invoice.total || 0),
          0
        );

      // ==================
      // Paid / Unpaid Count
      // ==================

      const paidCount =
        invoices.filter(
          invoice =>
            invoice.status === 'paid'
        ).length;

      const unpaidCount =
        invoices.filter(
          invoice =>
            invoice.status === 'unpaid'
        ).length;
			const collectionRate =
  invoices.length > 0
    ? (paidCount / invoices.length) * 100
    : 0;
      // ==================
      // Average Invoice
      // ==================

      const averageInvoice =
        invoices.length > 0
          ? invoices.reduce(
              (sum, invoice) =>
                sum +
                (invoice.total || 0),
              0
            ) / invoices.length
          : 0;

      // ==================
      // Revenue Chart
      // ==================

      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const monthlyRevenue =
        months.map(
          (month, index) => {
            const total =
              invoices
                .filter(invoice => {
                  if (
                    !invoice.date
                  )
                    return false;

                  const date =
                    new Date(
                      invoice.date
                    );

                  return (
                    date.getMonth() ===
                      index &&
                    invoice.status ===
                      'paid'
                  );
                })
                .reduce(
                  (
                    sum,
                    invoice
                  ) =>
                    sum +
                    (invoice.total ||
                      0),
                  0
                );

            return {
              name: month,
              revenue: total,
            };
          }
        );

      // ==================
      // Latest Invoices
      // ==================

      const latestInvoices = [
        ...invoices,
      ]
        .sort(
          (a, b) =>
            new Date(
              b.date
            ).getTime() -
            new Date(
              a.date
            ).getTime()
        )
        .slice(0, 5);

      // ==================
      // Latest Payments
      // ==================

      const latestPayments = [
        ...payments,
      ]
        .sort(
          (a, b) =>
            new Date(
              b.date
            ).getTime() -
            new Date(
              a.date
            ).getTime()
        )
        .slice(0, 5);

      // ==================
      // Top Clients
      // ==================

      const clientTotals:
        Record<
          string,
          number
        > = {};

      invoices.forEach(
        invoice => {
          const clientName =
            invoice.clientName ||
            'Unknown';

          clientTotals[
            clientName
          ] =
            (clientTotals[
              clientName
            ] || 0) +
            (invoice.total ||
              0);
        }
      );

      const rankedClients =
        Object.entries(
          clientTotals
        )
          .map(
            ([
              name,
              total,
            ]) => ({
              name,
              total,
            })
          )
          .sort(
            (a, b) =>
              b.total -
              a.total
          );

      setTopClients(
        rankedClients.slice(
          0,
          5
        )
      );

      setBestClient(
        rankedClients.length
          ? rankedClients[0]
          : null
      );

      // ==================
      // State Updates
      // ==================

     setStats({
  revenue,
  outstanding,
  clients: clients.length,
  payments: payments.length,
  invoices: invoices.length,
  walletBalance: revenue,
  averageInvoice,
  collectionRate,
});

      setInvoiceStatus({
        paid: paidCount,
        unpaid: unpaidCount,
      });

      setRevenueChart(
        monthlyRevenue
      );

      setRecentInvoices(
        latestInvoices
      );

      setRecentPayments(
        latestPayments
      );

      setLoading(false);
    };

    const invoicesQuery =
      query(
        collection(
          db,
          'invoices'
        ),
        where(
          'userId',
          '==',
          uid
        )
      );

    const clientsQuery =
      query(
        collection(
          db,
          'clients'
        ),
        where(
          'userId',
          '==',
          uid
        )
      );

    const paymentsQuery =
      query(
        collection(
          db,
          'payments'
        ),
        where(
          'userId',
          '==',
          uid
        )
      );

    const unsubscribeInvoices =
      onSnapshot(
        invoicesQuery,
        snapshot => {
          invoices =
            snapshot.docs.map(
              doc => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          calculateDashboard();
        }
      );

    const unsubscribeClients =
      onSnapshot(
        clientsQuery,
        snapshot => {
          clients =
            snapshot.docs.map(
              doc => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          calculateDashboard();
        }
      );

    const unsubscribePayments =
      onSnapshot(
        paymentsQuery,
        snapshot => {
          payments =
            snapshot.docs.map(
              doc => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          calculateDashboard();
        }
      );

    return () => {
      unsubscribeInvoices();
      unsubscribeClients();
      unsubscribePayments();
    };
  }, [uid]);

  return {
    loading,
    stats,
    invoiceStatus,
    revenueChart,
    recentInvoices,
    recentPayments,
    topClients,
    bestClient,
  };
};
