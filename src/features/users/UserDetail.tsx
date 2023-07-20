import { ContentLayout } from "@/components/layout";
import { PageNotFound } from "../misc";
import { useParams } from "react-router-dom";
import { useAppUser } from "./api/User.api";
import { Col, Row, Spinner } from "react-bootstrap";
import { Authorization } from "@/lib/Authorization";
import { QuestionResponse, Roles } from "@/types";
import { DataNotFound } from "../misc/DataNotFound";
import { Question } from "../question/components/question/Question";
import { Pluralize } from "@/utils/HelperUtil";
import { UserProfileComponent } from "./components/userProfile/UserProfileComponent";

export const UserDetail = () => {
  const { userId } = useParams();
  !userId && <PageNotFound />;

  const userQuery = useAppUser(userId!);

  userQuery.isLoading && <Spinner />;
  if (!userQuery.data) return <DataNotFound />;

  const { questions } = userQuery.data;

  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      <ContentLayout title="">
        <UserProfileComponent data={userQuery.data} />
        <hr />
        <h4>Asked Questions</h4>
        <p>Total {Pluralize(questions?.length, "Question")} Asked</p>
        {questions !== undefined &&
          questions?.length > 0 &&
          questions?.map((item: QuestionResponse) => (
            <Row>
              <Col>
                <Question data={{ ...item, createdBy: userQuery.data }} />
              </Col>
            </Row>
          ))}
      </ContentLayout>
    </Authorization>
  );
};
