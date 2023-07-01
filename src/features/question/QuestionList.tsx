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
                  <div className="">
                    {item.upVoteCount} UpVote{item.upVoteCount > 1 ? "s" : ""}
                  </div>
                  <div className="">
                    {item.downVoteCount} DownVote
                    {item.downVoteCount > 1 ? "s" : ""}
                  </div>
                  <div className="">0 Answers</div>
                </div>
              </Col>
              <Col xs={10}>
                <div className="">
                  <Link
                    to={`${AppRouteConstant.Questions()}/${item.id}`}
                    className="underline-none"
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="">
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
