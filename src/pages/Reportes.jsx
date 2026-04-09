// src/pages/Reportes.jsx
import { Clipboard, Wrench, Users, CheckCircle, BarChart3, FileText } from 'lucide-react';
import { mockData } from '../mocks/data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Reportes() {
  const handleDescargarReporte = (tipo) => {
    alert(`Descargando reporte de ${tipo}...`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reportes y Estadísticas</h1>
        <Button variant="primary" className="flex items-center gap-2 cursor-pointer">
          <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
          Generar Reporte
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Órdenes Pendientes" 
          value={mockData.kpis.pendientes}
          icon={<Clipboard className="w-8 h-8 text-blue-600" strokeWidth={1.5} />}
        />
        <Card 
          title="En Ejecución" 
          value={mockData.kpis.enEjecucion}
          icon={<Wrench className="w-8 h-8 text-orange-600" strokeWidth={1.5} />}
        />
        <Card 
          title="Cuadrillas Activas" 
          value={mockData.kpis.cuadrillasActivas}
          icon={<Users className="w-8 h-8 text-green-600" strokeWidth={1.5} />}
        />
        <Card 
          title="Cerradas Hoy" 
          value={mockData.kpis.cerradasHoy}
          icon={<CheckCircle className="w-8 h-8 text-green-600" strokeWidth={1.5} />}
        />
      </div>

      {/* Reportes Disponibles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reportes Disponibles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { nombre: 'Órdenes de Trabajo', icon: Clipboard },
            { nombre: 'Desempeño de Cuadrillas', icon: Users },
            { nombre: 'Notas EP/e', icon: FileText },
            { nombre: 'Cierre de Obras', icon: CheckCircle }
          ].map((reporte, idx) => {
            const IconComponent = reporte.icon;
            return (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{reporte.nombre}</p>
                      <p className="text-xs text-gray-500 mt-1">Datos actualizados</p>
                    </div>
                  </div>
                  <Button 
                    className='cursor-pointer'
                    variant="secondary" 
                    size="sm"
                    onClick={() => handleDescargarReporte(reporte.nombre)}
                  >
                    Descargar
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}