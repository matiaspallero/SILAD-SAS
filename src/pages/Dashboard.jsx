import React, { useState } from 'react';

// --- MOCK DATA ---
const stats = [
  { id: 1, name: 'Notas Pendientes', value: '24', change: '+4.75%', trend: 'up', color: 'text-red-600', bg: 'bg-red-50' },
  { id: 2, name: 'Órdenes Activas', value: '18', change: '-1.39%', trend: 'down', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 3, name: 'En Ejecución', value: '8', change: '+2.02%', trend: 'up', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 4, name: 'Finalizados (Hoy)', value: '12', change: '+10.18%', trend: 'up', color: 'text-green-600', bg: 'bg-green-50' },
  { id: 5, name: 'Cuadrillas Trabajando', value: '5/6', change: '83% Capacidad', trend: 'neutral', color: 'text-orange-600', bg: 'bg-orange-50' },
];

const recentActivity = [
  { id: 'OT-1042', title: 'Reemplazo Luminaria LED', location: 'Av. Mate de Luna 2400', crew: 'Unidad 4 (Grúa)', status: 'EN EJECUCIÓN', date: 'Hoy, 09:30' },
  { id: 'OT-1043', title: 'Poste Inclinado', location: 'Calle San Martín 150', crew: 'Unidad 2', status: 'PENDIENTE', date: 'Hoy, 08:15' },
  { id: 'OT-1040', title: 'Cable Cortocircuito', location: 'Barrio Sur', crew: 'Unidad 1', status: 'CERRADO', date: 'Ayer, 16:45' },
  { id: 'OT-1041', title: 'Tablero Vandalizado', location: 'Plaza Independencia', crew: 'Unidad 3', status: 'EN EJECUCIÓN', date: 'Ayer, 14:20' },
];

const weeklyData = [
  { day: 'Lun', reportados: 12, resueltos: 10 },
  { day: 'Mar', reportados: 15, resueltos: 14 },
  { day: 'Mié', reportados: 8, resueltos: 12 },
  { day: 'Jue', reportados: 20, resueltos: 15 },
  { day: 'Vie', reportados: 14, resueltos: 18 },
  { day: 'Sáb', reportados: 5, resueltos: 8 },
  { day: 'Dom', reportados: 3, resueltos: 4 },
];

// --- UI COMPONENTS ---
const Badge = ({ status }) => {
  const styles = {
    'PENDIENTE': 'bg-gray-100 text-gray-800 border-gray-200',
    'EN EJECUCIÓN': 'bg-blue-100 text-blue-800 border-blue-200',
    'CERRADO': 'bg-green-100 text-green-800 border-green-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles['PENDIENTE']}`}>
      {status}
    </span>
  );
};

const Icons = {
  Up: () => <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>,
  Down: () => <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
};

// --- MAIN DASHBOARD COMPONENT ---
export default function Dashboard() {
  const [filter, setFilter] = useState('ALL');

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resumen Operativo</h1>
            <p className="text-sm text-slate-500 mt-1">Mantenimiento Urbano - Estado en tiempo real</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              Exportar Reporte
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              + Nueva Nota EP/e
            </button>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 truncate">{stat.name}</p>
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                <div className="flex items-center space-x-1 text-sm font-medium text-slate-500">
                  {stat.trend === 'up' && <Icons.Up />}
                  {stat.trend === 'down' && <Icons.Down />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Simple CSS Bar Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Balance Semanal</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {weeklyData.map((data, index) => {
                const maxVal = Math.max(...weeklyData.map(d => Math.max(d.reportados, d.resueltos)));
                const repHeight = `${(data.reportados / maxVal) * 100}%`;
                const resHeight = `${(data.resueltos / maxVal) * 100}%`;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1 space-y-2 group">
                    <div className="flex w-full justify-center space-x-1 h-48 items-end">
                      <div style={{ height: repHeight }} className="w-1/2 bg-slate-200 rounded-t-sm group-hover:bg-slate-300 transition-colors" title={`Reportados: ${data.reportados}`}></div>
                      <div style={{ height: resHeight }} className="w-1/2 bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors" title={`Resueltos: ${data.resueltos}`}></div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{data.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-xs font-medium text-slate-500">
              <div className="flex items-center"><span className="w-3 h-3 bg-slate-200 rounded-full mr-2"></span> Reportados</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Resueltos</div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800">Actividad Reciente</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Ver todas →</button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID / Tarea</th>
                    <th className="px-6 py-4 font-medium">Ubicación</th>
                    <th className="px-6 py-4 font-medium">Cuadrilla</th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentActivity.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{item.id}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.title}</p>
                      </td>
                      <td className="px-6 py-4">{item.location}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                            {item.crew.charAt(0)}
                          </div>
                          <span>{item.crew}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={item.status} />
                        <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}