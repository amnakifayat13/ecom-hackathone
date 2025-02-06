"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItem, loadCartFromLocalStorage, removeItem } from "../../../../../../store/cartSlice";
import { client } from '../../../../../sanity/lib/client'; 
import { urlFor } from "@/sanity/lib/image"; 
import { checkStockInSanity } from "@/app/(store)/stock";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
 
}
// Define the Product type
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  stockQuantity:number;
}


export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [productK, setProductK] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("Flash");
  const [flash, setFlash] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
   const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const router = useParams();
  const id = router.id;

  // Fetch product data from Sanity
  useEffect(() => {
    const fetchProduct = async () => {
      // Fetch the current product details
      const query = `*[_type == "product" && _id == $id][0] {_id, title, description, price, productImage, slug, category, stockQuantity}`;
      const params = { id };
      const data = await client.fetch(query, params);
      setProduct(data);

      const result = await client.fetch('*[_type == "product" && category->name == $category]{_id, title, description, price, productImage, slug, stockQuantity, category->{name}, isNew}' , {category:category});
      
      console.log(result);  // Log result to verify the structure of the fetched data
      setProducts(result);

      

      // If the product has a category, fetch related products based on the same category
      if (data?.category?._ref) {
        // Fetch related products
        const relatedQuery = `*[_type == "product" && category._ref == $categoryRef && _id != $id] {_id, title, productImage, price, slug,category, stockQuantity}`;
        const relatedData = await client.fetch(relatedQuery, { categoryRef: data.category._ref, id });
        setRelatedProducts(relatedData);

        
      }
      
  }

    fetchProduct();
  }, [id]);
  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
  }, [dispatch]);


    

  // Handle case where product is not found
  if (!product) {
    return <p>Product not found.</p>;
  }
  

  // Add to Cart Handler
const addToCartHandler = async (product: Product) => {
  const stockInSanity = await checkStockInSanity(product._id);
  if (stockInSanity > 0 ){
    const cartItem: CartItem = {
      id: product._id,
      name: product.title,
      price: product.price,
      imageUrl: urlFor(product.productImage).url(),
      quantity: 1,
      category: product.title,
    };

    // Dispatch action to add item to cart
    dispatch(addItem(cartItem));

  } else {
    alert("Sorry, this product is out of stock.");
  }
};
// Remove from Cart Handler
 const removeFromCartHandler = async (id:string) =>  {
  // Dispatch action to remove item from the Redux cart state
  dispatch(removeItem({ id }));

  
  };
  // Handle quantity change
  // const incrementQuantity = () => {
  //   if(quantity=== product.stockQuantity){
  //   alert("oops! no item available")}
  //   else{
  //     setQuantity ((prev) => prev + 1)
  //   }
  //   };
  // const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-16 min-h-auto md:w-[1170px] md:mx-auto">
      <div className="md:bg-gray-200 w-full md:h-auto">
        
            {/* Product Details Section */}
<div className="flex flex-col md:flex-row text-[#252B42] gap-10 px-4 sm:px-8 lg:px-16 py-10">
  {/* Product Image */}
  <div className="relative flex justify-center md:w-1/2 mb-10 md:mb-0">
    <Image
      src={product.productImage ? urlFor(product.productImage).url() : '/fallback-image.png'}
      alt={product.title}
      width={400}
      height={400}
      className="w-full md:mt-60 max-w-[350px] sm:max-w-[300px] md:max-w-[500px] h-[430px] object-cover rounded-lg shadow-lg transition-all transform hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={() => addToCartHandler(product)}
        className="bg-black text-white px-6 py-3 text-sm w-full hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Product Information */}
  <div className="md:w-1/2 px-6">
    <h1 className="text-3xl font-bold mt-4 md:mt-10 text-[#252B42]">{product.title}</h1>
    <p className="mt-4 text-base text-gray-700">{product.description}</p>

    <div className="mt-6">
      <p className="text-xl font-extrabold text-green-600">Price: ${product.price}</p>
      <p className="text-lg text-blue-700 mt-2">Available Stock: {product.stockQuantity}</p>
    </div>

    {/* Quantity Selector and Action Buttons */}
    {/* <div className="flex items-center mt-10 md:ml-12">
      <button
        onClick={decrementQuantity}
        className="w-10 h-10 bg-gray-200 text-gray-700 font-bold shadow-md hover:bg-green-500 hover:text-white transition-colors"
      >
        -
      </button>
      <div className="flex justify-center items-center w-20 h-10 bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 mx-4">
        {quantity}
      </div>
      <button
        onClick={incrementQuantity}
        className="w-10 h-10 bg-gray-200 text-gray-700 font-bold shadow-md hover:bg-green-500 hover:text-white transition-colors"
      >
        +
      </button>

      
    </div> */}
    <div className="md:flex md:gap-2 ">
    <Button
      onClick={() => addToCartHandler(product)}
      size="sm"
      className="bg-yellow-600 text-white hover:bg-yellow-700 py-5 px-8 mt-6 rounded-lg  font-bold text-lg"
    >
      Add to Cart
    </Button>

    <Button
      onClick={() => removeFromCartHandler(product._id)}
      size="sm"
      className="bg-yellow-600 text-white hover:bg-yellow-700 py-5 px-8 mt-6 rounded-lg md:ml-3 font-bold text-lg"
    >
      Remove from Cart
    </Button>
    </div>
  </div>
</div>


        {/* Related Products Section */}
        <div>
    {/* Title Section */}
    <div className="flex space-x-4 mt-10">
        <h2 className="text-green-500 mt-2 font-semibold md:ml-2 text-2xl">Related Item</h2>
    </div>
{/* Product Grid Section */}
<div className="ml-6 mr-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-20">
  {relatedProducts.length === 0 ? (
    <p>No related products found</p>
  ) : (
    relatedProducts.map((relatedItem: Product) => (
      <div key={relatedItem._id} className="relative bg-white shadow-md rounded-lg overflow-hidden group">
        
        {/* Product Image */}
        <div className="relative w-full h-64 bg-gray-200">
          <Image
            src={relatedItem.productImage ? urlFor(relatedItem.productImage).url() : '/fallback-image.png'}
            alt={relatedItem.title}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => {
                addToCartHandler(relatedItem); // Pass product to handler
              }}
              className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black"
            >
              Add to Cart
            </button>
          </div> */}
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Product Name */}
          <Link href={`/products/productDetails/${relatedItem._id}`} className="group">
            <p className="text-[#252B42] font-semibold mt-4 text-center">{relatedItem.title}</p>
          </Link>

          {/* Product Description */}
          <p className="text-xs mt-2 text-[#252B42] text-center">{relatedItem.description}</p>

          {/* Product Price */}
          <div className="mt-2 text-center">
            <span className="text-slate-400 text-sm font-semibold">${relatedItem.price}</span>
          </div>

          {/* Stock Availability */}
          <div className="mt-2 text-center">
            <span className="text-slate-400 text-sm font-semibold">Available Stock: {relatedItem.stockQuantity}</span>
          </div>

          {/* Product Color Options */}
          <div className="flex gap-2 justify-center mt-2 mb-6">
            <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
          </div>
        </div>

      </div>
    ))
  )}
</div>

</div>

      </div>

      
    
      <div className="md:bg-gray-200 md:w-full md:h-auto mt-10">
  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold pt-10 ml-4 md:ml-24">Flash Products</h1>
  <div className="md:w-[800px] md:h-[1px] md:bg-slate-500 mt-10 md:ml-24"></div>
  
  <div className="ml-6 mr-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
    {products.map((product) => (
      <div key={product._id} className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center">
        
        {/* Product Image */}
        <div className="relative w-full h-64 bg-gray-200">
          <Image
            src={product.productImage ? urlFor(product.productImage).url() : '/fallback-image.png'}
            alt={product.title}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => addToCartHandler(product)} 
              className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black">
              Add to Cart
            </button>
          </div> */}
        </div>

        {/* Product Details */}
        <Link href={`/products/productDetails/${product._id}`}>
          <p className="text-[#252B42] font-semibold mt-4 text-center">{product.title}</p>
        </Link>

        <div className="mt-2 flex justify-center items-center">
          <span className="text-slate-400 text-sm font-semibold">${product.price}</span>
        </div>

        <div className="mt-2 text-center">
          <span className="text-slate-400 text-sm font-semibold">Available Stock: {product.stockQuantity}</span>
        </div>

        {/* Product Color Options */}
        <div className="flex gap-2 justify-center mt-2 mb-6">
          <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
        </div>
      </div>
    ))}
  </div>

  
</div>

      </div>
    
  );
}
