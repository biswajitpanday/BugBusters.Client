import { Route, Routes } from "react-router-dom";
import { NotFound } from "../misc";
import { UserList } from "./UserList";
import { UserDetail } from "./UserDetail";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<UserList />} />
      <Route path=":userId" element={<UserDetail />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};
