import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockData } from '../mocks/data';

export default function Cuadrillas() {
  const cuadrillas = [
    { id: "C-001", nombre: "Unidad 1 (Estándar)", tecnicos: 4, estado: "Activa", tareas: 3, ubicacion: "Zona Centro" },
    { id: "C-002", nombre: "Unidad 2 (Electricidad)", tecnicos: 3, estado: "Activa", tareas: 2, ubicacion: "Zona Norte" },
    { id: "C-003", nombre: "Unidad 3 (Mantenimiento)", tecnicos: 5, estado: "Activa", tareas: 4, ubicacion: "Zona Sur" },
    { id: "C-004", nombre: "Unidad 4 (Grúa)", tecnicos: 2, estado: "Inactiva", tareas: 0, ubicacion: "Depósito" },
    { id: "C-005", nombre: "Unidad 5 (Emergencias)", tecnicos: 4, estado: "Activa", tareas: 5, ubicacion: "Base Central" }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Cuadrillas</h1>
        <Button variant="primary">+ Nueva Cuadrilla</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Cuadrillas Activas</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{mockData.kpis.cuadrillasActivas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Tareas en Ejecución</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{mockData.kpis.enEjecucion}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total de Técnicos</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{cuadrillas.reduce((sum, c) => sum + c.tecnicos, 0)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
              <tr key={cuadrilla.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{cuadrilla.id}</td>
                <td className="px-6 py-4">{cuadrilla.nombre}</td>
                <td className="px-6 py-4">{cuadrilla.tecnicos}</td>
                <td className="px-6 py-4">{cuadrilla.tareas}</td>
                <td className="px-6 py-4">{cuadrilla.ubicacion}</td>
                <td className="px-6 py-4"><Badge status={cuadrilla.estado} /></td>
                <td className="px-6 py-4 text-right">
                  <Button variant="secondary">Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}