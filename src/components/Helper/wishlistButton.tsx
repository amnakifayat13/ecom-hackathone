"use client";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { RootState } from "../../../store/store";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { addToWishlist, removeFromWishlist } from "../../../store/wishlist";
import { useEffect } from "react";
import Link from "next/link";

export default function WishlistButton() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);

  // Load wishlist items from localStorage when the component mounts
  useEffect(() => {
    // Dispatch action to load wishlist from localStorage (if needed)
  }, [dispatch]);

  // Count the total number of items in the wishlist
  const totalWishlistItems = wishlistItems.length;

  // Toggle wishlist functionality for adding/removing items
  const toggleWishlist = (product: any) => {
    const isWishlisted = wishlistItems.some((item) => item.id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product._id }));
    } else {
      dispatch(
        addToWishlist({
          id: product._id,
          name: product.title,
          price: product.price,
          imageUrl: product.productImage ? product.productImage.url() : "/fallback-image.png",
        })
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-center flex items-center justify-center flex-col text-xs text-white rounded-full hover:text-black">
            {totalWishlistItems}
          </span>
          <Heart
            size={26}
            cursor={"pointer"}
            className="text-gray-500 hover:text-red-500"
          />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto h-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Your Wishlist</h2>
          <div className="mt-4">
            {wishlistItems.length === 0 ? (
              <p>Your wishlist is empty</p>
            ) : (
              wishlistItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <Link href={`/products/productDetails/${item.id}`} passHref>
                      <p className="text-sm font-semibold hover:underline text-blue-500">
                        {item.name}
                      </p>
                    </Link>
                  </div>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
