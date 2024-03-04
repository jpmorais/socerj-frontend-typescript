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
