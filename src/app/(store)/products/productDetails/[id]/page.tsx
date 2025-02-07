"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, loadCartFromLocalStorage, removeItem } from "../../../../../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../../../../store/wishlist"; 
import { client } from '../../../../../sanity/lib/client'; 
import { urlFor } from "@/sanity/lib/image"; 
import { checkStockInSanity } from "@/app/(store)/stock";
import { Heart } from "lucide-react";
import { RootState } from "../../../../../../store/store";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  stockQuantity: number;
}

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [flashProducts, setFlashProducts] = useState<Product[]>([]);  // State for flash products
  const [category, setCategory] = useState("Flash");
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const router = useParams();
  const id = router.id;

  // Fetch product data from Sanity
  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && _id == $id][0] {_id, title, description, price, productImage, slug, category, stockQuantity}`;
      const params = { id };
      const data = await client.fetch(query, params);
      setProduct(data);

      const result = await client.fetch('*[_type == "product" && category->name == $category]{_id, title, description, price, productImage, slug, stockQuantity, category->{name}}', { category });
      setProducts(result);

      if (data?.category?._ref) {
        const relatedQuery = `*[_type == "product" && category._ref == $categoryRef && _id != $id] {_id, title, productImage, price, slug, stockQuantity}`;
        const relatedData = await client.fetch(relatedQuery, { categoryRef: data.category._ref, id });
        setRelatedProducts(relatedData);
      }

      // Fetch Flash Products
      const flashQuery = `*[_type == "product" && category->name == "Flash"] {_id, title, description, price, productImage, slug, stockQuantity}`;
      const flashData = await client.fetch(flashQuery);
      setFlashProducts(flashData); // Set flash products
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);

  // Wishlist Add/Remove Function
  const toggleWishlist = (product: Product) => {
    const isWishlisted = wishlist.some((item) => item.id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product._id }));
    } else {
      dispatch(
        addToWishlist({
          id: product._id,
          name: product.title,
          price: product.price,
          imageUrl: product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png",
        })
      );
    }
  };

  // Add to Cart Handler
  const addToCartHandler = async (product: Product) => {
    const stockInSanity = await checkStockInSanity(product._id);
    if (stockInSanity > 0) {
      const cartItem: CartItem = {
        id: product._id,
        name: product.title,
        price: product.price,
        imageUrl: urlFor(product.productImage).url(),
        quantity: 1,
        category: product.title,
      };
      dispatch(addItem(cartItem));
    } else {
      alert("Sorry, this product is out of stock.");
    }
  };

  // Remove from Cart Handler
  const removeFromCartHandler = async (id: string) => {
    dispatch(removeItem({ id }));
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-16 min-h-auto md:w-[1170px] md:mx-auto">
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row text-[#252B42] gap-10 px-4 sm:px-8 lg:px-16 py-10">
        {/* Product Image */}
        <div className="relative flex justify-center md:w-1/2 mb-10 md:mb-0">
          <Image
            src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.png"}
            alt={product.title}
            width={400}
            height={400}
            className="w-full md:mt-60 max-w-[350px] sm:max-w-[300px] md:max-w-[500px] h-[430px] object-cover rounded-lg shadow-lg transition-all transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition">
            <button onClick={() => toggleWishlist(product)}>
              <Heart className={`w-6 h-6 mt-2 ${wishlist.some((item) => item.id === product._id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => addToCartHandler(product)}
              className="bg-black text-white px-6 py-3 text-sm w-full hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 px-6">
          <h1 className="text-3xl font-bold mt-4 md:mt-10 text-[#252B42]">{product.title}</h1>
          <p className="mt-4 text-base text-gray-700">{product.description}</p>

          <div className="mt-6">
            <p className="text-xl font-extrabold text-green-600">Price: ${product.price}</p>
            <p className="text-lg text-blue-700 mt-2">Available Stock: {product.stockQuantity}</p>
          </div>

          <div className="md:flex md:gap-2">
            <Button
              onClick={() => addToCartHandler(product)}
              size="sm"
              className="bg-yellow-600 text-white hover:bg-yellow-700 py-5 px-8 mt-6 rounded-lg font-bold text-lg"
            >
              Add to Cart
            </Button>

            <Button
              onClick={() => removeFromCartHandler(product._id)}
              size="sm"
              className="bg-yellow-600 text-white hover:bg-yellow-700 py-5 px-8 mt-6 rounded-lg md:ml-3 font-bold text-lg"
            >
              Remove from Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div>
        <div className="flex space-x-4 mt-10">
          <h2 className="text-green-500 mt-2 font-semibold md:ml-2 text-2xl">Related Item</h2>
        </div>
        <div className="ml-6 mr-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-20">
          {relatedProducts.length === 0 ? (
            <p>No related products found</p>
          ) : (
            relatedProducts.map((relatedItem: Product) => (
              <div key={relatedItem._id} className="relative bg-white shadow-md rounded-lg overflow-hidden group">
                <div className="relative w-full h-64 bg-gray-200">
                  <Image
                    src={relatedItem.productImage ? urlFor(relatedItem.productImage).url() : "/fallback-image.png"}
                    alt={relatedItem.title}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-4">
                  <Link href={`/products/productDetails/${relatedItem._id}`} className="group">
                    <p className="text-[#252B42] font-semibold mt-4 text-center">{relatedItem.title}</p>
                  </Link>

                  <p className="text-xs mt-2 text-[#252B42] text-center">{relatedItem.description}</p>

                  <div className="mt-2 text-center">
                    <span className="text-slate-400 text-sm font-semibold">${relatedItem.price}</span>
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-slate-400 text-sm font-semibold">Available Stock: {relatedItem.stockQuantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Flash Products Section */}
      <div className="mt-16">
        <div className="flex space-x-4 mt-10">
          <h2 className="text-red-500 mt-2 font-semibold md:ml-2 text-2xl">Flash Sale</h2>
        </div>
        <div className="ml-6 mr-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-20">
          {flashProducts.length === 0 ? (
            <p>No flash products available</p>
          ) : (
            flashProducts.map((flashItem: Product) => (
              <div key={flashItem._id} className="relative bg-white shadow-md rounded-lg overflow-hidden group">
                <div className="relative w-full h-64 bg-gray-200">
                  <Image
                    src={flashItem.productImage ? urlFor(flashItem.productImage).url() : "/fallback-image.png"}
                    alt={flashItem.title}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-4">
                  <Link href={`/products/productDetails/${flashItem._id}`} className="group">
                    <p className="text-[#252B42] font-semibold mt-4 text-center">{flashItem.title}</p>
                  </Link>

                  {/* <p className="text-xs mt-2 text-[#252B42] text-center">{flashItem.description}</p> */}

                  <div className="mt-2 text-center">
                    <span className="text-slate-400 text-sm font-semibold">${flashItem.price}</span>
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-slate-400 text-sm font-semibold">Available Stock: {flashItem.stockQuantity}</span>
                  </div>
                  
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition">
                    <button onClick={() => toggleWishlist(flashItem)}>
                      <Heart className={`w-6 h-6 mt-2 ${wishlist.some((item) => item.id === flashItem._id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
