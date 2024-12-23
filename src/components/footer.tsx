import React from "react";
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="md:w-[1170px] md:mx-auto pt-6 pb-6">
        <div className="h-[12vh]  bg-white shadow-md">
    <div className="flex justify-between w-[95%] md:w-4/5 mx-aotu h-full">
    {/* logo */}
    <Link href="/">
    <button className="ml-4 md:ml-24 text-xl sm:2xl md:3xl xl:4xl font-bold text-[#252B42] mt-4">Bandage</button>

    </Link>
    <div className="flex gap-2 text-[#00b0d7] mt-4">
        <Facebook  className="fill-[#00b0d7]"/>
        <Instagram />
        <Twitter className="fill-[#00b0d7]"/>
    </div>
    
    </div>
   
  
    </div>
       
    
    


    <footer className="bg-gray-100 text-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold">Company Info</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">We are Hiring</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Disclaimer</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold">Features</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="#" className="hover:underline">Business Marketing</a></li>
              <li><a href="#" className="hover:underline">User Analytics</a></li>
              <li><a href="#" className="hover:underline">Live Chat</a></li>
              <li><a href="#" className="hover:underline">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="#" className="hover:underline">iOS & Android</a></li>
              <li><a href="#" className="hover:underline">Watch a Demo</a></li>
              <li><a href="#" className="hover:underline">Customers</a></li>
              <li><a href="#" className="hover:underline">API</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold">Get In Touch</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Your Email"
                className=" w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Subscribe
              </button>
              <p className="text-sm mt-2 text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm">
            Made With Love by Finland | All Rights Reserved © 2024
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
  