import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react";
export default function About(){
    return(
        <div>
            <div className=" md:ml-0 w-full md:w-full h-[500px] bg-white flex ">
                <div className="ml-10 md:ml-72 mt-40 text-[#252B42]">
                    <p>ABOUT COMPANY</p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-10">ABOUT US</h1>
                    <p className="mt-10 ">We know how large objects will act,</p>
                    <p>but things on a small scale</p>
                    <Button variant={"destructive"} className="mt-6 font-bold text-white">Get Quotes Now</Button>
                </div >
                <div className="w-40 h-40 rounded-full"></div>
                <div className="image-container ">
                    
                <Image src="/aboutpic.png" alt="" width={300} height={300}
                className=" hidden md:block md:ml-48 md:mt-24 mt-24"/> 
            
                </div>
            </div>
            {/* section 2 */}

            <div className="pt-12 pb-12">
                <p className="text-red-500 text-sm ml-4 md:ml-60">Problems Trying</p>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <p className="mt-10 text-[#252B42] text-sm font-bold md:ml-60 ml-2">Met minim Mollie non desert <br/>Alamo est sit cliquery dolor do<br/>met sent</p>
                    </div>
                    <div>
                        <p className="mt-10 text-[#252B42] text-sm">Problems trying to resolve the conflict between the two major realms of <br/> classical physics Newtonian mechanincs </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:ml-24 mt-20 ml-10">
                    <div>
                        <p className="text-[#252B42] text-2xl font-bold ml-6">15K</p>
                        <p className="text-[#252B42] text-sm">Happy Customers</p>
                    </div>

                    <div>
                        <p className="text-[#252B42] text-2xl font-bold ml-4">150K</p>
                        <p className="text-[#252B42] text-sm">Monthly Visitors</p>
                    </div>

                    <div>
                        <p className="text-[#252B42] text-2xl font-bold ml-10">15</p>
                        <p className="text-[#252B42] text-sm">Countries Worldwide</p>
                    </div>

                    <div>
                        <p className="text-[#252B42] text-2xl font-bold ml-4">100+</p>
                        <p className="text-[#252B42] text-sm">Top Partners</p>
                    </div>
                </div>

            </div>
            {/* video Section */}
            <div className="pt-12 pb-12">
                <Image src="/video card.png" alt="" width={300} height={300} className="w-[700px] h-[400px] md:ml-72 ml-2"/>
            </div>
            {/* our team */}
            <div className="pb-12 pt-12">
                <h1 className="text-[#252B42] text-xl md:2xl font-bold text-center">Meet Our Team</h1>
                <p className=" flex justify-center mt-2 text-[#252B42] text-sm">Problems trying to resolve the conflict between the two major realms of <br/> classical physics Newtonian mechanincs </p>
            </div>
            {/* our team images */}
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:ml-32 ml-6">
                    <Image src="/user1.jpg" alt="" width={300} height={300}/>
                    <div className="ml-28 mt-6">
                    <p className="font-bold">username</p>
                    <p>Professional </p>
                    <div className="flex gap-2 text-[#00b0d7] ">
            <Facebook  className="fill-[#00b0d7]"/>
            <Instagram />
            <Twitter className="fill-[#00b0d7]"/>
            </div>
                    </div>
                    
                </div>
                <div>
                    

                    <div className="md:ml-16 ml-6">
                    <Image src="/user2.png" alt="" width={300} height={300}/>
                    <div className="ml-28 mt-6">
                    <p className="font-bold">username</p>
                    <p>Professional </p>
                    <div className="flex gap-2 text-[#00b0d7] ">
            <Facebook  className="fill-[#00b0d7]"/>
            <Instagram />
            <Twitter className="fill-[#00b0d7]"/>
            </div>
                    </div>
                    </div>

                   
                    
                </div>
                <div>
                    <Image src="/user3.png" alt="" width={300} height={300}/>
                    <div className="ml-28 mt-6">
                    <p className="font-bold">username</p>
                    <p>Professional </p>
                    <div className="flex gap-2 text-[#00b0d7] ">
            <Facebook  className="fill-[#00b0d7]"/>
            <Instagram />
            <Twitter className="fill-[#00b0d7]"/>
            </div>
                    </div>
                    </div>
            </div>
            {/* logos Section */}
            <div className="pt-12 pb-12 md:w-full md:h-[500px] md:bg-gray-200">
                <h1 className=" text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">Big Companies Are Here</h1>
                <p className=" flex justify-center mt-10 text-[#252B42] text-sm">Problems trying to resolve the conflict between the two major realms of <br/> classical physics Newtonian mechanincs </p>
                <div className="flex flex-col md:flex-row md:gap-10 mt-20 md:ml-40 gap-6">
                <Image src="/logo1.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo2.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo3.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo4.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo5.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
                <Image src="/logo6.png" alt="" width={70} height={70} className="mt-10 ml-10"/>
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