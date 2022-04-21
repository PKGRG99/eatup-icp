import React from "react";
import { Card } from "react-bootstrap";
import about from "../assets/about.png";
import contact from "../assets/illustration.svg";
import { FaHome, FaPhoneAlt, FaMailBulk } from "react-icons/fa";

const AboutScreen = () => {
   return (
      <Card className='px-4 mt-5'>
         <div className='container py-5'>
            <div className='row h-100 align-items-center py-5'>
               <div className='col-lg-6'>
                  <h1 className='display-4 py-4 text-dark'>About Us - EATUP</h1>
                  <p className='lead text-muted mb-0 text-start'>
                     We instantly deliver your favourite dishes from your
                     favourite restaurants to your doorsteps. So, what are you
                     waiting for? Just register with us and enjoy your favourite
                     dishes from anywhere at anytime.
                  </p>
               </div>

               <div className='col-lg-6 d-flex d-lg-block'>
                  <img src={about} alt='' className='img-fluid' />
               </div>
            </div>
         </div>

         <div className='contact3 py-5'>
            <div className='row no-gutters'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-lg-6'>
                        <div>
                           <img src={contact} className='img-fluid' alt='' />
                        </div>
                     </div>
                     <div className='col-lg-6'>
                        <div className='contact-box ml-3'>
                           <h1 className='font-weight-light mt-4'>
                              Contact Us
                           </h1>
                           <form className='mt-4'>
                              <div className='row'>
                                 <div className='col-lg-12'>
                                    <div className='form-group mt-2'>
                                       <input
                                          className='form-control'
                                          type='text'
                                          placeholder='Name'
                                       />
                                    </div>
                                 </div>
                                 <div className='col-lg-12'>
                                    <div className='form-group mt-4'>
                                       <input
                                          className='form-control'
                                          type='email'
                                          placeholder='Email Address'
                                       />
                                    </div>
                                 </div>
                                 <div className='col-lg-12'>
                                    <div className='form-group mt-4'>
                                       <input
                                          className='form-control'
                                          type='text'
                                          placeholder='Phone'
                                       />
                                    </div>
                                 </div>
                                 <div className='col-lg-12'>
                                    <div className='form-group mt-4'>
                                       <textarea
                                          className='form-control'
                                          rows='3'
                                          placeholder='Your Message'
                                       ></textarea>
                                    </div>
                                 </div>
                                 <div className='col-lg-12'>
                                    <button
                                       type='submit'
                                       className='btn mt-3 text-white border-0 px-3 py-2 text-dark'
                                       style={{ backgroundColor: "#7c4dff" }}
                                    >
                                       SUBMIT
                                    </button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                     <div className='col-lg-12 mt-4'>
                        <div className='card mt-4 border-0 mb-4'>
                           <div className='row my-3'>
                              <div className='col-lg-4 col-md-3'>
                                 <div className='card-body d-flex align-items-center c-detail pl-0'>
                                    <div className='mx-3 align-self-center'>
                                       <FaHome size={40} />
                                    </div>
                                    <div className=''>
                                       <h6 className='font-weight-medium'>
                                          Address
                                       </h6>
                                       <p>Matepani-12, Pokhara</p>
                                    </div>
                                 </div>
                              </div>
                              <div className='col-lg-4 col-md-3'>
                                 <div className='card-body d-flex align-items-center c-detail'>
                                    <div className='mx-3 align-self-center'>
                                       <FaPhoneAlt size={40} />
                                    </div>
                                    <div className=''>
                                       <h6 className='font-weight-medium'>
                                          Phone
                                       </h6>
                                       <p className=''>
                                          01-93678469
                                          <br />
                                          9804468851
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <div className='col-lg-4 col-md-3'>
                                 <div className='card-body d-flex align-items-center c-detail'>
                                    <div className='mx-3 align-self-center'>
                                       <FaMailBulk size={40} />
                                    </div>
                                    <div className=''>
                                       <h6 className='font-weight-medium'>
                                          Email
                                       </h6>
                                       <p className=''>
                                          khimgurung@icp.edu.com <br />
                                          prakashgurung@gmail.com
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );
};

export default AboutScreen;
