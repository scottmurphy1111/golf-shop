import React from 'react'

import FeaturedBannerItem from './FeaturedBannerItem'

const storeFrontBanners = [
  {
    headline: 'Headwear',
    snippet: 'Check Out Our Selection',
    link: '/products?category=apparel&filters=outerwear',
    bg: 'mc-image.jpg',
  },
  {
    headline: 'Apparel',
    snippet: 'Check Out Our Latest Gear',
    link: '/products?category=apparel',
    bg: 'mc-image3.jpg',
  },
]

const FeaturedBanner = () => {
  return (
    <section className="featured-banner">
      {storeFrontBanners.map((props, index) => (
        <FeaturedBannerItem key={index} {...props} />
      ))}
    </section>
  )
}

export default FeaturedBanner
