import { Route, Routes } from "react-router-dom";
import { QuestionList } from "./QuestionList";
import { QuestionDetail } from "./QuestionDetail";
import { NotFound } from "../misc";

export const QuestionRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<QuestionList />} />
      <Route path=":questionId" element={<QuestionDetail />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};
