import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const categories = {};
  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="container">
      <div className="top-menu">
        <img
          src="/logo.png"
          className="logo"
        />
      </div>
      <div className="top-menu">
        <div className="select-container">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Todas as Categorias</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {Object.keys(categories).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="row">
            {categories[category]
              .filter(
                (product) =>
                  selectedCategory === "" || product.category === selectedCategory
              )
              .map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card">
                    <img src={product.image} alt={product.title} className="img-fluid" />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <span className="price">${product.price}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  
}

export default ProductList;
