
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CalendarCheck, 
  Building2, 
  TrendingUp,
  UserPlus,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { hrmsApi } from '../services/api';
import { Employee } from '../types';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const emps = await hrmsApi.getEmployees();
        setEmployees(emps);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Unable to connect to the HRMS service.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const deptCount = new Set(employees.map(e => e.department)).size;

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: <Users className="w-6 h-6" />, color: 'blue' },
    { label: 'Departments', value: deptCount, icon: <Building2 className="w-6 h-6" />, color: 'purple' },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-500 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="font-medium">Loading organization data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 rotate-180" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Good Morning, Admin</h2>
          <p className="text-zinc-500 mt-1">Here's what's happening with your workforce today.</p>
        </div>
        <Link 
          to="/employees" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          <UserPlus className="w-5 h-5" /> Add Employee
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl hover:border-zinc-700 transition-colors group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 bg-${stat.color}-500/10 text-${stat.color}-500`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Hires</h3>
            <Link to="/employees" className="text-sm text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {employees.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">No employees found in records.</div>
            ) : (
              employees.slice(-5).reverse().map((emp) => (
                <div key={emp.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400">
                    {emp.full_name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{emp.full_name}</div>
                    <div className="text-xs text-zinc-500">{emp.department} • {emp.email}</div>
                  </div>
                  <div className="text-xs text-zinc-600 font-mono">{emp.employee_id}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
