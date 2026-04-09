import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ROLES } from '../utils/stateMachine';

export default function DashboardLayout() {
  const location = useLocation();
  const { rolActual, setRol } = useContext(AppContext);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Notas', href: '/notas', icon: '📝' },
    { name: 'Órdenes de Trabajo', href: '/ordenes', icon: '📋' },
    { name: 'Cuadrillas', href: '/cuadrillas', icon: '👥' },
    { name: 'Reportes', href: '/reportes', icon: '📈' },
  ];

  const isActive = (href) => location.pathname.startsWith(href);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col md:flex">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-wider">URBAN<span className="text-blue-500">MANT</span></h2>
          <p className="text-xs text-gray-500 mt-1">Sistema de Gestión de Obras</p>
        </div>

        <nav className="mt-6 px-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-6">
              {/* Selector de Rol */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Rol:</label>
                <select
                  value={rolActual}
                  onChange={(e) => setRol(e.target.value)}
                  className="px-3 py-1 border border-slate-300 rounded-lg text-sm bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={ROLES.JEFE}>🔐 Jefe</option>
                  <option value={ROLES.SUPERVISOR}>👔 Supervisor</option>
                  <option value={ROLES.TECNICO}>🔧 Técnico</option>
                </select>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg">🔔</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg">⚙️</span>
              </button>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}