import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { usePermisos } from '../hooks/usePermisos';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NOTE_STATES, obtenerProgreso } from '../utils/stateMachine';

export default function NotasPage() {
  const navigate = useNavigate();
  const { notes, actualizarEstadoNota, crearOrdenTrabajo } = useContext(AppContext);
  const { puedoAnalizarNota, puedoGenerarOT, rolActual } = usePermisos();
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const notasFiltradas = filtroEstado === 'Todos' ? notes : notes.filter(n => n.status === filtroEstado);

  // Mapear los estados a colores para el badge
  const getPriorityColor = (priority) => {
    if (priority === 'Alta') return 'bg-red-100 text-red-700';
    if (priority === 'Media') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  // Mapear los estados a colores para el borde del card
  const getStatusColor = (status) => {
    const colors = {
      'Registrada': 'bg-blue-50 border-l-4 border-blue-500',
      'Pendiente Análisis': 'bg-yellow-50 border-l-4 border-yellow-500',
      'Analizada': 'bg-purple-50 border-l-4 border-purple-500',
      'Generando OT': 'bg-orange-50 border-l-4 border-orange-500',
      'Completada': 'bg-green-50 border-l-4 border-green-500'
    };
    return colors[status] || 'bg-gray-50 border-l-4 border-gray-500';
  };

  // Función para adelantar el estado de la nota (solo para demo, en producción se haría con acciones específicas)
  const handleAdelantarEstado = (noteId, estadoActual) => {
    const transiciones = {
      'Registrada': 'Pendiente Análisis',
      'Pendiente Análisis': 'Analizada',
      'Analizada': 'Generando OT',
      'Generando OT': 'Completada'
    };
    const siguiente = transiciones[estadoActual];
    if (siguiente) actualizarEstadoNota(noteId, siguiente);
  };

  // Función para generar una orden de trabajo a partir de una nota
  const handleGenerarOT = (nota) => {
    crearOrdenTrabajo({
      noteId: nota.id,
      description: nota.description,
      location: nota.location,
      priority: nota.priority
    });
    actualizarEstadoNota(nota.id, 'Generando OT');
    alert('Orden de Trabajo creada exitosamente');
    navigate('/app/ordenes');
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Notas EP/e</h1>
          <p className="text-sm text-slate-500 mt-1">Total: {notasFiltradas.length} | Rol: {rolActual}</p>
        </div>
        {puedoAnalizarNota && (
          <Button onClick={() => navigate('/app/notas/crear')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer">
            + Nueva Nota
          </Button>
        )}
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        {['Todos', 'Registrada', 'Pendiente Análisis', 'Analizada', 'Completada'].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${filtroEstado === estado ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
          >
            {estado}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {notasFiltradas.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-slate-500">No hay notas en este estado</div>
        ) : (
          notasFiltradas.map((nota) => (
            <div key={nota.id} className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 ${getStatusColor(nota.status)}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{nota.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(nota.priority)}`}>{nota.priority}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{nota.status}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{nota.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div><span className="font-medium">EP/e:</span> {nota.epName}</div>
                    <div><span className="font-medium">Ubicación:</span> {nota.location.address}</div>
                    <div><span className="font-medium">Teléfono:</span> {nota.epPhone}</div>
                    <div><span className="font-medium">Zona:</span> {nota.location.zone}</div>
                  </div>
                </div>

                <div className="ml-6 w-32">
                  <div className="text-right mb-2">
                    <span className="text-xl font-bold text-blue-600">{obtenerProgreso(nota.status, 'nota')}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{width:  `${obtenerProgreso(nota.status, 'nota')}%`}}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
                {puedoAnalizarNota && nota.status === 'Registrada' && (
                  <Button
                    onClick={() => handleAdelantarEstado(nota.id, nota.status)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-medium text-sm cursor-pointer" 
                  >
                    Enviar a Análisis
                  </Button>
                )}

                {puedoAnalizarNota && nota.status === 'Pendiente Análisis' && (
                  <Button
                    onClick={() => handleAdelantarEstado(nota.id, nota.status)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium text-sm cursor-pointer"
                  >
                    Marcar Analizada
                  </Button>
                )}

                {puedoGenerarOT && nota.status === 'Analizada' && (
                  <>
                    <Button
                      onClick={() => handleGenerarOT(nota)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
                      Generar O.T.
                    </Button>
                    <Button
                      onClick={() => handleAdelantarEstado(nota.id, nota.status)}
                      className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded font-medium text-sm cursor-pointer"
                    >
                      Saltar
                    </Button>
                  </>
                )}

                {nota.status === 'Completada' && (
                  <Button
                    onClick={() => navigate(`/app/notas/${nota.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm cursor-pointer"
                  >
                    Ver Detalles
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}