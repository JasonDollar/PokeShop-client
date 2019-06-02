import React, { useState, createContext } from 'react'

export const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
  const [isFilterOpen, toggleFilter] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(999999)
  return (
    <FilterContext.Provider value={{
      minPrice, setMinPrice, maxPrice, setMaxPrice, isFilterOpen, toggleFilter,
    }}
    >
      {children}
    </FilterContext.Provider>
  )
}