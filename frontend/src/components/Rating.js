import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ value, text }) => {
   return (
      <div className='rating'>
         <span>
            {value >= 1 ? (
               <BsStarFill color='#f82825' size={"20px"} />
            ) : value >= 0.5 ? (
               <BsStarHalf color='#f82825' size={"20px"} />
            ) : (
               <BsStar color='#f82825' size={"20px"} />
            )}
         </span>
         <span>
            {value >= 2 ? (
               <BsStarFill color='#f82825' size={"20px"} />
            ) : value >= 1.5 ? (
               <BsStarHalf color='#f82825' size={"20px"} />
            ) : (
               <BsStar color='#f82825' size={"20px"} />
            )}
         </span>
         <span>
            {value >= 3 ? (
               <BsStarFill color='#f82825' size={"20px"} />
            ) : value >= 2.5 ? (
               <BsStarHalf color='#f82825' size={"20px"} />
            ) : (
               <BsStar color='#f82825' size={"20px"} />
            )}
         </span>
         <span>
            {value >= 4 ? (
               <BsStarFill color='#f82825' size={"20px"} />
            ) : value >= 3.5 ? (
               <BsStarHalf color='#f82825' size={"20px"} />
            ) : (
               <BsStar color='#f82825' size={"20px"} />
            )}
         </span>
         <span>
            {value >= 5 ? (
               <BsStarFill color='#f82825' size={"20px"} />
            ) : value >= 4.5 ? (
               <BsStarHalf color='#f82825' size={"20px"} />
            ) : (
               <BsStar color='#f82825' size={"20px"} />
            )}
         </span>

         <span>{text && text}</span>
      </div>
   );
};

export default Rating;
