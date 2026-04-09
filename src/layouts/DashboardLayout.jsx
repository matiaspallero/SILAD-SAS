import React, { useContext, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, Clipboard, Users, TrendingUp, LogOut, Lock, Briefcase, Wrench, Bell, Settings, Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { ROLES } from '../utils/stateMachine';

export default function DashboardLayout() {
  const location = useLocation();
  const { rolActual, setRol } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-wider">URBAN<span className="text-blue-500">MANT</span></h2>
            <p className="text-xs text-gray-500 mt-1">Sistema de Gestión de Obras</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-4 flex-1">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón Salir al pie del sidebar */}
        <div className="px-4 pb-6 border-t border-slate-700 pt-4">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600/10 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="truncate">Volver a Inicio</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
            {/* Hamburger Menu - Solo móvil */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
            </button>

            {/* Título */}
            <h2 className="text-base lg:text-lg font-semibold text-gray-800 truncate">
              {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
            </h2>

            {/* Controls */}
            <div className="flex items-center gap-2 lg:gap-6 ml-auto">
              {/* Selector de Rol - Hidden en móvil */}
              <div className="hidden sm:flex items-center gap-2">
                <label className="text-xs lg:text-sm font-medium text-gray-600">Rol:</label>
                <select
                  value={rolActual}
                  onChange={(e) => setRol(e.target.value)}
                  className="px-2 lg:px-3 py-1 border border-slate-300 rounded-lg text-xs lg:text-sm bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={ROLES.JEFE}>Jefe</option>
                  <option value={ROLES.SUPERVISOR}>Supervisor</option>
                  <option value={ROLES.TECNICO}>Técnico</option>
                </select>
              </div>

              {/* Botones de acción */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                <Settings className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>

              {/* Avatar */}
              <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold shrink-0">
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