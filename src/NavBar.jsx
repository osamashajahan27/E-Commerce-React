import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";


function NavBar() {
  let Navigate=useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll"  className="navbarFull">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" ,color:"black"}}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" style={{color:"black"}}>Home</Nav.Link>
            <Nav.Link as={Link} to="/login" style={{color:"black"}}>Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" style={{color:"black"}}>Signup</Nav.Link>
            <Nav.Link as={Link} to="/product" style={{color:"black"}}>Product</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button style={{color : "orange",backgroundColor: "white"}} onClick={()=>{Navigate("/wishList")}} ><TiShoppingCart /></Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" style={{color:"black"}}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
