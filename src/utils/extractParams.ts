import { RouteComponentProps } from 'react-router';
import { PageParams } from '../models/PageParams';

export const extractParams = (props: RouteComponentProps) => {
  let search: string = props.location.search;
  let paramsObj: PageParams = {};

  search.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    function ($0: string, $1: string, $2: string, $3: string): string {
      return (paramsObj[$1] = $3);
    }
  );

  return paramsObj;
};
