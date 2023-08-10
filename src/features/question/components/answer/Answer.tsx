import { useState } from "react";
import { useAnswerAccept } from "../../api/Answer.api";
import { AnswerAcceptDto, AnswerResponse } from "@/types";
import { Button, Col, Row } from "react-bootstrap";
import { UpVoteDownVote } from "../upVoteDownVote/UpVoteDownVote";
import { PostSignature } from "../postSignature/PostSignature";
import parse from "html-react-parser";

type AnswerProps = {
  data: AnswerResponse;
  userId: string | undefined;
};

export const Answer = ({ data, userId }: AnswerProps) => {
 
  const answerAcceptQuery = useAnswerAccept();
  const [answerAcceptDto, setAnswerAcceptDto] = useState<AnswerAcceptDto>({
    id: "",
  });

  const {
    id,
    body,
    createdAt,
    downVoteCount,
    isAccepted,
    upVoteCount,
    createdBy,
  } = data;
  const vote = upVoteCount - downVoteCount;


  const acceptAnswer = async (id: string) => {
    setAnswerAcceptDto({ id: id });
    const res = await answerAcceptQuery.mutateAsync({
      ...answerAcceptDto,
      id,
    });
    // todo: Show realtime update
  };

  return (
    <Row className="pt-3 pb-3" key={id}>
      <UpVoteDownVote upVote={upVoteCount} downVote={downVoteCount} voteCount={vote} answerId={id} isAccepted={isAccepted} />
      <Col xs={11}>
        <p className="">{parse(body)}</p>
        <Row>
          <Col className="mt-1">
            <PostSignature createdBy={createdBy} createdAt={createdAt} />
            {userId !== createdBy?.id && !isAccepted && (
              <Button
                type="button"
                variant="outline-primary"
                size="sm"
                className="btn-xs float-end me-2 mb-auto"
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
};
