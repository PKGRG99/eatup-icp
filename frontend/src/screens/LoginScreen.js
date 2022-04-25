import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   let location = useLocation();
   let history = useNavigate();
   const redirect = location.search ? location.search.split("=")[1] : "/";
   const dispatch = useDispatch();
   const userLogin = useSelector((state) => state.userLogin);
   const { loading, error, userInfo } = userLogin;

   useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
         history("/admin/homepage");
      } else if (userInfo) {
         history(redirect);
      } else {
         history("/login");
      }
   }, [userInfo, redirect, history]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
   };

   return (
      <FormContainer>
         <h1 className='mb-2'>Sign In</h1>
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}
         <p className='text-muted mb-4'>
            Log in with your account and get your foods delivered instantly.
         </p>
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='mt-3'>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
               Log In
            </Button>
         </Form>

         <Row className='py-3'>
            <Col>
               New Customer?{" "}
               <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
                  Register
               </Link>
            </Col>
         </Row>
      </FormContainer>
   );
};

export default LoginScreen;
