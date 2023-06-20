import { Col, Container, Row } from "react-bootstrap";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <Container>
      <h2>{title}</h2>
      <Row>
        <Col>
          <div>{children}</div>
        </Col>
      </Row>
    </Container>
  );
};
