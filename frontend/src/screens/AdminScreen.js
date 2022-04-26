import React, { useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Message from "../components/Message";
import { ImCross } from "react-icons/im";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";

const AdminScreen = () => {
   const dispatch = useDispatch();
   let history = useNavigate();

   const orderList = useSelector((state) => state.orderList);
   const { loading, error, orders } = orderList;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
         dispatch(listOrders());
      } else {
         history("/login");
      }
   }, [dispatch, history, userInfo]);

   return (
      <>
         <Row>
            <Col md={2} className='my-3 d-flex flex-column'>
               <h2 className='p-3'>Welcome, Admin.</h2>
               <Link className='btn btn-dark m-3' to='/admin/homepage'>
                  Home
               </Link>
               <Link className='btn btn-dark m-3' to='/admin/userlist'>
                  Users
               </Link>
               <Link className='btn btn-dark m-3' to='/admin/orderlist'>
                  Orders
               </Link>
               <Link className='btn btn-dark m-3' to='/admin/productlist'>
                  Products
               </Link>
            </Col>
            <Col md={10} className='my-3'>
               <>
                  <h2 className='my-3'>ORDERS</h2>
                  {loading ? (
                     <Loader />
                  ) : error ? (
                     <Message variant='danger'>{error}</Message>
                  ) : (
                     <>
                        <Table
                           striped
                           bordered
                           hover
                           responsive
                           className='table-sm'
                        >
                           <thead>
                              <tr>
                                 <th>ID</th>
                                 <th>USER</th>
                                 <th>DATE</th>
                                 <th>TOTAL</th>
                                 <th>PAID</th>
                                 <th>DELIVERED</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              {orders.map((order) => (
                                 <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>Rs.{order.totalPrice}</td>
                                    <td>
                                       {order.isPaid ? (
                                          order.paidAt.substring(0, 10)
                                       ) : (
                                          <ImCross style={{ color: "red" }} />
                                       )}
                                    </td>
                                    <td>
                                       {order.isDelivered ? (
                                          order.deliveredAt.substring(0, 10)
                                       ) : (
                                          <ImCross style={{ color: "red" }} />
                                       )}
                                    </td>
                                    <td>
                                       <LinkContainer
                                          to={`/order/${order._id}`}
                                       >
                                          <Button
                                             variant='light'
                                             className='btn-sm'
                                          >
                                             Details
                                          </Button>
                                       </LinkContainer>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     </>
                  )}
               </>
            </Col>
         </Row>
      </>
   );
};

export default AdminScreen;
