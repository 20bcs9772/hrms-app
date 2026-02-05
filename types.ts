
export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent'
}

export interface AttendanceRecord {
  id: number;
  date: string;
  status: AttendanceStatus;
}

export interface Employee {
  id: number;
  employee_id: string; // Unique custom ID string
  full_name: string;
  email: string;
  department: string;
}

export interface CreateEmployeeData {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

export interface MarkAttendanceData {
  employee_id: number; // The database primary key ID
  date: string;
  status: AttendanceStatus;
}
