import { RouteComponentProps } from 'react-router';

export const getSingleProductId = (
  singleProductId: string,
  props: RouteComponentProps
): string => {
  let productId;
  const pId = localStorage.getItem('product-id');
  if (pId) {
    productId = pId;
  } else {
    if (singleProductId) {
      productId = singleProductId;
    } else {
      const productPath = props.location.pathname;
      const pathId = productPath.substring(productPath.lastIndexOf('/') + 1);
      productId = pathId;
    }
  }

  return productId;
};
