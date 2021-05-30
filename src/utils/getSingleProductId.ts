import { RouteComponentProps } from 'react-router';

export const getSingleProductId = (
  singleProductId: string,
  props: RouteComponentProps
): string => {
  let productId;
  const pId = localStorage.getItem('product-id');
  console.log('pid', pId);
  if (pId) {
    productId = pId;
  } else {
    console.log('single', singleProductId);
    if (singleProductId) {
      productId = singleProductId;
    } else {
      const productPath = props.location.pathname;
      const pathId = productPath.substring(productPath.lastIndexOf('/') + 1);
      console.log('path id: ', pathId);
      productId = pathId;
    }
  }

  return productId;
};
