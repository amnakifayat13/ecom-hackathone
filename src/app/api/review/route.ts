import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

interface ReviewData {
  userName: string;
  comment: string;
  rating: number;
  product: string;
}

export async function POST(req: Request) {
  try {
    const { userName, comment, rating, product }: ReviewData = await req.json();

    const review = await client.create({
      _type: "review",
      userName,
      comment,
      rating,
      product: { _type: "reference", _ref: product },
    });

    return NextResponse.json({ message: "Review added!", review });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}


export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("product");

  if (!productId) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    const reviews = await client.fetch(
      `*[_type == "review" && product._ref == $productId] | order(_createdAt desc)`,
      { productId }
    );

    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching reviews", error }, { status: 500 });
  }
}

