import React, {useEffect, useState} from 'react'
import {Container} from 'semantic-ui-react'

import useSetCats from '../../hooks/useSetCats'
import {Category} from '../../models/Category'
import {useStore} from '../../store/store'
import {storeFrontCats} from '../../utils/cats'
import CategoryItem from './CategoryItem'

type Props = {
  headline?: string
  type: string
}

const CategoriesSection = ({headline, type}: Props) => {
  const [localCats, setLocalCats] = useState<Category[]>([])
  const fetchCats = useStore(state => state.setAllCats)
  const categories = useStore(state => state.allCats)
  const currentCat = useStore(state => state.currentCat)
  const cats = useSetCats(categories, storeFrontCats, currentCat)

  useEffect(() => {
    fetchCats()
  }, [fetchCats])

  useEffect(() => {
    setLocalCats(cats)
  }, [cats])
  return (
    <Container className={`categories-container component-section ${type}`}>
      {headline && <h2>{headline}</h2>}
      <ul>
        {localCats.map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
        <div>test</div>
      </ul>
    </Container>
  )
}

export default CategoriesSection
