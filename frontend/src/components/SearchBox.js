import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
   let history = useNavigate();
   const [keyword, setKeyword] = useState("");

   const submitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
         // history(`/search/${keyword}`);
         history("/");
      } else {
         history("/");
      }
   };

   return (
      <Form onSubmit={submitHandler} className='d-flex my-3'>
         <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Feeling Hungry?'
            className='me-4'
         ></Form.Control>
         <Button type='submit' variant='outline-success' className='p-2'>
            Search
         </Button>
      </Form>
   );
};

export default SearchBox;
