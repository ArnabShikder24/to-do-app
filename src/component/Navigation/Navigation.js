import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../../firebase.init';

const Navigation = () => {
    const [user] = useAuthState(auth);

    //signUp function
    const logOutHandle =() => {
        signOut(auth)
    }
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Awesome To-Do App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <NavLink className='nav-link' to="/">Home</NavLink>
                {
                    user ?
                    <button onClick={logOutHandle} className='social-btn'><span>LogOut</span></button>
                    :
                    <>
                    <NavLink className='nav-link' to="/login">Login</NavLink>
                    <NavLink className='nav-link' to="/signup">SignUp</NavLink>
                    </>
                }
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default Navigation;