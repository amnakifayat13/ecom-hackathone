export default {
    name: "review",
    type: "document",
    title: "Reviews",
    fields: [
      {
        name: "userName",
        type: "string",
        title: "User Name",
      },
      {
        name: "comment",
        type: "text",
        title: "Comment",
      },
      {
        name: "rating",
        type: "number",
        title: "Rating",
      },
      {
        name: "product",
        type: "reference",
        to: [{ type: "product" }],
        title: "Product",
      },
      {
        name: "image",
        type: "image",
        title: "Review Image",
        options: {
          hotspot: true, // Enables the ability to crop the image
        },
      },
    ],
  };
  