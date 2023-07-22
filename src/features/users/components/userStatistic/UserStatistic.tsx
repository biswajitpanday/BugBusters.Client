import { ProfileStatistic, UserProfile } from "@/types";
import { Pluralize } from "@/utils/HelperUtil";
import { Card, Col, Row } from "react-bootstrap";

type UserProfileProps = {
  data: UserProfile & ProfileStatistic;
};

export const UserStatistic = ({ data }: UserProfileProps) => {
  const { questionAsked, answered, upVoteCount, downVoteCount } = data;
  return (
    //Todo: Show Stats Card. Design with some icon and some more data like: https://www.creative-tim.com/bits/bootstrap/bootstrap-stats-card-argon-dashboard
    <Card>
      <Card.Body className="text-primary">
        <Row className="mb-3">
          <Col sm={6}>
            <h4>{Pluralize(questionAsked, "Question")} Asked</h4>
          </Col>
          <Col sm={6}>
            <h4>{Pluralize(answered, "Answer")} Given</h4>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <h4>{Pluralize(upVoteCount, "Up Vote")} Given</h4>
          </Col>
          <Col sm={6} >
            <h4>{Pluralize(downVoteCount, "Down Vote")} Given</h4>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
