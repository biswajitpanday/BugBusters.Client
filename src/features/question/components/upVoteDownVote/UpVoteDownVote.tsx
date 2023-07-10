import { Button, Col, Spinner } from "react-bootstrap";
import { CaretDown, CaretUp } from "react-bootstrap-icons";
import { useCreateVote } from "../../api/Question.api";
import { VoteCreateDto } from "@/types";
import { useState } from "react";

type BbTimeAgoProps = {
  voteCount: number;
  questionId?: string | null;
  answerId?: string | null;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const UpVoteDownVote = ({
  voteCount,
  questionId = null,
  answerId = null,
  size = 2,
}: BbTimeAgoProps) => {
  const voteQuery = useCreateVote();
  const [voteCreateDto, setVoteCreateDto] = useState<VoteCreateDto>({
    isUpVote: true,
    questionId: null,
    answerId: null,
  });
  const [totalVoteCount, setTotalVoteCount] = useState<number>(voteCount);

  let res: any;
  const createVote = async (isUpVote: boolean) => {
    if (questionId !== null) {
      delete voteCreateDto.answerId;
      setVoteCreateDto({ isUpVote, questionId });
      res = await voteQuery.mutateAsync({
        ...voteCreateDto,
        questionId,
        isUpVote,
      });
    }
    if (answerId !== null) {
      delete voteCreateDto.questionId;
      setVoteCreateDto({ isUpVote, answerId });
      res = await voteQuery.mutateAsync({
        ...voteCreateDto,
        answerId,
        isUpVote,
      });
    }

    res.isLoading ?? <Spinner />;
    if (res.data !== null) {
      if (isUpVote) setTotalVoteCount(voteCount + 1);
      else setTotalVoteCount(voteCount - 1);
    } else if (res.error) {
      if (isUpVote) setTotalVoteCount(voteCount - 1);
      else setTotalVoteCount(voteCount + 1);
    }
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
          <strong>{totalVoteCount}</strong>
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
