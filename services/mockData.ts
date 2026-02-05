
import { Employee, AttendanceRecord, AttendanceStatus } from '../types';

const EMPLOYEES_KEY = 'hrms_lite_employees';
const ATTENDANCE_KEY = 'hrms_lite_attendance';

// Fix: Ensure the initial mock data matches the Employee interface (id as number, snake_case properties)
const initialEmployees: Employee[] = [
  { id: 1, employee_id: 'EMP001', full_name: 'Sarah Jenkins', email: 'sarah.j@company.com', department: 'Engineering' },
  { id: 2, employee_id: 'EMP002', full_name: 'Michael Chen', email: 'm.chen@company.com', department: 'Design' },
  { id: 3, employee_id: 'EMP003', full_name: 'Alex Rivera', email: 'arivera@company.com', department: 'Marketing' },
];

export const storage = {
  getEmployees: (): Employee[] => {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    if (!data) {
      localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(initialEmployees));
      return initialEmployees;
    }
    return JSON.parse(data);
  },

  saveEmployees: (employees: Employee[]) => {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  },

  getAttendance: (): AttendanceRecord[] => {
    const data = localStorage.getItem(ATTENDANCE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAttendance: (records: AttendanceRecord[]) => {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
  }
};
