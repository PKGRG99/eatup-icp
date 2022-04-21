import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
   let history = useNavigate();
   const cart = useSelector((state) => state.cart);
   const { shippingAddress } = cart;

   const [address, setAddress] = useState(shippingAddress.address);
   const [city, setCity] = useState(shippingAddress.city);
   const [desc, setDesc] = useState(shippingAddress.desc);
   const [number, setNumber] = useState(shippingAddress.number);

   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(saveShippingAddress({ address, city, desc, number }));
      history("/payment");
   };

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 />
         <h1 className='mt-3'>Delivery Details</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-3'>
               <Form.Label>Address</Form.Label>
               <Form.Control
                  type='address'
                  placeholder='Enter Address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-3'>
               <Form.Label>City</Form.Label>
               <Form.Control
                  type='city'
                  placeholder='Enter City'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='number' className='my-3'>
               <Form.Label>Your Contact Number</Form.Label>
               <Form.Control
                  type='number'
                  placeholder='Contact Number'
                  value={number}
                  required
                  onChange={(e) => setNumber(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='desc' className='my-3'>
               <Form.Label>Describe Your Area (Optional)</Form.Label>
               <Form.Control
                  type='desc'
                  placeholder='Description of your area'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
               ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
               Proceed to Payment
            </Button>
         </Form>
      </FormContainer>
   );
};

export default ShippingScreen;
