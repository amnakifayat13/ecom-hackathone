import Link from "next/link"
import Image from "next/image"
import {  ArrowBigDownDashIcon, HeartIcon, PackageIcon, Search, ShoppingCartIcon, User, UserIcon } from "lucide-react"
import Menu from "./Helper/menu"
import ShoppingCartButton from "./Helper/ShoppingCartButton"
import SearchBar from "./Helper/searchbar"
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import SearchBox from "./Helper/searchbar"
import WishlistButton from "./Helper/wishlistButton"


export default function Nav(){
    // const { user }  = useUser();
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
            <button className="ml-4  text-xl sm:2xl md:3xl xl:4xl font-bold text-[#252B42] mt-3">
                <Image src="/elogo.png" alt="logo" width={200} height={100}/>
            </button>
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
                    <li className="text-[#252B42]"><Link href="/contact">Contact</Link></li>
                    <li className="text-[#252B42]"><Link href="/team">Team</Link></li>
                </ul>
            </div>
           
           
            <div className="flex items-center space-x-6"> 
                {/* search box */}
                <SearchBox/>
                
              
                <WishlistButton/>
                {/* shopping cart  button */}
                <ShoppingCartButton/>
                {/* user button */}
                {/* sign in user */}
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                {/* not sign in */}
                <SignedOut>
                    <SignInButton>
                    <UserIcon size={26} cursor={"pointer"}/>
                    </SignInButton>
                </SignedOut>
               
            </div>
           
            <div className="md:hidden ml-2">
                <Menu/>
                </div>
            </div>
        </div>
</div>
    )
}