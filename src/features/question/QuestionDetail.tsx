import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { NotFound } from "../misc";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";

export const QuestionDetail = () => {
  const { questionId } = useParams();
  !questionId && <NotFound />;

  const questionQuery = useQuestion(questionId!);

  questionQuery.isLoading && <Spinner />;
  if (!questionQuery.data) return null; // todo: Create a Data Not Found Component.

  const {
    title,
    createdAt,
    lastUpdate,
    body,
    upVoteCount,
    downVoteCount,
    createdById,
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
          <BbTimeAgo title="Modified" dateTime={lastUpdate} />
        </Row>

        <hr />

        <Row className="pt-3 pb-3">
          <Col xs={1}>
            <div className="text-center">
              <div>
                <Button
                  type="button"
                  variant="outline-primary"
                  className="rounded-circle pb-2"
                  size="sm"
                >
                  <CaretUp size={16} />
                </Button>
              </div>
              <div>
                <strong>{vote}</strong>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline-primary"
                  className="rounded-circle pb-2"
                  size="sm"
                >
                  <CaretDown size={16} />
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={11}>
            <p className="">{body}</p>
            <Row>
              <Col>
                <div className="float-end bg-dark-subtle p-2 rounded-1">
                  <BbTimeAgo title="Asked" dateTime={createdAt} size={12} />
                  <div className="">By {createdById}</div>
                  {/*  todo: replace with createdByName */}
                  <div className=""></div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <h4>
              {answers.length} Answer{answers.length > 1 ? "s" : ""}
            </h4>
          </Col>
        </Row>

        {answers.map((item) => {
          const {body, createdAt, downVoteCount, id, isAccepted, upVoteCount, userId} = item;
          const vote = Math.abs(upVoteCount - downVoteCount);
          return (
            <Row className="pt-3 pb-3">
              <Col xs={1}>
                <div className="text-center">
                  <div>
                    <Button
                      type="button"
                      variant="outline-primary"
                      className="rounded-circle pb-2"
                      size="sm"
                    >
                      <CaretUp size={16} />
                    </Button>
                  </div>
                  <div>
                    <strong>{vote}</strong>
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline-primary"
                      className="rounded-circle pb-2"
                      size="sm"
                    >
                      <CaretDown size={16} />
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={11}>
                <p className="">{body}</p>
                <Row>
                  <Col>
                    <div className="float-end bg-dark-subtle p-2 rounded-1">
                      <BbTimeAgo title="Answered" dateTime={createdAt} size={12} />
                      {/* <div className="">By {createdById}</div> */}
                      {/*  todo: replace with createdByName */}
                      <div className=""></div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}

        {/* <Card title="Answers" className="mt-3">
          {answers.map((item) => {
            let answerVote = Math.abs(item.upVoteCount - item.downVoteCount);
            return (
              <>
                <Card.Footer>
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-link">
                      <CaretUp />
                    </button>
                    <div className="mt-2" title="Vote">
                      {answerVote}
                    </div>
                    <button type="button" className="btn btn-link">
                      <CaretDown />
                    </button>
                  </div>
                </Card.Footer>
                <Card.Header>
                  <Row>
                    <Col>
                      Answered{" "}
                      <strong>
                        <TimeAgo date={item.createdAt} />
                      </strong>
                    </Col>
                    <Col>
                      Last Updated
                      <strong>
                        <TimeAgo date={item.lastUpdate} />
                      </strong>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <p>{item.title}</p>
                  <p>{item.body}</p>
                </Card.Body>
              </>
            );
          })}
        </Card> */}
      </ContentLayout>
    </>
  );
};
