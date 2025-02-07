"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client"; 
import { urlFor } from "@/sanity/lib/image"; 
import { useDispatch, useSelector } from "react-redux";
import { addItem, loadCartFromLocalStorage } from "../../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../store/wishlist";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { RootState } from "../../../store/store"; // Redux store ka root state

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

  // Wishlist state ko Redux se fetch karein
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await client.fetch(
        '*[_type == "product" && category->name == $category ]{_id, title, description, price, productImage, slug, stockQuantity, category->{name}, isNew}',
        { category }
      );
      setProducts(result);
    };

    fetchProducts();
  }, [category]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  // Wishlist Add/Remove Function
  const toggleWishlist = (product: Product) => {
    const isWishlisted = wishlist.some((item) => item.id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product._id }));
    } else {
      dispatch(
        addToWishlist({
          id: product._id,
          name: product.title,
          price: product.price,
          imageUrl: product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png",
        })
      );
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

      <div data-id="product-list">
        <div className="md:ml-6 md:mr-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {products.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product._id);

            return (
              <div key={product._id} className="relative p-4 border rounded-lg shadow-lg bg-white">
                {/* Heart Icon (Wishlist Toggle) */}
                              <button
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </button>

                <div className="relative w-full h-60">
                  <Image
                    src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png"}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md overflow-hidden"
                  />
                </div>

                <Link href={`/products/productDetails/${product._id}`}>
                  <p className="text-[#252B42] font-semibold mt-4 text-center">
                    {product.title}
                  </p>
                </Link>

                <div className="mt-2 text-center">
                  <span className="text-slate-400 text-sm font-semibold">
                    ${product.price}
                  </span>
                </div>

                <div className="mt-2 text-center">Available Stock: {product.stockQuantity}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
