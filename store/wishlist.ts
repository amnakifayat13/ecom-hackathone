import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the WishlistItem type
interface WishlistItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

// Load the wishlist from localStorage on initial load
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
    if (typeof window === "undefined") return []; // Prevent access on the server
  
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  };

const initialStateWithLocalStorage = {
  wishlistItems: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialStateWithLocalStorage,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const itemExists = state.wishlistItems.some(item => item.id === action.payload.id);
      if (!itemExists) {
        state.wishlistItems.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems)); // Save to localStorage
      }
    },
    removeFromWishlist: (state, action: PayloadAction<{ id: string }>) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems)); // Save to localStorage
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
