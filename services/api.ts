
import axios from 'axios';
import { Employee, CreateEmployeeData, AttendanceRecord, MarkAttendanceData } from '../types';

const API_BASE_URL = process.env.API_URL || 'https://hrms-api-6qee.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const hrmsApi = {
  // Employee APIs
  getEmployees: async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>('/employees');
    return response.data;
  },

  createEmployee: async (data: CreateEmployeeData): Promise<Employee> => {
    const response = await apiClient.post<Employee>('/employees', data);
    return response.data;
  },

  deleteEmployee: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  // Attendance APIs
  markAttendance: async (data: MarkAttendanceData): Promise<AttendanceRecord> => {
    const response = await apiClient.post<AttendanceRecord>('/attendance', data);
    return response.data;
  },

  getAttendanceForEmployee: async (employeePkId: number): Promise<AttendanceRecord[]> => {
    const response = await apiClient.get<AttendanceRecord[]>(`/attendance/${employeePkId}`);
    return response.data;
  },

  checkHealth: async (): Promise<{ status: string }> => {
    const response = await apiClient.get<{ status: string }>('/');
    return response.data;
  },
};
