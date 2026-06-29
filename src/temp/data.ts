export const tempData = () => {
 const filterOptions = [
    { id: 1, title: "All Menu" },
    { id: 2, title: "Popular items" },
    { id: 3, title: "Bakery" },
    { id: 4, title: "Snacks" },
  ];
   const menuData = [
    { id: 1, title: "Buff Momo", price: "Rs. 180", category: "Popular items", },
    { id: 2, title: "Veg Momo", price: "Rs. 150", category: "Popular items", },
    { id: 3, title: "Chana Murai", price: "Rs. 80", category: "Snacks", },
    { id: 4, title: "Sel Roti", price: "Rs. 60", category: "Bakery", },
    { id: 5, title: "Samosa", price: "Rs. 30", category: "Snacks", },
    { id: 6, title: "Aloo Paratha", price: "Rs. 120", category: "All Menu", },
    { id: 7, title: "Makai Sadeko", price: "Rs. 70", category: "Snacks", },
    { id: 8, title: "Yomari", price: "Rs. 90", category: "Bakery", },
    { id: 9, title: "Chatamari", price: "Rs. 160", category: "Popular items", },
    { id: 10, title: "Dhido", price: "Rs. 200", category: "All Menu", },
  ];

  return { filterOptions, menuData };
};