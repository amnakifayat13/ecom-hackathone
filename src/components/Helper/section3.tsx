"use client"
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client'; // Your sanity client
import { urlFor } from '@/sanity/lib/image'; // Your image url helper
import { useDispatch } from 'react-redux';
import { addItem, loadCartFromLocalStorage, syncSanityProducts } from '../../../store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

// Define the Product type (Sanity Product)
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
}

// Cart item type as expected by the cartSlice
interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
 
}

export default function Section3() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("a3081a71-d256-45ba-b16e-61b97cddb3ad");
  const dispatch = useDispatch();

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await client.fetch('*[_type == "product" && category._ref == $category]{_id, title, description, price, image, slug, category->{name}}', { category });
      console.log(result);  // Log result to verify the structure of the fetched data
      setProducts(result);
    };
    
    fetchProducts();
  }, [category]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
  }, [dispatch]);

  // Add to Cart Handler
  const addToCartHandler = (product: Product) => {
    const cartItem: CartItem = {
      id: product._id, 
      name: product.title, 
      price: product.price, 
      imageUrl: urlFor(product.image).url(), // Use the Sanity image URL helper
      quantity: 1, // Default quantity
      category:product.title
    };
    
    dispatch(addItem(cartItem));  // Dispatch to Redux to add item to cart
  };

  return (
    <div className="pb-16 pt-16">
      <p className="flex justify-center text-xs md:text-lg text-[#252B42] mt-4">
        Featured Products
      </p>
      <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold mt-4">
        BESTSELLER PRODUCTS
      </h1>
      <p className="flex justify-center text-xs md:text-lg text-[#252B42] mt-4">
        Problems trying to resolve the conflict between
      </p>

      <div>
        <div className="ml-20 md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <div className="relative">
                {/* Product Image */}
                <Image
                  src={urlFor(product.image).url()}  // Correctly fetch image URL using urlFor
                  alt={product.title}                // Use product title for alt text
                  width={200}
                  height={200}
                />

                {/* Add to Cart Button */}
                <div className="absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-black text-white px-4 py-2 text-sm w-[200px] hover:bg-black"
                    onClick={() => addToCartHandler(product)} // Add the product to the cart
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <Link href={`/products/productDetails/${product._id}`}>
                <p className="text-[#252B42] font-semibold mt-4 ml-2">
                  {product.title} {/* Display product title */}
                </p>
              </Link>

              {/* Product Description */}
              <p className="text-xs mt-2 text-[#252B42] ml-8">
                {product.description} {/* Display product description */}
              </p>

              {/* Price */}
              <div className="mt-2">
                <span className="text-slate-400 text-sm ml-10 font-semibold">
                  $16.40 {/* You can modify this if you want to show a default price */}
                </span>
                <span className="text-green-700 text-sm ml-2 font-semibold">
                  ${product.price} {/* Display actual product price */}
                </span>
              </div>

              {/* Product Color Options (Optional) */}
              <div className="flex gap-2 ml-[52px] mt-2 mb-20">
                {/* You can replace these with actual color options from Sanity */}
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
