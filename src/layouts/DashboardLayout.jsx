import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, Clipboard, Users, TrendingUp, LogOut, Lock, Briefcase, Wrench, Bell, Settings } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { ROLES } from '../utils/stateMachine';

export default function DashboardLayout() {
  const location = useLocation();
  const { rolActual, setRol } = useContext(AppContext);

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: BarChart3 },
    { name: 'Notas', href: '/app/notas', icon: FileText },
    { name: 'Órdenes de Trabajo', href: '/app/ordenes', icon: Clipboard },
    { name: 'Cuadrillas', href: '/app/cuadrillas', icon: Users },
    { name: 'Reportes', href: '/app/reportes', icon: TrendingUp },
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

        <nav className="mt-6 px-4 flex-1">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón Salir al pie del sidebar */}
        <div className="px-4 pb-6 border-t border-slate-700 pt-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600/10 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            <span>Volver a Inicio</span>
          </Link>
        </div>
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
                  <option value={ROLES.JEFE}>Jefe</option>
                  <option value={ROLES.SUPERVISOR}>Supervisor</option>
                  <option value={ROLES.TECNICO}>Técnico</option>
                </select>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
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