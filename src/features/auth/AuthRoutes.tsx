import { Route, Routes } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="signup" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
