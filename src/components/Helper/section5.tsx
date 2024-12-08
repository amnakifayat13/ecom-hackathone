import Image from "next/image"
import { Button } from "../ui/button"

export default function Section5 (){
    return(
        <div className="pb-16">
            <div className="flex ">
                {/* left side */}
                <div>
                    <Image src="/pic2.png" alt="pic2" width={525} height={574} className="ml-24"/>
                </div>
                {/* right side */}
                <div className="text-[#252B42] md:ml-24 md:mt-40  mt-40 h-[400px]">
                    <p>SUMMER 2024</p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-10">Part of the Neural </h1>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mt-6"> Universe</h1>
                    <p className="mt-10 ">We know how large objects will act,</p>
                    <p>but things on a small scale</p>
                    <div className="flex ">
                    <Button variant={"destructive"} className="mt-6 font-bold ml-4 text-white  rounded">BUY NOW</Button>
                        <Button className="mt-6 font-bold ml-4 text-green-700 border border-green-700 rounded">READ MORE</Button>
                    </div>
            </div>

        </div>
        </div>
    )
}