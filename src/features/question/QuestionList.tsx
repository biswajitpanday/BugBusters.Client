import { ContentLayout } from "@/components/layout";
import { useQuestions } from "./api/Question.api";
import { Spinner } from "@/components/elements/spinner";
import { Authorization } from "@/lib/Authorization";
import { QuestionResponse, Roles } from "@/types";
import { DataNotFound } from "../misc/DataNotFound";
import { Question } from "./components/Question";

export const QuestionList = () => {
  const questionsQuery = useQuestions();

  questionsQuery.isLoading ?? <Spinner />;
  if (!questionsQuery.data) return <DataNotFound />;

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout title="Question List">
        {questionsQuery.data.map((item: QuestionResponse) => {
          return (
            <Question data={item} />
          );
        })}
      </ContentLayout>
    </Authorization>
  );
};
