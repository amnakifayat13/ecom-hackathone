import Image from "next/image"
import { Button } from "../ui/button"
export default function Section2(){
    return(
        <div className="pt-16 pb-16 bg-gray-100">
            <h1 className=" text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">EDITOR&apos; PICK</h1>
            <p className="flex justify-center text-xs md:text-lg text-[#252B42] mt-4">Problems trying to resolve the conflict between</p>

            <div className="flex flex-col   md:flex-row  ml-24 mt-10">
                <div className="relative ">
                    <Image src="/ep1.png" alt="ep1" width={300} height={300}
                    className="md:ml-60  object-cover "/>
                    <Button className="absolute w-32 top-[260px] left-80 -translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-4 font-semibold  hidden md:block">MEN</Button>
                </div>
                <div className="relative ">
                    <Image src="/ep2.png" alt="ep1" width={100} height={100} 
                    className=" w-40 h-72 ml-10 mt-4 md:mt-0"/>
                    <Button className="absolute w-32 top-[260px] left-[110px] -translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-4 font-semibold ">WOMEN</Button>
                </div>
                <div className="relative ">
                    <div className="ml-10 mt-4 md:mt-0">
                    <Image src="/ep3.png" alt="ep1" width={135} height={135}
                    />
                     <Button className="absolute w-32 h-6 text-xs top-[95px] left-[110px] -translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-4 font-semibold ">ACCESSORIES</Button>
                    </div>
                    <div className="ml-10 mt-4 relative" >
                    <Image src="/ep4.png" alt="ep1" width={135} height={135}/>
                    <Button className="absolute w-32 h-6 text-xs top-[95px] left-[68px] -translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-4 font-semibold ">KIDS</Button>
                    </div>
                </div>
            </div>

        </div>

    )
}