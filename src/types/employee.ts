export interface Employee {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    startDate: string;
  }
  
  export interface AuthUser {
    email: string;
    password: string;
  }