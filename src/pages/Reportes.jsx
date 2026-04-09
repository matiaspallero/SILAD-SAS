// src/pages/Reportes.jsx
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
        <Button variant="primary">📊 Generar Reporte</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Órdenes Pendientes" 
          value={mockData.kpis.pendientes}
          icon="📋"
        />
        <Card 
          title="En Ejecución" 
          value={mockData.kpis.enEjecucion}
          icon="🔧"
        />
        <Card 
          title="Cuadrillas Activas" 
          value={mockData.kpis.cuadrillasActivas}
          icon="👥"
        />
        <Card 
          title="Cerradas Hoy" 
          value={mockData.kpis.cerradasHoy}
          icon="✅"
        />
      </div>

      {/* Reportes Disponibles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reportes Disponibles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { nombre: 'Órdenes de Trabajo', icono: '📋' },
            { nombre: 'Desempeño de Cuadrillas', icono: '👥' },
            { nombre: 'Notas EP/e', icono: '📝' },
            { nombre: 'Cierre de Obras', icono: '✅' }
          ].map((reporte, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{reporte.icono} {reporte.nombre}</p>
                  <p className="text-xs text-gray-500 mt-1">Datos actualizados</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleDescargarReporte(reporte.nombre)}
                >
                  Descargar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}