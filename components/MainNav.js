import { Container, Form, Navbar, Nav, Button }  from "react-bootstrap";
import { useRouter } from "next/router"
import { useState }  from "react";
export default function MainNav(){
    const router = useRouter();
    const [search, setSearch] = useState();

    function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
      }

    return(
        <>
            <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
            <Container>
                <Navbar.Brand>Francis Colendres</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/" passHref legacyBehaviour>Home</Nav.Link>
                    <Nav.Link href="/search" passHref legacyBehaviour>Advanced Search</Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search} 
                        onChange={e =>{setSearch(e.target.value)}} 
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <br /> <br />
        </>
    )
}