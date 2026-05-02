
import { BrowserRouter, Route, Routes } from 'react-router-dom'



import Verify from './components/Verify.jsx'
import { UserData } from './context/UserContext.jsx'
import LoaderMG from './components/LoaderMG.jsx'
import Products from './pages/Products.jsx'

import NotFound from './pages/NotFound.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Footer from './components/Footer.jsx'

import OrderProcessing from './pages/OrderProcessing.jsx'
import Navbar from './components/Navbar.jsx'


import Cart from './pages/Carts.jsx'
import Orders from './pages/Order.jsx'
import OrderPage from './pages/OrderPage.jsx'
import Login from './components/Login.jsx'
import Home from './pages/Home.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Checkout from './pages/Checkout.jsx'
import Payment from './pages/Payment.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'




export default function App() {

  const { isAuth , loading } = UserData()
  
  return (
    <>
   {
    loading ? (<LoaderMG/>) : ( <BrowserRouter>

<ScrollToTop/>

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={isAuth ? <Cart /> : <Login />} />
            <Route path="/orders" element={isAuth ? <Orders /> : <Login />} />
            <Route
              path="/order/:id"
              element={isAuth ? <OrderPage /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard /> : <Login />}
            />
            <Route
              path="/checkout"
              element={isAuth ? <Checkout /> : <Login />}
            />
            <Route
              path="/payment/:id"
              element={isAuth ? <Payment /> : <Login />}
            />
            <Route
              path="/ordersuccess"
              element={isAuth ? <OrderProcessing /> : <Login />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
          <Footer />
        </BrowserRouter>
  )
   }
  </>)
}
