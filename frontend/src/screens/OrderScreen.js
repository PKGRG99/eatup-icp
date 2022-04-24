import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
   getOrderDetails,
   deliverOrder,
   payOrder,
} from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
   let { id } = useParams();
   let history = useNavigate();
   const dispatch = useDispatch();

   const orderDetails = useSelector((state) => state.orderDetails);
   const { order, loading, error } = orderDetails;

   const orderDeliver = useSelector((state) => state.orderDeliver);
   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

   const orderPay = useSelector((state) => state.orderPay);
   const { loading: loadingPayment, success: successPayment } = orderPay;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   if (!loading) {
      //   Calculate prices
      const addDecimals = (num) => {
         return (Math.round(num * 100) / 100).toFixed(2);
      };

      order.itemsPrice = addDecimals(
         order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
   }

   useEffect(() => {
      if (!userInfo) {
         history("/login");
      }
      dispatch(getOrderDetails(id));
      dispatch({ type: ORDER_DELIVER_RESET });
   }, [dispatch, id, successDeliver, successPayment, history, userInfo]);

   const deliverHandler = () => {
      dispatch(deliverOrder(order));
   };

   const paymentHandler = () => {
      dispatch(payOrder(order));
   };

   return loading ? (
      <Loader />
   ) : error ? (
      <Message variant='danger'>{error}</Message>
   ) : (
      <>
         <h1 className='p-3'>Order: {order._id}</h1>
         <Row>
            <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2 className='py-2'>Delivery Details</h2>
                     <h5 className='py-2'>
                        <strong>Name: </strong> {order.user.name}
                     </h5>
                     <h5 className='py-2'>
                        <strong>Email: </strong>
                        {order.user.email}
                     </h5>

                     <h5 className='py-2'>
                        <strong>Address:</strong>{" "}
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},
                     </h5>
                     {order.isDelivered ? (
                        <Message variant='success'>
                           Delivered on {order.deliveredAt}
                        </Message>
                     ) : (
                        <Message variant='danger'>Not Delivered</Message>
                     )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2 className='py-2'>Payment Method</h2>
                     <h5 className='py-2'>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                     </h5>
                     {order.isPaid ? (
                        <Message variant='success'>
                           Paid on {order.paidAt}
                        </Message>
                     ) : (
                        <Message variant='danger'>Not Paid</Message>
                     )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2 className='py-2'>Order Items</h2>
                     {order.orderItems.length === 0 ? (
                        <Message>Order is empty</Message>
                     ) : (
                        <ListGroup variant='flush'>
                           {order.orderItems.map((item, index) => (
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
                           <Col>Rs.{order.itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Delivery</Col>
                           <Col>Rs.{order.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>Rs.{order.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>Rs.{order.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>

                     {loadingPayment && <Loader />}
                     {userInfo && userInfo.isAdmin && !order.isPaid && (
                        <ListGroup.Item>
                           <Button
                              type='button'
                              className='btn btn-block'
                              onClick={paymentHandler}
                           >
                              Mark As Paid
                           </Button>
                        </ListGroup.Item>
                     )}

                     {loadingDeliver && <Loader />}
                     {userInfo &&
                        userInfo.isAdmin &&
                        !order.isDelivered &&
                        order.isPaid && (
                           <ListGroup.Item>
                              <Button
                                 type='button'
                                 className='btn btn-block'
                                 onClick={deliverHandler}
                              >
                                 Mark As Delivered
                              </Button>
                           </ListGroup.Item>
                        )}
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default OrderScreen;
