import bcrypt from 'bcryptjs';
export const productList = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
    products: [
      {
        name: 'Nike Slim Shirt',
        category: 'Shirts',
        image: 'images/p1.jpg',
        price: 120,
        brand: 'Nike',
        rating: 3.5,
        numReviews: 10,
        description: 'high quality product',
        countInStock: 0,
      },
      {
        name: 'Adidas Fit Shirt',
        category: 'Shirts',
        image: 'images/p2.jpg',
        price: 100,
        brand: 'Adidas',
        rating: 2.0,
        numReviews: 10,
        description: 'high quality product',
        countInStock: 10,
      },
      {
        name: 'Lacoste Free Shirt',
        category: 'Shirts',
        image: 'images/p3.jpg',
        price: 220,
        brand: 'Lacoste',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
        countInStock: 10,
      },
      {
        name: 'Nike Slim Pant',
        category: 'Pants',
        image: 'images/p4.jpg',
        price: 78,
        brand: 'Nike',
        rating: 1.5,
        numReviews: 14,
        description: 'high quality product',
        countInStock: 20,
      },
      {
        name: 'Puma Slim Pant',
        category: 'Pants',
        image: 'images/p5.jpg',
        price: 65,
        brand: 'Puma',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
        countInStock: 20,
      },
      {
        name: 'Adidas Fit Pant',
        category: 'Pants',
        image: 'images/p6.jpg',
        price: 139,
        brand: 'Adidas',
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
        countInStock: 10,
      },
    ],
  };

  export const items = [
    { label: "Shirt", value: 1 },
    { label: "Pant", value: 2 }
  ];

  export const sortList = [
    { label: "Highest", value: 1 },
    { label: "Newest", value: 2 },
    { label: "Lowest", value: 3 }
  ];
