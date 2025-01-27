"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client"; 
import { urlFor } from "@/sanity/lib/image"; 
import { useDispatch } from "react-redux";
import { addItem, loadCartFromLocalStorage } from "../../../store/cartSlice";
import Image from "next/image";
import Link from "next/link";

// Define the Product type (Sanity Product)
interface Product {
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
  stockQuantity: number;
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
  const [category, setCategory] = useState("Best Selling Products");
  const dispatch = useDispatch();

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await client.fetch(
        '*[_type == "product" && category->name == $category ]{_id, title, description, price, productImage, slug, stockQuantity, category->{name}, isNew}',
        { category }
      );
      console.log(result); // Log result to verify the structure of the fetched data
      setProducts(result);
    };

    fetchProducts();
  }, [category]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
  }, [dispatch]);

  // Load product stock from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save product stock to localStorage
  const saveToLocalStorage = (updatedProducts: Product[]) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Add to Cart Handler
  const addToCartHandler = (product: Product) => {
    if (product.stockQuantity > 0) {
      const imageUrl = product.productImage ? urlFor(product.productImage).url() : '/fallback-image.png'; // Fallback image if URL is not valid

      const cartItem: CartItem = {
        id: product._id,
        name: product.title,
        price: product.price,
        imageUrl,
        quantity: 1, 
        category: product.title,
      };

      dispatch(addItem(cartItem));

      // Update the stock quantity in the UI after adding to cart
      const updatedProducts = products.map((prod) =>
        prod._id === product._id
          ? { ...prod, stockQuantity: prod.stockQuantity - 1 }
          : prod
      );
      setProducts(updatedProducts);
      saveToLocalStorage(updatedProducts);
    } else {
      alert("Sorry, this product is out of stock.");
    }
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

      <div data-id="product-list" >
        <div className=" md:ml-6 md:mr-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20" >
          {products.map((product) => (
            <div key={product._id} className="relative p-4 border rounded-lg shadow-lg bg-white">
              <div className="relative w-full h-60"> 
                {/* Product Image */}
                <Image
                  src={product.productImage ? urlFor(product.productImage).url() : '/fallback-image.png'}
                  alt={product.title}
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-md overflow-hidden" 
                />

                {/* Add to Cart Button */}
                {/* <div className="absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black"
                    onClick={() => addToCartHandler(product)} // Add the product to the cart
                  >
                    Add to Cart
                  </button>
                </div> */}
              </div>

              {/* Product Name */}
              <Link href={`/products/productDetails/${product._id}`}>
                <p className="text-[#252B42] font-semibold mt-4 text-center">
                  {product.title} {/* Display product title */}
                </p>
              </Link>

              {/* Price */}
              <div className="mt-2 text-center">
                <span className="text-slate-400 text-sm font-semibold">
                  ${product.price} {/* Display actual product price */}
                </span>
              </div>

              {/* Stock Availability */}
              <div className="mt-2 text-center">Available Stock: {product.stockQuantity}</div>

              {/* Product Color Options (Optional) */}
              <div className="flex justify-center gap-2 mt-2 mb-4">
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
