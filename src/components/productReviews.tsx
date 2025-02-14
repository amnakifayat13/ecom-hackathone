import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface ProductReviewsProps {
  productId: string;
  newReview?: Review; // Accepts new review as a prop
}

interface Review {
  _id: string;
  userName: string;
  comment: string;
  rating: number;
}

export default function ProductReviews({ productId, newReview }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews when the productId changes
  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`/api/review?product=${productId}`);
      const data: { reviews: Review[] } = await res.json();
      setReviews(data.reviews);
    }
    fetchReviews();
  }, [productId]); // Re-run when productId changes

  // Update reviews immediately when a new review is added
  useEffect(() => {
    if (newReview) {
      setReviews((prevReviews) => [newReview, ...prevReviews]); // Prepend new review to the list
    }
  }, [newReview]); // Only run when newReview prop changes

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold">User Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border p-2 mt-2">
            <p className="flex items-center gap-2">
              <strong>{review.userName}</strong>
              <span className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? "text-yellow-500" : "text-gray-400"}
                  />
                ))}
              </span>
            </p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
