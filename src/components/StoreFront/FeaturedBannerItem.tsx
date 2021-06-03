import React from 'react';

type FeatureItemProps = {
  headline: string;
  snippet: string;
  link: string;
  bg: string;
};

const FeaturedBannerItem = ({
  headline,
  snippet,
  link,
  bg,
}: FeatureItemProps) => {
  const handleClick = (link: string) => {
    console.log(link);
  };

  return (
    <div className="featured-banner-item">
      <img src={`${process.env.PUBLIC_URL}/${bg}`} alt="" />
      <div className="featured-banner-caption">
        <span>
          <h3>{headline}</h3>
          <p>{snippet}</p>
        </span>
        <button onClick={() => handleClick(link)}>Shop Now</button>
      </div>
    </div>
  );
};

export default FeaturedBannerItem;
