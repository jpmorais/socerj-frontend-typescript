import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AreasLista from "./pages/areas/AreasLista";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AreasEdit from "./pages/areas/AreasEdit";
import AreasDelete from "./pages/areas/AreasDelete";
import { Toaster } from "react-hot-toast";
import EspecialidadesLista from "./pages/especialidades/EspecialidadesLista";
import EspecialidadesEdit from "./pages/especialidades/EspecialidadesEdit";
import EspecialidadesDelete from "./pages/especialidades/EspecialidadesDelete";
import GenerosLista from "./pages/generos/GenerosLista";
import GenerosEdit from "./pages/generos/GenerosEdit";
import GenerosDelete from "./pages/generos/GenerosDelete";
import PatrocinadoresLista from "./pages/patrocinadores/PatrocinadoresLista";
import PatrocinadoresCreate from "./pages/patrocinadores/PatrocinadoresCreate";
import PatrocinadoresEdit from "./pages/patrocinadores/PatrocinadoresEdit";
import PatrocinadoresDelete from "./pages/patrocinadores/PatrocinadoresDelete";
import EventosLista from "./pages/eventos/EventosLista";
import EventosCreate from "./pages/eventos/EventosCreate";
import EventosEdit from "./pages/eventos/EventosEdit";
import EventosDelete from "./pages/eventos/EventosDelete";
import CuponsLista from "./pages/cupons/CuponsLista";
import CuponsCreate from "./pages/cupons/CuponsCreate";
import CuponsDelete from "./pages/cupons/CuponsDelete";
import CategoriasLista from "./pages/categorias/CategoriasLista";
import CategoriasCreate from "./pages/categorias/CategoriasCreate";
import CategoriasEdit from "./pages/categorias/CategoriasEdit";
import CategoriasDelete from "./pages/categorias/CategoriasDelete";
import UsuariosLista from "./pages/usuarios/UsuariosLista";
import UsuariosCreate from "./pages/usuarios/UsuariosCreate";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "areas",
        element: <AreasLista />,
        children: [
          { index: true, element: <></> },
          { path: "edit/:id", element: <AreasEdit /> },
          { path: "delete/:id", element: <AreasDelete /> },
        ],
      },
      {
        path: "usuarios",
        element: <UsuariosLista />,
        children: [
          { index: true, element: <></> },
          {
            path: "create",
            element: <UsuariosCreate />,
          },
        ],
      },
      {
        path: "categorias",
        element: <CategoriasLista />,
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: "create",
            element: <CategoriasCreate />,
          },
          {
            path: "edit/:id",
            element: <CategoriasEdit />,
          },
          {
            path: "delete/:id",
            element: <CategoriasDelete />,
          },
        ],
      },
      {
        path: "cupons",
        element: <CuponsLista />,
        children: [
          { index: true, element: <></> },
          { path: "create", element: <CuponsCreate /> },
          { path: "delete/:id", element: <CuponsDelete /> },
        ],
      },
      {
        path: "eventos",
        element: <EventosLista />,
        children: [
          { index: true, element: <></> },
          {
            path: "create",
            element: <EventosCreate />,
          },
          {
            path: "edit/:id",
            element: <EventosEdit />,
          },
          {
            path: "delete/:id",
            element: <EventosDelete />,
          },
        ],
      },
      {
        path: "patrocinadores",
        element: <PatrocinadoresLista />,
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: "create",
            element: <PatrocinadoresCreate />,
          },
          {
            path: "edit/:id",
            element: <PatrocinadoresEdit />,
          },
          {
            path: "delete/:id",
            element: <PatrocinadoresDelete />,
          },
        ],
      },
      {
        path: "generos",
        element: <GenerosLista />,
        children: [
          { index: true, element: <></> },
          {
            path: "edit/:id",
            element: <GenerosEdit />,
          },
          {
            path: "delete/:id",
            element: <GenerosDelete />,
          },
        ],
      },
      {
        path: "especialidades",
        element: <EspecialidadesLista />,
        children: [
          { index: true, element: <></> },
          { path: "edit/:id", element: <EspecialidadesEdit /> },
          { path: "delete/:id", element: <EspecialidadesDelete /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
