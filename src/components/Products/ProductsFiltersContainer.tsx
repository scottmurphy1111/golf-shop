import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

import {Filter} from '../../models/Filter'
import {useStore} from '../../store/store'
import {filterCats} from '../../utils/cats'
import ProductsFilterItem from './ProductsFilterItem'

type Props = {
  category: string | null
}

const ProductsFiltersContainer = ({category}: Props) => {
  const [localFilters, setLocalFilters] = useState<Filter>({
    category: '',
    filters: [],
    status: [],
  })

  // const [checkedVals, setCheckedVals] = useState<string[]>([]);
  const checkedFilterVals = useStore(state => state.checkedFilterVals)
  const setCheckedFilterVals = useStore(state => state.setCheckedFilterVals)
  const resetFilterCats = useStore(state => state.resetFilterCats)
  const setResetFilterCats = useStore(state => state.setResetFilterCats)
  const [filters, setFilters] = useState<Filter[]>([])

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    setFilters(filterCats)
  }, [])

  useEffect(() => {
    if (resetFilterCats) {
      const findFiltersByCategory = () => {
        return filterCats.find(
          (filter: Filter) => filter.category === category && filter
        )
      }

      const newFilters = findFiltersByCategory()
      setLocalFilters(newFilters!)
    }

    setResetFilterCats(false)
  }, [category, resetFilterCats, setResetFilterCats])

  useEffect(() => {
    const findFiltersByCategory = () => {
      return filters.find(
        (filter: Filter) => filter.category === category && filter
      )
    }
    const newFilters = findFiltersByCategory()
    setLocalFilters(newFilters!)
  }, [category, filters])

  const updateFilters = (val: string) => {
    setCheckedFilterVals(val)
  }

  useEffect(() => {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    const filterParams = new URLSearchParams(location.search)
    if (checkedFilterVals.length) {
      filterParams.set('filters', checkedFilterVals.join(','))
    } else {
      filterParams.delete('filters')
    }

    history.push({search: decodeURIComponent(filterParams.toString())})
  }, [checkedFilterVals, history, location.search])

  return (
    <div className="cat-page">
      <h3>Filter By:</h3>
      <ul>
        {localFilters &&
          localFilters.filters.map(filter => (
            <ProductsFilterItem
              key={filter.name}
              filter={filter}
              updateFilters={updateFilters}
            />
          ))}
      </ul>
      <h3>Status: </h3>
      <ul>
        {localFilters &&
          localFilters.status.map(status => (
            <ProductsFilterItem
              key={status.name}
              filter={status}
              updateFilters={updateFilters}
            />
          ))}
      </ul>
    </div>
  )
}

export default ProductsFiltersContainer
