 import Image from "next/image"
 export default function Section6(){
    return(
        <div className="pt-16 pb-16 ">
             <p className="flex justify-center text-xs md:text-lg text-blue-500">Practice Advice</p>
            <h1 className=" text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">Featured Posts</h1>
            <p className="flex justify-center text-xs md:text-lg text-[#252B42] mt-4">Problems trying to resolve the conflict between</p>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
           
            <div className="text-[#252B42] shadow-md md:ml-24 ">
                <Image src="/fp1.jpg" alt="fp" width={300} height={300}/>
                <div className="text-xs flex gap-4 mt-4 text-[#252B42]">
                    <span className="text-blue-500 ml-10">Google</span>
                    <span>Trending</span>
                    <span>New</span>
                </div>
                <h2 className="ml-10 font-semibold">Loudest a la  Madison #1</h2>
                <h2 className="ml-10 font-semibold">(L integral)</h2>
                <p className="text-sm ml-10"> We focus on ergonomics and meeting <br/> you where you work. it is only a <br/> keystroke away</p>
                <div className="flex gap-10">
                    <div className="flex ml-10 gap-6 ">
                    <Image src="/clock.png" alt="" width={10} height={10}/>
                    <p className="text-xs ">22 April 2024</p>
                    </div>
                    <div className="flex gap-6">
                    <Image src="/vector.png" alt="" width={10} height={10}/>
                    <p className="text-xs">10 Comments</p>
                    </div>
                   
                </div>
                <div className="flex gap-6 ml-10 mt-6">
                <p className="font-bold text-[#252B42] mb-2">Learn More</p>
                <Image src="/arrow.png" alt="" width={10} height={5}/>
                </div>

            </div>

            <div className="text-[#252B42] shadow-md md:ml-16">
                <Image src="/fp2.jpg" alt="fp" width={300} height={400} className="h-56"/>
                <div className="text-xs flex gap-4 mt-4 text-[#252B42]">
                    <span className="text-blue-500 ml-10">Google</span>
                    <span>Trending</span>
                    <span>New</span>
                </div>
                <h2 className="ml-10 font-semibold">Loudest a la  Madison #1</h2>
                <h2 className="ml-10 font-semibold">(L integral)</h2>
                <p className="text-sm ml-10"> We focus on ergonomics and meeting <br/> you where you work. it is only a <br/> keystroke away</p>
                <div className="flex gap-10">
                    <div className="flex ml-10 gap-6 ">
                    <Image src="/clock.png" alt="" width={10} height={10}/>
                    <p className="text-xs ">22 April 2024</p>
                    </div>
                    <div className="flex gap-6">
                    <Image src="/vector.png" alt="" width={10} height={10}/>
                    <p className="text-xs">10 Comments</p>
                    </div>
                   
                </div>
                <div className="flex gap-6 ml-10 mt-6">
                <p className="font-bold text-[#252B42] mb-2">Learn More</p>
                <Image src="/arrow.png" alt="" width={10} height={5}/>
                </div>

            </div>

            <div className="text-[#252B42] shadow-md">
                <Image src="/fp3.jpg" alt="fp" width={300} height={100} className="h-56"/>
                <div className="text-xs flex gap-4 mt-4 text-[#252B42]">
                    <span className="text-blue-500 ml-10">Google</span>
                    <span>Trending</span>
                    <span>New</span>
                </div>
                <h2 className="ml-10 font-semibold">Loudest a la  Madison #1</h2>
                <h2 className="ml-10 font-semibold">(L integral)</h2>
                <p className="text-sm ml-10"> We focus on ergonomics and meeting <br/> you where you work. it is only a <br/> keystroke away</p>
                <div className="flex gap-10">
                    <div className="flex ml-10 gap-6 ">
                    <Image src="/clock.png" alt="" width={10} height={10}/>
                    <p className="text-xs ">22 April 2024</p>
                    </div>
                    <div className="flex gap-6">
                    <Image src="/vector.png" alt="" width={10} height={10}/>
                    <p className="text-xs">10 Comments</p>
                    </div>
                   
                </div>
                <div className="flex gap-6 ml-10 mt-6">
                <p className="font-bold text-[#252B42] mb-2">Learn More</p>
                <Image src="/arrow.png" alt="" width={10} height={5}/>
                </div>

            </div>
            </div>

        </div>
    )
}