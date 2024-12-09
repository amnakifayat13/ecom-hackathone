import Image from "next/image";
import { Button } from "../ui/button";

export default function Section5() {
  return (
    <div className="pb-16">
      <div className="flex flex-wrap justify-center items-center gap-8">
        {/* Left Side */}
        <div className="flex justify-center">
          <Image
            src="/pic2.png"
            alt="pic2"
            width={525}
            height={574}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="text-[#252B42] flex flex-col items-center md:items-start md:ml-8">
          <p className="text-center md:text-left text-sm md:text-base lg:text-lg">SUMMER 2024</p>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4 text-center md:text-left">
            Part of the Neural
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 text-center md:text-left">
            Universe
          </h1>
          <p className="mt-6 text-sm md:text-base lg:text-lg text-center md:text-left">
            We know how large objects will act,
          </p>
          <p className="text-sm md:text-base lg:text-lg text-center md:text-left">
            but things on a small scale
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <Button
              variant={"destructive"}
              className="font-bold text-white rounded px-6 py-2"
            >
              BUY NOW
            </Button>
            <Button className="font-bold text-green-700 border border-green-700 rounded px-6 py-2">
              READ MORE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
