import {
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import "./TopNavBar.Style.scss";
import { PersonCircle} from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import logo from "../../../assets/BugBustersLogo.png";
import { useLogout } from "@/lib/Auth";
import { AppRouteConstant } from "@/constant";


export const TopNavBar = () => {
  const logout = useLogout();
  return (
    <Navbar bg="light" expand="lg" className="mx-auto">
      <Navbar.Brand href="." className="ms-3">
        <Image src={logo} alt="Bug Busters" width={100} />
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav" className="me-3">
        <Nav className="justify-content-end">
          <Nav.Link href={AppRouteConstant.Questions()}>Questions</Nav.Link>
          <Nav.Link href={AppRouteConstant.Users()}>Users</Nav.Link>
          <Nav.Link href={AppRouteConstant.AskQuestion()}>Ask Question</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 ms-2 me-2" size="sm" width={600}/>
        </Form>
        <Nav className="mr-5">
          <NavDropdown title={<PersonCircle />} id="nav-add" align="end" >
            <NavDropdown.Item href={AppRouteConstant.UserProfile()}>Profile</NavDropdown.Item>
            <NavDropdown.Item href={AppRouteConstant.Settings()}>Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout.mutate({})}>Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};