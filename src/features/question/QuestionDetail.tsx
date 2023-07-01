import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { NotFound } from "../misc";
import TimeAgo from "react-timeago";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";

export const QuestionDetail = () => {
  const { questionId } = useParams();
  !questionId && <NotFound />;

  const questionQuery = useQuestion(questionId!);

  questionQuery.isLoading && <Spinner />;
  if (!questionQuery.data) return null;

  const {
    title,
    createdAt,
    body,
    upVoteCount,
    downVoteCount,
    createdById,
    answers,
  } = questionQuery.data;

  const vote = Math.abs(upVoteCount - downVoteCount);

  console.log(questionQuery.data);

  return (
    <>
      <ContentLayout title="">
        <Row className="mt-3">
          <Col xs={12}>
            <h2>{title}</h2>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col xs={2}>
            <span>
              Asked{" "}
              <strong>
                <TimeAgo date={questionQuery.data.createdAt} />
              </strong>
            </span>
          </Col>

          <Col xs={2}>
            <span>
              Modified{" "}
              <strong>
                <TimeAgo date={questionQuery.data.lastUpdate} />
              </strong>
            </span>
          </Col>
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
                  <div>
                    Asked <TimeAgo date={createdAt} />{" "}
                  </div>
                  <div className="">By {createdById}</div>
                  {/*  todo: replace with createdByName */}
                  <div className=""></div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Card title="Answers" className="mt-3">
          {questionQuery.data.answers.map((item) => {
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
        </Card>
      </ContentLayout>
    </>
  );
};
