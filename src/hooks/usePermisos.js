import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PERMISOS } from '../utils/stateMachine';

/**
 * Hook personalizado para verificar permisos del rol actual
 * Uso: const { puedoAnalizarNota, rolActual } = usePermisos();
 */
export const usePermisos = () => {
  const { rolActual } = useContext(AppContext);
  
  const permisos = PERMISOS[rolActual] || {};

  const puedo = (accion) => {
    return permisos[accion] ?? false;
  };

  return {
    rolActual,
    permisos,
    puedo,
    // Acceso directo a permisos específicos
    puedoCrearNota: permisos.crearNota,
    puedoAnalizarNota: permisos.analizarNota,
    puedoGenerarOT: permisos.generarOT,
    puedoAsignarCuadrilla: permisos.asignarCuadrilla,
    puedoIniciarEjecucion: permisos.iniciarEjecucion,
    puedoRegistrarTiempos: permisos.registrarTiempos,
    puedoCargarEvidencias: permisos.cargarEvidencias,
    puedoFinalizarObra: permisos.finalizarObra,
    puedoGenerarConstancia: permisos.generarConstancia,
    puedoResponderNota: permisos.responderNota,
    puedoVerReportes: permisos.verReportes
  };
};
