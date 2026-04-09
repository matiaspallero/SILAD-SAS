import React, { useState } from 'react';

// --- MOCK DATA ---
const orderData = {
  id: 'OT-5001',
  noteId: 'EP-2041',
  location: 'Av. Aconquija 1500',
  problem: 'Reemplazo de luminaria LED',
  crew: 'Cuadrilla Alfa (Grúa 01)',
  technician: 'Carlos Gómez',
  startTime: '09/04/2026 08:30 AM',
  endTime: '09/04/2026 10:45 AM', // Simulado
  duration: '2h 15m'
};

// --- MODAL DE CONSTANCIA (DOCUMENTO FORMAL) ---
const CertificateModal = ({ data, observations, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 md:p-4 lg:p-8">
      <div className="bg-white shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] md:max-h-full rounded-xl overflow-hidden">
        
        {/* Barra de Herramientas del Documento */}
        <div className="bg-slate-100 px-4 md:px-6 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 print:hidden">
          <p className="text-xs md:text-sm font-medium text-slate-600">Vista Previa de Documento</p>
          <div className="flex gap-2 sm:gap-3">
            <button onClick={onClose} className="px-3 md:px-4 py-2 bg-white border border-slate-300 rounded text-xs md:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap">
              Cerrar
            </button>
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Imprimir / PDF
            </button>
          </div>
        </div>

        {/* Hoja A4 Simulada */}
        <div className="p-8 md:p-12 overflow-y-auto bg-white text-slate-900 mx-auto w-full max-w-2xl my-4 border border-slate-200 shadow-sm print:shadow-none print:border-none print:m-0 print:w-full">
          
          <div className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide">Constancia de Finalización</h1>
              <p className="text-slate-500 font-medium mt-1">Dirección de Mantenimiento Urbano</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">{orderData.id}</p>
              <p className="text-sm text-slate-500">Fecha: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6 text-sm">
            <section>
              <h2 className="font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 mb-3">1. Datos de la Obra</h2>
              <div className="grid grid-cols-2 gap-y-2">
                <p><span className="font-semibold">Nota Origen:</span> {orderData.noteId}</p>
                <p><span className="font-semibold">Ubicación:</span> {orderData.location}</p>
                <p><span className="font-semibold">Trabajo Solicitado:</span> {orderData.problem}</p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 mb-3">2. Datos de Ejecución</h2>
              <div className="grid grid-cols-2 gap-y-2">
                <p><span className="font-semibold">Cuadrilla:</span> {orderData.crew}</p>
                <p><span className="font-semibold">Técnico Responsable:</span> {orderData.technician}</p>
                <p><span className="font-semibold">Inicio:</span> {orderData.startTime}</p>
                <p><span className="font-semibold">Finalización:</span> {orderData.endTime}</p>
                <p className="col-span-2"><span className="font-semibold">Tiempo Total:</span> {orderData.duration}</p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 mb-3">3. Observaciones del Técnico</h2>
              <p className="text-slate-700 min-h-15 p-3 bg-slate-50 border border-slate-100 rounded">
                {observations || "Sin observaciones registradas."}
              </p>
            </section>

            <div className="mt-16 pt-16 flex justify-around text-center">
              <div>
                <div className="w-48 border-t border-slate-400 mx-auto"></div>
                <p className="mt-2 font-semibold">{orderData.technician}</p>
                <p className="text-xs text-slate-500">Firma Técnico Responsable</p>
              </div>
              <div>
                <div className="w-48 border-t border-slate-400 mx-auto"></div>
                <p className="mt-2 font-semibold">Firma de Conformidad</p>
                <p className="text-xs text-slate-500">Supervisor / Inspector</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function WorkClosure() {
  const [observations, setObservations] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [checks, setChecks] = useState({
    cleanArea: false,
    materialsRemoved: false,
    tested: false
  });

  const allChecked = checks.cleanArea && checks.materialsRemoved && checks.tested;

  const handleCloseWork = (e) => {
    e.preventDefault();
    if (!allChecked) {
      alert("Debe confirmar todos los puntos del checklist de seguridad para cerrar la obra.");
      return;
    }
    setShowCertificate(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Cierre de Obra: {orderData.id}</h1>
          <p className="text-sm text-slate-500 mt-1">Complete el informe final para generar la constancia</p>
        </div>

        {/* Resumen de la Orden */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ubicación</p>
            <p className="font-medium text-slate-900">{orderData.location}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Cuadrilla</p>
            <p className="font-medium text-slate-900">{orderData.crew}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tiempo Total</p>
            <p className="font-medium text-blue-600">{orderData.duration}</p>
          </div>
        </div>

        <form onSubmit={handleCloseWork} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Observaciones */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Informe Técnico</h2>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Observaciones Finales y Materiales Utilizados
              </label>
              <textarea 
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                rows="5"
                placeholder="Ej. Se reemplazó luminaria de 150W y fotocontrol. El poste se encuentra en buenas condiciones."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Checklist y Fotos */}
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Checklist de Calidad</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                           checked={checks.tested} onChange={(e) => setChecks({...checks, tested: e.target.checked})} />
                    <span className="text-sm text-slate-700">Se verificó el correcto funcionamiento</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                           checked={checks.cleanArea} onChange={(e) => setChecks({...checks, cleanArea: e.target.checked})} />
                    <span className="text-sm text-slate-700">El área quedó limpia y segura</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                           checked={checks.materialsRemoved} onChange={(e) => setChecks({...checks, materialsRemoved: e.target.checked})} />
                    <span className="text-sm text-slate-700">Se retiraron escombros y materiales excedentes</span>
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Evidencias Finales</h2>
                </div>
                <div className="flex space-x-4">
                   <div className="w-24 h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                     <span className="text-xs">Foto 1</span>
                   </div>
                   <div className="w-24 h-24 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-blue-400">
                     <span className="text-xl">+</span>
                     <span className="text-xs">Añadir</span>
                   </div>
                </div>
              </div>

            </div>
          </div>

          {/* Acciones Finales */}
          <div className="flex justify-end p-6 bg-slate-900 rounded-xl shadow-lg">
            <button 
              type="submit"
              className={`px-8 py-3 rounded-lg font-bold text-white transition-colors shadow-sm flex items-center cursor-pointer
                ${allChecked ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-700 cursor-not-allowed'}
              `}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Generar Constancia y Cerrar Obra
            </button>
          </div>

        </form>
      </div>

      {/* Renderizado del Modal de Constancia */}
      {showCertificate && (
        <CertificateModal 
          data={orderData} 
          observations={observations}
          onClose={() => setShowCertificate(false)} 
        />
      )}
    </div>
  );
}