import { ContentLayout } from "@/components/layout";
import { useQuestion } from "./api/Question.api";
import { useParams } from "react-router-dom";
import { PageNotFound } from "../misc";
import { Button, Col, Row } from "react-bootstrap";
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import parse from "html-react-parser";
import { useSearchContext } from "@/providers/SearchContext";
import { ErrorComponent } from "../misc/ErrorComponent";
import { Spinner } from "@/components/elements/spinner";

export const QuestionDetail = () => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const { searchTerm } = useSearchContext();
  const user = useUser().data;
  const [editorKey, setEditorKey] = useState(uuidv4());

  const answerCreateQuery = useAnswerCreate();
  const [answerCreateDto, setAnswerCreateDto] = useState<AnswerCreateDto>({
    questionId: "",
    body: "",
  });

  const { questionId } = useParams();
  !questionId && <PageNotFound />;

  const questionQuery = useQuestion({ questionId, page, query });

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = questionQuery;

  useEffect(() => {
    setQuery(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    data?.pagedAnswers && data?.pagedAnswers?.totalPages <= page + 1
      ? setHasMore(false)
      : setHasMore(true);
    console.log("Page: " + page);
  }, [data?.pagedAnswers, data?.pagedAnswers?.totalPages, page]);

  isLoading && <Spinner />;
  if (!data) return null;

  const {
    id,
    title,
    createdAt,
    lastUpdated,
    body,
    upVoteCount,
    downVoteCount,
    createdBy,
    pagedAnswers,
  } = data!;

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
    answerCreateQuery.isLoading && <Spinner />;
    answerCreateQuery.isIdle && <Spinner />;

    const data = res as unknown as AnswerResponse;
    pagedAnswers?.items?.unshift(data as AnswerResponse);
    setEditorKey(uuidv4());
  };

  const pagingButtons = [];
  if (pagedAnswers) {
    for (let i = 0; i < pagedAnswers?.totalPages; i++) {
      pagingButtons.push(
        <Button
          type="button"
          className="btn-xs ms-1 me-1"
          key={uuidv4()}
          onClick={() => setPage(i)}
          disabled={page === i}
        >
          {i}
        </Button>
      );
    }
  }

  return (
    <Authorization allowedRoles={[Roles.Admin, Roles.User]}>
      {isLoading ? (
        <Spinner />
      ) : isFetching ? (
        <Spinner type="component" />
      ) : isError ? (
        <ErrorComponent message={error as string} />
      ) : isSuccess ? (
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
            <h4>{Pluralize(pagedAnswers?.itemCount, "Answer")}</h4>
          </Col>
        </Row>

        {pagedAnswers?.items?.map((item: AnswerResponse) => (
          <Answer key={item.id} data={item} userId={user?.id} />
        ))}

        {pagedAnswers?.totalPages > 1 && (
          <div className="text-center mt-2 mb-3">
            <Button
              type="button"
              size="sm"
              className="btn-xs"
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Prev
            </Button>

            {pagingButtons}

            <Button
              type="button"
              size="sm"
              className="btn-xs"
              onClick={() => {
                if (!isPreviousData && hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData || !hasMore}
            >
              Next
            </Button>
          </div>
        )}

        <hr />

        <Row>
          <Col sm={12}>
            <h5>Answer this Question</h5>
            <TinyMceEditor key={editorKey} onContentChange={handleBodyChange} height={300} />
          </Col>
          <Col sm={12}>
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              className="mt-2 mb-2"
              onClick={() => createAnswer(id)}
              disabled={answerCreateQuery.isLoading}
            >
              Post Your Answer
            </Button>
          </Col>
        </Row>
      </ContentLayout>
      ) : (
        <DataNotFound />
      )}
    </Authorization>
  );
};
