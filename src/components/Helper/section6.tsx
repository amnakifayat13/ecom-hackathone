"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client"; // Sanity client
import { urlFor } from "@/sanity/lib/image"; // Image URL helper
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

export default function Section6() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("Featured Products");
  const dispatch = useDispatch();

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await client.fetch(
        `*[_type == "product" && category->name == $category]{
          _id, title, description, price, productImage, slug, stockQuantity, category->{name}
        }`,
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
    } else {
      alert("Sorry, this product is out of stock.");
    }
  };

  return (
    <div className="pt-16 pb-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center">
        <p className="text-xs md:text-lg text-blue-500">Featured Products</p>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">
          Featured Products
        </h1>
        <p className="text-xs md:text-lg text-[#252B42] mt-4">
          Check out our featured products below.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 lg:px-24 mt-10">
        {products.map((product) => (
          <div key={product._id} className="text-[#252B42] shadow-md rounded-md overflow-hidden bg-white">
            <Image
              src={product.productImage ? urlFor(product.productImage).url() : '/fallback-image.png'}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
            <Link href={`/products/productDetails/${product._id}`}>
              <h2 className="font-semibold mt-2">{product.title}</h2>
              </Link>
    
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <p className="text-xs">Price: ${product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs">Stock: {product.stockQuantity}</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-2 mt-6 text-blue-500 font-bold cursor-pointer">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => addToCartHandler(product)}
                >
                  Add to Cart
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
