import { Col, Container, Row } from "react-bootstrap";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  isFluid?: boolean;
};

export const ContentLayout = ({ children, title, isFluid }: ContentLayoutProps) => {
  return (
    <Container fluid={isFluid}>
      <h2>{title}</h2>
      <Row>
        <Col>
          <div>{children}</div>
        </Col>
      </Row>
    </Container>
  );
};
