import { ContentLayout } from "@/components/layout";
import { useQuestions } from "./api/Question.api";
import { Spinner } from "@/components/elements/spinner";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";
import { Pluralize } from "@/utils/HelperUtil";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";

export const QuestionList = () => {
  const questionsQuery = useQuestions();

  questionsQuery.isLoading ?? <Spinner />;
  if (!questionsQuery.data) return null;

  return (
    <>
      <ContentLayout title="Question List">
        {questionsQuery.data.map((item) => (
          <Card className="mt-1" key={item.id}>
            <Row className="pt-3 pb-3">
              <Col xs={2}>
                <div className="text-end">
                  <div>{Pluralize(item.upVoteCount, "UpVote")}</div>
                  <div>{Pluralize(item.downVoteCount, "DownVote")}</div>
                  <div>{Pluralize(item.answerCount, "Answer")}</div>
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
                <p>{item.body}</p>
                <Badge bg="primary" className="float-end bg me-3 rounded-1">
                  {item.createdBy.firstName ||
                    item.createdBy.lastName ||
                    item.createdBy.email}
                  <BbTimeAgo
                    title="Asked"
                    dateTime={item.createdAt}
                    size={12}
                  />
                </Badge>
              </Col>
            </Row>
          </Card>
        ))}
      </ContentLayout>
    </>
  );
};
