import { Badge } from "react-bootstrap";
import { BbTimeAgo } from "../bbTimeAgo/BbTimeAgo";
import Avatar from "react-avatar";
import { GetRandomDarkColor } from "@/utils/HelperUtil";
import { UserProfile } from "@/types";

type PostSignatureProps = {
  createdAt: Date;
  createdBy: UserProfile;
  showAvatar?: boolean;
  avatarColor?: string;
  className?: string;
};

export const PostSignature = ({
  createdBy,
  createdAt,
  showAvatar = true,
  avatarColor = GetRandomDarkColor(),
  className,
}: PostSignatureProps) => {
  return (
    <div className={`float-end me-3 ${className}`}>
      {showAvatar && (
        <Avatar
          name={createdBy?.fullName === null ? createdBy?.email: createdBy?.fullName}
          size="20"
          unstyled={false}
          src=""
          className="rounded me-1"
          textSizeRatio={2}
          color={avatarColor}
        />
      )}
      <Badge bg="primary" className="bg rounded-1 small">
        {createdBy?.fullName === null ? createdBy?.email: createdBy?.fullName}{" "}
        <BbTimeAgo title="Asked" dateTime={createdAt} size={12} />
      </Badge>
    </div>
  );
};
