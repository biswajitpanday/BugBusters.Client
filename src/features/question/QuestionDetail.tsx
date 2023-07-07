import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { NotFound } from "../misc";
import { Col, Row, Spinner } from "react-bootstrap";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";
import { UpVoteDownVote } from "./components/upVoteDownVote/UpVoteDownVote";
import { Pluralize } from "@/utils/HelperUtil";

export const QuestionDetail = () => {
  const { questionId } = useParams();
  !questionId && <NotFound />;

  const questionQuery = useQuestion(questionId!);

  questionQuery.isLoading && <Spinner />;
  if (!questionQuery.data) return null; // todo: Create a Data Not Found Component.

  const {
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
    <>
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
        <UpVoteDownVote vote={vote} />
          <Col xs={11}>
            <p className="">{body}</p>
            <Row>
              <Col>
                <div className="float-end bg-dark-subtle p-2 rounded-1 attribute-text">
                  <BbTimeAgo title="Asked" dateTime={createdAt} size={12} />
                  <div className="">By {`${createdBy.firstName} ${createdBy.lastName}`}</div>
                  <div className=""></div>
                </div>
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

        {answers.map((item) => {
          const {body, createdAt, downVoteCount, id, isAccepted, upVoteCount, userId} = item;
          const vote = Math.abs(upVoteCount - downVoteCount);
          return (
            <Row className="pt-3 pb-3">
              <UpVoteDownVote vote={vote} />
              <Col xs={11}>
                <p className="">{body}</p>
                <Row>
                  <Col>
                    <div className="float-end bg-dark-subtle p-2 rounded-1 attribute-text">
                      <BbTimeAgo title="Answered" dateTime={createdAt} size={12} />
                      <div className=""></div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </ContentLayout>
    </>
  );
};
