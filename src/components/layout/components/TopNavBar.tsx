import { Nav, NavItem, NavLink, Navbar } from "react-bootstrap";

export const TopNavBar = () => {
  return (
    <Navbar className="border-bottom-1" bg="blue" sticky="top" fixed="top" expand="xxl" expanded={true} variant="light">
      <Navbar.Brand href="/">My Website</Navbar.Brand>
      <Nav>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
