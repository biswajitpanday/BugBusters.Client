import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { PageNotFound } from "../misc";
import { Badge, Button, Col, Row, Spinner } from "react-bootstrap";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";
import { UpVoteDownVote } from "./components/upVoteDownVote/UpVoteDownVote";
import { GetRandomColor, Pluralize } from "@/utils/HelperUtil";
import { AnswerAcceptDto, AnswerResponse, Roles } from "@/types";
import { Authorization } from "@/lib/Authorization";
import { useUser } from "@/lib/Auth";
import { useAnswerAccept } from "./api/Answer.api";
import { useState } from "react";
import parse from "html-react-parser";
import Avatar from "react-avatar";
import { DataNotFound } from "../misc/DataNotFound";

export const QuestionDetail = () => {
  const user = useUser().data;
  const answerAcceptQuery = useAnswerAccept();
  const [answerAcceptDto, setAnswerAcceptDto] = useState<AnswerAcceptDto>({
    id: "",
  });
  const { questionId } = useParams();
  !questionId && <PageNotFound />;

  const questionQuery = useQuestion(questionId!);

  questionQuery.isLoading && <Spinner />;
  if (!questionQuery.data) return <DataNotFound />;

  const {
    id,
    title,
    createdAt,
    lastUpdated,
    body,
    upVoteCount,
    downVoteCount,
    createdBy,
    answers,
  } = questionQuery.data;

  const vote = Math.abs(upVoteCount - downVoteCount);

  return (
    <Authorization allowedRoles={[Roles.Admin, Roles.User]}>
      <ContentLayout title="">
        <Row className="mt-3">
          <Col xs={12}>
            <h3>{title}</h3>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col sm={2}>
            <BbTimeAgo title="Asked" dateTime={createdAt} />
          </Col>
          <Col sm={2}>
            <BbTimeAgo title="Modified" dateTime={lastUpdated} />
          </Col>
        </Row>

        <hr />

        <Row className="pt-3 pb-3">
          <UpVoteDownVote voteCount={vote} questionId={id} />
          <Col xs={11}>
            <p className="">{parse(body)}</p>
            <Row>
              <Col>
                {/* Todo: Create a separate Component. */}
                <Badge bg="primary" className="float-end bg me-3 rounded-1">
                  {/* <Image src="" alt=""/> */}
                  {createdBy?.fullName || createdBy?.email}{" "}
                  <BbTimeAgo title="Asked" dateTime={createdAt} size={12} />
                </Badge>
                <Avatar
                  name={createdBy?.fullName || createdBy?.email}
                  size="23"
                  unstyled={false}
                  src=""
                  className="float-end me-1"
                  color={GetRandomColor()}
                />
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
            createdBy,
          } = item;
          const vote = Math.abs(upVoteCount - downVoteCount);

          const acceptAnswer = async (id: string) => {
            setAnswerAcceptDto({ id: id });
            const res = await answerAcceptQuery.mutateAsync({
              ...answerAcceptDto,
              id,
            });
            console.log(res);
            // todo: Show realtime update
          };

          return (
            <Row className="pt-3 pb-3" key={id}>
              <UpVoteDownVote
                voteCount={vote}
                answerId={id}
                isAccepted={isAccepted}
              />
              <Col xs={11}>
                <p className="">{body}</p>
                <Row>
                  <Col>
                    <Badge bg="primary" className="float-end bg me-3 rounded-1">
                      {createdBy?.fullName || createdBy?.email}
                      <BbTimeAgo
                        title="Answered"
                        dateTime={createdAt}
                        size={12}
                      />
                    </Badge>
                    <Avatar
                      name={createdBy?.fullName || createdBy?.email}
                      size="23"
                      unstyled={false}
                      src=""
                      className="float-end me-1"
                      color={GetRandomColor()}
                    />
                    {user?.id !== createdBy?.id && !isAccepted && (
                      <Button
                        type="button"
                        variant="outline-primary"
                        size="sm"
                        className="float-end me-2"
                        onClick={() => acceptAnswer(id)}
                      >
                        Accept
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </ContentLayout>
    </Authorization>
  );
};
