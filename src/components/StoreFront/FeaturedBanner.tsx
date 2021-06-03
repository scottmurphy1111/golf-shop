import React from 'react';
import FeaturedBannerItem from './FeaturedBannerItem';

const FeaturedBanner = () => {
  return (
    <section className="featured-banner">
      <FeaturedBannerItem
        headline={'Headwear'}
        snippet={'Check Out Our Selection'}
        link={'/products?category=apparel'}
        bg={'mc-image.jpg'}
      />
      <FeaturedBannerItem
        headline={'Apparel'}
        snippet={'Check Out Our Latest Gear'}
        link={'/products?category=apparel'}
        bg={'mc-image3.jpg'}
      />
    </section>
  );
};

export default FeaturedBanner;
