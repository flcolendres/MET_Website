import { Container, Form, Navbar, Nav, Button, NavDropdown }  from "react-bootstrap";
import { useRouter } from "next/router"
import { useState }  from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';

// console.log(useAtom)
import Link from "next/link";
export default function MainNav(){
    const router = useRouter();
    const [search, setSearch] = useState();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();

    async function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        setIsExpanded(false);
        let queryString = `&title=true&q=${search}`;
        // setSearchHistory(current => [...current, queryString]);
        setSearchHistory(await addToHistory(`title=true&q=${search}`))
        router.push(`/artwork?title=true&q=${search}`);
      }
    
    function expandedToFalse(){
        setIsExpanded(false);
    }
    function toggleIsExpanded(){
        setIsExpanded(!isExpanded);
    }
    function logout() {
        expandedToFalse()
        removeToken();
        router.push('/login');
      }
    return(
        <>
            <Navbar className="fixed-top navbar-dark bg-dark" expand="lg" expanded={isExpanded}>
            <Container>
                <Navbar.Brand>Francis Colendres</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleIsExpanded}/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={expandedToFalse}>Home</Nav.Link></Link> 
                    {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={expandedToFalse}>Advanced Search</Nav.Link></Link>}
                </Nav>
                <Nav>
                    {!token && <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={expandedToFalse}>Register</Nav.Link></Link>}
                    {!token && <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={expandedToFalse}>Login</Nav.Link></Link>}
                </Nav>
                &nbsp;{token && <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search} 
                        onChange={e =>{setSearch(e.target.value)}} 
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>}&nbsp;
                <Nav>
                    {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link passHref legacyBehavior href="/favourites"><NavDropdown.Item active={router.pathname === "/favourites"} onClick={expandedToFalse}>Favourites</NavDropdown.Item></Link>
                    <Link passHref legacyBehavior href="/history"><NavDropdown.Item active={router.pathname === "/history"} onClick={expandedToFalse}>Search History</NavDropdown.Item></Link>
                   <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <br /> <br />
        </>
    )
}