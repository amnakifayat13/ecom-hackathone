import Image from "next/image";
import { Button } from "../ui/button";

export default function Section4(){
    return(
        <div className=" pt-6">
            <div className="md:w-full md:h-[709px] bg-[#23856d] flex gap-24">
                {/* left side */}
                <div className="text-white md:ml-72 md:mt-72 ml-10 mt-10 h-[400px]">
                    <p>SUMMER 2024</p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-10">Vita Classic </h1>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-6"> Product</h1>
                    <p className="mt-10 ">We know how large objects will act,</p>
                    <p>but things on a small scale</p>
                    <div className="flex ">
                        <p className="mt-7 font-bold">$16.48</p>
                        <Button variant={"destructive"} className="mt-6 font-bold ml-4 bg-green-600">ADD TO CART</Button>
                    </div>
                </div>
                {/* right side */}
                <div>
                    <Image src="/pic1.png" alt="" width={443} height={685} className="mt-[114px] ml-20 hidden md:block"/>
                </div>
            </div>
        </div>
    )
}