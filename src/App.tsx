import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

//Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductPerCategory from "./pages/ProductPerCategory";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/category/:categoryId/:categoryName",
    element: <ProductPerCategory />,
  },
  {
    path: "/product/:categoryId/:categoryName/:productId/:productTitle",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
