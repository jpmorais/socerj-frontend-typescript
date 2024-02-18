import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AreasLista from "./pages/areas/AreasLista";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AreasEdit from "./pages/areas/AreasEdit";
import AreasDelete from "./pages/areas/AreasDelete";

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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
