import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { ArrowBigRightDash } from "lucide-react"
import { Button } from "@/components/ui/button"
import products from "@/data/products";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

export default function Shop (){
    const category = "Best Selling Products"; // Change this to the desired category
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
    return(
        <div>
            <div className="bg-gray-200 w-full h-[400px]">
                <div className="flex justify-between">
                <h2 className=" ml-20 md:ml-24 pt-10 text-2xl font-semibold">Shop</h2>
                <div className="flex mr-12  gap-4 text-[#252B42] mt-10">
                    <span>Home</span>
                    <span><ArrowBigRightDash /></span>
                    <span className="text-slate-400">Shop</span>
                </div>
                </div>
                <div className="ml-10">
             
<Carousel className="ml-6 mt-10">
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
    <Image src="/shop1.png" alt="shop1" width={200} height={200}/>
    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
    <Image src="/shop2.png" alt="shop1" width={200} height={200}/>
    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
    <Image src="/shop3.png" alt="shop1" width={200} height={200}/>
    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
    <Image src="/shop4.png" alt="shop1" width={200} height={300}/>
    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
    <Image src="/shop5.png" alt="shop1" width={200} height={200}/>
    </CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
    <Image src="/ep1.png" alt="shop1" width={200} height={300}/>
    </CarouselItem>
  </CarouselContent>
</Carousel>

                </div>

            </div>
            {/* 2nd part */}
            <div className=" flex flex-col md:flex-row ml-24 md:justify-around mt-10">
                <div className="mt-2"><p>showing all 12 results</p></div>
                <div className="mt-4 flex gap-2">
                    <p className="mt-2">Views:</p>
                    <button><Image  src="/shopbtn1.png" alt="shopbtn1" width={50} height={50}/></button>
                    <button><Image  src="/shopbtn2.png" alt="shopbtn1" width={50} height={50}/></button>

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
           
            <div>
                <div className="ml-20 md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">
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

                </div>
                 
            </div>
          
        </div>
        {/* pagination */}
        <Pagination className="-mt-20">
  <PaginationContent className="border">
    <PaginationItem className="border text-blue-400">
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem className="border text-blue-400 hover:bg-blue-400 hover:text-white">
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem className="border text-blue-400 hover:bg-blue-400 hover:text-white">
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem className="border text-blue-400 hover:bg-blue-400 hover:text-white">
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem className="border text-blue-400">
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

{/* logo section */}

<div className="flex flex-col md:flex-row md:gap-10 gap-6 mt-20 md:ml-96 mb-10">
    <Image src="/logo1.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo2.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo3.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo4.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo5.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo6.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
</div>

            
        </div>
    )
}