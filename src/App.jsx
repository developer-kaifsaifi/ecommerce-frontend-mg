
import { BrowserRouter, Route, Routes } from 'react-router-dom'



import Verify from './components/Verify'
import { UserData } from './context/UserContext'
import LoaderMG from './components/LoaderMG'
import Products from './pages/Products'

import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import Footer from './components/Footer'

import OrderProcessing from './pages/OrderProcessing'
import Navbar from './components/Navbar'


import Cart from './pages/Carts'
import Orders from './pages/Order'
import OrderPage from './pages/OrderPage'
import Login from './components/Login'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'




export default function App() {

  const { isAuth , loading } = UserData()
  
  return (
    <>
   {
    loading ? (<LoaderMG/>) : ( <BrowserRouter>
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
