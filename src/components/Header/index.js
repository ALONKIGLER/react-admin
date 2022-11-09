import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../actions";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLink = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNotLoggedInLink = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      fixed="top "
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          {" "}
          שלטי דרום
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLink() : renderNotLoggedInLink()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
