import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./pages/product";
import ProductDetail from "./pages/product/detail";
import ProductEdit from "./pages/product/edit";
import ProductAdd from "./pages/product/add";
import Chat from "./pages/product/chat";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/:id/edit" element={<ProductEdit />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/product/:id/chat" element={<Chat />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
