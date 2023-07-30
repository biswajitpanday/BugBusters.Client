import {
  Button,
  Form,
  FormControl,
  InputGroup,
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
import { useSearchContext } from "@/providers/SearchContext";
import { useState } from "react";
import { Search, X } from "react-bootstrap-icons";

export const TopNavBar = () => {
  const logout = useLogout();
  const user = useUser().data;
  const { setSearchTerm } = useSearchContext();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    searchInput.length > 0 && setSearchTerm(searchInput);
  };

  const handleClearClick = () => {
    setSearchInput("");
    setSearchTerm("");
  };
  return (
    <Navbar bg="light" expand="lg" className="mx-auto" sticky="top">
      <Navbar.Brand href=".">
        <Image src={logo} alt="Bug Busters" width={143} />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end">
          <Nav.Link href={AppRouteConstant.Questions()}>Questions</Nav.Link>
          {user?.role === Roles.Admin && (
            <Nav.Link href={AppRouteConstant.Users()}>Users</Nav.Link>
          )}
          <Nav.Link href={AppRouteConstant.AskQuestion()}>
            Ask Question
          </Nav.Link>
        </Nav>
        <Form className="d-flex">
          <InputGroup className="" size="sm">
            <FormControl
              type="text"
              placeholder="Search"
              size="sm"
              className="input-primary"
              width={600}
              value={searchInput}
              onChange={handleSearchChange}
            />
            {searchInput && (
              <Button type="button" size="sm" variant="outline-secondary" onClick={handleClearClick}>
                <X/>
              </Button>
            )}
            <Button
            type="button"
            size="sm"
            variant="outline-primary"
            className=""
            onClick={handleSearchSubmit}
          >
            <Search />
          </Button>
          </InputGroup>
        </Form>
        <Nav className="mr-5">
          <NavDropdown
            title={
              <Avatar
                name={user?.fullName == null ? user?.email : user?.email}
                size="30"
                unstyled={false}
                src=""
                className="float-end me-1"
                round={true}
                textSizeRatio={2}
                color={GetRandomDarkColor()}
              />
            }
            id="nav-add"
            align="end"
          >
            <NavDropdown.Item href={AppRouteConstant.UserProfile()}>
              Profile
            </NavDropdown.Item>
            {/* <NavDropdown.Item href={AppRouteConstant.Settings()}>Settings</NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout.mutate({})}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};