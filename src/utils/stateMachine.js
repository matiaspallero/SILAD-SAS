/**
 * Máquina de Estados para el flujo de Notas y Órdenes de Trabajo
 * Define transiciones válidas según el rol
 */

export const ROLES = {
  JEFE: 'JEFE',
  SUPERVISOR: 'SUPERVISOR',
  TECNICO: 'TECNICO'
};

// Estados para Notas (11 pasos del flujo)
export const NOTE_STATES = {
  REGISTRADA: 'Registrada',
  PENDIENTE_ANALISIS: 'Pendiente Análisis',
  ANALIZADA: 'Analizada',
  GENERANDO_OT: 'Generando OT',
  COMPLETADA: 'Completada'
};

// Estados para Órdenes de Trabajo
export const WORKORDER_STATES = {
  PENDIENTE_ASIGNACION: 'Pendiente Asignación',
  ASIGNADA: 'Asignada',
  EN_EJECUCION: 'En Ejecución',
  CARGANDO_EVIDENCIAS: 'Cargando Evidencias',
  EN_CIERRE: 'En Cierre',
  COMPLETADA: 'Completada'
};

/**
 * Permisos por rol y acción
 * Determina qué acciones puede hacer cada rol
 */
export const PERMISOS = {
  [ROLES.JEFE]: {
    // Jefe: Control total
    crearNota: true,
    analizarNota: true,
    generarOT: true,
    asignarCuadrilla: true,
    iniciarEjecucion: true,
    registrarTiempos: true,
    cargarEvidencias: true,
    finalizarObra: true,
    generarConstancia: true,
    responderNota: true,
    verReportes: true
  },
  [ROLES.SUPERVISOR]: {
    // Supervisor: Gestión de ordenes
    crearNota: true,
    analizarNota: true,
    generarOT: true,
    asignarCuadrilla: true,
    iniciarEjecucion: false, // El técnico inicia
    registrarTiempos: true,
    cargarEvidencias: true,
    finalizarObra: true,
    generarConstancia: false,
    responderNota: false,
    verReportes: false
  },
  [ROLES.TECNICO]: {
    // Técnico: Solo ejecución
    crearNota: false,
    analizarNota: false,
    generarOT: false,
    asignarCuadrilla: false,
    iniciarEjecucion: true, // El técnico inicia su trabajo
    registrarTiempos: true,
    cargarEvidencias: true,
    finalizarObra: false,
    generarConstancia: false,
    responderNota: false,
    verReportes: false
  }
};

/**
 * Transiciones válidas de estados según el flujo
 */
export const TRANSICIONES_NOTA = {
  [NOTE_STATES.REGISTRADA]: [NOTE_STATES.PENDIENTE_ANALISIS],
  [NOTE_STATES.PENDIENTE_ANALISIS]: [NOTE_STATES.ANALIZADA],
  [NOTE_STATES.ANALIZADA]: [NOTE_STATES.GENERANDO_OT],
  [NOTE_STATES.GENERANDO_OT]: [NOTE_STATES.COMPLETADA],
  [NOTE_STATES.COMPLETADA]: []
};

export const TRANSICIONES_OT = {
  [WORKORDER_STATES.PENDIENTE_ASIGNACION]: [WORKORDER_STATES.ASIGNADA],
  [WORKORDER_STATES.ASIGNADA]: [WORKORDER_STATES.EN_EJECUCION],
  [WORKORDER_STATES.EN_EJECUCION]: [WORKORDER_STATES.CARGANDO_EVIDENCIAS],
  [WORKORDER_STATES.CARGANDO_EVIDENCIAS]: [WORKORDER_STATES.EN_CIERRE],
  [WORKORDER_STATES.EN_CIERRE]: [WORKORDER_STATES.COMPLETADA],
  [WORKORDER_STATES.COMPLETADA]: []
};

/**
 * Valida si una transición es permitida
 */
export const puedeTransicionar = (estadoActual, estadoNuevo, tipoEntidad = 'nota') => {
  const transiciones = tipoEntidad === 'nota' ? TRANSICIONES_NOTA : TRANSICIONES_OT;
  return transiciones[estadoActual]?.includes(estadoNuevo) ?? false;
};

/**
 * Obtiene las transiciones permitidas desde un estado
 */
export const obtenerTransicionesPermitidas = (estadoActual, tipoEntidad = 'nota') => {
  const transiciones = tipoEntidad === 'nota' ? TRANSICIONES_NOTA : TRANSICIONES_OT;
  return transiciones[estadoActual] ?? [];
};

/**
 * Obtiene el porcentaje de progreso según el estado
 */
export const obtenerProgreso = (estado, tipoEntidad = 'nota') => {
  const estados = tipoEntidad === 'nota' ? 
    [NOTE_STATES.REGISTRADA, NOTE_STATES.PENDIENTE_ANALISIS, NOTE_STATES.ANALIZADA, 
     NOTE_STATES.GENERANDO_OT, NOTE_STATES.COMPLETADA] :
    [WORKORDER_STATES.PENDIENTE_ASIGNACION, WORKORDER_STATES.ASIGNADA, 
     WORKORDER_STATES.EN_EJECUCION, WORKORDER_STATES.CARGANDO_EVIDENCIAS, 
     WORKORDER_STATES.EN_CIERRE, WORKORDER_STATES.COMPLETADA];

  const index = estados.indexOf(estado);
  return Math.round(((index + 1) / estados.length) * 100);
};
