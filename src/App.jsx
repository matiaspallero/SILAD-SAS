import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { AppProvider } from './context/AppContext';

// Componente de carga visual mientras se descargan los módulos
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Lazy Loading de las páginas para optimizar el bundle (Code Splitting)
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));
const Notas = React.lazy(() => import('./pages/Notaspage.jsx'));
const NotaDetalle = React.lazy(() => import('./pages/NotesManagment.jsx'));
const Ordenes = React.lazy(() => import('./pages/WorkOrdersManagement.jsx'));
const OrdenDetalle = React.lazy(() => import('./pages/WorkOrdersManagement.jsx'));
const Cuadrillas = React.lazy(() => import('./pages/Cuadrillas.jsx'));
const Seguimiento = React.lazy(() => import('./pages/WorkTracking.jsx'));
const CierreObra = React.lazy(() => import('./pages/WorkClosure.jsx'));
const Reportes = React.lazy(() => import('./pages/Reportes.jsx'));

const Home = React.lazy(() => import('./pages/LandingPage.jsx'));

// Vista de Error 404 / Fallo de carga
const ErrorBoundary = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-slate-800">
    <h1 className="text-4xl font-bold mb-2">404</h1>
    <p className="text-slate-500">Página no encontrada o error de carga.</p>
    <a href="/dashboard" className="mt-4 text-blue-600 hover:underline">Volver al inicio</a>
  </div>
);

// Definición de Rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/landingPage" replace />
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'notas',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <Notas />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<PageLoader />}>
                <NotaDetalle />
              </Suspense>
            ),
          }
        ]
      },
      {
        path: 'ordenes',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <Ordenes />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<PageLoader />}>
                <OrdenDetalle />
              </Suspense>
            ),
          }
        ]
      },
      {
        path: 'cuadrillas',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cuadrillas />
          </Suspense>
        ),
      },
      {
        path: 'seguimiento/:id', 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Seguimiento />
          </Suspense>
        ),
      },
      {
        path: 'cierre-obra/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CierreObra />
          </Suspense>
        ),
      },
      {
        path: 'reportes',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Reportes />
          </Suspense>
        ),
      }
    ]
  }
]);

// Componente App por defecto
export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}