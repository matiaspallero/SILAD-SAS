import React, { useState } from 'react';

// --- MOCK DATA ---
const initialOrders = [
  { 
    id: 'OT-5001', 
    noteId: 'EP-2041', 
    crew: 'Cuadrilla Alfa (Grúa 01)', 
    status: 'EN EJECUCIÓN', 
    startDate: '09/04/2026 08:30', 
    estimatedTime: '2 horas',
    location: 'Av. Aconquija 1500',
    description: 'Reemplazo de luminaria LED y revisión de fotocontrol.',
    technician: 'Carlos Gómez'
  },
  { 
    id: 'OT-5002', 
    noteId: 'EP-2043', 
    crew: 'Cuadrilla Beta (Camioneta 04)', 
    status: 'PENDIENTE', 
    startDate: '09/04/2026 10:00', 
    estimatedTime: '1.5 horas',
    location: 'Calle Muñecas 200',
    description: 'Aislamiento de cableado expuesto por poda de árboles.',
    technician: 'Luis Herrera'
  },
  { 
    id: 'OT-5003', 
    noteId: 'EP-2030', 
    crew: 'Cuadrilla Gamma (Grúa 02)', 
    status: 'FINALIZADA', 
    startDate: '08/04/2026 15:00', 
    estimatedTime: '3 horas',
    location: 'Av. Soldati y Benjamín Aráoz',
    description: 'Enderezamiento de poste colisionado por vehículo.',
    technician: 'Marcos Díaz'
  }
];

// --- UI HELPERS ---
const StatusBadge = ({ status }) => {
  const styles = {
    'PENDIENTE': 'bg-amber-100 text-amber-800 border-amber-200',
    'EN EJECUCIÓN': 'bg-blue-100 text-blue-800 border-blue-200',
    'FINALIZADA': 'bg-green-100 text-green-800 border-green-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border inline-flex items-center justify-center w-28 ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

// --- MODAL DETALLE DE ORDEN ---
const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Orden de Trabajo {order.id}</h3>
            <p className="text-sm text-slate-500">Origen: Nota {order.noteId}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-medium text-slate-500 mb-1">Estado</p>
              <StatusBadge status={order.status} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-medium text-slate-500 mb-1">Cuadrilla / Técnico</p>
              <p className="text-base text-slate-900 font-medium">{order.crew}</p>
              <p className="text-sm text-slate-500">{order.technician}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-slate-500 mb-1">Ubicación de la Obra</p>
              <p className="text-base text-slate-900">{order.location}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-medium text-slate-500 mb-1">Inicio Programado</p>
              <p className="text-base text-slate-900">{order.startDate}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-medium text-slate-500 mb-1">Tiempo Estimado</p>
              <p className="text-base text-slate-900">{order.estimatedTime}</p>
            </div>
            <div className="col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-2">Tareas a Realizar</p>
              <p className="text-sm text-slate-700 leading-relaxed">{order.description}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function WorkOrdersManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Funciones de simulación de estado
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'FINALIZADA' } : order
    ));
    // Simulación de feedback para la demo
    alert(`La orden ${orderId} ha sido marcada como FINALIZADA y se ha generado la constancia de obra.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Control de Órdenes de Trabajo</h1>
            <p className="text-sm text-slate-500 mt-1">Seguimiento y asignación de cuadrillas en campo</p>
          </div>
        </div>

        {/* Tabla de Órdenes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID O.T.</th>
                  <th className="px-6 py-4 font-semibold">Cuadrilla Asignada</th>
                  <th className="px-6 py-4 font-semibold">Inicio Programado</th>
                  <th className="px-6 py-4 font-semibold">Tiempo Est.</th>
                  <th className="px-6 py-4 font-semibold text-center">Estado (Simulador)</th>
                  <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {order.id}
                      <p className="text-xs text-slate-400 font-normal mt-0.5">Nota: {order.noteId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.crew}</p>
                      <p className="text-xs text-slate-500 truncate max-w-50" title={order.location}>{order.location}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{order.startDate}</td>
                    <td className="px-6 py-4 text-slate-600">{order.estimatedTime}</td>
                    
                    {/* Control de Cambio de Estado Inline */}
                    <td className="px-6 py-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 outline-none cursor-pointer border-2 transition-colors
                          ${order.status === 'PENDIENTE' ? 'bg-amber-50 text-amber-800 border-amber-200 hover:border-amber-400' : ''}
                          ${order.status === 'EN EJECUCIÓN' ? 'bg-blue-50 text-blue-800 border-blue-200 hover:border-blue-400' : ''}
                          ${order.status === 'FINALIZADA' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                        `}
                        disabled={order.status === 'FINALIZADA'}
                      >
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="EN EJECUCIÓN">EN EJECUCIÓN</option>
                        <option value="FINALIZADA">FINALIZADA</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-slate-600 font-medium hover:text-blue-600 text-sm px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        Detalle
                      </button>
                      
                      {/* Botón de Acción Rápida (Cierre) */}
                      {order.status !== 'FINALIZADA' && (
                        <button 
                          onClick={() => handleCompleteOrder(order.id)}
                          className="bg-green-600 text-white font-medium hover:bg-green-700 text-sm px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                        >
                          Cerrar Obra
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Renderizado del Modal */}
      <OrderDetailModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
}