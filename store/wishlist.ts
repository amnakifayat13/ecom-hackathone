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

// Load wishlist from localStorage safely
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

const initialState: WishlistState = {
  wishlistItems: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const itemExists = state.wishlistItems.some(item => item.id === action.payload.id);
      if (!itemExists) {
        state.wishlistItems.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<{ id: string }>) => {
      if (!action.payload?.id) {
        console.error("Invalid removeFromWishlist action payload:", action.payload);
        return;
      }
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
