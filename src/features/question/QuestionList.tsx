import { ContentLayout } from "@/components/layout";
import { useQuestions } from "./api/Question.api";
import { Spinner } from "@/components/elements/spinner";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";

export const QuestionList = () => {
  const questionsQuery = useQuestions();

  questionsQuery.isLoading ?? <Spinner />;
  if (!questionsQuery.data) return null;

  return (
    <>
      <ContentLayout title="Question List">
        {questionsQuery.data.map((item) => (
          <Card className="mt-1">
            <Row className="pt-3 pb-3">
              <Col xs={2}>
                <div className="text-end">
                  <div>
                    {item.upVoteCount} UpVote{item.upVoteCount > 1 ? "s" : ""}
                  </div>
                  <div>
                    {item.downVoteCount} DownVote
                    {item.downVoteCount > 1 ? "s" : ""}
                  </div>
                  <div>0 Answers</div>
                </div>
              </Col>
              <Col xs={10}>
                <div>
                  <Link
                    to={`${AppRouteConstant.Questions()}/${item.id}`}
                    className="underline-none"
                  >
                    {item.title}
                  </Link>
                </div>
                <div>
                  <p>{item.body}</p>
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </ContentLayout>
    </>
  );
};
