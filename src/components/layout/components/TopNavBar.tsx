import {
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import "./TopNavBar.Style.scss";
import { PersonCircle} from "react-bootstrap-icons";

export const TopNavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="ml-auto">
      <Navbar.Brand href="#home" className="ms-3">BugBusters</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end">
          <Nav.Link href="#questions">Questions</Nav.Link>
          <Nav.Link href="#users">Users</Nav.Link>
          <Nav.Link href="#ask">Ask Question</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" size="sm" />
        </Form>
        <Nav>
          <Nav.Link href="#login">Log in</Nav.Link>
          <Nav.Link href="#signup">Sign up</Nav.Link>
          <NavDropdown title={<PersonCircle />} id="nav-dropdown"  drop="down-centered">
            <NavDropdown.Item href="#profile">View Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};