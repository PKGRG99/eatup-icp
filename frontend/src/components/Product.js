import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const styles = {
   cardImage: {
      width: "100%",
      height: "25vh",
      objectFit: "cover",
   },
};

const Product = ({ product }) => {
   return (
      <Card className='my-3 p-3 rounded'>
         <Link to={`/product/${product._id}`}>
            <Card.Img
               src={product.image}
               variant='top'
               style={styles.cardImage}
            />
         </Link>

         <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title as='div'>
                  <h4>{product.name}</h4>
               </Card.Title>
            </Link>

            <Card.Text as='div'>
               <Rating value={product.rating} />
            </Card.Text>

            <Card.Text as='p' className='py-2'>
               {product.restaurant}
            </Card.Text>

            <Card.Text as='h3'>Rs.{product.price}</Card.Text>
         </Card.Body>
      </Card>
   );
};

export default Product;
