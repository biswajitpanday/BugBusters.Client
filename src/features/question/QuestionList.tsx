import { ContentLayout } from "@/components/layout";
import { useQuestions } from "./api/Question.api";
import { Spinner } from "@/components/elements/spinner";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";
import { Pluralize } from "@/utils/HelperUtil";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";
import { Authorization } from "@/lib/Authorization";
import { QuestionResponse, Roles } from "@/types";

export const QuestionList = () => {
  const questionsQuery = useQuestions();

  questionsQuery.isLoading ?? <Spinner />;
  if (!questionsQuery.data) return null;

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout title="Question List">
        {questionsQuery.data.map((item: QuestionResponse) => {
          const {
            id,
            title,
            body,
            upVoteCount,
            downVoteCount,
            answerCount,
            createdBy,
            createdAt,
          } = item;

          return (
            <Card className="mt-1" key={id}>
              <Row className="pt-3 pb-3">
                <Col xs={2}>
                  <div className="text-end">
                    <div>{Pluralize(upVoteCount, "UpVote")}</div>
                    <div>{Pluralize(downVoteCount, "DownVote")}</div>
                    <div>{Pluralize(answerCount, "Answer")}</div>
                  </div>
                </Col>
                <Col xs={10}>
                  <div>
                    <Link
                      to={`${AppRouteConstant.Questions()}/${id}`}
                      className="underline-none"
                    >
                      {title}
                    </Link>
                  </div>
                  <p>{body}</p>
                  <Badge bg="primary" className="float-end bg me-3 rounded-1">
                    {createdBy?.firstName ||
                      createdBy?.lastName ||
                      createdBy?.email}
                    <BbTimeAgo
                      title="Asked"
                      dateTime={createdAt}
                      size={12}
                    />
                  </Badge>
                </Col>
              </Row>
            </Card>
          );
        })}
      </ContentLayout>
    </Authorization>
  );
};
