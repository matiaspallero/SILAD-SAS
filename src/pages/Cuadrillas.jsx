import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockData } from '../mocks/data';
import { Users, MapPin, ListTodo } from 'lucide-react';

export default function Cuadrillas() {
  const cuadrillas = [
    { id: "C-001", nombre: "Unidad 1 (Estándar)", tecnicos: 4, estado: "Activa", tareas: 3, ubicacion: "Zona Centro" },
    { id: "C-002", nombre: "Unidad 2 (Electricidad)", tecnicos: 3, estado: "Activa", tareas: 2, ubicacion: "Zona Norte" },
    { id: "C-003", nombre: "Unidad 3 (Mantenimiento)", tecnicos: 5, estado: "Activa", tareas: 4, ubicacion: "Zona Sur" },
    { id: "C-004", nombre: "Unidad 4 (Grúa)", tecnicos: 2, estado: "Inactiva", tareas: 0, ubicacion: "Depósito" },
    { id: "C-005", nombre: "Unidad 5 (Emergencias)", tecnicos: 4, estado: "Activa", tareas: 5, ubicacion: "Base Central" }
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Cuadrillas</h1>
        <Button className='cursor-pointer' variant="primary">+ Nueva Cuadrilla</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs md:text-sm font-medium text-gray-500">Cuadrillas Activas</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{mockData.kpis.cuadrillasActivas}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs md:text-sm font-medium text-gray-500">Tareas en Ejecución</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{mockData.kpis.enEjecucion}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs md:text-sm font-medium text-gray-500">Total de Técnicos</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{cuadrillas.reduce((sum, c) => sum + c.tecnicos, 0)}</p>
        </div>
      </div>

      {/* Tabla Desktop / Cards Móvil */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Vista Desktop - Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Nombre</th>
                <th className="px-6 py-3 font-medium">Técnicos</th>
                <th className="px-6 py-3 font-medium">Tareas Activas</th>
                <th className="px-6 py-3 font-medium">Ubicación</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cuadrillas.map(cuadrilla => (
                <tr key={cuadrilla.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{cuadrilla.id}</td>
                  <td className="px-6 py-4">{cuadrilla.nombre}</td>
                  <td className="px-6 py-4">{cuadrilla.tecnicos}</td>
                  <td className="px-6 py-4">{cuadrilla.tareas}</td>
                  <td className="px-6 py-4">{cuadrilla.ubicacion}</td>
                  <td className="px-6 py-4"><Badge status={cuadrilla.estado} /></td>
                  <td className="px-6 py-4 text-right">
                    <Button className='cursor-pointer' variant="secondary">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista Móvil - Cards */}
        <div className="md:hidden">
          <div className="divide-y divide-gray-100">
            {cuadrillas.map(cuadrilla => (
              <div key={cuadrilla.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm">{cuadrilla.nombre}</p>
                    <p className="text-xs text-gray-500 mt-1">{cuadrilla.id}</p>
                  </div>
                  <Badge status={cuadrilla.estado} />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs text-gray-500">Técnicos</p>
                      <p className="font-semibold text-slate-900">{cuadrilla.tecnicos}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ListTodo className="w-4 h-4 text-green-600 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs text-gray-500">Tareas</p>
                      <p className="font-semibold text-slate-900">{cuadrilla.tareas}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs text-gray-500">Zona</p>
                      <p className="font-semibold text-slate-900 text-xs truncate">{cuadrilla.ubicacion.split(' ')[1]}</p>
                    </div>
                  </div>
                </div>

                <Button className='cursor-pointer w-full' variant="secondary">Editar</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}