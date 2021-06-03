import React from 'react';

const ProductsHero = () => {
  return (
    <section className="product-hero-container">
      <div className="product-hero-inner">
        <img src={`${process.env.PUBLIC_URL}/mc-bg.jpg`} alt="" />
      </div>
    </section>
  );
};

export default ProductsHero;
