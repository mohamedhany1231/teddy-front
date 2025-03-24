import { useState } from "react";

import { useQuery } from "@apollo/client";
import getProduct from "./graphQl/products/getProducts";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./ui/Layout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import getMe from "./graphQl/user/getMe";
import SellBear from "./pages/SellBear";
import Offers from "./pages/Offers";
import { Toaster } from "react-hot-toast";
import Orders from "./pages/Orders";

function App() {
  const { data, loading } = useQuery(getMe);
  console.log(loading, data);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/sell" element={<SellBear />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
