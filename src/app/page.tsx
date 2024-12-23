import Section1 from "@/components/Helper/Section1";
import Section2 from "@/components/Helper/section2";
import Section3 from "@/components/Helper/section3";
import Section4 from "@/components/Helper/section4";
import Section5 from "@/components/Helper/section5";
import Section6 from "@/components/Helper/section6"
import products from "@/data/products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:w-[1170px] md:mx-auto">
    <Section1/>
    <Section2/>
    <Section3 product={products}/>
    <Section4/>
    <Section5/>
    <Section6/>
    </div>
  );
}
