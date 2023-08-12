import { ContentLayout } from "@/components/layout";
import { PageNotFound } from "../misc";
import { useParams } from "react-router-dom";
import { useAppUser } from "./api/User.api";
import { Col, Row } from "react-bootstrap";
import { Authorization } from "@/lib/Authorization";
import { QuestionResponse, Roles } from "@/types";
import { DataNotFound } from "../misc/DataNotFound";
import { Question } from "../question/components/question/Question";
import { Pluralize } from "@/utils/HelperUtil";
import { UserProfileComponent } from "./components/userProfile/UserProfileComponent";
import { Spinner } from "@/components/elements/spinner";
import { ErrorComponent } from "../misc/ErrorComponent";

export const UserDetail = () => {
  const { userId } = useParams();
  !userId && <PageNotFound />;

  const userQuery = useAppUser(userId!);
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isFetching,
  } = userQuery;

  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      {isLoading ? (
        <Spinner />
      ) : isFetching ? (
        <Spinner type="component" />
      ) : isError ? (
        <ErrorComponent message={error} />
      ) : isSuccess ? (
      <ContentLayout title="">
        <UserProfileComponent data={userQuery.data} />
        <hr />
        <h4>Asked Questions</h4>
        <p>Total {Pluralize(data.questions?.length, "Question")} Asked</p>
        {data.questions !== undefined &&
          data.questions?.length > 0 &&
          data.questions?.map((item: QuestionResponse) => (
            <Row key={item?.id}>
              <Col>
                <Question data={{ ...item, createdBy: userQuery.data }} />
              </Col>
            </Row>
          ))}
      </ContentLayout>
       ) : (
        <DataNotFound />
      )}
    </Authorization>
  );
};
