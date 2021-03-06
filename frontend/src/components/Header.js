import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import CartSVG from "../assets/cart.svg";
import LoginSVG from "../assets/login.svg";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;
   const dispatch = useDispatch();

   const logoutHandler = () => {
      dispatch(logout());
   };

   return (
      <header>
         <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
               {userInfo && !userInfo.isAdmin ? (
                  <LinkContainer to='/'>
                     <Navbar.Brand>EAT UP</Navbar.Brand>
                  </LinkContainer>
               ) : (
                  userInfo &&
                  userInfo.isAdmin && (
                     <LinkContainer to='/admin/homepage'>
                        <Navbar.Brand>EAT UP</Navbar.Brand>
                     </LinkContainer>
                  )
               )}

               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <SearchBox />
                  <Nav className='ms-auto'>
                     {userInfo && !userInfo.isAdmin && (
                        <LinkContainer to='/cart'>
                           <Nav.Link>
                              <img src={CartSVG} alt='Cart' /> Cart
                           </Nav.Link>
                        </LinkContainer>
                     )}

                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler}>
                              Log Out
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to='/login'>
                           <Nav.Link>
                              <img src={LoginSVG} alt='Log In' /> Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}
                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Manage' id='adminmenu'>
                           <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
