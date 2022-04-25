import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AboutScreen from "./screens/AboutScreen";
import CartScreen from "./screens/CartScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AdminScreen from "./screens/AdminScreen";

const App = () => {
   return (
      <Router>
         <Header />
         <main className='py-3'>
            <Container>
               <Routes>
                  <Route
                     path='/page/:pageNumber'
                     element={<HomeScreen />}
                     exact
                  />
                  <Route path='/' element={<HomeScreen />} exact />
                  <Route path='product/:id' element={<ProductScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/signup' element={<SignupScreen />} />
                  <Route path='/shipping' element={<ShippingScreen />} />
                  <Route path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/about' element={<AboutScreen />} />
                  <Route path='/order/:id' element={<OrderScreen />} />
                  <Route path='/cart'>
                     <Route path='' element={<CartScreen />} />
                     <Route path=':id' element={<CartScreen />} />
                  </Route>
                  <Route path='/profile' element={<ProfileScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route path='/admin/homepage' element={<AdminScreen />} />
                  <Route
                     path='/admin/productlist/:pageNumber'
                     element={<ProductListScreen />}
                     exact
                  />
                  <Route
                     path='/admin/productlist'
                     element={<ProductListScreen />}
                     exact
                  />
                  <Route
                     path='/admin/orderlist'
                     element={<OrderListScreen />}
                  />
                  <Route
                     path='/admin/user/:id/edit'
                     element={<UserEditScreen />}
                  />
                  <Route
                     path='/admin/product/:id/edit'
                     element={<ProductEditScreen />}
                  />
               </Routes>
            </Container>
         </main>
         <Footer />
      </Router>
   );
};

export default App;
