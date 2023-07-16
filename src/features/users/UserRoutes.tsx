import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "../misc";
import { UserList } from "./UserList";
import { UserDetail } from "./UserDetail";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<UserList />} />
      <Route path=":userId" element={<UserDetail />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
};
