import { Button, Col } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";

type BbTimeAgoProps = {
  vote: number;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const UpVoteDownVote = ({ vote, size = 2 }: BbTimeAgoProps) => {
  return (
    <>
      <Col xs={1}>
        <div className="text-center">
          <div>
            <Button
              type="button"
              variant="outline-primary"
              className="rounded-circle pb-2"
              size="sm"
            >
              <CaretUp size={16} />
            </Button>
          </div>
          <div>
            <strong>{vote}</strong>
          </div>
          <div>
            <Button
              type="button"
              variant="outline-primary"
              className="rounded-circle pb-2"
              size="sm"
            >
              <CaretDown size={16} />
            </Button>
          </div>
        </div>
      </Col>
    </>
  );
};
