import React from 'react';

type FeatureItemProps = {
  headline: string;
  snippet: string;
  link: string;
};

const FeaturedBannerItem = ({ headline, snippet, link }: FeatureItemProps) => {
  const handleClick = (link: string) => {
    console.log(link);
  };

  return (
    <div className="feature-item">
      <h3>{headline}</h3>
      <p>{snippet}</p>
      <button onClick={() => handleClick(link)}>Shop Now</button>
    </div>
  );
};

export default FeaturedBannerItem;
