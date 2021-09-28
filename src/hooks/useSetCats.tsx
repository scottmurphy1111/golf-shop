import {useEffect, useState} from 'react'

import {Category} from '../models/Category'

const useSetCats = (
  allCats: Category[],
  catNames: string[],
  activeCat: string
): Category[] => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCats = allCats.reduce((acc: Category[], category: Category) => {
      catNames.forEach((cat: string, i: number) => {
        return category.slug === cat ? (acc[i] = category) : null
      })
      return acc
    }, [])

    getCats.forEach(category => {
      return activeCat === category.slug
        ? (category.active = true)
        : (category.active = false)
    })

    setCategories(getCats)
  }, [activeCat, allCats, catNames])

  return categories
}

export default useSetCats
