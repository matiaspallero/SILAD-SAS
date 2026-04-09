// Simulamos una llamada asíncrona a un servidor
export const getIssues = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lee de localStorage para que la demo sea interactiva, 
      // si no hay nada, carga la db inicial
      const data = JSON.parse(localStorage.getItem('maintenance_data')) || initialData;
      resolve(data.issues);
    }, 800); // 800ms de latencia falsa hace que se vea el "Loading..." spinner
  });
};

export const createWorkOrderFromIssue = async (issueId, derivationData) => {
    // Aquí actualizas el localStorage, cambiando el status de la nota
    // y creando un nuevo objeto en el array workOrders
}