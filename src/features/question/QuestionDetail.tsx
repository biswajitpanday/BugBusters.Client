import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { PageNotFound } from "../misc";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { BbTimeAgo } from "./components/bbTimeAgo/BbTimeAgo";
import { UpVoteDownVote } from "./components/upVoteDownVote/UpVoteDownVote";
import { Pluralize } from "@/utils/HelperUtil";
import { AnswerCreateDto, AnswerResponse, Roles } from "@/types";
import { Authorization } from "@/lib/Authorization";
import { useUser } from "@/lib/Auth";
import { DataNotFound } from "../misc/DataNotFound";
import { PostSignature } from "./components/postSignature/PostSignature";
import { TinyMceEditor } from "./components/tinyMce/TinyMce";
import { Answer } from "./components/answer/Answer";
import { useAnswerCreate } from "./api/Answer.api";
import { useState } from "react";
import { toast } from "react-toastify";
import parse from "html-react-parser";

export const QuestionDetail = () => {
  const user = useUser().data;

  const answerCreateQuery = useAnswerCreate();
  const [answerCreateDto, setAnswerCreateDto] = useState<AnswerCreateDto>({
    questionId: "",
    body: "",
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

  const handleBodyChange = (content: any, editor: any) => {
    setAnswerCreateDto({ ...answerCreateDto, body: content });
  };

  const createAnswer = async (questionId: string) => {
    if (answerCreateDto.body.length <= 0) {
      toast("Answer can't be empty!");
      return;
    }
    const res = await answerCreateQuery.mutateAsync({
      ...answerCreateDto,
      questionId,
    });
    // todo: Clear TinyMce.
    const  data  = res as unknown as AnswerResponse;
    answers.unshift(data as AnswerResponse);
  };

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
                <PostSignature createdBy={createdBy} createdAt={createdAt} />
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

        {answers.map((item: AnswerResponse) => (
          <Answer key={item.id} data={item} userId={user?.id} />
        ))}

        <hr />

        <Row>
          <Col sm={12}>
            <h5>Answer this Question</h5>
            <TinyMceEditor onContentChange={handleBodyChange} height={300} />
          </Col>
          <Col sm={12}>
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              className="mt-2 mb-2"
              onClick={() => createAnswer(id)}
            >
              Post Your Answer
            </Button>
          </Col>
        </Row>
      </ContentLayout>
    </Authorization>
  );
};
