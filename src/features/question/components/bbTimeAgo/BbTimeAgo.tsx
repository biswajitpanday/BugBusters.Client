import { Col } from "react-bootstrap";
import TimeAgo from "react-timeago";

type BbTimeAgoProps = {
  dateTime: Date;
  title?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

// todo : Make it same line. Add Suffix. Separate size to a constant.
export const BbTimeAgo = ({ title, dateTime, size = 2 }: BbTimeAgoProps) => {
  return (
    <>
      {title}{" "}
      <strong>
        <TimeAgo date={dateTime} />
      </strong>
    </>
  );
};
