export type Filter = {
  category: string
  filters: FilterItem[]
  status: FilterItem[]
}

export type FilterItem = {
  name: string
  checked: boolean
}
