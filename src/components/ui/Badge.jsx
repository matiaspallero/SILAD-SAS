export const Badge = ({ status }) => {
  const styles = {
    "Alta": "bg-red-100 text-red-800",
    "Media": "bg-yellow-100 text-yellow-800",
    "Baja": "bg-green-100 text-green-800",
    "PENDIENTE": "bg-gray-100 text-gray-800",
    "DERIVADA": "bg-blue-100 text-blue-800",
    "EN EJECUCIÓN": "bg-purple-100 text-purple-800",
    "EN EJECUCION": "bg-purple-100 text-purple-800",
    "CERRADA": "bg-green-100 text-green-800",
    "Activa": "bg-green-100 text-green-800",
    "Inactiva": "bg-gray-100 text-gray-800",
    "Generado": "bg-green-100 text-green-800",
    "En Proceso": "bg-blue-100 text-blue-800"
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};