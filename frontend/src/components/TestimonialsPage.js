import React from "react";
import people1 from "../assets/people1.jpg";
import people2 from "../assets/people2.jpg";
import people3 from "../assets/people3.jpg";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const styles = {
   cardImage: {
      width: "200px",
      height: "200px",
      margin: " 0 auto",
   },
   stars: {
      margin: "0 auto",
      padding: "10px 0 0",
   },
};

const TestimonialsPage = () => {
   return (
      <>
         <h1
            className='text-center my-5 p-3'
            style={{
               color: "#fff",
               background: "#6351ce",
            }}
         >
            " Hear what our customers have to say."
         </h1>
         <Container>
            <Row style={styles.cards}>
               <Col sm={12} md={6} lg={4} xl={4}>
                  <Card className='my-3 p-3 rounded'>
                     <Card.Img
                        src={people1}
                        variant='top'
                        style={styles.cardImage}
                        className={"rounded-circle"}
                     />
                     <span style={styles.stars}>
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarHalf color='#f82825' size={"20px"} />
                     </span>
                     <Card.Body>
                        <Card.Text as='p'>
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Quo velit asperiores delectus excepturi, neque
                           eligendi sunt fuga quam ullam, voluptatem explicabo
                           exercitationem maiores deleniti optio laudantium, sed
                           incidunt. Ex, soluta.
                        </Card.Text>

                        <Card.Text as='h3' className='text-center pt-3'>
                           Sandeep Thapa
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>

               <Col sm={12} md={6} lg={4} xl={4}>
                  <Card className='my-3 p-3 rounded'>
                     <Card.Img
                        src={people2}
                        variant='top'
                        style={styles.cardImage}
                        className={"rounded-circle"}
                     />
                     <span style={styles.stars}>
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarHalf color='#f82825' size={"20px"} />
                        <BsStar color='#f82825' size={"20px"} />
                     </span>
                     <Card.Body>
                        <Card.Text as='p'>
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Quo velit asperiores delectus excepturi, neque
                           eligendi sunt fuga quam ullam, voluptatem explicabo
                           exercitationem maiores deleniti optio laudantium, sed
                           incidunt. Ex, soluta.
                        </Card.Text>

                        <Card.Text as='h3' className='text-center pt-3'>
                           Sumitha Thapa
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>

               <Col sm={12} md={6} lg={4} xl={4}>
                  <Card className='my-3 p-3 rounded'>
                     <Card.Img
                        src={people3}
                        variant='top'
                        style={styles.cardImage}
                        className={"rounded-circle"}
                     />

                     <span style={styles.stars}>
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStarFill color='#f82825' size={"20px"} />
                        <BsStar color='#f82825' size={"20px"} />
                     </span>
                     <Card.Body>
                        <Card.Text as='p'>
                           Lorem ipsum dolor sit, amet consectetur adipisicing
                           elit. Quo velit asperiores delectus excepturi, neque
                           eligendi sunt fuga quam ullam, voluptatem explicabo
                           exercitationem maiores deleniti optio laudantium, sed
                           incidunt. Ex, soluta.
                        </Card.Text>

                        <Card.Text as='h3' className='text-center pt-3'>
                           Melina Khadka
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>
      </>
   );
};

export default TestimonialsPage;
