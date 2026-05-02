
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ToastContainer } from 'react-toastify'
import { ProductProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Cursor from './components/Cursor.jsx'
import axios from "axios";

axios.defaults.withCredentials = true;
export const server = "https://kaif.alwaysdata.net/api";

export const categories = [
  "smartphone",
  "laptop",
  "tshirt",
  "refrigerator",
  "headphones",
  "watch",
  "shoes",
  "camera",
  "tablet",
  "television",
  "sofa",
  "bed",
  "microwave",
  "air conditioner",
  "washing machine",
  "books",
  "jewelry",
  "toys",
  "food",
  "kitchenware",
  "gaming console",
  "fitness equipment",
  "groceries",
  "bags",
  "accessories",
  "furniture",
  "stationery",
  "car accessories",
  "motorcycle accessories",
  "sporting goods",
  "home decor",
  "healthcare products",
  "office supplies",
  "pet supplies",
  "power tools",
  "gardening tools",
];

createRoot(document.getElementById('root')).render(
  <UserProvider>
<ProductProvider>
  <CartProvider>
   
      <ToastContainer
  position="top-right"
  autoClose={1000}
  hideProgressBar={true}
  newestOnTop
  closeOnClick
  pauseOnHover={false}
  draggable={false}
  theme="light"
  toastStyle={{
    background: "#1d1d1d",
    color: "#f4f1ea",
    border: "1px solid rgba(190,161,99,0.2)",
    borderRadius: "18px",
    fontFamily: "Manrope",
    padding: "14px 18px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
  }}
/>
      <App />
      <Cursor/>
  </CartProvider>
 </ProductProvider>
</UserProvider>
    

)
