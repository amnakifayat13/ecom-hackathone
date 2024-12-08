"use client"; 

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import products from "../../../../data/products";
import { Button } from "@/components/ui/button";
import {  ArrowBigRightDash, EyeIcon, Heart, ShoppingCartIcon } from "lucide-react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);

  // Function to handle increment
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Function to handle decrement
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); 
  };
  const router = useRouter();
  const { id } = params;

  // Find the product by ID
  const product = products.find((product) => product.id === parseInt(id));

  // Handle case where product is not found
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Find related items (same category but different ID)
  const relatedItems = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  const category = "Kitchen Ware"; 
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  
 
 
  

  return (
    <div className="p-16">
        
      <div className="md:bg-gray-200 md:w-full md:h-[1800px]">
      <div className="flex ml-10 md:ml-60 gap-4 text-[#252B42] ">
           
           <span className="mt-10">Home</span> 
           <span className="mt-10"><ArrowBigRightDash/></span>
           <span className="mt-10 text-slate-400">Shop</span>
          
       </div>
        {/* Product Details Section */}
      <div className="flex md:ml-60 text-[#252B42]">
      <div> <Image src={product.imageUrl} alt={product.name} width={300} height={300} className="mt-10 w-72 h-72 bg-slate-300" /></div>
      <div className="mb-8 md:ml-20">
        <h1 className="text-2xl font-bold mt-10">{product.name}</h1>
        <div className="text-yellow-500 text-2x mr-20">
              &#9733; &#9733; &#9733; &#9733; &#9733;<span className="ml-6 text-[#252B42] text-sm">{product.reviews} Reviews</span>
              
            </div>
        <p className="text-lg">Price: ${product.price}</p>
        <p>Discount: {product.discount}%</p>
        <p>{product.description}</p>
        <div className="w-60 h-[1px] bg-slate-300 mt-4"></div>
        <div className="flex">
        <p>Colors:</p>
        <div className="flex gap-1 mt-2 ml-2">
        <div className="selection-circle">
        <div className="circle"></div>
        </div>
        <div className="w-[15px] h-[15px] bg-green-500 rounded-full"></div>
        </div>
        
        
        </div>
        <div className="mt-10">Size:
          <span ><button className="  border  ml-2  rounded-[5px] w-8 h-8 hover:text-white hover:bg-green-500 ">xs</button></span>
          <span ><button className="  border  ml-2  rounded-[5px] w-8 h-8 hover:text-white hover:bg-green-500 ">s</button></span>
          <span ><button className="  border  ml-2  rounded-[5px] w-8 h-8 hover:text-white hover:bg-green-500 ">M</button></span>
          <span ><button className="  border  ml-2  rounded-[5px] w-8 h-8 hover:text-white hover:bg-green-500 ">L</button></span>
          <span ><button className="  border  ml-2  rounded-[5px] w-8 h-8 hover:text-white hover:bg-green-500 ">XL</button></span>
          
        </div>
        <div className="flex   mt-10 ">
      {/* Decrement Button */}
      <button
        onClick={decrementQuantity}
        className=" w-8 h-8 bg-gray-200 text-gray-700 font-bold  shadow hover:bg-green-500 hover:text-white"
      >
        -
      </button>

      {/* Quantity Display */}
      <div className=" flex justify-center items-center w-20 h-8 bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300">
        {quantity}
      </div>

      {/* Increment Button */}
      <button
        onClick={incrementQuantity}
        className=" w-8 h-8 bg-gray-200 text-gray-700 font-bold  shadow hover:bg-green-500 hover:text-white"
      >
        +
      </button>
      <Button variant={"destructive"} className="ml-4">Buy Now</Button>
    <div className="flex flex-col md:flex-row gap-4">
    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ml-4">
      <Heart size={10} className=" w-6 h-6 hover:fill-green-500 "/>
      
      </div>
      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ml-4">
      <ShoppingCartIcon className=" w-6 h-6 hover:fill-green-500 "/>
      </div>
      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ml-4">
      <EyeIcon className=" w-6 h-6 hover:fill-green-500 "/>
      </div>
    </div>
      
    </div>
    <div className="flex gap-2 ml-10 mt-10 mb-20" >
                    <div className="w-[20px] h-[20px] rounded-full bg-blue-500"></div>
                    <div className="w-[20px] h-[20px] rounded-full bg-red-500"></div>
                    <div className="w-[20px] h-[20px] rounded-full bg-green-700"></div>
                    <div className="w-[20px] h-[20px] rounded-full bg-black"></div>
                    
                    </div>
   
      </div>
      
      </div>

      {/* Related Products Section */}
      <div>
      
        <div className="flex space-x-4 mt-10  ">
       
       <h2 className="text-green-500 mt-2 font-semibold md:ml-24 text-2xl ">Related Item</h2>
       </div>
       
       <div>
                <div className="ml-20 md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">
                {relatedItems.map((product) => (
         <Link key={product.id} href={`/products/productDetails/${product.id}`}>
                    <Image src={product.imageUrl} alt={product.name} width={200} height={200}/>
                    <p className="text-[#252B42] font-semibold mt-4 ml-10">{product.name}</p>
                    <p className=" text-xs mt-2 text-[#252B42] ml-4">{product.description}</p>
                    <div className="mt-2">
                        <span className="text-slate-400 text-sm ml-10 font-semibold">$16.40</span>
                        <span className="text-green-700 text-sm ml-2 font-semibold">${product.price}</span>
                    </div>
                    <div className="flex gap-2 ml-10 mt-2 mb-20" >
                    <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
                    
                    </div>
                    </Link>
                ))}

                </div>
                 
            </div>
        
      </div>
      </div>

      {/* second part of the page */}
      <div className="mt-10 flex gap-6 md:gap-24 text-[#252B42] text-sm ">
        <span className="md:ml-72 ">description</span>
        <span>Additional Information </span>
        <span>Reveiws(0)</span>
      </div>
      <div className="md:w-[800px] md:h-[1px] md:bg-slate-500 mt-10 md:ml-24"></div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 mt-10 ml-10 md:ml-24">
        <Image src="/kw.png" alt="kw" width={300} height={400} className="h-[500px]"/>
        <div>
            <h2 className="text-[#252B42] md:text-xl font-semibold text-sm">The quick fox jumps over </h2>
            <p className="text-[#252B42] text-md mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry&apos; standard dummy text ever since the 1500s, when an
                 unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                 <p className="text-[#252B42] text-md mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry &apos;standard dummy text ever since the 1500s, when an
                 unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                 <p className="text-[#252B42] text-md mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry&apos; standard dummy text ever since the 1500s, when an
                 unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div>
            <h2 className="text-[#252B42] md:text-xl text-sm font-semibold ml-2 md:ml-20 mt-2">The quick fox jumps over</h2>
            <ul className="text-[#252B42]  md:ml-20 text-xs md:text-md mt-6">
                <li className="mt-6"> &rarr; The quick fox jumps over </li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
            </ul>
            <h2 className="text-[#252B42] md:text-xl text-sm font-semibold ml-2 md:ml-20 mt-6">The quick fox jumps over</h2>
            <ul className="text-[#252B42]  md:ml-20 text-xs md:text-md mt-6">
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                </ul>
        </div>

        
    </div>
    <div className="md:bg-gray-200 md:w-full md:h-[1300px] mt-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  pt-10 ml-4 md:ml-24 ">Besst Selling Products</h1>
        <div className="md:w-[800px] md:h-[1px]  md:bg-slate-500 mt-10 md:ml-24"></div>
                <div className="ml-4 md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 ">
                {filteredProducts.map((product) => (
         <Link key={product.id} href={`/products/productDetails/${product.id}`}>
                    <Image src={product.imageUrl} alt={product.name} width={200} height={200}/>
                    <p className="text-[#252B42] font-semibold mt-4 ml-10">{product.name}</p>
                    <p className=" text-xs mt-2 text-[#252B42] ml-4">{product.description}</p>
                    <div className="mt-2">
                        <span className="text-slate-400 text-sm ml-10 font-semibold">$16.40</span>
                        <span className="text-green-700 text-sm ml-2 font-semibold">${product.price}</span>
                    </div>
                    <div className="flex gap-2 ml-10 mt-2 mb-20" >
                    <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
                    
                    </div>
                    </Link>
                ))}
                     {/* logo setion */}
                <div className="flex flex-col md:flex-row md:gap-10 mt-20 md:ml-40 gap-6">
                <Image src="/logo1.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo2.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo3.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo4.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo5.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo6.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
            </div>


                </div>
                
            
                 
            </div>
           
    </div>
  )}
 
