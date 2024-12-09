import Image from "next/image";
import { Button } from "../ui/button";

export default function Section2() {
  return (
    <div className="pt-16 pb-16 bg-gray-100">
      <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">
        EDITOR&apos; PICK
      </h1>
      <p className="text-center text-xs md:text-lg text-[#252B42] mt-4">
        Problems trying to resolve the conflict between
      </p>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {/* MEN Section */}
        <div className="relative">
          <Image
            src="/ep1.png"
            alt="ep1"
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
          
        </div>

        {/* WOMEN Section */}
        <div className="relative">
          <Image
            src="/ep2.png"
            alt="ep2"
            width={160}
            height={290}
            className="object-cover rounded-lg"
          />
          <Button className="absolute w-24 md:w-32 top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-4 font-semibold">
            WOMEN
          </Button>
        </div>

        {/* ACCESSORIES Section */}
        <div>
        <div className="relative">
          <Image
            src="/ep3.png"
            alt="ep3"
            width={135}
            height={135}
            className="object-cover rounded-lg"
          />
          <Button className="absolute w-24 md:w-32 top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black py-1 text-xs font-semibold">
            ACCESSORIES
          </Button>
        </div>

        {/* KIDS Section */}
        <div className="relative mt-8">
          <Image
            src="/ep4.png"
            alt="ep4"
            width={135}
            height={135}
            className="object-cover rounded-lg"
          />
          <Button className="absolute w-24 md:w-32 top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black py-1 text-xs font-semibold">
            KIDS
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
