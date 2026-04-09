import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { usePermisos } from '../hooks/usePermisos';
import { NOTE_STATES, WORKORDER_STATES } from '../utils/stateMachine';
import { Clipboard, Wrench, Users, BarChart3, AlertTriangle, AlertCircle, CheckCircle, TrendingUp, Clock, Check, Zap } from 'lucide-react';

export default function Dashboard() {
  const { notes, workOrders, crews, rolActual } = useContext(AppContext);
  const { puedoVerReportes } = usePermisos();

  // Calcular estadísticas
  const totalNotas = notes.length;
  const notasPendientes = notes.filter(n => n.status === NOTE_STATES.PENDIENTE_ANALISIS).length;
  const notasAnalizadas = notes.filter(n => n.status === NOTE_STATES.ANALIZADA).length;
  const notasCompletadas = notes.filter(n => n.status === NOTE_STATES.COMPLETADA).length;

  const totalOT = workOrders.length;
  const otPendientes = workOrders.filter(ot => ot.status === WORKORDER_STATES.PENDIENTE_ASIGNACION).length;
  const otEnEjecucion = workOrders.filter(ot => ot.status === WORKORDER_STATES.EN_EJECUCION).length;
  const otCompletadas = workOrders.filter(ot => ot.status === WORKORDER_STATES.COMPLETADA).length;

  const cuadrillasActivas = crews.filter(c => c.status === 'En Actividad').length;
  const cuadrillasDisponibles = crews.filter(c => c.status === 'Disponible').length;

  // Notas por prioridad
  const notasAlta = notes.filter(n => n.priority === 'Alta').length;
  const notasMedia = notes.filter(n => n.priority === 'Media').length;
  const notasBaja = notes.filter(n => n.priority === 'Baja').length;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard URBANMANT</h1>
        <p className="text-slate-600 mt-2">Resumen en tiempo real del sistema de gestión de mantenimiento urbano</p>
        <p className="text-sm text-slate-500 mt-1">👤 Sesión: <span className="font-bold text-blue-600">{rolActual}</span></p>
      </div>

      {/* KPIs Grid - Primera Fila */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {/* Total de Notas */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Notas</p>
              <p className="text-3xl font-bold text-blue-600">{totalNotas}</p>
            </div>
            <Clipboard className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {notasPendientes} pendientes | <Check className="w-3 h-3" /> {notasCompletadas} completadas
          </p>
        </div>

        {/* Órdenes de Trabajo */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Órdenes Trabajo</p>
              <p className="text-3xl font-bold text-orange-600">{totalOT}</p>
            </div>
            <Wrench className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <Zap className="w-3 h-3" /> {otEnEjecucion} en ejecución | <Check className="w-3 h-3" /> {otCompletadas} completadas
          </p>
        </div>

        {/* Cuadrillas */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Cuadrillas</p>
              <p className="text-3xl font-bold text-green-600">{crews.length}</p>
            </div>
            <Users className="w-10 h-10 text-green-600" strokeWidth={1.5} />
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-red-500" /> {cuadrillasActivas} activas | <CheckCircle className="w-3 h-3 text-green-500" /> {cuadrillasDisponibles} disponibles
          </p>
        </div>

        {/* Eficiencia */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Eficiencia</p>
              <p className="text-3xl font-bold text-purple-600">
                {totalNotas > 0 ? Math.round((notasCompletadas / totalNotas) * 100) : 0}%
              </p>
            </div>
            <BarChart3 className="w-10 h-10 text-purple-600" strokeWidth={1.5} />
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Notas resueltas vs totales
          </p>
        </div>

        {/* Tiempo Promedio */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Estado</p>
              <p className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                {otPendientes > 0 ? (
                  <><AlertTriangle className="w-5 h-5 text-yellow-600" /> Crítico</>
                ) : (
                  <><CheckCircle className="w-5 h-5 text-green-600" /> Normal</>
                )}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-slate-600" strokeWidth={1.5} />
          </div>
          <p className="text-xs text-slate-500 mt-3">
            {otPendientes} OT sin asignar
          </p>
        </div>
      </div>

      {/* Segunda Fila - Distribución por Prioridad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Prioridad Alta */}
        <div className="bg-linear-to-br from-red-50 to-red-100 rounded-lg shadow-sm border border-red-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Prioridad Alta
            </h3>
            <span className="text-2xl font-bold text-red-600">{notasAlta}</span>
          </div>
          <div className="w-full bg-red-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${totalNotas > 0 ? (notasAlta / totalNotas) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-red-700 mt-2">Requieren atención inmediata</p>
        </div>

        {/* Prioridad Media */}
        <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-sm border border-yellow-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-yellow-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Prioridad Media
            </h3>
            <span className="text-2xl font-bold text-yellow-600">{notasMedia}</span>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full"
              style={{ width: `${totalNotas > 0 ? (notasMedia / totalNotas) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-yellow-700 mt-2">Planificación normal</p>
        </div>

        {/* Prioridad Baja */}
        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg shadow-sm border border-green-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Prioridad Baja
            </h3>
            <span className="text-2xl font-bold text-green-600">{notasBaja}</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${totalNotas > 0 ? (notasBaja / totalNotas) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-green-700 mt-2">Mantenimiento preventivo</p>
        </div>
      </div>

      {/* Tercera Fila - Estados de Notas y OT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Estado de Notas */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clipboard className="w-5 h-5" /> Distribución de Notas
          </h3>
          <div className="space-y-4">
            {[
              { label: NOTE_STATES.REGISTRADA, value: notes.filter(n => n.status === NOTE_STATES.REGISTRADA).length, color: 'bg-blue-500' },
              { label: NOTE_STATES.PENDIENTE_ANALISIS, value: notasPendientes, color: 'bg-yellow-500' },
              { label: NOTE_STATES.ANALIZADA, value: notasAnalizadas, color: 'bg-purple-500' },
              { label: NOTE_STATES.COMPLETADA, value: notasCompletadas, color: 'bg-green-500' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${totalNotas > 0 ? (item.value / totalNotas) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado de Órdenes de Trabajo */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5" /> Distribución de Órdenes
          </h3>
          <div className="space-y-4">
            {[
              { label: WORKORDER_STATES.PENDIENTE_ASIGNACION, value: otPendientes, color: 'bg-red-500' },
              { label: WORKORDER_STATES.ASIGNADA, value: workOrders.filter(ot => ot.status === WORKORDER_STATES.ASIGNADA).length, color: 'bg-yellow-500' },
              { label: WORKORDER_STATES.EN_EJECUCION, value: otEnEjecucion, color: 'bg-blue-500' },
              { label: WORKORDER_STATES.COMPLETADA, value: otCompletadas, color: 'bg-green-500' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${totalOT > 0 ? (item.value / totalOT) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nota al pie */}
      {puedoVerReportes && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>💡 Información:</strong> Las estadísticas se actualizan en tiempo real según los cambios de estado en notas y órdenes de trabajo.
          </p>
        </div>
      )}
    </div>
  );
}