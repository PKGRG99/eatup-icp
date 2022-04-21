import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import TestimonialsPage from "../components/TestimonialsPage";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
   const { pageNumber } = useParams() || 1;
   const dispatch = useDispatch();
   const productList = useSelector((state) => state.productList);
   const { loading, error, products, pages, page } = productList;

   useEffect(() => {
      dispatch(listProducts(pageNumber));
   }, [dispatch, pageNumber]);

   return (
      <>
         <h1 className='text-center py-4 text-uppercase'>Best Rated Foods</h1>
         <ProductCarousel />
         <h1 className='text-center py-4'>BEST FOODS THIS YEAR</h1>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Row>
                  {products?.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
               <Paginate pages={pages} page={page} />
            </>
         )}
         <TestimonialsPage />
      </>
   );
};

export default HomeScreen;
