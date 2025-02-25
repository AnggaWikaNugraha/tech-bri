import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { EmployeeList } from './components/list-employee';
import useApi from './hooks/UseApi';

function App() {

  const { worker } = require('./mocks/browser')
  worker.start()

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'employees' | 'products'>('employees');

  const { data: employees, loading, error } = useApi('https://api.example.com/employees', 'GET');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <EmployeeList
        employees={employees}
      // onDelete={handleDeleteEmployee} 
      />
    </div>
  );
}

export default App;
