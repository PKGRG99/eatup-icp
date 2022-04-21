import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   Row,
   Col,
   ListGroup,
   Image,
   Button,
   Card,
   Form,
} from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
   let { id } = useParams();
   let [searchParams] = useSearchParams();
   let qty = parseInt(searchParams.get("qty"));
   let history = useNavigate();
   const dispatch = useDispatch();

   const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   useEffect(() => {
      if (id) {
         dispatch(addToCart(id, qty));
      }
   }, [dispatch, id, qty]);

   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
   };

   const checkoutHandler = () => {
      if (!userInfo) {
         history("/login");
      } else {
         history("/shipping");
      }
   };

   return (
      <Row>
         <h1 className='p-4'>Cart</h1>
         <Col md={8}>
            {cartItems.length === 0 ? (
               <Message>
                  Your cart is empty <Link to='/'>Go Back</Link>
               </Message>
            ) : (
               <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                     <ListGroup.Item key={item.product}>
                        <Row>
                           <Col md={2}>
                              <Image
                                 src={item.image}
                                 alt={item.name}
                                 fluid
                                 rounded
                              />
                           </Col>
                           <Col md={3}>
                              <Link to={`/product/${item.product}`}>
                                 <h3 className='my-2'>{item.name}</h3>
                              </Link>
                           </Col>
                           <Col md={3}>
                              <h3 className='my-2'>Rs. {item.price}</h3>
                           </Col>
                           <Col md={2}>
                              <Form.Control
                                 as='select'
                                 value={item.qty}
                                 onChange={(e) =>
                                    dispatch(
                                       addToCart(
                                          item.product,
                                          Number(e.target.value)
                                       )
                                    )
                                 }
                              >
                                 {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    )
                                 )}
                              </Form.Control>
                           </Col>
                           <Col md={2}>
                              <Button
                                 type='button'
                                 variant='light'
                                 onClick={() =>
                                    removeFromCartHandler(item.product)
                                 }
                              >
                                 <AiTwotoneDelete size={20} />
                              </Button>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            )}
         </Col>
         <Col md={4}>
            <Card>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2 className='mt-3'>
                        Subtotal =&nbsp;
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        &nbsp;items
                     </h2>
                     <h2 className='my-3'>
                        Total = Rs.
                        {cartItems
                           .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                           )
                           .toFixed(2)}
                     </h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                     >
                        Proceed To Checkout
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>
      </Row>
   );
};

export default CartScreen;
