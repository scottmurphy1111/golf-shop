import React, {useCallback, useReducer, useState} from 'react'
import {GridRow, Icon, Search} from 'semantic-ui-react'

const initialState = {
  results: [],
  value: '',
}

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
  }
}
const ProductSearch = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const [searchMode, setSearchMode] = useState(false)
  const [value, setValue] = useState(initialState.value)
  const [results, setResults] = useState(initialState.results)

  //add reducer
  const handleSearchChange = useCallback((e, data) => {
    console.log(e)
    console.log(`data =  ${JSON.stringify(data)}`)
  }, [])

  const handleSetSearchMode = () => {
    setSearchMode(!searchMode)
  }

  return (
    <GridRow verticalAlign="middle">
      {searchMode ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          test
          <Search size="small" onSearchChange={handleSearchChange} />
          <Icon
            link
            name="close"
            onClick={handleSetSearchMode}
            style={{lineHeight: '1'}}
          />
        </div>
      ) : (
        <Icon link name="search" onClick={handleSetSearchMode} />
      )}
    </GridRow>
  )
}

export default ProductSearch
