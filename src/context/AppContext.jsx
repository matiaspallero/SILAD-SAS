import React, { createContext, useReducer } from 'react';
import { ROLES, NOTE_STATES, WORKORDER_STATES, puedeTransicionar, obtenerTransicionesPermitidas } from '../utils/stateMachine';
import { initialData } from '../mocks/db';

/**
 * AppContext - Estado global para la aplicación URBANMANT
 * Maneja: Notas, Órdenes de Trabajo, Cuadrillas, Rol actual
 */
export const AppContext = createContext();

// Acciones para el reducer
const ACTIONS = {
  SET_ROL: 'SET_ROL',
  CREATE_NOTE: 'CREATE_NOTE',
  UPDATE_NOTE_STATE: 'UPDATE_NOTE_STATE',
  CREATE_WORKORDER: 'CREATE_WORKORDER',
  UPDATE_WORKORDER_STATE: 'UPDATE_WORKORDER_STATE',
  ASSIGN_CREW_TO_WORKORDER: 'ASSIGN_CREW_TO_WORKORDER',
  ADD_EVIDENCE: 'ADD_EVIDENCE',
  UPDATE_EXECUTION_TIME: 'UPDATE_EXECUTION_TIME',
  COMPLETE_CLOSURE: 'COMPLETE_CLOSURE'
};

const initialState = {
  rolActual: ROLES.JEFE,
  notes: initialData.notes,
  workOrders: initialData.workOrders,
  crews: initialData.crews,
  technicians: initialData.technicians
};

/**
 * Reducer para manejar cambios de estado
 */
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ROL:
      return { ...state, rolActual: action.payload };

    case ACTIONS.CREATE_NOTE: {
      const newNote = {
        id: `NOTE-${Date.now()}`,
        date: new Date().toISOString(),
        status: NOTE_STATES.REGISTRADA,
        ...action.payload
      };
      return {
        ...state,
        notes: [...state.notes, newNote]
      };
    }

    case ACTIONS.UPDATE_NOTE_STATE: {
      const { noteId, newState } = action.payload;
      const note = state.notes.find(n => n.id === noteId);
      
      if (!note || !puedeTransicionar(note.status, newState, 'nota')) {
        console.warn(`No se puede transicionar de ${note?.status} a ${newState}`);
        return state;
      }

      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === noteId 
            ? { ...n, status: newState, updatedAt: new Date().toISOString() } 
            : n
        )
      };
    }

    case ACTIONS.CREATE_WORKORDER: {
      const newWorkOrder = {
        id: `WO-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: WORKORDER_STATES.PENDIENTE_ASIGNACION,
        crewId: null,
        timeline: { start: null, end: null, estimatedHours: 2, actualHours: 0 },
        evidence: [],
        closure: { completed: false, signature: null, notes: '' },
        ...action.payload
      };
      return {
        ...state,
        workOrders: [...state.workOrders, newWorkOrder]
      };
    }

    case ACTIONS.UPDATE_WORKORDER_STATE: {
      const { workOrderId, newState } = action.payload;
      const workOrder = state.workOrders.find(wo => wo.id === workOrderId);

      if (!workOrder || !puedeTransicionar(workOrder.status, newState, 'workorder')) {
        console.warn(`No se puede transicionar WO de ${workOrder?.status} a ${newState}`);
        return state;
      }

      let updatedWorkOrder = { ...workOrder, status: newState };

      // Si está entrando en ejecución, registra la hora de inicio
      if (newState === WORKORDER_STATES.EN_EJECUCION && !workOrder.timeline.start) {
        updatedWorkOrder.timeline = {
          ...workOrder.timeline,
          start: new Date().toISOString()
        };
      }

      // Si está completada, registra la hora de fin
      if (newState === WORKORDER_STATES.COMPLETADA && !workOrder.timeline.end) {
        updatedWorkOrder.timeline = {
          ...updatedWorkOrder.timeline,
          end: new Date().toISOString()
        };
      }

      return {
        ...state,
        workOrders: state.workOrders.map(wo =>
          wo.id === workOrderId ? updatedWorkOrder : wo
        )
      };
    }

    case ACTIONS.ASSIGN_CREW_TO_WORKORDER: {
      const { workOrderId, crewId } = action.payload;
      return {
        ...state,
        workOrders: state.workOrders.map(wo =>
          wo.id === workOrderId 
            ? { ...wo, crewId, status: WORKORDER_STATES.ASIGNADA }
            : wo
        )
      };
    }

    case ACTIONS.ADD_EVIDENCE: {
      const { workOrderId, evidence } = action.payload;
      return {
        ...state,
        workOrders: state.workOrders.map(wo =>
          wo.id === workOrderId
            ? {
                ...wo,
                evidence: [...(wo.evidence || []), evidence]
              }
            : wo
        )
      };
    }

    case ACTIONS.UPDATE_EXECUTION_TIME: {
      const { workOrderId, actualHours } = action.payload;
      return {
        ...state,
        workOrders: state.workOrders.map(wo =>
          wo.id === workOrderId
            ? {
                ...wo,
                timeline: { ...wo.timeline, actualHours }
              }
            : wo
        )
      };
    }

    case ACTIONS.COMPLETE_CLOSURE: {
      const { workOrderId, signature, notes } = action.payload;
      return {
        ...state,
        workOrders: state.workOrders.map(wo =>
          wo.id === workOrderId
            ? {
                ...wo,
                closure: {
                  completed: true,
                  signature,
                  notes,
                  completedAt: new Date().toISOString()
                }
              }
            : wo
        )
      };
    }

    default:
      return state;
  }
}

/**
 * Provider del AppContext
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Acciones para cambiar el rol
  const setRol = (rol) => {
    dispatch({ type: ACTIONS.SET_ROL, payload: rol });
  };

  // Acciones para Notas
  const crearNota = (notaData) => {
    dispatch({ type: ACTIONS.CREATE_NOTE, payload: notaData });
  };

  const actualizarEstadoNota = (noteId, newState) => {
    dispatch({ type: ACTIONS.UPDATE_NOTE_STATE, payload: { noteId, newState } });
  };

  // Acciones para Órdenes de Trabajo
  const crearOrdenTrabajo = (wokOrderData) => {
    dispatch({ type: ACTIONS.CREATE_WORKORDER, payload: wokOrderData });
  };

  const actualizarEstadoOT = (workOrderId, newState) => {
    dispatch({ type: ACTIONS.UPDATE_WORKORDER_STATE, payload: { workOrderId, newState } });
  };

  const asignarCuadrilla = (workOrderId, crewId) => {
    dispatch({ type: ACTIONS.ASSIGN_CREW_TO_WORKORDER, payload: { workOrderId, crewId } });
  };

  const agregarEvidencia = (workOrderId, evidence) => {
    dispatch({ type: ACTIONS.ADD_EVIDENCE, payload: { workOrderId, evidence } });
  };

  const actualizarTiempoEjecucion = (workOrderId, actualHours) => {
    dispatch({ type: ACTIONS.UPDATE_EXECUTION_TIME, payload: { workOrderId, actualHours } });
  };

  const completarCierre = (workOrderId, signature, notes) => {
    dispatch({ type: ACTIONS.COMPLETE_CLOSURE, payload: { workOrderId, signature, notes } });
  };

  const value = {
    // Estado
    rolActual: state.rolActual,
    notes: state.notes,
    workOrders: state.workOrders,
    crews: state.crews,
    technicians: state.technicians,

    // Acciones
    setRol,
    crearNota,
    actualizarEstadoNota,
    crearOrdenTrabajo,
    actualizarEstadoOT,
    asignarCuadrilla,
    agregarEvidencia,
    actualizarTiempoEjecucion,
    completarCierre
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
