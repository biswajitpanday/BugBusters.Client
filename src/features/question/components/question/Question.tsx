import { PostSignature } from "../postSignature/PostSignature";
import LinesEllipsis from "react-lines-ellipsis";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { Link } from "react-router-dom";
import { Pluralize } from "@/utils/HelperUtil";
import { Card, Col, Row } from "react-bootstrap";
import { QuestionResponse } from "@/types";
import { AppRouteConstant } from "@/constant";
import { Check2 } from "react-bootstrap-icons";

type QuestionProps = {
  data: QuestionResponse;
  showBody?: boolean;
};

export const Question = ({ data, showBody = false }: QuestionProps) => {
  const {
    id,
    title,
    body,
    upVoteCount,
    downVoteCount,
    answerCount,
    createdBy,
    createdAt,
    hasAcceptedAnswer,
  } = data;
  return (
    <Card className="mt-1">
      <Row className="pt-3 pb-3">
        <Col xs={2}>
          <div className="text-end small">
            <div>{Pluralize(upVoteCount, "up-vote")}</div>
            <div>{Pluralize(downVoteCount, "down-vote")}</div>
            <div>
              <span
                className={` small ${
                  answerCount > 0
                    ? "badge-outline border-success"
                    : ""
                } ${hasAcceptedAnswer ? "bg-success text-black" : ""}`}
              >
                {hasAcceptedAnswer && <Check2 />}{" "}
                {Pluralize(answerCount, "answer")}
              </span>
            </div>
          </div>
        </Col>
        <Col xs={10}>
          <Link
            to={`${AppRouteConstant.Questions()}/${id}`}
            className="underline-none"
          >
            <LinesEllipsis
              text={title}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
              className="fs-5 fw-bolder"
            />
          </Link>
          {showBody && (
            <HTMLEllipsis
              unsafeHTML={body}
              maxLine="3"
              ellipsis="..."
              basedOn="letters"
              className="mt-3"
            />
          )}
          <PostSignature
            createdBy={createdBy}
            createdAt={createdAt}
            className="mt-1"
          />
        </Col>
      </Row>
    </Card>
  );
};
