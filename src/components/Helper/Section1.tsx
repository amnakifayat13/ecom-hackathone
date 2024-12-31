import Image from "next/image";
import { Button } from "../ui/button";

export default function Section1(){
    return(
        <div>

            <div className=" md:ml-0 w-full md:w-full h-[500px] bg-[#00b0d7] flex ">
                <div className="ml-10 md:ml-60 mt-40 text-white">
                    <p>SUMMER 2024</p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-10">NEW COLLECTION</h1>
                    <p className="mt-10 ">We know how large objects will act,</p>
                    <p>but things on a small scale</p>
                    <Button variant={"destructive"} className="mt-6 font-bold bg-green-600">SHOP NOW</Button>
                </div>
                <Image src="/section1img.jpg" alt="" width={400} height={400}
                className="w-[600px] hidden md:block"/> 
            
            </div>
        </div>
    )
}