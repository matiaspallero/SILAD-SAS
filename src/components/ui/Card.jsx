// src/components/ui/Card.jsx
export const Card = ({ title, value, icon, className = "" }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between ${className}`}>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    {icon && <div className="text-gray-400">{icon}</div>}
  </div>
);

// src/components/ui/Badge.jsx
export const Badge = ({ status }) => {
  const styles = {
    "Alta": "bg-red-100 text-red-800",
    "Media": "bg-yellow-100 text-yellow-800",
    "PENDIENTE": "bg-gray-100 text-gray-800",
    "DERIVADA": "bg-blue-100 text-blue-800",
    "EN EJECUCIÓN": "bg-purple-100 text-purple-800",
    "CERRADA": "bg-green-100 text-green-800"
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

// src/components/ui/Button.jsx
export const Button = ({ children, variant = 'primary', onClick }) => {
  const baseStyle = "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};