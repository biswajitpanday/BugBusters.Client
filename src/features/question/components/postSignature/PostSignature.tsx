import { Badge } from "react-bootstrap";
import { BbTimeAgo } from "../bbTimeAgo/BbTimeAgo";
import { GetRandomDarkColor } from "@/utils/HelperUtil";
import { UserProfile } from "@/types";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";
import Avatar from "react-avatar";

type PostSignatureProps = {
  createdAt: Date;
  createdBy: UserProfile;
  showAvatar?: boolean;
  showName?: boolean;
  avatarColor?: string;
  className?: string;
};

export const PostSignature = ({
  createdBy,
  createdAt,
  showAvatar = true,
  showName = true,
  avatarColor = GetRandomDarkColor(),
  className,
}: PostSignatureProps) => {
  return (
    <div className={`float-end me-3 ${className}`}>
      {showAvatar && (
        <Avatar
          name={
            createdBy?.fullName === null
              ? createdBy?.email
              : createdBy?.fullName
          }
          size="20"
          unstyled={false}
          src=""
          className="rounded me-1"
          textSizeRatio={2}
          color={avatarColor}
        />
      )}
      <Badge
        bg="transparent"
        className="bg rounded-1 badge-outline text-secondary small"
      >
        {showName && (
          <Link
            to={`${AppRouteConstant.Users()}/${createdBy?.id}`}
            className="underline-none small text"
          >
            {createdBy?.fullName === null
              ? createdBy?.email
              : createdBy?.fullName}{" "}
          </Link>
        )}
        <BbTimeAgo title="Asked" dateTime={createdAt} size={12} />
      </Badge>
    </div>
  );
};
