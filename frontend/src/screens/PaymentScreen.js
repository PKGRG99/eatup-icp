import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
   let history = useNavigate();
   const cart = useSelector((state) => state.cart);
   const { shippingAddress } = cart;

   if (!shippingAddress) {
      history("/shipping");
   }

   const [paymentMethod, setPaymentMethod] = useState("eSewa");

   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      history("/placeorder");
   };

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <h1 className='mt-3 py-3'>Payment Method</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group>
               <Form.Label as='legend' className='pb-2'>
                  Select Method
               </Form.Label>
               <Col>
                  <Form.Check
                     type='radio'
                     label='eSewa'
                     id='eSewa'
                     name='paymentMethod'
                     value='eSewa'
                     className='py-3'
                     checked
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>

                  <Form.Check
                     type='radio'
                     label='Cash on Delivery'
                     id='cod'
                     name='paymentMethod'
                     value='cod'
                     className='py-3'
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
               </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
               Continue
            </Button>
         </Form>
      </FormContainer>
   );
};

export default PaymentScreen;
