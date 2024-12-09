import Image from "next/image";

export default function Section6() {
  return (
    <div className="pt-16 pb-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center">
        <p className="text-xs md:text-lg text-blue-500">Practice Advice</p>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#252B42] font-bold">
          Featured Posts
        </h1>
        <p className="text-xs md:text-lg text-[#252B42] mt-4">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 lg:px-24 mt-10">
        {/* Post 1 */}
        <div className="text-[#252B42] shadow-md rounded-md overflow-hidden bg-white">
          <Image src="/fp1.jpg" alt="fp1" width={300} height={300} className="w-full h-56 object-cover" />
          <div className="p-6">
            <div className="text-xs flex gap-4 text-[#252B42]">
              <span className="text-blue-500">Google</span>
              <span>Trending</span>
              <span>New</span>
            </div>
            <h2 className="font-semibold mt-2">Loudest a la Madison #1</h2>
            <h2 className="font-semibold">(L integral)</h2>
            <p className="text-sm mt-4">
              We focus on ergonomics and meeting <br />
              you where you work. It is only a <br />
              keystroke away.
            </p>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <Image src="/clock.png" alt="clock" width={16} height={16} />
                <p className="text-xs">22 April 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/vector.png" alt="comments" width={16} height={16} />
                <p className="text-xs">10 Comments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-blue-500 font-bold cursor-pointer">
              <p>Learn More</p>
              <Image src="/arrow.png" alt="arrow" width={12} height={6} />
            </div>
          </div>
        </div>

        {/* Post 2 */}
        <div className="text-[#252B42] shadow-md rounded-md overflow-hidden bg-white">
          <Image src="/fp2.jpg" alt="fp2" width={300} height={400} className="w-full h-56 object-cover" />
          <div className="p-6">
            <div className="text-xs flex gap-4 text-[#252B42]">
              <span className="text-blue-500">Google</span>
              <span>Trending</span>
              <span>New</span>
            </div>
            <h2 className="font-semibold mt-2">Loudest a la Madison #1</h2>
            <h2 className="font-semibold">(L integral)</h2>
            <p className="text-sm mt-4">
              We focus on ergonomics and meeting <br />
              you where you work. It is only a <br />
              keystroke away.
            </p>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <Image src="/clock.png" alt="clock" width={16} height={16} />
                <p className="text-xs">22 April 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/vector.png" alt="comments" width={16} height={16} />
                <p className="text-xs">10 Comments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-blue-500 font-bold cursor-pointer">
              <p>Learn More</p>
              <Image src="/arrow.png" alt="arrow" width={12} height={6} />
            </div>
          </div>
        </div>

        {/* Post 3 */}
        <div className="text-[#252B42] shadow-md rounded-md overflow-hidden bg-white">
          <Image src="/fp3.jpg" alt="fp3" width={300} height={100} className="w-full h-56 object-cover" />
          <div className="p-6">
            <div className="text-xs flex gap-4 text-[#252B42]">
              <span className="text-blue-500">Google</span>
              <span>Trending</span>
              <span>New</span>
            </div>
            <h2 className="font-semibold mt-2">Loudest a la Madison #1</h2>
            <h2 className="font-semibold">(L integral)</h2>
            <p className="text-sm mt-4">
              We focus on ergonomics and meeting <br />
              you where you work. It is only a <br />
              keystroke away.
            </p>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <Image src="/clock.png" alt="clock" width={16} height={16} />
                <p className="text-xs">22 April 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/vector.png" alt="comments" width={16} height={16} />
                <p className="text-xs">10 Comments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-blue-500 font-bold cursor-pointer">
              <p>Learn More</p>
              <Image src="/arrow.png" alt="arrow" width={12} height={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
