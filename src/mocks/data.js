// src/mocks/data.js
export const mockData = {
  kpis: {
    pendientes: 14,
    enEjecucion: 8,
    cuadrillasActivas: 5,
    cerradasHoy: 3
  },
  notas: [
    { id: "EP-1042", ubicacion: "Av. Mate de Luna 2400", problema: "Luminaria apagada", urgencia: "Media", estado: "PENDIENTE", fecha: "2026-04-09" },
    { id: "EP-1043", ubicacion: "Calle San Martín 150", problema: "Poste inclinado riesgo eléctrico", urgencia: "Alta", estado: "DERIVADA", fecha: "2026-04-09" }
  ],
  ordenes: [
    { id: "OT-501", notaId: "EP-1043", cuadrilla: "Unidad 4 (Grúa)", estado: "EN EJECUCIÓN", inicio: "10:00 AM" }
  ]
};