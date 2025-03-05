import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Product from "../pages/product";
import ProductDetail from "../pages/product/detail";
import ProductEdit from "../pages/product/edit";
import ProductAdd from "../pages/product/add";
import ProductUpload from "../pages/product/upload";
import Favorite from "../pages/user/Favorite";
import Mypage from "../pages/user/Mypage";
import NotFound from "../pages/error/NotFound";
import ChatRoom from "../pages/user/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: <Product /> },
      { path: "product/upload", element: <ProductUpload /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "product/:id/edit", element: <ProductEdit /> },
      { path: "product/add", element: <ProductAdd /> },
      { path: "favorite", element: <Favorite /> },
      { path: "chatroom", element: <ChatRoom /> },
      { path: "mypage", element: <Mypage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
