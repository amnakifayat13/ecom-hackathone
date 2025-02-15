"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, LetterTextIcon, LocateIcon, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { loadCartFromLocalStorage } from "../../../../store/cartSlice";
import { useDispatch } from "react-redux";

export default function Contact() {
  const dispatch = useDispatch();

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
  }, [dispatch]);

  return (
    <div className="md:w-[1170px] md:mx-auto px-4">
      {/* Section 1: Contact Information */}
      <div className="w-full h-auto bg-white flex flex-col md:flex-row py-12">
        <div className="flex flex-col md:w-1/2 px-6 text-[#252B42] mt-10 md:mt-0">
          <p className="text-center md:text-left text-sm">CONTACT US</p>
          <h1 className="text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-6">
            Get in touch today!
          </h1>
          <p className="text-center md:text-left mt-6">We know how large objects will act,</p>
          <p className="text-center md:text-left">but things on a small scale</p>
          <p className="mt-6 text-center md:text-left font-bold">Phone: +451 215 215</p>
          <p className="mt-2 text-center md:text-left font-bold">Fax: +451 215 215</p>
          <div className="flex justify-center md:justify-start gap-4 text-[#00b0d7] mt-6">
            <Facebook className="fill-[#00b0d7]" />
            <Instagram />
            <Twitter className="fill-[#00b0d7]" />
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-6 md:mt-0 md:w-1/2">
          <Image
            src="/contactpic.png"
            alt="Contact"
            width={300}
            height={300}
            className="md:ml-16 md:mt-8 md:mr-60"
          />
        </div>
      </div>

      {/* Section 2: Visit Our Office */}
      <div className="pt-12 pb-12">
        <p className="text-[#252B42] text-sm flex justify-center md:mt-2 mt-24">VISIT OUR OFFICE</p>
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#252B42] md:mt-10">
          WE help small business
        </h1>
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#252B42] md:mt-4">
          With big ideas
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="shadow-md hover:bg-[#252B42] h-auto w-full flex flex-col items-center justify-center p-6">
            <Phone size={50} className="text-blue-500" />
            <p className="text-[#252B42] mt-2 text-sm text-center hover:text-white">
              We know how large objects will act <br /> but things on a small scale
            </p>
            <p className="text-[#252B42] font-bold mt-2 hover:text-white">Get Support</p>
            <Button className="text-blue-500 border border-blue-500 mt-4 rounded-2xl px-4 py-2">
              Submit Request
            </Button>
          </div>

          <div className="shadow-md hover:bg-[#252B42] hover:text-white h-auto w-full flex flex-col items-center justify-center p-6">
            <LocateIcon size={50} className="text-blue-500" />
            <p className="text-[#252B42] mt-2 text-sm text-center hover:text-white">
              We know how large objects will act <br /> but things on a small scale
            </p>
            <p className="text-[#252B42] font-bold mt-2 hover:text-white">Get Support</p>
            <Button className="text-blue-500 border border-blue-500 mt-4 rounded-2xl px-4 py-2">
              Submit Request
            </Button>
          </div>

          <div className="shadow-md hover:bg-[#252B42] h-auto w-full flex flex-col items-center justify-center p-6">
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

      {/* Section 3: Call to Action */}
      <div className="pb-10 pt-10 flex flex-col items-center">
        <Image src="/Arrow 2.png" alt="" width={50} height={50} className="mb-2" />
        <p className="text-sm text-center mt-2">WE CAN&apos;T WAIT TO MEET YOU</p>
        <h1 className="text-xl md:text-2xl font-bold text-center mt-2">Let&apos;s Talk</h1>
        <Button className="w-28 h-12 mt-4 bg-blue-500 text-white font-semibold">
          Try it free now
        </Button>
      </div>
    </div>
  );
}
