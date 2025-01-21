"use client"
import teams from "@/data/team";
import { ArrowBigRightDash, Facebook, FacebookIcon, Instagram, InstagramIcon, Linkedin, Twitter, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useEffect} from "react"
import { useDispatch } from "react-redux";
import { loadCartFromLocalStorage } from "../../../store/cartSlice";

export default function Team(){
    const dispatch = useDispatch();
    // Load the cart from localStorage when the component mounts
              useEffect(() => {
                dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
              }, [dispatch]);
    const category = "Team"; // Change this to the desired category
  const filteredteam = teams.filter(
    (team) => team.category === category
  );
    return(
        <div className="md:w-[1170px] mx-auto">
            {/* section1 */}
            <p className="flex justify-center mt-10">WHAT WE DO</p>
            <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold mt-6">Innovation tailored for you</h1>
            <div className="flex justify-center  gap-4 text-[#252B42] mt-6">
                    <span>Home</span>
                    <span><ArrowBigRightDash /></span>
                    <span className="text-slate-400">Shop</span>
                </div>
                {/* section2 */}
                <div className="flex gap-4  justify-center mt-10">
                    <div>
                        <Image src="/team1.png" alt="team1" width={400} height={400}/>
                    </div>
                    <div>
                        <div><Image src="/team2.png" alt="team2" width={200} height={200}/></div>
                        <div  className="mt-4"><Image src="/team4.png" alt="team3" width={200} height={200}/></div>
                    </div>

                    <div >
                        <div><Image src="/team3.png" alt="team4" width={200} height={200}/></div>
                        <div className="mt-4"><Image src="/team5.png" alt="team5" width={200} height={200}/></div>
                    </div>
                    
                </div>
                {/* user part */}
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold mt-20">Meet Our Team</h1>
                <div className=" md:ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 ">
                {filteredteam.map((team) => (
         <Link key={team.id} href={`/products/productDetails/${team.id}`}>
             <div className="flex flex-col items-center">
        <Image src={team.imageUrl} alt={team.name} width={300} height={300} />
        <div className="mt-6 text-center">
            <p className="font-bold">{team.name}</p>
            <p>{team.description}</p>
            <div className="flex justify-center gap-2 mt-2 text-[#00b0d7] mb-10">
                <Facebook className="fill-[#00b0d7]" />
                <Instagram />
                <Twitter className="fill-[#00b0d7]" />
                        </div>
                    </div>

            </div>
                                
            </Link>
            ))}

            </div>
            {/* last section */}
            <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold mt-20">Start Your 14 days free trial</h1>
            <p className="text-[#252B42] flex justify-center mt-6 text-xs md:text-sm">Met Minimum non desert Alamo est sit ciliquey dolor</p>
            <p className="text-[#252B42] flex justify-center text-xs md:text-sm">do met sent. RELIT official consequet</p>
            <div className="flex gap-4 justify-center mt-6">
                <FacebookIcon fill="blue" className="text-blue-700"/>
                <TwitterIcon fill="blue" className="text-blue-700"/>
                <InstagramIcon  className="text-blue-700"/>
                <Linkedin fill="blue" className="text-blue-700"/>
            </div>
        </div>
    )
}