import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
   Row,
   Col,
   Image,
   ListGroup,
   Card,
   Button,
   Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Rating as Star } from "react-simple-star-rating";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   listProductDetails,
   createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { BsChevronCompactLeft } from "react-icons/bs";

const ProductScreen = () => {
   let { id } = useParams();
   let history = useNavigate();
   const dispatch = useDispatch();
   const [qty, setQty] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");

   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const productReviewCreate = useSelector(
      (state) => state.productReviewCreate
   );
   const {
      success: successProductReview,
      loading: loadingProductReview,
      error: errorProductReview,
   } = productReviewCreate;

   useEffect(() => {
      if (successProductReview) {
         setRating(0);
         setComment("");
      }
      if (!product._id || product._id !== id) {
         dispatch(listProductDetails(id));
         dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      }
   }, [dispatch, id, successProductReview, product._id]);

   // Event Handler
   const addToCartHandler = () => {
      history(`/cart/${id}?qty=${qty}`);
   };

   const handleRating = (rate) => {
      let rating = rate / 20;
      setRating(rating);
      console.log(rating);
   };

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
         createProductReview(id, {
            rating,
            comment,
         })
      );
   };

   return (
      <>
         <Link className='btn btn-dark my-3' to='/'>
            Previous Page
         </Link>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Row>
                  <Col md={6}>
                     <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col md={3}>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <Rating value={product.rating} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <strong>Price:</strong> Rs.{product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>

                  <Col md={3}>
                     <Card>
                        <ListGroup variant='flush'>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Price:</Col>
                                 <Col>
                                    <strong>Rs.{product.price}</strong>
                                 </Col>
                              </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                              <Row>
                                 <Col>Status:</Col>
                                 <Col>
                                    <strong>
                                       {product.countInStock > 0
                                          ? "Available"
                                          : "Not Available"}
                                    </strong>
                                 </Col>
                              </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                              <Row>
                                 <Col>Restaurant:</Col>
                                 <Col>
                                    <strong>{product.restaurant}</strong>
                                 </Col>
                              </Row>
                           </ListGroup.Item>

                           {product.countInStock > 0 && (
                              <ListGroup.Item>
                                 <Row>
                                    <Col>Quantity</Col>
                                    <Col>
                                       <Form.Control
                                          as='select'
                                          value={qty}
                                          onChange={(e) =>
                                             setQty(e.target.value)
                                          }
                                       >
                                          {[
                                             ...Array(
                                                product.countInStock
                                             ).keys(),
                                          ].map((x) => (
                                             <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                             </option>
                                          ))}
                                       </Form.Control>
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           )}

                           <ListGroup.Item>
                              <Button
                                 className='btn-block'
                                 type='button'
                                 onClick={addToCartHandler}
                                 disabled={product.countInStock === 0}
                              >
                                 Add to Cart
                              </Button>
                           </ListGroup.Item>
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>

               <Row>
                  <Col md={6} className='my-2'>
                     <h2 className='py-2'>Reviews</h2>
                     {product.reviews.length === 0 && (
                        <Message>No Comments.</Message>
                     )}
                     <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                           <ListGroup.Item key={review._id}>
                              <h2 className='py-2'>{review.name}</h2>
                              <Rating value={review.rating} />
                              <p className='py-2'>
                                 {review.createdAt.substring(0, 10)}
                              </p>
                              <h2 className='mb-3'>{review.comment}</h2>
                           </ListGroup.Item>
                        ))}
                        <ListGroup.Item className='mt-3'>
                           <h2 className='py-2'>Write a Customer Review</h2>
                           {successProductReview && (
                              <Message variant='success'>
                                 Review submitted successfully
                              </Message>
                           )}
                           {loadingProductReview && <Loader />}
                           {errorProductReview && (
                              <Message variant='danger'>
                                 {errorProductReview}
                              </Message>
                           )}
                           {userInfo ? (
                              <Form onSubmit={submitHandler}>
                                 {/* <Form.Group
                                    controlId='rating'
                                    className='py-2'
                                 >
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                       as='select'
                                       value={rating}
                                       onChange={(e) =>
                                          setRating(e.target.value)
                                       }
                                    >
                                       <option value=''>Select...</option>
                                       <option value='1'>1 - Poor</option>
                                       <option value='2'>2 - Fair</option>
                                       <option value='3'>3 - Good</option>
                                       <option value='4'>4 - Very Good</option>
                                       <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                 </Form.Group> */}

                                 <Form.Group
                                    controlId='rating'
                                    className='py-2'
                                 >
                                    <Form.Label as='h4'>Rating</Form.Label>
                                    <Star
                                       ratingValue={rating}
                                       onClick={handleRating}
                                       size={30}
                                       label
                                       transition
                                       fillColor='#f82825'
                                       emptyColor='gray'
                                       className='foo'
                                       showTooltip
                                       tooltipArray={[
                                          "Terrible",
                                          "Bad",
                                          "Average",
                                          "Great",
                                          "Perfect",
                                       ]}
                                    />
                                 </Form.Group>

                                 <Form.Group
                                    controlId='comment'
                                    className='py-3'
                                 >
                                    <Form.Label as='h4'>Comment</Form.Label>
                                    <Form.Control
                                       as='textarea'
                                       row='3'
                                       value={comment}
                                       onChange={(e) =>
                                          setComment(e.target.value)
                                       }
                                    ></Form.Control>
                                 </Form.Group>
                                 <Button
                                    disabled={loadingProductReview}
                                    type='submit'
                                    variant='primary'
                                    className='py-3 my-2'
                                 >
                                    Submit
                                 </Button>
                              </Form>
                           ) : (
                              <Message>
                                 Please <Link to='/login'>sign in</Link> to
                                 write a review{" "}
                              </Message>
                           )}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
               </Row>
            </>
         )}
      </>
   );
};

export default ProductScreen;
