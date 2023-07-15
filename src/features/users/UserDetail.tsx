import { ContentLayout } from "@/components/layout";
import { PageNotFound } from "../misc";
import { useParams } from "react-router-dom";
import { useAppUser } from "./api/User.api";
import { Spinner } from "react-bootstrap";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import {
  Balloon,
  EnvelopeAt,
  GeoAlt,
  PersonBoundingBox,
  PhoneFlip,
} from "react-bootstrap-icons";
import { BbTimeAgo } from "../question/components/bbTimeAgo/BbTimeAgo";
import { DataNotFound } from "../misc/DataNotFound";

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
      </ContentLayout>
    </Authorization>
  );
};
