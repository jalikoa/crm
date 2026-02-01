import customers from './customers.json';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  avatarBg: string | null;
  initials: string | null;
  groups: string[];
  date: string;
  status: 'Active' | 'Inactive' | 'Declined';
}

/**
 * Dummy API function to fetch customers
 * Replace this with your actual API call later
 * Example: return fetch('/api/customers').then(res => res.json())
 */
export async function fetchCustomers(): Promise<Customer[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customers as Customer[]);
    }, 500); // Simulate 500ms network delay
  });
}

/**
 * Get a single customer by ID
 */
export async function fetchCustomerById(id: number): Promise<Customer | undefined> {
  const allCustomers = await fetchCustomers();
  return allCustomers.find(customer => customer.id === id);
}

/**
 * Search customers by name or email
 */
export async function searchCustomers(query: string): Promise<Customer[]> {
  const allCustomers = await fetchCustomers();
  const lowerQuery = query.toLowerCase();
  return allCustomers.filter(customer =>
    customer.name.toLowerCase().includes(lowerQuery) ||
    customer.email.toLowerCase().includes(lowerQuery)
  );
}
