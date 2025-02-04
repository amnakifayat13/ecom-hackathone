"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowBigRightDash } from "lucide-react";
import { Button } from "@/components/ui/button";
import products from "@/data/products";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem, loadCartFromLocalStorage } from "../../../../store/cartSlice";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client"; // Import the sanity client
import { urlFor } from "@/sanity/lib/image";

export default function Shop() {
  const dispatch = useDispatch();

  // Use Product type for the product parameter
  const addToCartHandler = (product: any) => {
    dispatch(addItem(product)); // Add the product to cart
  };
  // Load the cart from localStorage when the component mounts
    useEffect(() => {
      dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
    }, [dispatch]);
  

  // State to store carousel data
  const [carouselItems, setCarouselItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch carousel items from Sanity
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

  return (
    <div className="md:w-[1170px] md:mx-auto">
      <div className="bg-gray-200 w-full h-[400px] relative">
        <div className="flex justify-between absolute top-10 left-1/4 md:left-1/5 right-1/4 text-white">
          <h2 className="text-2xl font-semibold">Shop</h2>
          <div className="flex gap-4 mt-10">
            <span>Home</span>
            <span>
              <ArrowBigRightDash />
            </span>
            <span className="text-slate-400">Shop</span>
          </div>
        </div>
        {/* Render Carousel with dynamic items from Sanity */}
        <Carousel className="mr-6 mt-10">
          <CarouselContent>
            {carouselItems.length > 0 ? (
              carouselItems.map((item: any) => (
                <CarouselItem
                  key={item._id}
                  className="ml-2 mt-32 group relative flex justify-center  items-center transition-all duration-300 ease-in-out md:basis-1/2 lg:basis-1/4 w-60 h-60"
                >
                  <div className="shadow-slate-200">
                  <Image
                    src={item.productImage ? urlFor(item.productImage).url() : "/fallback-image.png"}
                    alt={item.title}
                    layout="fill" 
                  objectFit="cover" 
                  className="rounded-md group-hover:scale-105 transition-all duration-500  shadow-lg" 
                    
                  />
                  </div>
                  <div className="absolute inset-0 bg-black opacity-30 rounded-lg group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div className="absolute bottom-10 text-center w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/products/productDetails/${item._id}`}>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    </Link>
                 
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div>Loading ...</div>
            )}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 2nd part */}
      <div className="flex flex-col md:flex-row ml-24 md:justify-around mt-10">
        <div className="mt-2">
          <p>showing all 12 results</p>
        </div>
        <div className="mt-4 flex gap-2">
          <p className="mt-2">Views:</p>
          <button>
            <Image src="/shopbtn1.png" alt="shopbtn1" width={50} height={50} />
          </button>
          <button>
            <Image src="/shopbtn2.png" alt="shopbtn1" width={50} height={50} />
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <select className="w-24 h-8 bg-gray-200">
            <option>Popularity</option>
          </select>
          <Button className="bg-blue-400 text-white hover:text-black">Filter</Button>
        </div>
      </div>

      {/* 3rd part */}
      <div className="pb-16 pt-16">
  <div className=" md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-6">
    {carouselItems.map((product) => (
      <div
        key={product._id}
        className="relative flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container with Fixed Size */}
        <div className="w-full h-[250px] overflow-hidden rounded-lg">
          <Image
            src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png"}
            alt={product.title}
            width={300} // Adjust to fit your design
            height={250} // Adjust to fit your design
            className="object-cover w-full h-full transition-transform transform group-hover:scale-105 duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="w-full mt-4 text-center">
          <Link href={`/products/productDetails/${product._id}`}>
            <p className="text-[#252B42] font-semibold">{product.title}</p>
          </Link>
          <div className="mt-2 flex justify-center items-center">
            <span className="text-slate-400 text-sm font-semibold mr-2">$16.40</span>
            <span className="text-green-700 text-sm font-semibold">${product.price}</span>
          </div>

          {/* Color Options */}
          <div className="flex gap-2 justify-center mt-2">
            <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => {
              addToCartHandler(product); // Pass product to handler
            }}
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
