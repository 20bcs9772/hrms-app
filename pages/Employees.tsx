
import React, { useState, useEffect } from 'react';
import { hrmsApi } from '../services/api';
import { Employee, CreateEmployeeData } from '../types';
import { Plus, Search, Trash2, Mail, Briefcase, Hash, X, AlertCircle, Users, Loader2 } from 'lucide-react';
import axios from 'axios';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<CreateEmployeeData>({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await hrmsApi.getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setError("Failed to load employee list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Frontend validation
    if (!formData.employee_id || !formData.full_name || !formData.email || !formData.department) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      await hrmsApi.createEmployee(formData);
      setIsModalOpen(false);
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
      await fetchEmployees(); // Refresh list
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("Employee already exists with this ID.");
        } else {
          setError(err.response?.data?.detail || "An error occurred while creating the employee.");
        }
      } else {
        setError("Network error. Please check your backend.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to remove this employee? This action cannot be undone.')) {
      try {
        await hrmsApi.deleteEmployee(id);
        await fetchEmployees();
      } catch (err) {
        alert("Failed to delete employee.");
      }
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Employee Directory</h2>
          <p className="text-zinc-500 mt-1">Manage and view all members of your organization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" /> Add New Employee
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search by name, ID or department..." 
            className="bg-transparent border-none outline-none text-zinc-100 flex-1 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-zinc-500 gap-4">
             <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
             <span>Fetching records...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 text-xs uppercase tracking-wider bg-zinc-900/50">
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold">Employee ID</th>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                      {searchTerm ? "No employees found matching your search." : "No employees added yet."}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-blue-500 border border-zinc-700">
                            {emp.full_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-100">{emp.full_name}</div>
                            <div className="text-sm text-zinc-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                          {emp.employee_id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-300 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(emp.id)}
                          className="text-zinc-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !submitting && setIsModalOpen(false)} />
          <div className="relative glass w-full max-w-md rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Add New Employee</h3>
              <button disabled={submitting} onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-100 disabled:opacity-50">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="p-6 space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase px-1">Full Name</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <Users className="w-4 h-4" />
                  </div>
                  <input 
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase px-1">Email Address</label>
                <div className="relative">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    placeholder="e.g. john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase px-1">Employee ID</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input 
                      name="employee_id"
                      required
                      value={formData.employee_id}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm"
                      placeholder="EMP001"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase px-1">Department</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <select 
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm appearance-none"
                    >
                      <option value="">Select Dept</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Product">Product</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4 flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : 'Create Employee'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
