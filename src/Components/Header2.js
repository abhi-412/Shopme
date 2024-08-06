import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';


const productCategories = [
  {
    name: 'Electronics',
    image: '/assets/electronics-cat.jpg',
    subcategories: [
      {
        name: 'Mobile Phones',
        subcategories: [
          'Smartphones',
          'Feature Phones',
          'Refurbished Phones',
          'Phone Accessories',
          'Mobile Phone Parts',
        ],
      },
      {
        name: 'Laptops',
        subcategories: [
          'Gaming Laptops',
          'Business Laptops',
          '2-in-1 Laptops',
          'MacBooks',
          'Laptop Accessories',
        ],
      },
      {
        name: 'Tablets',
        subcategories: [
          'Android Tablets',
          'iPads',
          'Windows Tablets',
          'Tablet Accessories',
          'Kids Tablets',
        ],
      },
      {
        name: 'Cameras',
        subcategories: [
          'DSLR Cameras',
          'Mirrorless Cameras',
          'Point & Shoot Cameras',
          'Action Cameras',
          'Camera Accessories',
        ],
      },
      {
        name: 'Televisions',
        subcategories: [
          'LED TVs',
          'OLED TVs',
          'QLED TVs',
          'Smart TVs',
          'TV Accessories',
        ],
      },
      {
        name: 'Audio',
        subcategories: [
          'Headphones',
          'Earbuds',
          'Speakers',
          'Soundbars',
          'Home Theater Systems',
        ],
      },
      {
        name: 'Wearables',
        subcategories: [
          'Smartwatches',
          'Fitness Trackers',
          'VR Headsets',
          'Wearable Accessories',
          'Smart Glasses',
        ],
      },
      {
        name: 'Gaming',
        subcategories: [
          'Gaming Consoles',
          'Gaming Laptops',
          'Gaming Accessories',
          'VR Gaming',
          'PC Games',
        ],
      },
      {
        name: 'Home Appliances',
        subcategories: [
          'Refrigerators',
          'Washing Machines',
          'Microwaves',
          'Air Conditioners',
          'Vacuum Cleaners',
        ],
      },
      {
        name: 'Power Banks',
        subcategories: [
          'Portable Chargers',
          'Solar Power Banks',
          'Wireless Power Banks',
          'Power Bank Cases',
          'High Capacity Power Banks',
        ],
      },
    ],
  },
  {
    name: 'Fashion',
    image: '/assets/fashion-cat.jpg',
    subcategories: [
      {
        name: 'Men\'s Clothing',
        subcategories: [
          'Shirts',
          'T-Shirts',
          'Jeans',
          'Jackets',
          'Suits',
        ],
      },
      {
        name: 'Women\'s Clothing',
        subcategories: [
          'Dresses',
          'Tops',
          'Skirts',
          'Pants',
          'Jackets',
        ],
      },
      {
        name: 'Footwear',
        subcategories: [
          'Men\'s Shoes',
          'Women\'s Shoes',
          'Kids\' Shoes',
          'Sports Shoes',
          'Formal Shoes',
        ],
      },
      {
        name: 'Accessories',
        subcategories: [
          'Bags',
          'Watches',
          'Belts',
          'Hats',
          'Sunglasses',
        ],
      },
      {
        name: 'Jewelry',
        subcategories: [
          'Necklaces',
          'Earrings',
          'Rings',
          'Bracelets',
          'Watches',
        ],
      },
      {
        name: 'Kids\' Clothing',
        subcategories: [
          'Boys\' Clothing',
          'Girls\' Clothing',
          'Baby Clothing',
          'School Uniforms',
          'Winter Wear',
        ],
      },
      {
        name: 'Sportswear',
        subcategories: [
          'Men\'s Sportswear',
          'Women\'s Sportswear',
          'Kids\' Sportswear',
          'Yoga Wear',
          'Gym Wear',
        ],
      },
      {
        name: 'Ethnic Wear',
        subcategories: [
          'Sarees',
          'Kurtas & Kurtis',
          'Lehengas',
          'Sherwanis',
          'Dupattas',
        ],
      },
      {
        name: 'Innerwear',
        subcategories: [
          'Men\'s Innerwear',
          'Women\'s Innerwear',
          'Kids\' Innerwear',
          'Lingerie',
          'Socks',
        ],
      },
      {
        name: 'Swimwear',
        subcategories: [
          'Men\'s Swimwear',
          'Women\'s Swimwear',
          'Kids\' Swimwear',
          'Swim Accessories',
          'Beachwear',
        ],
      },
    ],
  },
  {
    name: 'Home & Kitchen',
    image: '/assets/home-cat.webp',
    subcategories: [
      {
        name: 'Furniture',
        subcategories: [
          'Living Room Furniture',
          'Bedroom Furniture',
          'Office Furniture',
          'Outdoor Furniture',
          'Furniture Accessories',
        ],
      },
      {
        name: 'Home Decor',
        subcategories: [
          'Wall Art',
          'Vases',
          'Candles',
          'Photo Frames',
          'Clocks',
        ],
      },
      {
        name: 'Kitchenware',
        subcategories: [
          'Cookware',
          'Bakeware',
          'Kitchen Storage',
          'Kitchen Tools',
          'Kitchen Appliances',
        ],
      },
      {
        name: 'Bedding',
        subcategories: [
          'Bed Sheets',
          'Blankets',
          'Pillows',
          'Mattress Protectors',
          'Bedding Sets',
        ],
      },
      {
        name: 'Bath',
        subcategories: [
          'Towels',
          'Bath Mats',
          'Shower Curtains',
          'Bathroom Accessories',
          'Bathrobes',
        ],
      },
      {
        name: 'Lighting',
        subcategories: [
          'Ceiling Lights',
          'Table Lamps',
          'Wall Lights',
          'Floor Lamps',
          'Outdoor Lighting',
        ],
      },
      {
        name: 'Storage & Organization',
        subcategories: [
          'Closet Storage',
          'Shelving',
          'Storage Boxes',
          'Laundry Storage',
          'Garage Storage',
        ],
      },
      {
        name: 'Garden & Outdoor',
        subcategories: [
          'Garden Furniture',
          'BBQ & Outdoor Dining',
          'Gardening Tools',
          'Outdoor Decor',
          'Planters',
        ],
      },
      {
        name: 'Cleaning Supplies',
        subcategories: [
          'Cleaning Tools',
          'Cleaning Chemicals',
          'Trash & Recycling',
          'Laundry Care',
          'Dishwashing',
        ],
      },
      {
        name: 'Pet Supplies',
        subcategories: [
          'Dog Supplies',
          'Cat Supplies',
          'Bird Supplies',
          'Fish Supplies',
          'Small Animal Supplies',
        ],
      },
    ],
  },
  {
    name: 'Beauty & Personal Care',
    image: '/assets/beauty-cat.jpg',
    subcategories: [
      {
        name: 'Skincare',
        subcategories: [
          'Moisturizers',
          'Cleansers',
          'Toners',
          'Serums',
          'Sunscreens',
        ],
      },
      {
        name: 'Hair Care',
        subcategories: [
          'Shampoos',
          'Conditioners',
          'Hair Treatments',
          'Hair Styling',
          'Hair Accessories',
        ],
      },
      {
        name: 'Makeup',
        subcategories: [
          'Face Makeup',
          'Eye Makeup',
          'Lip Makeup',
          'Makeup Tools',
          'Makeup Removers',
        ],
      },
      {
        name: 'Fragrances',
        subcategories: [
          'Perfumes',
          'Body Sprays',
          'Deodorants',
          'Fragrance Sets',
          'Home Fragrances',
        ],
      },
      {
        name: 'Bath & Body',
        subcategories: [
          'Body Wash',
          'Body Lotion',
          'Hand Care',
          'Foot Care',
          'Body Scrubs',
        ],
      },
      {
        name: 'Men\'s Grooming',
        subcategories: [
          'Shaving',
          'Beard Care',
          'Hair Care',
          'Skincare',
          'Body Care',
        ],
      },
      {
        name: 'Oral Care',
        subcategories: [
          'Toothpaste',
          'Toothbrushes',
          'Mouthwash',
          'Dental Floss',
          'Teeth Whitening',
        ],
      },
      {
        name: 'Tools & Accessories',
        subcategories: [
          'Hair Tools',
          'Skincare Tools',
          'Makeup Tools',
          'Manicure & Pedicure Tools',
          'Bath Accessories',
        ],
      },
      {
        name: 'Wellness',
        subcategories: [
          'Supplements',
          'Vitamins',
          'Essential Oils',
          'Massage & Relaxation',
          'Fitness Equipment',
        ],
      },
      {
        name: 'Feminine Care',
        subcategories: [
          'Sanitary Pads',
          'Tampons',
          'Menstrual Cups',
          'Intimate Washes',
          'Panty Liners',
        ],
      },
    ],
  },
];
  

  

const Header2 = ({setHoveredCategory,hoveredCategory,setHoveredSubCategory,hoveredSubCategory}) => {


  return (
    <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 w-full">
      <div className="flex justify-between items-center  mx-auto max-w-screen-xl p-2">
    
        <div  id="mega-menu-full" className="items-center justify-between font-medium flex md:w-auto order-1">
          <ul onMouseLeave={()=>{setHoveredCategory(null)}} className="md:flex  md:p-0 hidden  rounded-lg  space-x-8 rtl:space-x-reverse  mt-0 border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {productCategories.map((category, index) => (
              <li
                key={index}
                className="relative group "
                onMouseEnter={() => setTimeout(() => setHoveredCategory(category.name), 200)}
                onClick={() => setHoveredCategory(category.name ? null : category.name)}
              >
                <button
                  className="flex flex-col flex-nowrap w-full gap-2 justify-center items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent md:border-0 hover:text-blue-600 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-blue-500 dark:hover:bg-transparent dark:border-gray-700"
                    onMouseEnter={() => setTimeout(() => setHoveredCategory(category.name), 200)}
                    
                >
                  <img className='w-16 h-12' src={category.image} alt={category.name} />
                  <p className='flex items-center justify-center  gap-3 flex-nowrap'>{category.name} <span><FaChevronDown className={`w-3 h-3 ${hoveredCategory === category.name ? 'rotate-180' : ''} transition delay-100 duration-100`} /></span></p>
                </button>
                {hoveredCategory === category.name && (
                  <div className="absolute  z-10 mt-1 w-48 bg-white border border-gray-200  shadow-lg dark:bg-gray-800 dark:border-gray-600">
                    <ul className="py-1 z-10">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li
                          key={subIndex}
                          className="relative group"
                          onMouseEnter={() => setHoveredSubCategory(subcategory.name)}
                          onMouseLeave={() => setHoveredSubCategory(null)}
                        >
                          <button className=" w-full flex gap-2 items-center justify-between z-10 text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                            {subcategory.name}
                            <FaChevronRight className="ml-2 w-2.5 h-2.5" />
                          </button>
                          {hoveredSubCategory === subcategory.name && (
                            <div className="absolute left-full top-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-600">
                              <ul className="py-1">
                                {subcategory.subcategories.map((subSubCategory, subSubIndex) => (
                                  <li key={subSubIndex}>
                                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                                      {subSubCategory}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header2;
