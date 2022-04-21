import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
   let { id: productId } = useParams();
   let history = useNavigate();

   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [image, setImage] = useState("");
   const [restaurant, setRestaurant] = useState("");
   const [countInStock, setCountInStock] = useState(0);
   const [description, setDescription] = useState("");
   const [uploading, setUploading] = useState(false);

   const dispatch = useDispatch();

   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   const productUpdate = useSelector((state) => state.productUpdate);
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = productUpdate;

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: PRODUCT_UPDATE_RESET });
         history("/admin/productlist");
      } else {
         if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
         } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setRestaurant(product.restaurant);
            setCountInStock(product.countInStock);
            setDescription(product.description);
         }
      }
   }, [dispatch, history, productId, product, successUpdate]);

   const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      try {
         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         };

         const { data } = await axios.post("/api/upload", formData, config);

         setImage(data);
         setUploading(false);
      } catch (error) {
         console.error(error);
         setUploading(false);
      }
   };

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(
         updateProduct({
            _id: productId,
            name,
            price,
            image,
            restaurant,
            description,
            countInStock,
         })
      );
   };

   return (
      <>
         <Link to='/admin/productlist' className='btn btn-dark my-3'>
            Go Back
         </Link>
         <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
               <Loader />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name' className='py-2'>
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='price' className='py-2'>
                     <Form.Label>Price</Form.Label>
                     <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image' className='py-2'>
                     <Form.Label>Chose Image.</Form.Label>
                     <Form.Control type='file' onChange={uploadFileHandler} />
                     {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='countInStock' className='py-2'>
                     <Form.Label>Count In Stock</Form.Label>
                     <Form.Control
                        type='number'
                        placeholder='Enter countInStock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='restaurant' className='py-2'>
                     <Form.Label>Restaurant</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter Restaurant'
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description' className='py-2'>
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary' className='mt-2'>
                     Update
                  </Button>
               </Form>
            )}
         </FormContainer>
      </>
   );
};

export default ProductEditScreen;
