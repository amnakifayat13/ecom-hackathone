import Section1 from "@/components/Helper/Section1";
import Section2 from "@/components/Helper/section2";
import Section3 from "@/components/Helper/section3";
import Section4 from "@/components/Helper/section4";
import Section5 from "@/components/Helper/section5";
import Section6 from "@/components/Helper/section6";
import ReviewForm from "@/components/reviews";
import { Suspense } from "react";

 export default function Home() {
  return (
    <div className="md:w-[1170px] md:mx-auto">
      <Suspense fallback={<div>Loding...</div>}><Section1/></Suspense>
      <Suspense fallback={<div>Loding...</div>}><Section2/></Suspense>
      <Suspense fallback={<div>Loding...</div>}><Section3/></Suspense>
      <Suspense fallback={<div>Loding...</div>}><Section4/></Suspense>
      <Suspense fallback={<div>Loding...</div>}><Section5/></Suspense>
      <Suspense fallback={<div>Loding...</div>}><Section6/></Suspense>
     
    </div>
  );
}
