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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="recipes" element={<div>recipes</div>} />
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
