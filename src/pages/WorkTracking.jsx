import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

// --- MOCK DATA INICIAL ---
const orderData = {
  id: 'OT-5001',
  noteId: 'EP-2041',
  location: 'Av. Aconquija 1500',
  problem: 'Reemplazo de luminaria LED',
  crew: 'Cuadrilla Alfa (Grúa 01)',
  technician: 'Carlos Gómez',
  startTime: '09/04/2026 08:30 AM',
};

const timelineSteps = [
  { id: 1, label: 'Asignada', description: 'O.T. enviada a la cuadrilla' },
  { id: 2, label: 'En Tránsito', description: 'Cuadrilla en camino al lugar' },
  { id: 3, label: 'En Ejecución', description: 'Trabajo en progreso' },
  { id: 4, label: 'Finalizada', description: 'Obra terminada y revisada' }
];

export default function WorkTracking() {
  const [currentStep, setCurrentStep] = useState(3); // Iniciamos "En Ejecución"
  const [secondsElapsed, setSecondsElapsed] = useState(5400); // 1h 30m simulados
  const [observations, setObservations] = useState([
    { id: 1, time: '08:35 AM', text: 'Cuadrilla notificada. Iniciando traslado.', author: 'Sistema' },
    { id: 2, time: '09:05 AM', text: 'Llegada al lugar. Se procede a balizar la zona de trabajo.', author: 'Carlos Gómez' },
  ]);
  const [newObs, setNewObs] = useState('');

  // Simulación de cronómetro si está "En Ejecución"
  useEffect(() => {
    let interval;
    if (currentStep === 3) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const advanceTimeline = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      const newStatus = timelineSteps[currentStep].label;
      handleAddObservation(`Cambio de estado: ${newStatus}`);
    }
  };

  const handleAddObservation = (text = newObs) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setObservations([{ id: Date.now(), time: timeString, text, author: orderData.technician }, ...observations]);
    setNewObs('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header de la Orden */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">Seguimiento: {orderData.id}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentStep === 4 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                {timelineSteps[currentStep - 1].label.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-500">{orderData.location} • {orderData.problem}</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={advanceTimeline}
              disabled={currentStep === 4}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Avanzar Estado →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Detalles y Timeline */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Timeline Horizontal */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Progreso de la Obra</h2>
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>
                <div className="relative flex justify-between">
                  {timelineSteps.map((step) => {
                    const isCompleted = step.id <= currentStep;
                    const isActive = step.id === currentStep;
                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-bold text-sm transition-colors duration-300
                          ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
                            isCompleted ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}
                        `}>
                          {isCompleted ? (
                            <Check className="w-5 h-5" strokeWidth={2} />
                          ) : (
                            step.id
                          )}
                        </div>
                        <p className={`mt-3 text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Galería de Evidencias */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Evidencias Fotográficas</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">+ Subir Foto</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Simulación de fotos */}
                <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:bg-slate-50 cursor-pointer transition-colors relative overflow-hidden">
                   <span className="text-xs mt-2 font-medium">Foto_Antes.jpg</span>
                   <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="bg-white px-2 py-1 rounded text-xs text-slate-700 font-medium">Ver ampliación</span>
                   </div>
                </div>
                <div className="aspect-square bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs mt-2 font-medium">Agregar</span>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Info y Bitácora */}
          <div className="space-y-6">
            
            {/* Info y Cronómetro */}
            <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
              <p className="text-slate-400 text-sm font-medium mb-1">Tiempo de Ejecución</p>
              <div className="text-4xl font-mono font-bold tracking-wider mb-6 text-blue-400">
                {formatTime(secondsElapsed)}
              </div>
              
              <div className="space-y-4 pt-4 border-t border-slate-700">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Cuadrilla Asignada</p>
                  <p className="font-medium">{orderData.crew}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Técnico a cargo</p>
                  <p className="font-medium">{orderData.technician}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Inicio de trabajos</p>
                  <p className="font-medium">{orderData.startTime}</p>
                </div>
              </div>
            </div>

            {/* Bitácora de Observaciones */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-100">
              <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                <h2 className="text-base font-semibold text-slate-800">Bitácora de Novedades</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {observations.map((obs) => (
                  <div key={obs.id} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm text-sm">
                    <div className="flex justify-between items-start mb-1 text-xs text-slate-400">
                      <span className="font-semibold text-blue-600">{obs.author}</span>
                      <span>{obs.time}</span>
                    </div>
                    <p className="text-slate-700">{obs.text}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100">
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Escribir novedad..." 
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={newObs}
                    onChange={(e) => setNewObs(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddObservation()}
                  />
                  <button 
                    onClick={() => handleAddObservation()}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}