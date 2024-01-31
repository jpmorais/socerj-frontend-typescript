import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AreasLista from "./pages/areas/AreasLista";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import AreasCreate from "./pages/areas/AreasCreate";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "areas",
        children: [
          { index: true, element: <AreasLista /> },
          { path: "create", element: <AreasCreate /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
