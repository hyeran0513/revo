import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import ProductDetail from "../pages/product/ProductDetail";
import ProductEdit from "../pages/product/ProductEdit";
import ProductAdd from "../pages/product/ProductAdd";
import ProductUpload from "../pages/product/ProductUpload";
import Favorite from "../pages/user/Favorite";
import Mypage from "../pages/user/Mypage";
import NotFound from "../pages/error/NotFound";
import ChatRoom from "../pages/user/ChatRoom";
import SubLayout from "../layouts/SubLayout";
import ProductList from "../pages/product/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/",
    element: <SubLayout />,
    children: [
      { path: "products", element: <ProductList /> },
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
