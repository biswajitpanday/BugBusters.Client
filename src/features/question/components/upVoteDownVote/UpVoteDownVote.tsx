import { Button, Col } from "react-bootstrap";
import {
  CaretDown,
  CaretUp,
  Check2,
} from "react-bootstrap-icons";
import { VoteCreateDto } from "@/types";
import { useState } from "react";
import { useCreateVote } from "../../api/Vote.api";
import { Spinner } from "@/components/elements/spinner";

type UpVoteDownVoteProps = {
  upVote: number;
  downVote: number;
  voteCount: number;
  questionId?: string | null;
  answerId?: string | null;
  isAccepted?: boolean;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const UpVoteDownVote = ({
  upVote,
  downVote,
  voteCount,
  questionId = null,
  answerId = null,
  isAccepted = false,
  size = 2,
}: UpVoteDownVoteProps) => {
  const voteQuery = useCreateVote();
  const [voteCreateDto, setVoteCreateDto] = useState<VoteCreateDto>({
    isUpVote: true,
    questionId: null,
    answerId: null,
  });

  let absVoteCount = Math.abs(upVote) + Math.abs(downVote);
  const isUpVote = (upVote - downVote) > 0;
  const isDownVote = (upVote - downVote) < 0;
  const [totalVoteCount, setTotalVoteCount] = useState<number>(absVoteCount);
  
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
            active={isUpVote}
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
            active={isDownVote}
          >
            <CaretDown size={16} />
          </Button>
        </div>
        {isAccepted && <Check2 size={30} color="green" />}
      </div>
    </Col>
  );
};
