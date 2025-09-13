import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
const AdminIndex: React.FC & { layout?: (page: React.ReactNode) => React.ReactNode } = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p>Witaj w panelu administracyjnym.</p>
    </div>
  );
};

AdminIndex.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default AdminIndex;
