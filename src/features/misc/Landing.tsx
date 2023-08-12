import { useUser } from "@/lib/Auth";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/BugBustersLogo.png";
import { AppRouteConstant } from "@/constant";

export const Landing = () => {
  const navigate = useNavigate();
  const user = useUser();

  // Entry Point Separation for Private & Public View
  const handleStart = () => {
    console.log(AppRouteConstant.Login());
    user.data !== null ? navigate(AppRouteConstant.Root()) : navigate(AppRouteConstant.Login());
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col className="text-center">
          <Image src={logo} alt="Bug Busters" width={300} className="mb-5"/>
          <h5>Hello Busters! You must be here to squash the bugs!</h5>
          <p>The Ultimate Solutions for Developers inside organizations.</p>
          <Button onClick={() => handleStart()} className="mt-5">Let's Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
};
