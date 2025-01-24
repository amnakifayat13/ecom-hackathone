"use client"
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { SearchIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";  // Adjust the import for Sanity client
import { useRouter } from "next/navigation";  // Using next.js router to redirect to product detail page
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  title: string;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  price: number;
}

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState<string>("");  // State to store search term
  const [searchResults, setSearchResults] = useState<Product[]>([]);  // State to store search results
  const searchRef = useRef<HTMLDivElement | null>(null);  // Ref to detect clicks outside the search bar
  const router = useRouter();  // Router for redirecting to product detail page

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submit or keyup for search
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setSearchResults([]);  // If no search term, clear results
      return;
    }

    try {
      // Query to fetch products from Sanity based on search term (using title instead of slug)
      const query = `*[_type == "product" && title match $searchTerm]{_id, title, price, productImage}`;
      const params = { searchTerm: `*${searchTerm}*` };  // Use wildcard search
      const results = await client.fetch(query, params);

      setSearchResults(results);  // Set the search results
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  // Redirect to product details page when clicked
  const handleProductClick = (_id: string) => {
    router.push(`/products/productDetails/${_id}`);  // Use _id to navigate to product page
  };

  // Hide search results when clicked outside
  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setSearchResults([]);  // Hide search results when clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <SearchIcon size={26} cursor="pointer" />
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Product"
            className="block w-full bg-gray-300 px-6 py-2 rounded-lg outline-none"
          />
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div
            ref={searchRef}
            className="search-results bg-white shadow-xl rounded-lg mt-4 max-h-72 overflow-y-auto"
          >
            <h3 className="font-semibold text-lg py-3 px-5 border-b">Search Results:</h3>
            <ul className="p-4">
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}  // Use _id for product navigation
                  className="cursor-pointer hover:bg-gray-100 p-3 flex items-center border-b"
                >
                  <img
                    src={product.productImage?.asset?._ref ? urlFor(product.productImage).url() : '/fallback-image.png'}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4 rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-lg text-gray-800">{product.title}</h4>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show no results message if no products are found
        {searchTerm && searchResults.length === 0 && (
          <div className="no-results text-center mt-4 text-gray-600">
            <p>No products found for "{searchTerm}"</p>
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
