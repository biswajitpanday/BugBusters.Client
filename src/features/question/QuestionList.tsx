import { ContentLayout } from "@/components/layout";
import { useQuestions } from "./api/Question.api";
import { Spinner } from "@/components/elements/spinner";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";

export const QuestionList = () => {
  const questionsQuery = useQuestions();

  questionsQuery.isLoading ?? <Spinner />;
  if (!questionsQuery.data) return null;

  return (
    <>
      <ContentLayout title="Question List">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Create At</th>
              <th>Total Upvote</th>
              <th>Total Downvote</th>
            </tr>
          </thead>

          <tbody>
            {questionsQuery.data.map((item) => (
              <tr key={item.id}>
                <td><Link to={`${AppRouteConstant.Questions()}/${item.id}`}>{item.title}</Link> </td>
                <td>{item.body}</td>
                <td>{item.createdAt.toLocaleString()}</td>
                <td>{item.upVoteCount}</td>
                <td>{item.downVoteCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentLayout>
    </>
  );
};
