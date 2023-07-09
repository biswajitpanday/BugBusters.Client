import { Button, Col } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";

type BbTimeAgoProps = {
  voteCount: number;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const UpVoteDownVote = ({ voteCount, size = 2 }: BbTimeAgoProps) => {
  //const voteQuery = useCreateVote();
  const createVote = (isUpVote: boolean) => {
    console.log("Vote Create...");
  };

  return (
    <Col xs={1}>
      <div className="text-center">
        <div>
          <Button
            type="button"
            variant="outline-primary"
            className="rounded-circle pb-2"
            size="sm"
            onClick={() => createVote(true)}
          >
            <CaretUp size={16} />
          </Button>
        </div>
        <div>
          <strong>{voteCount}</strong>
        </div>
        <div>
          <Button
            type="button"
            variant="outline-primary"
            className="rounded-circle pb-2"
            size="sm"
            onClick={() => createVote(false)}
          >
            <CaretDown size={16} />
          </Button>
        </div>
      </div>
    </Col>
  );
};
