import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
const initialNotes = [
  { id: 'EP-2041', date: '2026-04-08', location: 'Av. Güemes 1200', problemType: 'Poste caído por tormenta', priority: 'Alta', status: 'PENDIENTE', description: 'Vecinos reportan poste inclinado a 45 grados sobre la vereda con riesgo de caída inminente.' },
  { id: 'EP-2042', date: '2026-04-09', location: 'San Martín 450', problemType: 'Luminaria intermitente', priority: 'Baja', status: 'DERIVADA', description: 'La lámpara prende y apaga toda la noche. Posible falla en el fotocontrol.' },
  { id: 'EP-2043', date: '2026-04-09', location: 'Nasif Estéfano 80', problemType: 'Cable cortado', priority: 'Alta', status: 'PENDIENTE', description: 'Cable de alimentación cortado colgando a baja altura. Peligro para transeúntes.' },
  { id: 'EP-2044', date: '2026-04-07', location: 'Ruta 38 y 24 de Septiembre', problemType: 'Lámpara apagada', priority: 'Media', status: 'CERRADA', description: 'Sector completamente a oscuras desde hace 3 días.' },
  { id: 'EP-2045', date: '2026-04-09', location: 'Plaza Principal', problemType: 'Vandalismo en tablero', priority: 'Media', status: 'PENDIENTE', description: 'Tablero abierto, faltan térmicas.' },
];

// --- UI HELPERS ---
const StatusBadge = ({ status }) => {
  const styles = {
    'PENDIENTE': 'bg-amber-100 text-amber-800 border-amber-200',
    'DERIVADA': 'bg-blue-100 text-blue-800 border-blue-200',
    'CERRADA': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    'Alta': 'text-red-600 bg-red-50',
    'Media': 'text-orange-600 bg-orange-50',
    'Baja': 'text-green-600 bg-green-50',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[priority]}`}>
      {priority}
    </span>
  );
};

// --- MODAL DETALLE Y DERIVACIÓN ---
const NoteDetailModal = ({ note, onClose, onGenerateOT }) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Nota {note.id}</h3>
            <p className="text-sm text-slate-500">Registrada el {note.date}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Estado Actual</p>
              <StatusBadge status={note.status} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Prioridad</p>
              <PriorityBadge priority={note.priority} />
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-slate-500 mb-1">Ubicación</p>
              <p className="text-base text-slate-900 font-medium">{note.location}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-slate-500 mb-1">Tipo de Problema</p>
              <p className="text-base text-slate-900">{note.problemType}</p>
            </div>
            <div className="col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-2">Descripción del Reporte</p>
              <p className="text-sm text-slate-700 leading-relaxed">{note.description}</p>
            </div>
          </div>
        </div>

        {/* Footer Modal (Acciones) */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
            Cerrar
          </button>
          {note.status === 'PENDIENTE' && (
            <button 
              onClick={() => onGenerateOT(note.id)}
              className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm flex items-center cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Generar Orden de Trabajo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function NotesManagement() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [selectedNote, setSelectedNote] = useState(null);

  // Filtrado optimizado con useMemo
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = note.id.toLowerCase().includes(search.toLowerCase()) || 
                            note.location.toLowerCase().includes(search.toLowerCase()) ||
                            note.problemType.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'TODOS' || note.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [notes, search, statusFilter]);

  // Simula la derivación a OT
  const handleGenerateOT = (noteId) => {
    setNotes(notes.map(n => n.id === noteId ? { ...n, status: 'DERIVADA' } : n));
    setSelectedNote(null);
    // En una app real, aquí harías un POST a tu API /api/work-orders
    alert(`¡Orden de Trabajo generada exitosamente para la nota ${noteId}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header de la Página */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Bandeja de Notas EP/e</h1>
            <p className="text-sm text-slate-500 mt-1">Gestión y derivación de problemas reportados</p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-slate-900 rounded-lg text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
            + Registrar Nueva Nota
          </button>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Buscar por ID, calle o problema..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="TODOS">Todos los estados</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="DERIVADA">Derivadas (O.T.)</option>
            <option value="CERRADA">Cerradas</option>
          </select>
        </div>

        {/* Tabla de Datos */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nº Nota</th>
                  <th className="px-6 py-4 font-semibold">Fecha</th>
                  <th className="px-6 py-4 font-semibold">Ubicación</th>
                  <th className="px-6 py-4 font-semibold">Problema</th>
                  <th className="px-6 py-4 font-semibold">Prioridad</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <tr key={note.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-slate-900">{note.id}</td>
                      <td className="px-6 py-4 text-slate-500">{note.date}</td>
                      <td className="px-6 py-4 truncate max-w-50" title={note.location}>{note.location}</td>
                      <td className="px-6 py-4">{note.problemType}</td>
                      <td className="px-6 py-4"><PriorityBadge priority={note.priority} /></td>
                      <td className="px-6 py-4"><StatusBadge status={note.status} /></td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedNote(note)}
                          className="text-blue-600 font-medium hover:text-blue-800 text-sm px-3 py-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                      No se encontraron notas que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Renderizado del Modal */}
      <NoteDetailModal 
        note={selectedNote} 
        onClose={() => setSelectedNote(null)} 
        onGenerateOT={handleGenerateOT}
      />
    </div>
  );
}