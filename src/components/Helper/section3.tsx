"use client";
import Image from "next/image";
import Link from "next/link";
import products, { Product } from "../../data/products";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/cartSlice";
type Props = {
    product: Product[];
}

export default function Section3({product}: Props) {
  const category = "Best Selling Products";
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const dispatch = useDispatch();

  // Use Product type for the product parameter
  const addToCartHandler = (product:Product) => {
    dispatch(addItem(product)); // Add the product to cart
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative">
              <div className="relative">
                {/* Product Image */}
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                />

                {/* Add to Cart Button */}
                <div className="absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-black text-white px-4 py-2 text-sm w-[200px] hover:bg-black"
                    onClick={() => {
                      addToCartHandler(product); // Pass product to handler
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <Link href={`/products/productDetails/${product.id}`}>
                <p className="text-[#252B42] font-semibold mt-4 ml-10">
                  {product.name}
                </p>
              </Link>

              {/* Product Description */}
              <p className="text-xs mt-2 text-[#252B42] ml-4">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-2">
                <span className="text-slate-400 text-sm ml-10 font-semibold">
                  $16.40
                </span>
                <span className="text-green-700 text-sm ml-2 font-semibold">
                  ${product.price}
                </span>
              </div>

              {/* Product Color Options */}
              <div className="flex gap-2 ml-10 mt-2 mb-20">
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
