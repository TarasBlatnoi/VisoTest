import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { queryClient } from "./api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import Meals from "./pages/Meals/Meals";
import "./index.css";
import DetailMeal from "./pages/DetailedMeal/DetailMeal";
import Cart from "./pages/Cart/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="meals" element={<Meals />} />
      <Route path="meals/:id" element={<DetailMeal />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
