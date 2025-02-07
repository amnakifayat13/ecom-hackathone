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
import { RootState } from "../../../store/store"; 

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

export default function Section6() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("Featured Products");
  const dispatch = useDispatch();

  // Fetch wishlist from Redux store
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await client.fetch(
        `*[_type == "product" && category->name == $category]{
          _id, title, description, price, productImage, slug, stockQuantity, category->{name}
        }`,
        { category }
      );
      setProducts(result);
    };
    fetchProducts();
  }, [category]);

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
    <div className="pt-16 pb-16 bg-gray-50">
      <div className="text-center">
        <p className="text-xs md:text-lg text-blue-500">Featured Products</p>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">
          Featured Products
        </h1>
        <p className="text-xs md:text-lg text-[#252B42] mt-4">
          Check out our featured products below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 lg:px-24 mt-10">
        {products.map((product) => {
          const isWishlisted = wishlist.some((item) => item.id === product._id);
          return (
            <div key={product._id} className="relative text-[#252B42] shadow-md rounded-md overflow-hidden bg-white">
              <button
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </button>
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
                  <p className="text-xs">Price: ${product.price}</p>
                  <p className="text-xs">Stock: {product.stockQuantity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
