
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
export const server = "https://https://kaif.alwaysdata.net/api";

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
   
      <ToastContainer/>
      <App />
      <Cursor/>
  </CartProvider>
 </ProductProvider>
</UserProvider>
    

)
