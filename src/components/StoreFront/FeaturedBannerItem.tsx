import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store/store';

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
  const setCheckedFilterVals = useStore((state) => state.setCheckedFilterVals);
  const history = useHistory();
  const handleClick = (buttonLink: string) => {
    const applyfilterVal = buttonLink.match(/filters=(.*)/);
    if (applyfilterVal) {
      setCheckedFilterVals(applyfilterVal[1]);
    }
    history.push(buttonLink);
  };

  return (
    <div className="featured-banner-item">
      <img src={`${process.env.PUBLIC_URL}/${bg}`} alt="" />
      <div className="featured-banner-caption">
        <span>
          <h3>{headline}</h3>
          <p>{snippet}</p>
        </span>
        <button className="primary" onClick={() => handleClick(link)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default FeaturedBannerItem;
