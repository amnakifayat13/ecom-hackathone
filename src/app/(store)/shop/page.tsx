"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowBigRightDash, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem, loadCartFromLocalStorage } from "../../../../store/cartSlice";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client"; // Import the sanity client
import { urlFor } from "@/sanity/lib/image";
import { addToWishlist, removeFromWishlist } from "../../../../store/wishlist";
import { RootState } from "../../../../store/store";

export default function Shop() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);

  const addToCartHandler = (product: any) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const query = '*[_type == "product"]';
      try {
        const data = await client.fetch(query);
        setCarouselItems(data);
      } catch (error) {
        console.error("Error fetching carousel items from Sanity:", error);
      }
    };

    fetchCarouselItems();
  }, []);

  const toggleWishlist = (product: any) => {
    const itemExists = wishlistItems.some((item) => item.id === product._id);
    if (itemExists) {
      dispatch(removeFromWishlist({ id: product._id }));
    } else {
      dispatch(
        addToWishlist({
          id: product._id,
          name: product.title,
          imageUrl: urlFor(product.productImage).url(),
          price: product.price,
        })
      );
    }
  };

  return (
    <div className="md:w-[1170px] md:mx-auto">
      <div className="pb-16 pt-16">
        {/*  Carousel Added  */}
        <Carousel className="mr-6 mt-10">
          <CarouselContent>
            {carouselItems.map((product: any) => (
              <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/5">
                <div className="relative flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-full h-[250px] overflow-hidden rounded-lg relative">
                    <Image
                      src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png"}
                      alt={product.title}
                      width={300}
                      height={250}
                      className="object-cover w-full h-full transition-transform transform group-hover:scale-105 duration-500"
                    />
                    <button
                      className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
                      onClick={() => toggleWishlist(product)}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          wishlistItems.some((item) => item.id === product._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="w-full mt-4 text-center">
                    <Link href={`/products/productDetails/${product._id}`}>
                      <p className="text-[#252B42] font-semibold">{product.title}</p>
                    </Link>
                    <div className="mt-2 flex justify-center items-center">
                      
                      <span className="text-green-700 text-sm font-semibold">${product.price}</span>
                      
                    </div>
                    <div className="text-slate-400 text-sm font-semibold">stock:{product.stockQuantity}</div>
                     

                  </div>

                  <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => addToCartHandler(product)}
                      className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/*  Grid View (Original Shop Layout) */}
        <h1 className="text-xl md:text-3xl lg:text-4xl text-red-600 font-bold mt-10 flex justify-center"> Our Products</h1>
        <div className="md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-6">
          {carouselItems.map((product: any) => (
            <div
              key={product._id}
              className="relative flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-full h-[250px] overflow-hidden rounded-lg relative">
                <Image
                  src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png"}
                  alt={product.title}
                  width={300}
                  height={250}
                  className="object-cover w-full h-full transition-transform transform group-hover:scale-105 duration-500"
                />
                <button
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      wishlistItems.some((item) => item.id === product._id) ? "fill-red-500 text-red-500" : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              <div className="w-full mt-4 text-center">
                <Link href={`/products/productDetails/${product._id}`}>
                  <p className="text-[#252B42] font-semibold">{product.title}</p>
                </Link>
                <div className="mt-2 flex justify-center items-center">
                  <span className="text-slate-400 text-sm font-semibold mr-2">$16.40</span>
                  <span className="text-green-700 text-sm font-semibold">${product.price}</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => addToCartHandler(product)}
                  className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
