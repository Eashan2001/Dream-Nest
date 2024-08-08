import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import "../Style/Categories.css";
import { categories } from '/src/Data.js'; // Fix the import path, it should be Data.js instead of Data,js

function Categorie() {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            {/* Add key attribute to the Link component */}
            <div className="category">
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
              <div className="category_text_icon"><category.icon /></div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categorie;
