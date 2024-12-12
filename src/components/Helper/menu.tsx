import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { MenuIcon, Search, User, ShoppingCartIcon,HeartIcon  } from "lucide-react"
import Link from "next/link"
  
export default function Menu(){
    return (
        <div className="md:hidden">
            <Dialog >
  <DialogTrigger>
        <MenuIcon className="text-[#00b0d7]"/>
  </DialogTrigger>
  <DialogContent>
  <h1 className="text-2xl text-[#252B42] underline">Menu</h1>
  {/* <ul className="block gap-10   font font-semibold cursor-pointer "> */}
  <ul className="   md:hidden gap-10 font font-semibold cursor-pointer md:ml-48">
                    <li className="text-[#252B42] mt-2"><Link href="/">Home</Link></li>
                    <li><div className="">
                        <select className="text-[#252B42] mt-2" name="" id="">
                            <option value="">Shop</option>
                         
                         
                            
                        </select>
                    </div></li>
                    <li className="text-[#252B42] mt-2"><Link href="/about">About</Link></li>
                    <li className="text-[#252B42] mt-2"><Link href="/">Blog</Link></li>
                    <li className="text-[#252B42] mt-2"><Link href="/contact">Contact</Link></li>
                    <li className="text-[#252B42] mt-2"><Link href="/team">Team</Link></li>
                </ul>
                <div className=" mt-2 md:ml-36 ml- text-[#00b0d7]">
                <User/>
                <p className=" mt-1">Login/Register</p>
            </div>
            {/* icons */}
            <div className=" items-center md:space-x-6 space-x-1 "> 

                <Search className="ml-4 text-[#00b0d7]"/>
                <div className="flex text-[#00b0d7] ">
                    <ShoppingCartIcon className=" mt-2 ml-2"/>
                    <p>1</p>
                    </div>
               <div className="flex text-[#00b0d7] ">
               <HeartIcon size={26} cursor={"pointer"} className="mt-2 ml-2"/>
               <p className=" md:block">1</p>
               </div>
               </div>
                
               
  </DialogContent>
</Dialog>

        </div>
    )
}