import React, {
  useEffect,
  useState,
  useRef,
  lazy,
  Suspense,
} from "react";

import { motion } from "motion/react";

import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  LogIn,
  Edit,
  X,
  Loader,
} from "lucide-react";

import { useParams } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { ProductData } from "../context/ProductContext.jsx";
import { CartData } from "../context/CartContext.jsx";
import { UserData } from "../context/UserContext.jsx";

import LoaderMG from "../components/LoaderMG.jsx";

const ProductCard = lazy(() =>
  import("../components/ProductCard.jsx")
);

const Input = lazy(() =>
  import("@/components/ui/input.jsx").then((module) => ({
    default: module.Input,
  }))
);

const Label = lazy(() =>
  import("@/components/ui/label.jsx").then((module) => ({
    default: module.Label,
  }))
);

import { categories, server } from "@/main.jsx";

export default function ProductPage() {
  const { id } = useParams();

  const {
    fetchProduct,
    product,
    relatedProduct,
    loading,
  } = ProductData();

  const { addToCart } = CartData();

  const { isAuth, user } = UserData();

  const [currentImage, setCurrentImage] = useState(0);

  // Admin States
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");

  const [about, setAbout] = useState("");

  const [stock, setStock] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const [updatedImages, setUpdatedImages] =
    useState(null);

  const [cartBtnLoading, setCartBtnLoading] =
    useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const nextImage = () => {
    if (
      product.images.length - 1 === currentImage
    ) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage === 0) {
      setCurrentImage(
        product.images.length - 1
      );
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  const addToCartHandler = async () => {
    setCartBtnLoading(true);

    try {
      await addToCart(id);
    } catch (error) {
      console.log(error);
    } finally {
      setCartBtnLoading(false);
    }
  };

  const updateHandler = () => {
    setShow(!show);

    setCategory(product.category);

    setTitle(product.title);

    setAbout(product.about);

    setStock(product.stock);

    setPrice(product.price);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/product/${id}`,
        {
          title,
          about,
          price,
          stock,
          category,
        },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);

      fetchProduct(id);

      setShow(false);

      setBtnLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );

      setBtnLoading(false);
    }
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();

    setBtnLoading(true);

    if (
      !updatedImages ||
      updatedImages.length === 0
    ) {
      toast.error(
        "Please select new images."
      );

      setBtnLoading(false);

      return;
    }

    const formData = new FormData();

    for (
      let i = 0;
      i < updatedImages.length;
      i++
    ) {
      formData.append(
        "files",
        updatedImages[i]
      );
    }

    try {
      const { data } = await axios.post(
        `${server}/product/${id}`,
        formData,
        {
          headers: {
            token: Cookies.get("token"),
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      fetchProduct(id);

      setUpdatedImages(null);

      setCurrentImage(0);

      if (fileInputRef.current)
        fileInputRef.current.value = "";

      setBtnLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );

      setBtnLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f4f1ea] text-[#1d1d1d]"
    >
      {loading ? (
        <LoaderMG />
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">

          {/* Admin Edit */}
          {user &&
            user.role === "admin" && (
              <div className="m-auto mb-10 w-full md:w-[600px]">

                <button
                  onClick={updateHandler}
                  className="mb-4 flex bg-[#1d1d1d] px-4 py-3 text-white hover:bg-[#BEA163]"
                >
                  {show ? (
                    <X />
                  ) : (
                    <Edit className="mr-2" />
                  )}

                  {show
                    ? "Close Edit"
                    : "Edit Product"}
                </button>

                {show && (
                  <Suspense
                    fallback={<LoaderMG />}
                  >
                    <div className="space-y-4 border border-[#e7dcc6] bg-white p-6 shadow-sm">

                      <div>
                        <Label>
                          Title
                        </Label>

                        <Input
                          value={title}
                          onChange={(e) =>
                            setTitle(
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label>
                          About
                        </Label>

                        <Input
                          value={about}
                          onChange={(e) =>
                            setAbout(
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label>
                          Category
                        </Label>

                        <select
                          value={category}
                          onChange={(e) =>
                            setCategory(
                              e.target.value
                            )
                          }
                          className="w-full rounded-md border p-2"
                        >
                          {categories.map(
                            (e) => (
                              <option
                                value={e}
                                key={e}
                              >
                                {e}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <Label>
                          Price
                        </Label>

                        <Input
                          type="number"
                          value={price}
                          onChange={(e) =>
                            setPrice(
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label>
                          Stock
                        </Label>

                        <Input
                          type="number"
                          value={stock}
                          onChange={(e) =>
                            setStock(
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <button
                        onClick={
                          submitHandler
                        }
                        disabled={
                          btnLoading
                        }
                        className="flex w-full items-center justify-center bg-[#BEA163] px-4 py-3 text-white hover:bg-[#1d1d1d]"
                      >
                        {btnLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Update Product"
                        )}
                      </button>

                    </div>
                  </Suspense>
                )}
              </div>
            )}

          {/* Product Section */}
          {product && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="grid gap-14 lg:grid-cols-2"
            >

              {/* Images */}
              <div>

                <div className="relative overflow-hidden border border-[#e7dcc6] bg-white p-5 shadow-sm">

                  <motion.img
                    loading="eager"
                    decoding="async"
                    key={currentImage}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    src={
                      product?.images?.[
                        currentImage
                      ]?.url
                    }
                    alt="product"
                    className="h-[650px] w-full object-cover"
                  />

                  <button
                    onClick={prevImage}
                    className="absolute left-7 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/80 shadow-md"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-7 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/80 shadow-md"
                  >
                    <ChevronRight />
                  </button>

                </div>

                {/* Thumbnails */}
                <div className="mt-5 flex gap-4 overflow-x-auto pb-2">

                  {product?.images?.map(
                    (img, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setCurrentImage(
                            index
                          )
                        }
                        className={`cursor-pointer overflow-hidden border bg-white p-2 ${
                          currentImage ===
                          index
                            ? "border-[#BEA163]"
                            : "border-[#e7dcc6]"
                        }`}
                      >

                        <img
                          loading="lazy"
                          decoding="async"
                          src={img.url}
                          alt="thumb"
                          className="h-24 w-24 object-cover"
                        />

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">

                <div>
                  <p className="mb-4 text-xs uppercase tracking-[5px] text-[#8a6a39]">
                    Mansoori Garment
                  </p>

                  <h1 className="font-garamond text-6xl leading-none">
                    {product.title}
                  </h1>
                </div>

                <p className="mt-8 text-lg leading-9 text-gray-600 font-manrope">
                  {product.about}
                </p>

                <div className="mt-10 flex items-center gap-5">

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                      Price
                    </p>

                    <h2 className="font-garamond text-6xl">
                      ₹ {product.price}
                    </h2>
                  </div>

                </div>

                <div className="mt-12">

                  {isAuth ? (
                    <motion.button
                      whileHover={{
                        scale: 0.98,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      onClick={
                        addToCartHandler
                      }
                      disabled={
                        cartBtnLoading
                      }
                      className="flex h-16 w-full items-center justify-center gap-4 bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white hover:bg-[#BEA163]"
                    >

                      {cartBtnLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <>
                          <ShoppingBag
                            size={20}
                          />

                          Add To Cart
                        </>
                      )}

                    </motion.button>
                  ) : (
                    <div className="flex items-center gap-4 border border-blue-200 bg-blue-50 p-5 text-blue-700">

                      <LogIn size={20} />

                      <p className="uppercase tracking-[2px]">
                        Please Login To
                        Continue
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          )}

          {/* Related Products */}
          {relatedProduct?.length >
            0 && (
            <div className="mt-28">

              <div className="mb-14 text-center">

                <p className="mb-4 text-xs uppercase tracking-[5px] text-[#8a6a39]">
                  Explore More
                </p>

                <h2 className="font-garamond text-6xl">
                  Related Products
                </h2>

              </div>

              <div className="grid grid-cols-1 place-items-center gap-x-8 gap-y-14 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

                {relatedProduct.map(
                  (e) => (
                    <Suspense
                      key={e._id}
                      fallback={
                        <LoaderMG />
                      }
                    >
                      <ProductCard
                        product={e}
                      />
                    </Suspense>
                  )
                )}

              </div>

            </div>
          )}

        </div>
      )}
    </motion.div>
  );
}





































































// import React, { useEffect, useState, useRef } from "react";
// import { motion } from "motion/react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ShoppingBag,
//   LogIn,
//   Edit,
//   X,
//   Loader
// } from "lucide-react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import {toast } from "react-toastify";

// import { ProductData } from "../context/ProductContext.jsx";
// import { CartData } from "../context/CartContext.jsx";
// import { UserData } from "../context/UserContext.jsx";

// import LoaderMG from "../components/LoaderMG.jsx";
// import ProductCard from "../components/ProductCard.jsx";


// import { Input } from "@/components/ui/input.jsx";
// import { Label } from "@/components/ui/label.jsx";
// import { categories, server } from "@/main.jsx";

// export default function ProductPage() {
//   const { id } = useParams();

//   const {
//     fetchProduct,
//     product,
//     relatedProduct,
//     loading,
//   } = ProductData();

//   const { addToCart } = CartData();
//   const { isAuth, user } = UserData();

//   const [currentImage, setCurrentImage] = useState(0);

//   // Admin State Variables
//   const [show, setShow] = useState(false);
//   const [title, setTitle] = useState("");
//   const [about, setAbout] = useState("");
//   const [stock, setStock] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [updatedImages, setUpdatedImages] = useState(null);

//   // Ref to clear the file input visually after success
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const nextImage = () => {
//     if (product.images.length - 1 === currentImage) {
//       setCurrentImage(0);
//     } else {
//       setCurrentImage(currentImage + 1);
//     }
//   };

//   const prevImage = () => {
//     if (currentImage === 0) {
//       setCurrentImage(product.images.length - 1);
//     } else {
//       setCurrentImage(currentImage - 1);
//     }
//   };

//   const addToCartHandler = () => {
//     addToCart(id);
//   };

//   // Text Update Handler
//   const updateHandler = () => {
//     setShow(!show);
//     setCategory(product.category);
//     setTitle(product.title);
//     setAbout(product.about);
//     setStock(product.stock);
//     setPrice(product.price);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     try {
//       const { data } = await axios.put(
//         `${server}/product/${id}`,
//         { title, about, price, stock, category },
//         {
//           headers: {
//             token: Cookies.get("token"),
//           },
//         }
//       );

//       toast.success(data.message);
//       fetchProduct(id);
//       setShow(false);
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update product details");
//       setBtnLoading(false);
//     }
//   };

//   // Image Update Handler
//   const handleSubmitImage = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     if (!updatedImages || updatedImages.length === 0) {
//       toast.error("Please select new images.");
//       setBtnLoading(false);
//       return;
//     }

//     const formData = new FormData();

//     for (let i = 0; i < updatedImages.length; i++) {
//       formData.append("files", updatedImages[i]);
//     }

//     try {
//       const { data } = await axios.post(
//         `${server}/product/${id}`,
//         formData,
//         {
//           headers: {
//             token: Cookies.get("token"),
//             "Content-Type": "multipart/form-data", // explicitly telling backend we are sending files
//           },
//         }
//       );

//       toast.success(data.message);
//       fetchProduct(id); // Fetch new data
      
//       // Cleanup states to reflect changes properly
//       setUpdatedImages(null);
//       setCurrentImage(0); // Reset UI to show the first new image
//       if (fileInputRef.current) fileInputRef.current.value = ""; // Clear input UI
      
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update images");
//       setBtnLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen bg-[#f4f1ea] text-[#1d1d1d]"
//     >
//       {loading ? (
//         <LoaderMG />
//       ) : (
//         <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          
//           {/* Admin Product Edit Form */}
//           {user && user.role === "admin" && (
//             <div className="w-full md:w-[600px] m-auto mb-10">
//               <button onClick={updateHandler} className="mb-4 bg-[#1d1d1d] flex px-4 py-3 hover:bg-[#BEA163] text-white">
//                 {show ? <X /> : <Edit className="mr-2" />} {show ? "Close Edit" : "Edit Product"}
//               </button>
              
//               {show && (
//                 <div className="space-y-4 bg-white p-6 border border-[#e7dcc6] shadow-sm">
//                   <div>
//                     <Label>Title</Label>
//                     <Input
//                       placeholder="Product Title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>About</Label>
//                     <Input
//                       placeholder="About Product"
//                       value={about}
//                       onChange={(e) => setAbout(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>Category</Label>
//                     <select
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       required
//                       className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
//                     >
//                       {categories.map((e) => (
//                         <option value={e} key={e}>
//                           {e}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <Label>Price</Label>
//                     <Input
//                       placeholder="Product Price"
//                       type="number"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>Stock</Label>
//                     <Input
//                       placeholder="Product Stock"
//                       type="number"
//                       value={stock}
//                       onChange={(e) => setStock(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-[#BEA163] flex px-4 py-3 items-center justify-center hover:bg-[#1d1d1d] text-white"
//                     disabled={btnLoading}
//                     onClick={submitHandler}
//                   >
//                     {btnLoading ? <Loader className="animate-spin" /> : "Update Product"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Product Section */}
//           {product && (
//             <motion.div
//               initial={{ opacity: 0, y: 60 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               className="grid gap-14 lg:grid-cols-2"
//             >
//               {/* Left Side (Images) */}
//               <div>
//                 <div className="relative overflow-hidden border border-[#e7dcc6] bg-white p-5 shadow-sm">
//                   <div className="pointer-events-none absolute inset-4 border border-[#BEA163]/20" />

//                   <motion.img
//                     key={currentImage}
//                     initial={{ opacity: 0, scale: 1.05 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                     src={product?.images?.[currentImage]?.url}
//                     alt="product"
//                     className="h-[650px] w-full object-cover"
//                   />

//                   <motion.button
//                     whileHover={{ scale: 1.08 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={prevImage}
//                     className="absolute left-7 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/80 text-[#1d1d1d] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
//                   >
//                     <ChevronLeft />
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.08 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={nextImage}
//                     className="absolute right-7 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/80 text-[#1d1d1d] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
//                   >
//                     <ChevronRight />
//                   </motion.button>
//                 </div>

//                 <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
//                   {product?.images?.map((img, index) => (
//                     <motion.div
//                       whileHover={{ y: -4 }}
//                       key={index}
//                       onClick={() => setCurrentImage(index)}
//                       className={`cursor-pointer overflow-hidden border bg-white p-2 transition-all duration-300 ${
//                         currentImage === index
//                           ? "border-[#BEA163]"
//                           : "border-[#e7dcc6] opacity-70 hover:opacity-100"
//                       }`}
//                     >
//                       <img
//                         src={img.url}
//                         alt="thumb"
//                         className="h-24 w-24 object-cover"
//                       />
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Admin Image Upload Form */}
//                 {user && user.role === "admin" && (
//                   <form
//                     onSubmit={handleSubmitImage}
//                     className="flex flex-col gap-4 mt-8 bg-white p-6 border border-[#e7dcc6] shadow-sm"
//                   >
//                     <div>
//                       <Label className="text-[#1d1d1d] font-semibold">Upload New Images:</Label>
//                       <input
//                         type="file"
//                         name="files"
//                         id="files"
//                         multiple
//                         accept="image/*"
//                         ref={fileInputRef}
//                         onChange={(e) => setUpdatedImages(e.target.files)}
//                         className="block w-full mt-2 text-sm border p-2"
//                       />
//                     </div>
//                     <button type="submit" disabled={btnLoading} className="bg-[#1d1d1d] flex px-4 py-3 hover:bg-[#BEA163] text-white w-fit">
//                       {btnLoading ? <Loader className="animate-spin" /> : "Update Image"}
//                     </button>
//                   </form>
//                 )}

//               </div>

//               {/* Right Side (Details) */}
//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.7, delay: 0.2 }}
//                 className="flex flex-col justify-center"
//               >
//                 <div>
//                   <p className="mb-4 text-xs uppercase tracking-[5px] text-[#8a6a39]">
//                     Mansoori Garment
//                   </p>
//                   <h1 className="font-garamond text-6xl leading-none text-[#1d1d1d]">
//                     {product.title}
//                   </h1>
//                 </div>

//                 <p className="mt-8 text-lg leading-9 text-gray-600 font-manrope">
//                   {product.about}
//                 </p>

//                 <div className="mt-10 flex items-center gap-5">
//                   <div>
//                     <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
//                       Price
//                     </p>
//                     <h2 className="font-garamond text-6xl text-[#1d1d1d]">
//                       ₹ {product.price}
//                     </h2>
//                   </div>

//                   {product.stock > 0 ? (
//                     <div className="border border-green-200 bg-green-50 px-5 py-3 text-sm uppercase tracking-[3px] text-green-700">
//                       In Stock
//                     </div>
//                   ) : (
//                     <div className="border border-red-200 bg-red-50 px-5 py-3 text-sm uppercase tracking-[3px] text-red-700">
//                       Out Of Stock
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-12">
//                   {isAuth ? (
//                     <>
//                       {product.stock <= 0 ? (
//                         <button className="flex h-14 w-full items-center justify-center bg-red-500 text-sm uppercase tracking-[3px] text-white">
//                           Out Of Stock
//                         </button>
//                       ) : (
//                         <motion.button
//                           whileHover={{ scale: 0.98 }}
//                           whileTap={{ scale: 0.96 }}
//                           onClick={addToCartHandler}
//                           className="flex h-16 w-full items-center justify-center gap-4 bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
//                         >
//                           <ShoppingBag size={20} />
//                           Add To Cart
//                         </motion.button>
//                       )}
//                     </>
//                   ) : (
//                     <div className="flex items-center gap-4 border border-blue-200 bg-blue-50 p-5 text-blue-700">
//                       <LogIn size={20} />
//                       <p className="uppercase tracking-[2px]">
//                         Please Login To Continue
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-12 grid grid-cols-2 gap-5 border-t border-[#e7dcc6] pt-8">
//                   <div>
//                     <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
//                       Category
//                     </p>
//                     <h4 className="text-lg text-[#1d1d1d]">
//                       {product.category}
//                     </h4>
//                   </div>
//                   <div>
//                     <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
//                       Availability
//                     </p>
//                     <h4 className="text-lg text-[#1d1d1d]">
//                       {product.stock} Pieces
//                     </h4>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}

//           {/* Related Products */}
//           {relatedProduct?.length > 0 && (
//             <div className="mt-28">
//               <div className="mb-14 text-center">
//                 <p className="mb-4 text-xs uppercase tracking-[5px] text-[#8a6a39]">
//                   Explore More
//                 </p>
//                 <h2 className="font-garamond text-6xl text-[#1d1d1d]">
//                   Related Products
//                 </h2>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.7 }}
//                 className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center"
//               >
//                 {relatedProduct.map((e) => (
//                   <ProductCard key={e._id} product={e} />
//                 ))}
//               </motion.div>
//             </div>
//           )}
//         </div>
//       )}
//     </motion.div>
//   );
// }
