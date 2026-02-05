
import React, { useState, useEffect } from 'react';
import { hrmsApi } from '../services/api';
import { Employee, AttendanceRecord, AttendanceStatus } from '../types';
import { Check, X, Calendar, Search, Filter, Loader2, History, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Attendance: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [historyModal, setHistoryModal] = useState<{ open: boolean; emp: Employee | null; records: AttendanceRecord[] }>({
    open: false,
    emp: null,
    records: []
  });
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const emps = await hrmsApi.getEmployees();
      setEmployees(emps);
    } catch (err) {
      setError("Failed to load attendance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkAttendance = async (empPkId: number, status: AttendanceStatus) => {
    try {
      await hrmsApi.markAttendance({
        employee_id: empPkId,
        date: selectedDate,
        status: status
      });
      alert(`Attendance for today marked as ${status}.`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        alert("Attendance already marked for this date.");
      } else {
        alert("Failed to mark attendance.");
      }
    }
  };

  const viewHistory = async (emp: Employee) => {
    try {
      const records = await hrmsApi.getAttendanceForEmployee(emp.id);
      setHistoryModal({ open: true, emp, records });
    } catch (err) {
      alert("Failed to load attendance history.");
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Daily Attendance</h2>
          <p className="text-zinc-500 mt-1">Mark present/absent for employees on a specific date.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 shadow-xl">
          <div className="flex items-center gap-2 px-3 text-zinc-500">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Date:</span>
          </div>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-zinc-800 text-zinc-100 px-4 py-2 rounded-lg outline-none border border-transparent focus:border-blue-500 text-sm font-semibold transition-all"
          />
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search employees to mark..." 
            className="bg-transparent border-none outline-none text-zinc-100 flex-1 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-zinc-500 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span>Loading rosters...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 text-xs uppercase tracking-wider bg-zinc-900/50">
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold text-center">History</th>
                  <th className="px-6 py-4 font-semibold text-center w-80">Action ({selectedDate})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                      No employees to show.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-sm">
                            {emp.full_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-100">{emp.full_name}</div>
                            <div className="text-xs text-zinc-500">{emp.department} • {emp.employee_id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => viewHistory(emp)}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 transition-colors"
                          title="View History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleMarkAttendance(emp.id, AttendanceStatus.PRESENT)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all text-xs font-bold"
                          >
                            <Check className="w-4 h-4" /> Present
                          </button>
                          <button 
                            onClick={() => handleMarkAttendance(emp.id, AttendanceStatus.ABSENT)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all text-xs font-bold"
                          >
                            <X className="w-4 h-4" /> Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* History Modal */}
      {historyModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setHistoryModal({ ...historyModal, open: false })} />
          <div className="relative glass w-full max-w-lg rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-bold">History: {historyModal.emp?.full_name}</h3>
              </div>
              <button onClick={() => setHistoryModal({ ...historyModal, open: false })} className="text-zinc-500 hover:text-zinc-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-[400px] overflow-y-auto">
              {historyModal.records.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">No attendance records found for this employee.</div>
              ) : (
                <div className="space-y-3">
                  {historyModal.records.slice().reverse().map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span className="font-mono text-sm">{record.date}</span>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        record.status === AttendanceStatus.PRESENT 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
