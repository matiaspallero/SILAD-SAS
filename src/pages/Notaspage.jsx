import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { usePermisos } from '../hooks/usePermisos';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NOTE_STATES, WORKORDER_STATES, obtenerProgreso } from '../utils/stateMachine';

export default function NotasPage() {
  const navigate = useNavigate();
  const { notes, actualizarEstadoNota, crearOrdenTrabajo } = useContext(AppContext);
  const { puedoAnalizarNota, puedoGenerarOT, rolActual } = usePermisos();
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Filtrar notas
  const notasFiltradas =
    filtroEstado === 'Todos'
      ? notes
      : notes.filter((n) => n.status === filtroEstado);

  // Mapear colores según prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-700';
      case 'Media':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  // Mapear colores según estado
  const getStatusColor = (status) => {
    switch (status) {
      case NOTE_STATES.REGISTRADA:
        return 'bg-blue-50 border-l-4 border-blue-500';
      case NOTE_STATES.PENDIENTE_ANALISIS:
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case NOTE_STATES.ANALIZADA:
        return 'bg-purple-50 border-l-4 border-purple-500';
      case NOTE_STATES.GENERANDO_OT:
        return 'bg-orange-50 border-l-4 border-orange-500';
      case NOTE_STATES.COMPLETADA:
        return 'bg-green-50 border-l-4 border-green-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  // Adelantar estado de nota
  const handleAdelantarEstado = (noteId, estadoActual) => {
    const estadoSiguiente = {
      [NOTE_STATES.REGISTRADA]: NOTE_STATES.PENDIENTE_ANALISIS,
      [NOTE_STATES.PENDIENTE_ANALISIS]: NOTE_STATES.ANALIZADA,
      [NOTE_STATES.ANALIZADA]: NOTE_STATES.GENERANDO_OT,
      [NOTE_STATES.GENERANDO_OT]: NOTE_STATES.COMPLETADA
    }[estadoActual];

    if (estadoSiguiente) {
      actualizarEstadoNota(noteId, estadoSiguiente);
    }
  };

  // Generar Orden de Trabajo
  const handleGenerarOT = (nota) => {
    const nuevaOT = {
      noteId: nota.id,
      description: nota.description,
      location: nota.location,
      priority: nota.priority
    };

    crearOrdenTrabajo(nuevaOT);
    actualizarEstadoNota(nota.id, NOTE_STATES.GENERANDO_OT);

    // Mostrar confirmación
    alert('✅ Orden de Trabajo creada exitosamente');
    navigate('/ordenes');
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Notas EP/e</h1>
          <p className="text-sm text-slate-500 mt-1">
            Total: {notasFiltradas.length} | Rol: <span className="font-medium">{rolActual}</span>
          </p>
        </div>
        {puedoAnalizarNota && (
          <Button
            onClick={() => navigate('/notas/crear')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            + Nueva Nota
          </Button>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {[
          'Todos',
          NOTE_STATES.REGISTRADA,
          NOTE_STATES.PENDIENTE_ANALISIS,
          NOTE_STATES.ANALIZADA,
          NOTE_STATES.COMPLETADA
        ].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtroEstado === estado
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Lista de Notas */}
      <div className="space-y-4">
        {notasFiltradas.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-slate-500">
            <p>No hay notas en este estado</p>
          </div>
        ) : (
          notasFiltradas.map((nota) => (
            <div
              key={nota.id}
              className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md ${getStatusColor(nota.status)}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{nota.id}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        nota.priority
                      )}`}
                    >
                      {nota.priority}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {nota.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{nota.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div>
                      <span className="font-medium text-slate-700">EP/e:</span> {nota.epName}
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Ubicación:</span> {nota.location.address}
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Teléfono:</span> {nota.epPhone}
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Zona:</span> {nota.location.zone}
                    </div>
                  </div>
                </div>

                {/* Progreso */}
                <div className="ml-6 w-32">
                  <div className="text-right mb-2">
                    <span className="text-xl font-bold text-blue-600">{obtenerProgreso(nota.status, 'nota')}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${obtenerProgreso(nota.status, 'nota')}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Acciones según rol */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
                {puedoAnalizarNota && nota.status === NOTE_STATES.REGISTRADA && (
                  <Button
                    onClick={() => handleAdelantarEstado(nota.id, nota.status)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-medium text-sm"
                  >
                    Enviar a Análisis
                  </Button>
                )}

                {puedoAnalizarNota && nota.status === NOTE_STATES.PENDIENTE_ANALISIS && (
                  <Button
                    onClick={() => handleAdelantarEstado(nota.id, nota.status)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium text-sm"
                  >
                    Marcar Analizada
                  </Button>
                )}

                {puedoGenerarOT && nota.status === NOTE_STATES.ANALIZADA && (
                  <>
                    <Button
                      onClick={() => handleGenerarOT(nota)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium text-sm"
                    >
                      ✓ Generar O.T.
                    </Button>
                    <Button
                      onClick={() => handleAdelantarEstado(nota.id, nota.status)}
                      className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded font-medium text-sm"
                    >
                      Saltar
                    </Button>
                  </>
                )}

                {nota.status === NOTE_STATES.COMPLETADA && (
                  <Button
                    onClick={() => navigate(`/notas/${nota.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm"
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