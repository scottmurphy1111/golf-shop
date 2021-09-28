import {RouteComponentProps} from 'react-router-dom'

import {PageParams} from '../models/PageParams'

export const extractParams = (props: RouteComponentProps) => {
  const search: string = props.location.search
  const paramsObj: PageParams = {category: '', filters: ''}
  let returnedObj: PageParams | undefined

  search.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    ($0: string, $1: string, $2: string, $3: string): any => {
      returnedObj = Object.assign(paramsObj, {[$1]: $3})
    }
  )

  if (!returnedObj) return null
  return returnedObj
}
