import React from "react";
import {
   FaFacebook,
   FaTwitter,
   FaGoogle,
   FaHome,
   FaInstagram,
   FaPhoneAlt,
   FaMobile,
   FaMailBulk,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer
         className='text-center text-lg-start text-white mt-4 lh-3'
         style={{ backgroundColor: "#1c2331", lineHeight: "2" }}
      >
         <section
            className='d-flex justify-content-around p-4'
            style={{ backgroundColor: "#6351ce" }}
         >
            <div className='me-5'>
               <span>Connect with us:</span>
            </div>

            <div>
               <a href='#!' className='text-white me-4'>
                  <FaFacebook />
               </a>
               <a href='#!' className='text-white me-4'>
                  <FaTwitter />
               </a>
               <a href='#!' className='text-white me-4'>
                  <FaGoogle />
               </a>
               <a href='#!' className='text-white me-4'>
                  <FaInstagram />
               </a>
            </div>
         </section>

         <section className='d-flex justify-content-around p-4'>
            <div className='container text-center text-md-start mt-5'>
               <div className='row mt-3'>
                  <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                     <h6 className='text-uppercase fw-bold text-white'>
                        EAT UP
                     </h6>
                     <hr
                        className='mb-4 mt-0 d-inline-block mx-auto'
                        style={{
                           width: "70px",
                           backgroundColor: "#7c4dff",
                           height: "4px",
                        }}
                     />
                     <p>
                        We deliver your favourites dishes from your favourite
                        restaurants to your doorsteps.
                     </p>
                  </div>

                  <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                     <h6 className='text-uppercase fw-bold text-white'>
                        Our Company
                     </h6>
                     <hr
                        className='mb-4 mt-0 d-inline-block mx-auto'
                        style={{
                           width: "140px",
                           backgroundColor: "#7c4dff",
                           height: "4px",
                        }}
                     />
                     <p>
                        <a href='#!' className='text-white'>
                           FAQs
                        </a>
                     </p>
                     <p>
                        <a href='#!' className='text-white'>
                           Careers
                        </a>
                     </p>
                     <p>
                        <Link to='/about' className='text-white'>
                           About Us
                        </Link>
                     </p>
                  </div>

                  <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                     <h6 className='text-uppercase fw-bold text-white'>
                        LEGAL
                     </h6>
                     <hr
                        className='mb-4 mt-0 d-inline-block mx-auto'
                        style={{
                           width: "70px",
                           backgroundColor: "#7c4dff",
                           height: "4px",
                        }}
                     />
                     <p>
                        <a href='#!' className='text-white'>
                           Terms and Conditions
                        </a>
                     </p>
                     <p>
                        <a href='#!' className='text-white'>
                           Privacy Policy
                        </a>
                     </p>
                  </div>

                  <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                     <h6 className='text-uppercase fw-bold text-white'>
                        Contact Us
                     </h6>
                     <hr
                        className='mb-4 mt-0 d-inline-block mx-auto'
                        style={{
                           width: "120px",
                           backgroundColor: "#7c4dff",
                           height: "4px",
                        }}
                     />
                     <p>
                        <FaHome />
                        &nbsp;&nbsp;Matepani-12, Pokhara
                     </p>
                     <p>
                        <FaMailBulk />
                        &nbsp;&nbsp; khimgurung@icp.com
                     </p>
                     <p>
                        <FaPhoneAlt />
                        &nbsp;&nbsp;0193637849
                     </p>
                     <p>
                        <FaMobile />
                        &nbsp;&nbsp;9812334556
                     </p>
                  </div>
               </div>
            </div>
         </section>

         <div
            className='text-center p-4 mt-3'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
         >
            © 2022 Copyright - &nbsp;
            <a className='text-white' href='#!'>
               EATUP-ICP
            </a>
         </div>
      </footer>
   );
};

export default Footer;
