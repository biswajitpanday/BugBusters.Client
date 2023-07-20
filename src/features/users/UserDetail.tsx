import { ContentLayout } from "@/components/layout";
import { PageNotFound } from "../misc";
import { useParams } from "react-router-dom";
import { useAppUser } from "./api/User.api";
import { Col, Row, Spinner } from "react-bootstrap";
import { Authorization } from "@/lib/Authorization";
import { QuestionResponse, Roles } from "@/types";
import {
  Balloon,
  EnvelopeAt,
  GeoAlt,
  PersonBoundingBox,
  PhoneFlip,
} from "react-bootstrap-icons";
import { BbTimeAgo } from "../question/components/bbTimeAgo/BbTimeAgo";
import { DataNotFound } from "../misc/DataNotFound";
import { Question } from "../question/components/question/Question";
import { Pluralize } from "@/utils/HelperUtil";

export const UserDetail = () => {
  const { userId } = useParams();
  !userId && <PageNotFound />;

  const userQuery = useAppUser(userId!);

  userQuery.isLoading && <Spinner />;
  if (!userQuery.data) return <DataNotFound />; // todo: Create a Data Not Found Component.

  const {
    fullName,
    email,
    userName,
    address,
    phoneNumber,
    createdAt,
    questions,
  } = userQuery.data;

  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      <ContentLayout title="">
        <h3>
          {" "}
          <PersonBoundingBox className="me-2" />
          {fullName !== null ? fullName : `@${userName}`}
        </h3>

        <div>
          <EnvelopeAt className="me-2" />
          {email}
        </div>
        {address && (
          <div>
            <GeoAlt className="me-2" />
            {address}
          </div>
        )}

        {phoneNumber && (
          <div>
            <PhoneFlip className="me-2" />
            {phoneNumber}
          </div>
        )}
        {createdAt && (
          <div>
            <Balloon className="me-2" />
            <BbTimeAgo title="Member since" dateTime={createdAt} size={12} />
          </div>
        )}
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
