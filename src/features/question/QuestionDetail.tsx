import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { NotFound } from "../misc";
import TimeAgo from "react-timeago";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";

export const QuestionDetail = () => {
  const { questionId } = useParams();
  !questionId && <NotFound />;

  const questionQuery = useQuestion(questionId!);

  questionQuery.isLoading && <Spinner />;
  if (!questionQuery.data) return null;

  const vote = Math.abs(
    questionQuery.data.upVoteCount - questionQuery.data.downVoteCount
  );

  console.log(questionQuery.data);

  return (
    <>
      <ContentLayout title="">
        <Card title="Question">
          <Card.Footer>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-link">
                <CaretUp />
              </button>
              <div className="mt-2" title="Vote">
                {vote}
              </div>
              <button type="button" className="btn btn-link">
                <CaretDown />
              </button>
            </div>
            <strong>{questionQuery.data.title}</strong>
          </Card.Footer>
          <Card.Header>
            <Row>
              <Col>
                Asked{" "}
                <strong>
                  <TimeAgo date={questionQuery.data.createdAt} />
                </strong>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <p>{questionQuery.data.body}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

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
                      Answered {" "}
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
