import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { EmployeeList } from './components/list-employee';
import useApi from './hooks/UseApi';
import { AuthUser, Employee } from './types/employee';
import { LoginForm } from './pages/Login';
import { EmployeeForm } from './components/add-employee';

function App() {

  const { worker } = require('./mocks/browser')
  worker.start()

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'employees' | 'products'>('employees');


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const { data: employees, loading, error } = useApi('https://api.example.com/employees', 'GET');
  //     setEmployees(employees)
  //   }
  // }, [isAuthenticated]);

  // const HandleLogin = async (data: AuthUser) => {
  //   const { data: response, loading, error } = useApi('https://api.example.com/auth/login', 'POST', data);
  //   console.log(response)
  // };

  const HandleLogin = async (data: AuthUser) => {
    try {
      const response = await fetch('https://api.example.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const response = await fetch(`https://api.example.com/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter(emp => emp.id !== id));
        alert('Employee deleted successfully!');
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting employee');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://api.example.com/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  const handleEmployeeSubmit = async (data: Employee) => {
    try {
      const response = await fetch('https://api.example.com/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEmployee = await response.json();
        setEmployees([...employees, newEmployee]);
        alert('Employee added successfully!');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('An error occurred while adding employee');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
      // fetchProducts();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <LoginForm onSubmit={HandleLogin} />
      ) : (
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`${activeTab === 'employees'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Employees
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`${activeTab === 'products'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Products
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'employees' ? (
            <>
              <EmployeeForm onSubmit={handleEmployeeSubmit} />
              <EmployeeList employees={employees} onDelete={handleDeleteEmployee} />
            </>
          ) : (
            <>
              {/* <ProductForm
                onSubmit={handleProductSubmit}
                initialData={editingProduct || undefined}
              />
              <ProductList
                products={products}
                onDelete={handleDeleteProduct}
                onEdit={setEditingProduct}
                onPurchase={handlePurchaseProduct}
              /> */}
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default App;
