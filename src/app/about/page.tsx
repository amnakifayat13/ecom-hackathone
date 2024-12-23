import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react";
export default function About(){
    return(
        <div className="md:w-[1170px] md:mx-auto">
            <div className="w-full h-auto md:h-[500px] bg-white flex flex-col md:flex-row items-center md:items-start">
   
    <div className="text-center md:text-left px-4 md:px-0 md:ml-20 lg:ml-72 mt-10 md:mt-40 text-[#252B42]">
        <p className="text-sm md:text-base">ABOUT COMPANY</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6">ABOUT US</h1>
        <p className="mt-6 text-sm md:text-base">We know how large objects will act,</p>
        <p className="text-sm md:text-base">but things on a small scale</p>
        <Button variant={"destructive"} className="mt-6 font-bold text-white">
            Get Quotes Now
        </Button>
    </div>

    
    <div className="relative mt-10 md:mt-0">
        <div className="hidden md:block w-40 h-40 rounded-full bg-pink-200 mx-auto md:mx-0 mt-6"></div>
        <Image 
            src="/aboutpic.png" 
            alt="About Image" 
            width={300} 
            height={300} 
            className="  ml-4 lg:ml-20 "
        />
    </div>
</div>

            {/* section 2 */}

            <div className="pt-12 pb-12">
            <div className="px-4 md:px-20 lg:px-40">
   
    <p className="text-red-500 text-sm text-center md:text-left mb-4">Problems Trying</p>
    
   
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 md:ml-6">
      
        <div className="text-center md:text-left">
            <p className="mt-4 text-[#252B42] text-sm font-bold">
                Met minim Mollie non desert <br />
                Alamo est sit cliquery dolor do<br />
                met sent
            </p>
        </div>
        
       
        <div className="text-center md:text-left">
            <p className="mt-4 text-[#252B42] text-sm">
                Problems trying to resolve the conflict between the two major realms of <br />
                classical physics Newtonian mechanics
            </p>
        </div>
    </div>
</div>


<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 md:ml-24 mt-10 px-6 md:px-24">
   
    <div className="text-center md:text-left">
        <p className="text-[#252B42] text-2xl font-bold">15K</p>
        <p className="text-[#252B42] text-sm">Happy Customers</p>
    </div>

    <div className="text-center md:text-left">
        <p className="text-[#252B42] text-2xl font-bold">150K</p>
        <p className="text-[#252B42] text-sm">Monthly Visitors</p>
    </div>

    <div className="text-center md:text-left">
        <p className="text-[#252B42] text-2xl font-bold">15</p>
        <p className="text-[#252B42] text-sm">Countries Worldwide</p>
    </div>

    <div className="text-center md:text-left">
        <p className="text-[#252B42] text-2xl font-bold">100+</p>
        <p className="text-[#252B42] text-sm">Top Partners</p>
    </div>
</div>

            </div>
            {/* video Section */}
            <div className="pt-12 pb-12 flex justify-center">
    <Image 
        src="/videocard.png" 
        alt="Video Card" 
        width={700} 
        height={400} 
        className="w-full max-w-[700px] h-auto"
    />
</div>

            {/* our team */}
            <div className="pb-12 pt-12">
    <h1 className="text-[#252B42] text-xl md:text-2xl font-bold text-center">Meet Our Team</h1>
    <p className="flex justify-center mt-2 text-[#252B42] text-sm text-center">
        Problems trying to resolve the conflict between the two major realms of <br/> classical physics Newtonian mechanics
    </p>
</div>

{/* Our team images */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
    {/* User 1 */}
    <div className="flex flex-col items-center">
        <Image src="/user1.jpg" alt="User 1" width={300} height={300} />
        <div className="mt-6 text-center">
            <p className="font-bold">Username</p>
            <p>Professional</p>
            <div className="flex justify-center gap-2 mt-2 text-[#00b0d7]">
                <Facebook className="fill-[#00b0d7]" />
                <Instagram />
                <Twitter className="fill-[#00b0d7]" />
            </div>
        </div>
    </div>

    {/* User 2 */}
    <div className="flex flex-col items-center">
        <Image src="/user2.png" alt="User 2" width={300} height={300} />
        <div className="mt-6 text-center">
            <p className="font-bold">Username</p>
            <p>Professional</p>
            <div className="flex justify-center gap-2 mt-2 text-[#00b0d7]">
                <Facebook className="fill-[#00b0d7]" />
                <Instagram />
                <Twitter className="fill-[#00b0d7]" />
            </div>
        </div>
    </div>

    {/* User 3 */}
    <div className="  flex flex-col items-center">
        <Image src="/user3.png" alt="User 3" width={300} height={300} />
        <div className="mt-6 text-center">
            <p className="font-bold">Username</p>
            <p>Professional</p>
            <div className="flex justify-center gap-2 mt-2 text-[#00b0d7]">
                <Facebook className="fill-[#00b0d7]" />
                <Instagram />
                <Twitter className="fill-[#00b0d7]" />
            </div>
        </div>

</div>

            </div>
            {/* logos Section */}
            <div className="pt-12 pb-12 md:w-full md:h-[500px] md:bg-gray-200">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#252B42] font-bold">
    Big Companies Are Here
</h1>
<p className="flex justify-center mt-4 sm:mt-6 md:mt-8 text-[#252B42] text-sm sm:text-base md:text-lg text-center">
    Problems trying to resolve the conflict between the two major realms of <br/> classical physics Newtonian mechanics
</p>


<div className="flex flex-col md:flex-row md:gap-10 gap-6 mt-20 md:ml-80">
    <Image src="/logo1.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo2.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo3.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo4.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo5.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
    <Image src="/logo6.png" alt="" width={70} height={70} className="mt-10 mx-auto md:mx-0" />
</div>

            </div>
            {/* last section */}
            <div className=" md:ml-0 w-full md:w-full h-[500px] bg-[#00b0d7] flex ">
                <div className="ml-10 md:ml-72 mt-40 text-white">
                    <p>WORK WITH US</p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-10">Now Lets&apos; Grow Yours</h1>
                    <p className="mt-10 ">We know how large objects will act,</p>
                    <p>but things on a small scale</p>
                    <Button variant={"destructive"} className="mt-6 font-bold">Read More</Button>
                </div>
                <Image src="/aboutpic2.png" alt="" width={500} height={300}
                className=" hidden md:block md:ml-72"/> 
            
            </div>
            
        </div>
        
    )
}