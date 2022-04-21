import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
// import { ORDER_CREATE_RESET } from "../constants/orderConstants";
// import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = () => {
   const dispatch = useDispatch();
   let history = useNavigate();
   const cart = useSelector((state) => state.cart);

   // if (!cart.shippingAddress.address) {
   //    history("/shipping");
   // } else if (!cart.paymentMethod) {
   //    history("/payment");
   // }
   //   Calculate prices
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };

   cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   );
   cart.shippingPrice = addDecimals(cart.itemsPrice > 200 ? 0 : 20);
   cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
   cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
   ).toFixed(2);

   const orderCreate = useSelector((state) => state.orderCreate);
   const { order, success, error } = orderCreate;

   useEffect(() => {
      if (success) {
         history(`/order/${order._id}`);
      }
      // eslint-disable-next-line
   }, [history, success]);

   const placeOrderHandler = () => {
      dispatch(
         createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
         })
      );
   };

   return (
      <>
         <CheckoutSteps step1 step2 step3 step4 />
         <Row>
            <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2 className='py-2'>Shipping</h2>
                     <p>
                        <strong>Address:</strong> {cart.shippingAddress.address}
                        , {cart.shippingAddress.city},
                     </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2 className='py-2'>Payment Method</h2>
                     <strong>Method: </strong>
                     {cart.paymentMethod}
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2 className='py-2'>Order Items</h2>
                     {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                     ) : (
                        <ListGroup variant='flush'>
                           {cart.cartItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={1}>
                                       <Image
                                          className='py-2'
                                          src={item.image}
                                          alt={item.name}
                                          fluid
                                          rounded
                                       />
                                    </Col>
                                    <Col>
                                       <Link to={`/product/${item.product}`}>
                                          <h4 className='py-2'>{item.name}</h4>
                                       </Link>
                                    </Col>
                                    <Col md={4} className='py-2'>
                                       {item.qty} x Rs.{item.price} = Rs.
                                       {item.qty * item.price}
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     )}
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>Rs.{cart.itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Delivery</Col>
                           <Col>Rs.{cart.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>Rs.{cart.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>Rs.{cart.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button
                           type='button'
                           className='btn-block'
                           disabled={cart.cartItems === 0}
                           onClick={placeOrderHandler}
                        >
                           Place Order
                        </Button>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Link className='btn btn-dark my-3' to='/'>
                           Cancel Order
                        </Link>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default PlaceOrderScreen;
