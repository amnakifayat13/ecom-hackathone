import Link from "next/link"
import Image from "next/image"
import {  ArrowBigDownDashIcon, HeartIcon, Search, ShoppingCartIcon, User, UserIcon } from "lucide-react"
import Menu from "./Helper/menu"
import ShoppingCartButton from "./Helper/ShoppingCartButton"
import SearchBar from "./Helper/searchbar"


export default function Nav(){
    return(
<div className="md:w-[1170px] md:mx-auto sticky top-0 z-[100]">
<div className=" hidden md:flex justify-between items-center bg-[#252B42] text-white text-sm h-14 ">
    <div>
        <p className="ml-[12rem]">Summer Sale for All Swim Suits And Free Express Delivery-OFF 50% </p>
    </div>
    <div>
        <button className="mr-20 underline">Shop Now</button>
    </div>
    
    <div className="lg:basis-1/4 lg:text-center text-right text-[12px] ">
                        <select className="text-white border-none bg-[#252B42]" name="" id="">
                            <option value="">English</option>
                            <option value="">Urdu</option>
                            <option value="">Arabic</option>
                        </select>
                    </div>
</div>
<div className="h-[12vh] sticky top-0 z-[1] bg-white shadow-md">
            <div className="flex items-center justify-around w-[95%] md:w-4/5 mx-aotu h-full">
            {/* logo */}
            <Link href="/">
            <button className="ml-4  text-xl sm:2xl md:3xl xl:4xl font-bold text-[#252B42]">Bandage</button>
            </Link>
            <div>
                <ul className="  hidden md:flex gap-6 font font-semibold cursor-pointer md:ml-8">
                    <li className="text-[#252B42]"><Link href="/">Home</Link></li>
                    <li><Link href="/shop"><div className="lg:basis-1/4 lg:text-center text-right">
                        <select className="text-[#252B42]" name="" id="">
                            <option value="">Shop</option>
                         
                            
                        </select>
                    </div></Link></li>
                    <li className="text-[#252B42]"><Link href="/about">About</Link></li>
                    <li className="text-[#252B42]"><Link href="/">Blog</Link></li>
                    <li className="text-[#252B42]"><Link href="/contact">Contact</Link></li>
                    <li className="text-[#252B42]"><Link href="/team">Team</Link></li>
                </ul>
            </div>
           
           {/* login/register */}
            <div className="flex md:ml-4 ml- text-[#00b0d7]">
                <User className="hidden md:block"/>
                <p className=" mt-1 hidden md:block">Login/Register</p>
            </div>
            {/* icons */}
            <div className="flex items-center md:space-x-6 space-x-1 md:ml-8 text-[#00b0d7] "  > 

                <div data-id="open-search-btn"><SearchBar/></div>
                <div className="flex text-[#00b0d7] md:ml-48">
                    <ShoppingCartButton />
                    </div>
               <div className="flex text-[#00b0d7] ">
               <HeartIcon size={26} cursor={"pointer"} className="hidden md:block"/>
               <p className=" hidden md:block">1</p>
               </div>
                <div>
                <Menu/>
            </div>
               
            </div>
            </div>
        </div>
</div>
    )
}