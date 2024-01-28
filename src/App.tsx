import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AreasLista from "./pages/areas/AreasLista";
import DashboardLayout from "./pages/layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "areas", children: [{ index: true, element: <AreasLista /> }] },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
