import { Button } from "@/components/ui/button";
import { Facebook, Instagram, LetterTextIcon, LocateIcon,  Phone, Twitter } from "lucide-react";
import Image from "next/image"

export default function Contact(){
    return(
        <div>
        <div className=" md:ml-0 w-full md:w-full h-[500px] bg-white flex ">
                <div className="ml-10 md:ml-72 mt-40 text-[#252B42]">
                    <p>CONTACT US</p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-10">Get in touch today!</h1>
                    <p className="mt-10 ">We know how large objects will act,</p>
                    <p>but things on a small scale</p>
                    <p className="mt-10 font-bold">Phone: +451 215 215</p>
                    <p className="mt-2 font-bold">Fax: +451 215 215 </p>
                    <div className="flex gap-2 text-[#00b0d7] mt-4">
        <Facebook  className="fill-[#00b0d7]"/>
        <Instagram />
        <Twitter className="fill-[#00b0d7]"/>
    </div>
                    
                </div >
                <div className="w-40 h-40 rounded-full"></div>
                <div className="image-container ">
                    
                <Image src="/contactpic.png" alt="" width={300} height={300}
                className=" hidden md:block md:ml-48 md:mt-24 mt-24"/> 
            
                </div>
                
            </div>

            {/* section2 */}
            <div className="pt-12 pb-12">
            <p className="text-[#252B42] text-sm flex justify-center md:mt-2 mt-24">VISIT OUR OFFICE</p>
            <h1 className=" text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#252B42] md:mt-10">WE help small business</h1>
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#252B42] md:mt-4">With big ideas</h1>
             <div className="grid grid-cols-1 md:grid-cols-3 md:ml-24 ml-10">
             <div className="shadow-md mt-20 hover:bg-[#252B42]  h-80 w-60 flex flex-col items-center justify-center ml-4">
    <Phone size={50} className="text-blue-500" />
    <p className="text-[#252B42] mt-2 text-sm text-center hover:text-white ">
        We know how large objects will act <br /> but things on a small scale
    </p>
    <p className="text-[#252B42] font-bold mt-2 hover:text-white">Get Support</p>
    <Button className="text-blue-500 border border-blue-500 mt-4 rounded-2xl px-4 py-2">
        Submit Request
    </Button>
</div>
<div className="shadow-md mt-20 hover:bg-[#252B42] hover:text-white h-80 w-60 flex flex-col items-center justify-center ml-4">
    <LocateIcon size={50} className="text-blue-500" />
    <p className="text-[#252B42] mt-2 text-sm text-center hover:text-white">
        We know how large objects will act <br /> but things on a small scale
    </p>
    <p className="text-[#252B42] font-bold mt-2 hover:text-white">Get Support</p>
    <Button className="text-blue-500 border border-blue-500 mt-4 rounded-2xl px-4 py-2">
        Submit Request
    </Button>
</div>
<div className="shadow-md mt-20 hover:bg-[#252B42] h-80 w-60 flex flex-col items-center justify-center ml-4">
    <LetterTextIcon size={50} className="text-blue-500" />
    <p className="text-[#252B42] mt-2 text-sm text-center hover:text-white">
        We know how large objects will act <br /> but things on a small scale
    </p>
    <p className="text-[#252B42] font-bold mt-2 hover:text-white">Get Support</p>
    <Button className="text-blue-500 border border-blue-500 mt-4 rounded-2xl px-4 py-2">
        Submit Request
    </Button>
</div>
                
             </div>
        </div>
        <div className="pb-10 pt-10 flex flex-col items-center">
    <Image src="/Arrow 2.png" alt="" width={50} height={50} className="mb-2" />
    <p className="text-sm text-center mt-2">WE CAN&apos;T WAIT TO MEET YOU</p>
    <h1 className="text-xl md:text-2xl font-bold text-center mt-2">Let&apos;s Talk</h1>
    <Button className="w-28 h-12 mt-4 bg-blue-500 text-white font-semibold">Try it free now</Button>
</div>

        </div>
    )
}