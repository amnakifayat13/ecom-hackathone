import { addItem, CartItem, loadCartFromLocalStorage, removeItem } from "../../../store/cartSlice";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

type Props = {
  items: CartItem[];
};

export default function CartSideBar({ items }: Props) {
  const dispatch = useDispatch();
  // Load the cart from localStorage when the component mounts
    useEffect(() => {
      dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
    }, [dispatch]);

  // Add item to cart
  const addCartHandler = (item: CartItem) => dispatch(addItem(item));

  // Remove item from cart
  const removeFromCartHandler = (id: string) => dispatch(removeItem({ id }));

  return (
    <div className="mt-6 mb-6 h-full">
      <h1 className="text-center font-bold text-lg mb-6">Your Cart</h1>
      
      {items.length === 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/cart.png"
            alt="cart"
            width={200}
            height={200}
            className="object-cover mx-auto"
          />
          <h1 className="mt-8 text-2xl font-semibold">Your cart is empty</h1>
        </div>
      )}

      {items.length > 0 && (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="pb-4 border-b-2 border-gray-300 border-opacity-60"
            >
              <div>
                <Image
                  src={item?.imageUrl}
                  alt={item?.name}
                  width={60}
                  height={60}
                  className="object-cover mb-4"
                />
              </div>
              <div>
                <h1 className="text-sm w-4/5 font-semibold truncate">{item?.name}</h1>
                <h1 className="text-base text-blue-950 font-bold">
                  ${(item?.price * item?.quantity).toFixed(2)}
                </h1>
                <h1 className="text-base font-bold mb-2">
                  Quantity: {item?.quantity}
                </h1>

                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => removeFromCartHandler(item.id)}
                    size={"sm"}
                    className="bg-green-700 text-white hover:text-green-700"
                  >
                    Remove
                  </Button>

                  {/* <Button
                    onClick={() => addCartHandler(item)}
                    size={"sm"}
                    className="text-green-700"
                  >
                    Add
                  </Button> */}
                </div>
              </div>
            </div>
          ))}

          <Link href="/cart">
            <SheetClose>
              <Button className="mt-6 mb-6 w-full bg-green-700 text-white hover:text-green-700">
                View All Cart
              </Button>
            </SheetClose>
          </Link>
        </div>
      )}
    </div>
  );
}
