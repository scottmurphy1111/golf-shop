import { RouteComponentProps } from 'react-router';
import CategoriesSection from '../Shared/CategoriesSection';
import EmailCapture from './EmailCapture';
import FeaturedBanner from './FeaturedBanner';
import ShowcaseSection from './ShowcaseSection';

const StoreFrontContainer = (props: RouteComponentProps) => {
  return (
    <div>
      <FeaturedBanner />
      <CategoriesSection headline="Shop by Category" />
      <ShowcaseSection headline={'New Arrivals'} slug={'new'} />
      <ShowcaseSection headline={'Best Sellers'} slug={'bestseller'} />
      <ShowcaseSection headline={'Featured'} slug={'featured'} />
      <EmailCapture />
    </div>
  );
};

export default StoreFrontContainer;
