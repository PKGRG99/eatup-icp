import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminScreen = () => {
   return (
      <>
         <Row>
            <Col md={3} className='my-3 d-flex flex-column'>
               <h2 className='p-3'>Welcome, Admin.</h2>
               <Link className='btn btn-dark m-3' to='/admin/userlist'>
                  Users
               </Link>
               <Link className='btn btn-dark m-3' to='/admin/orderlist'>
                  Orders
               </Link>
               <Link className='btn btn-dark m-3' to='/admin/productlist'>
                  Products
               </Link>
               <Link className='btn btn-dark m-3' to='/'>
                  Report
               </Link>
            </Col>
            <Col md={9}></Col>
         </Row>
      </>
   );
};

export default AdminScreen;
