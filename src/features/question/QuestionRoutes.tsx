import { Navigate, Route, Routes } from "react-router-dom";
import { QuestionList } from "./QuestionList";
import { QuestionDetail } from "./QuestionDetail";

export const QuestionRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<QuestionList />} />
      <Route path=":questionId" element={<QuestionDetail />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
