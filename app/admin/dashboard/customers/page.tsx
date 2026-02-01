'use client';

import React, { useEffect, useState } from 'react';
import { fetchCustomers, type Customer } from '@/data/customersApi';
import CustomersPageHeader from '@/components/customers/CustomersPageHeader';
import CustomersStatsCards from '@/components/customers/CustomersStatsCards';
import CustomersTable from '@/components/customers/CustomersTable';
import { LoadingState, ErrorState } from '@/components/customers/LoadingErrorStates';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      <main className="nxl-container">
        <div className="nxl-content">
          <CustomersPageHeader />
          <CustomersStatsCards />
          <CustomersTable customers={customers} />
        </div>
      </main>
    </>
  );
}