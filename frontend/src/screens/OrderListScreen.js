import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { ImCross } from "react-icons/im";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
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
         <h1 className='py-3'>Orders</h1>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Link className='btn btn-dark my-2' to='/admin/homepage'>
                  Homepage
               </Link>
               <Table striped bordered hover responsive className='table-sm'>
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
                              <LinkContainer to={`/order/${order._id}`}>
                                 <Button variant='light' className='btn-sm'>
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
   );
};

export default OrderListScreen;
