import {
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "../../../assets/BugBustersLogo.png";
import { useLogout, useUser } from "@/lib/Auth";
import { AppRouteConstant } from "@/constant";
import "./TopNavBar.Style.scss";
import Avatar from "react-avatar";
import { GetRandomDarkColor } from "@/utils/HelperUtil";
import { Roles } from "@/types";


export const TopNavBar = () => {
  const logout = useLogout();
  const user = useUser().data;
  return (
    <Navbar bg="light" expand="lg" className="mx-auto" sticky="top">
      <Navbar.Brand href=".">
        <Image src={logo} alt="Bug Busters" width={143} />
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav"  />
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end">
          <Nav.Link href={AppRouteConstant.Questions()}>Questions</Nav.Link>
          {user?.role === Roles.Admin && <Nav.Link href={AppRouteConstant.Users()}>Users</Nav.Link>}
          <Nav.Link href={AppRouteConstant.AskQuestion()}>Ask Question</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl type="t`ext" placeholder="Search" size="sm" width={600}/>
        </Form>
        <Nav className="mr-5">
          <NavDropdown title={<Avatar name={user?.fullName || user?.email}
                      size="30"
                      unstyled={false}
                      src=""
                      className="float-end me-1"
                      round={true}
                      textSizeRatio={2}
                      color={GetRandomDarkColor()} />} id="nav-add" align="end" >
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