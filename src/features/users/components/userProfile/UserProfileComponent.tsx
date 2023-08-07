import { BbTimeAgo } from "@/features/question/components/bbTimeAgo/BbTimeAgo";
import { ProfileStatistic, UserProfile } from "@/types";
import { Card } from "react-bootstrap";
import {
  Balloon,
  EnvelopeAt,
  GeoAlt,
  PersonBoundingBox,
  PhoneFlip,
} from "react-bootstrap-icons";

type UserProfileProps = {
  data: UserProfile & ProfileStatistic;
};

export const UserProfileComponent = ({ data }: UserProfileProps) => {
  const { fullName, userName, email, address, phoneNumber, createdAt } =
    data;
  return (
    <Card>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};
