import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmployeeList } from '../components/list-employee';

describe('EmployeeList', () => {
  const mockEmployees = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      position: 'Developer',
      department: 'Engineering',
      startDate: '2024-03-01'
    }
  ];

  const mockOnDelete = vi.fn();

  it('renders employee list correctly', () => {
    render(<EmployeeList employees={mockEmployees} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('shows "No employees found" when list is empty', () => {
    render(<EmployeeList employees={[]} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('No employees found')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<EmployeeList employees={mockEmployees} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByLabelText('Delete John Doe');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});