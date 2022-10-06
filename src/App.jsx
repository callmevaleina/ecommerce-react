import { useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import MyNavbar from "./components/MyNavbar";
import LoadingScreen from "./components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "./store/slices/products.slice";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <HashRouter>
      <header>
        <MyNavbar />
      </header>
      <main>
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases />} />
          </Route>
         
        </Routes>
      </main>

      <footer></footer>
    </HashRouter>
  );
}

export default App;
