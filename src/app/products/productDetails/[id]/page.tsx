"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowBigRightDash } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../../store/cartSlice";
import { client } from '../../../../sanity/lib/client'; // Assuming you have the sanity client setup
import { urlFor } from "@/sanity/lib/image"; // Your image URL function

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
 
}
// Define the Product type
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
}


export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [productK, setProductK] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("1e4cdbe9-672e-41dc-8f5d-ffb63b6f5049");
  const [kitchenWare, setKitchenWare] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
   const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const router = useParams();
  const id = router.id;

  // Fetch product data from Sanity
  useEffect(() => {
    const fetchProduct = async () => {
      // Fetch the current product details
      const query = `*[_type == "product" && _id == $id][0] {_id, title, description, price, image, slug, category}`;
      const params = { id };
      const data = await client.fetch(query, params);
      setProduct(data);

      const result = await client.fetch('*[_type == "product" && category._ref == $category]{_id, title, description, price, image, slug,category->{name}}' , {category:category});
      
      console.log(result);  // Log result to verify the structure of the fetched data
      setProducts(result);

      

      // If the product has a category, fetch related products based on the same category
      if (data?.category?._ref) {
        // Fetch related products
        const relatedQuery = `*[_type == "product" && category._ref == $categoryRef && _id != $id] {_id, title, image, price, slug,category}`;
        const relatedData = await client.fetch(relatedQuery, { categoryRef: data.category._ref, id });
        setRelatedProducts(relatedData);

        
      }
      
  }

    fetchProduct();
  }, [id]);


    

  // Handle case where product is not found
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Add to Cart Handler
    const addToCartHandler = (product: Product) => {
      const cartItem: CartItem = {
        id: product._id, 
        name: product.title, 
        price: product.price, 
        imageUrl: urlFor(product.image).url(), // Use the Sanity image URL helper
        quantity: 1, // Default quantity
        category:product.title
      };
      
      dispatch(addItem(cartItem));  // Dispatch to Redux to add item to cart
    };

  // Handle quantity change
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-16">
      <div className="md:bg-gray-200 w-full md:h-auto">
        {/* Breadcrumb Section */}
        <div className="flex ml-6 md:ml-60 gap-4 text-[#252B42] mt-6">
          <span>Home</span>
          <span><ArrowBigRightDash /></span>
          <span className="text-slate-400">Shop</span>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row md:ml-60 text-[#252B42] gap-10">
          {/* Product Image */}
          <div className="relative flex justify-center md:w-1/2">
            <Image
              src={urlFor(product.image).url()}
              alt={product.title}
              width={300}
              height={300}
              className="mt-10 w-full md:w-72 h-auto bg-slate-300"
            />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => addToCartHandler(product)} className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="md:w-1/2 mb-8 md:ml-20 px-6">
            <h1 className="text-2xl font-bold mt-10">{product.title}</h1>
            <p className="text-lg mt-4">Price: ${product.price}</p>
            <p className="mt-4">{product.description}</p>

            {/* Quantity Selector and Action Buttons */}
            <div className="flex items-center mt-10">
              <button onClick={decrementQuantity} className="w-8 h-8 bg-gray-200 text-gray-700 font-bold shadow hover:bg-green-500 hover:text-white">
                -
              </button>
              <div className="flex justify-center items-center w-20 h-8 bg-gray-100 text-gray-800 font-semibold rounded-md border border-gray-300 mx-4">
                {quantity}
              </div>
              <button onClick={incrementQuantity} className="w-8 h-8 bg-gray-200 text-gray-700 font-bold shadow hover:bg-green-500 hover:text-white">
                +
              </button>

              <Button variant={"destructive"} className="ml-4">Buy Now</Button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
    {/* Title Section */}
    <div className="flex space-x-4 mt-10">
        <h2 className="text-green-500 mt-2 font-semibold md:ml-24 text-2xl">Related Item</h2>
    </div>

    {/* Product Grid Section */}
    <div>
        <div className="ml-6 md:ml-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-20">
            {relatedProducts.length===0?(
              <p>No related products found</p>
            ) :(
              relatedProducts.map((relatedItem:any)=> (
                
                     <div key={relatedItem._id} className="relative">
                
                    {/* Product Image */}
                    <div className="relative">
                        <Image src={urlFor(relatedItem.image).url()}
                         alt={relatedItem.title}
                          width={200}
                           height={200} className="w-full h-auto"/>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => {
                      addToCartHandler(relatedItem); // Pass product to handler
                    }}
               className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black">
                Add to Cart
              </button>
            </div>
                    </div>
                    
                    <Link  href={`/products/productDetails/${relatedItem._id}`} className="group">
                    {/* Product Name */}
                    <p className="text-[#252B42] font-semibold mt-4 text-center">{relatedItem.title}</p>
                    </Link>
                    
                    {/* Product Description */}
                    <p className="text-xs mt-2 text-[#252B42] text-center">{relatedItem.description}</p>
                    
                    {/* Product Price */}
                    <div className="mt-2 text-center">
                        <span className="text-slate-400 text-sm font-semibold">${relatedItem.price}</span>
                    </div>

                    {/* Product Color Options */}
                    <div className="flex gap-2 justify-center mt-2 mb-6">
                        <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
                        <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
                        <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
                        <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
                    </div>
                    </div>
                
            )))}
        </div>
    </div>
</div>

      </div>

      {/* second part of the page */}
      <div className="mt-10 flex gap-6 md:gap-24 text-[#252B42] text-sm ">
        <span className="md:ml-72 ">description</span>
        <span>Additional Information </span>
        <span>Reveiws(0)</span>
      </div>
      <div className="md:w-[800px] md:h-[1px] md:bg-slate-500 mt-10 md:ml-24"></div>
    
    <div className="flex flex-wrap mt-10  gap-6">
        <div className="relative">
            <Image src="/kw.png" alt="kw" width={300} height={400} className="h-[500px]"/>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button 
              onClick={() => {
                      addToCartHandler(product); // Pass product to handler
                    }}className="bg-black text-white px-4 py-2 text-sm w-full hover:bg-black">
                Add to Cart
              </button>
            </div>
        </div>
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-4">
    <h2 className="text-[#252B42] text-xl sm:text-2xl font-semibold">The quick fox jumps over</h2>
    <p className="text-[#252B42] text-sm sm:text-base mt-3">
        Lorem Ipsum is simply dummy text of the  typesetting<br/> industry. Lorem Ipsum has been the industry&apos;s<br/> standard dummy text ever since the 1500s, when<br/> an unknown printer took a galley of type and <br/>scrambled it to make a type specimen book.
    </p>
    <p className="text-[#252B42] text-sm sm:text-base mt-3">
        Lorem Ipsum is simply dummy text of the  typesetting<br/> industry. Lorem Ipsum has been the industry&apos;s<br/> standard dummy text ever since the 1500s, when<br/> an unknown printer took a galley of type and <br/>scrambled it to make a type specimen book.
    </p>
    <p className="text-[#252B42] text-sm sm:text-base mt-3">
        Lorem Ipsum is simply dummy text of the  typesetting<br/> industry. Lorem Ipsum has been the industry&apos;s<br/> standard dummy text ever since the 1500s, when<br/> an unknown printer took a galley of type and <br/>scrambled it to make a type specimen book.
    </p>
    
</div>

        <div>
            <h2 className="text-[#252B42] md:text-xl text-sm font-semibold ml-2  mt-2">The quick fox jumps over</h2>
            <ul className="text-[#252B42]  text-xs md:text-md mt-6">
                <li className="mt-6"> &rarr; The quick fox jumps over </li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
            </ul>
            <h2 className="text-[#252B42] md:text-xl text-sm font-semibold ml-2 -20 mt-6">The quick fox jumps over</h2>
            <ul className="text-[#252B42]   text-xs md:text-md mt-6">
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                <li className="mt-6">&rarr;  The quick fox jumps over</li>
                </ul>
        </div>

        
    </div>
    <div className="md:bg-gray-200 md:w-full md:h-[1300px] mt-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  pt-10 ml-4 md:ml-24 ">Best Selling Products</h1>
        <div className="md:w-[800px] md:h-[1px]  md:bg-slate-500 mt-10 md:ml-24"></div>
                <div className="ml-4 md:ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 ">
                {products.map((product) => (
        
              <div key={product._id} className="relative">
                    <div className="relative">
                        <Image src={urlFor(product.image).url()} alt={product.title} width={200} height={200}/>
                    <div className="absolute bottom-0 left-0 right-0  opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button 
              onClick={() => {
                addToCartHandler(product); // Pass product to handler
              }} 
              className="bg-black text-white px-4 py-2 text-sm w-[200px] hover:bg-black">
                Add to Cart
              </button>
            </div>
                    </div>
                    <Link href={`/products/productDetails/${product._id}`}>
                    <p className="text-[#252B42] font-semibold mt-4 ml-10">{product.title}</p></Link>
                    <p className=" text-xs mt-2 text-[#252B42] ml-4">{product.description}</p>
                    <div className="mt-2">
                        <span className="text-slate-400 text-sm ml-10 font-semibold">$16.40</span>
                        <span className="text-green-700 text-sm ml-2 font-semibold">${product.price}</span>
                    </div>
                    <div className="flex gap-2 ml-10 mt-2 mb-20" >
                    <div className="w-[10px] h-[10px] rounded-full bg-blue-500"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-green-700"></div>
                    <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
                    
                    </div>
                    </div>
                    
                ))}
                     {/* logo setion */}
                     <div className="flex flex-col md:flex-row md:gap-10 mt-10 md:ml-40 gap-6 px-4 sm:px-6 md:px-12">
    <Image src="/logo1.png" alt="Logo 1" width={70} height={70} className="mt-4 mx-auto md:mx-0"/>
    <Image src="/logo2.png" alt="Logo 2" width={70} height={70} className="mt-4 mx-auto md:mx-0"/>
    <Image src="/logo3.png" alt="Logo 3" width={70} height={70} className="mt-4 mx-auto md:mx-0"/>
    <Image src="/logo4.png" alt="Logo 4" width={70} height={70} className="mt-4 mx-auto md:mx-0"/>
    <Image src="/logo5.png" alt="Logo 5" width={70} height={70} className="mt-4 mx-auto md:mx-0"/>
    <Image src="/logo6.png" alt="Logo 6" width={70} height={70} className="mt-4 mx-auto md:mx-0"/>
</div>



                </div>
                
            
                 
            </div>
      </div>
    
  );
}
