// schemas/product.js

export  const  bestSellingProduct= {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        description: 'Product image',
        
      },
      {
        name: 'title',
        title: 'Product Title',
        type: 'string',
        description: 'The name of the product',
        
      },
      {
        name: 'description',
        title: 'Product Description',
        type: 'text',
        description: 'Detailed description of the product',
        
      },
      {
        name: 'price',
        title: 'Product Price',
        type: 'number',
        description: 'The price of the product in your chosen currency',
       
      },
      {
        name: 'id',
        title: 'Id',
        type: 'slug',
        
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        description: 'Category the product belongs to',
      },
      
    ],
  };
  