import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(login(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
