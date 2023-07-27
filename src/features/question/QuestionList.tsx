import { ContentLayout } from "@/components/layout";
import { usePagedQuestions } from "./api/Question.api";
import { Spinner } from "@/components/elements/spinner";
import { Authorization } from "@/lib/Authorization";
import { QuestionResponse, Roles } from "@/types";
import { DataNotFound } from "../misc/DataNotFound";
import { Question } from "./components/question/Question";
import { Pluralize } from "@/utils/HelperUtil";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ErrorComponent } from "../misc/ErrorComponent";

export const QuestionList = () => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const questionsQuery = usePagedQuestions(page);

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = questionsQuery;

  useEffect(() => {
    data && data.totalPages <= page + 1 ? setHasMore(false) : setHasMore(true);
  }, [data, data?.totalPages, page]);

  const pagingButtons = [];
  if (data) {
    for (let i = 0; i < data?.totalPages; i++) {
      pagingButtons.push(
        <Button
          type="button"
          className="btn-xs ms-1 me-1"
          key={i + 1}
          onClick={() => setPage(i)}
          disabled={page === i}
        >
          {i}
        </Button>
      );
    }
  }

  if (!data) return null;
  if (isError) return <DataNotFound />;

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      {isLoading ? (
        <Spinner />
      ) : isFetching ? (
        <Spinner type="component" />
      ) : isError ? (
        <ErrorComponent message={error} />
      ) : isSuccess ? (
        <ContentLayout title="All Questions">
          <p>Total {Pluralize(data.itemCount, "Question")} Asked</p>
          {data.items?.map((item: QuestionResponse, index: number) => {
            return <Question key={item.id} data={item} />;
          })}

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

            {pagingButtons.map((button) => (
              <>{button}</>
            ))}

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
        </ContentLayout>
      ) : (
        <DataNotFound />
      )}
    </Authorization>
  );
};
