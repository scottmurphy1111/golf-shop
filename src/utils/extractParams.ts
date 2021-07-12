import { RouteComponentProps } from 'react-router';
import { PageParams } from '../models/PageParams';

export const extractParams = (props: RouteComponentProps) => {
  let search: string = props.location.search;
  let paramsObj: PageParams = { category: '', filters: '' };
  let returnedObj: PageParams | undefined;

  search.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    function ($0: string, $1: string, $2: string, $3: string): any {
      returnedObj = Object.assign(paramsObj, { [$1]: $3 });
    }
  );

  console.log('returned obj', returnedObj);
  if (returnedObj) {
    return returnedObj;
  }
};
