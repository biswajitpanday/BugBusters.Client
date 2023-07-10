import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { NotFound } from "../misc";
import { Badge, Col, Row, Spinner } from "react-bootstrap";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";
import { UpVoteDownVote } from "./components/upVoteDownVote/UpVoteDownVote";
import { Pluralize } from "@/utils/HelperUtil";
import { AnswerResponse } from "@/types";

export const QuestionDetail = () => {
  const { questionId } = useParams();
  !questionId && <NotFound />;

  const questionQuery = useQuestion(questionId!);

  questionQuery.isLoading && <Spinner />;
  if (!questionQuery.data) return null; // todo: Create a Data Not Found Component.

  const {
    id,
    title,
    createdAt,
    lastUpdated,
    body,
    upVoteCount,
    downVoteCount,
    createdById,
    createdBy,
    answers,
  } = questionQuery.data;

  const vote = Math.abs(upVoteCount - downVoteCount);

  return (
    <ContentLayout title="">
      <Row className="mt-3">
        <Col xs={12}>
          <h3>{title}</h3>
        </Col>
      </Row>
      <Row className="mt-1">
        <BbTimeAgo title="Asked" dateTime={createdAt} />
        <BbTimeAgo title="Modified" dateTime={lastUpdated} />
      </Row>

      <hr />

      <Row className="pt-3 pb-3">
        <UpVoteDownVote voteCount={vote} questionId={id} />
        <Col xs={11}>
          <p className="">{body}</p>
          <Row>
            <Col>
              {/* Todo: Create a separate Component. */}
              <Badge bg="primary" className="float-end bg me-3 rounded-1">
                {createdBy.firstName || createdBy.lastName || createdBy.email}
                <BbTimeAgo title="Asked" dateTime={createdAt} size={12} />
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <h4>{Pluralize(answers.length, "Answer")}</h4>
        </Col>
      </Row>

      {answers.map((item: AnswerResponse) => {
        const {
          id,
          body,
          createdAt,
          downVoteCount,
          isAccepted,
          upVoteCount,
          createdById,
          createdBy,
        } = item;
        const vote = Math.abs(upVoteCount - downVoteCount);
        return (
          <Row className="pt-3 pb-3" key={id}>
            <UpVoteDownVote voteCount={vote} answerId={id} />
            <Col xs={11}>
              <p className="">{body}</p>
              <Row>
                <Col>
                  <Badge bg="primary" className="float-end bg me-3 rounded-1">
                    {createdBy.firstName ||
                      createdBy.lastName ||
                      createdBy.email}
                    <BbTimeAgo
                      title="Answered"
                      dateTime={item.createdAt}
                      size={12}
                    />
                  </Badge>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </ContentLayout>
  );
};
