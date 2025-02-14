"use client";
import { Star } from "lucide-react";
import { useState, FormEvent } from "react";


interface ReviewFormProps {
  productId: string;
}

interface FormData {
  userName: string;
  comment: string;
  rating: number | null; // Initially null (no stars highlighted)
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    comment: "",
    rating: null, // No stars highlighted on page load
  });

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, product: productId }),
    });

    if (res.ok) {
      alert("Review Submitted!");
      setFormData({ userName: "", comment: "", rating: null }); // Reset to no stars selected
    } else {
      alert("Error submitting review!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg">
      <input
        type="text"
        name="userName"
        placeholder="Your Name"
        value={formData.userName}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <textarea
        name="comment"
        placeholder="Your Comment"
        value={formData.comment}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      {/* Star Rating System */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleStarClick(star)}
            className={`text-2xl ${formData.rating && formData.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
          >
            <Star />
          </button>
        ))}
      </div>

      <button type="submit" className="bg-yellow-600 text-white hover:bg-yellow-700 p-2 rounded">
        Submit
      </button>
    </form>
  );
}
