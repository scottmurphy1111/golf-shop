import React from 'react';
import FeaturedBannerItem from './FeaturedBannerItem';

const FeaturedBanner = () => {
  return (
    <div>
      <FeaturedBannerItem
        headline={'Headwear'}
        snippet={'headwear snippet'}
        link={'/headwear'}
      />
      <FeaturedBannerItem
        headline={'Apparel'}
        snippet={'apparel snippet'}
        link={'/apparel'}
      />
    </div>
  );
};

export default FeaturedBanner;
