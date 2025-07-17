'use client'
import React from 'react'
import SearchBar from './SearchBar'
import PokemonTable from './PokemonTable'
import EvolutionTable from './EvolutionTable'
import { useSearchStore } from './types'

export default function PokemonPage({
  initialPokemons,
  page,
  pageSize,
  total,
}: {
  initialPokemons: { name: string; url: string }[]
  page: number
  pageSize: number
  total: number
}) {
  const {
    search,
    pokemons,
    loading,
    error,
    setSearch,
    setPokemons,
    setLoading,
    setError,
    reset,
  } = useSearchStore()

  // Reset pokemons when initialPokemons changes
  React.useEffect(() => {
    reset(initialPokemons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPokemons])

  // Search handler
  const handleSearch = async () => {
    if (!search) {
      reset(initialPokemons)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
      )
      if (res.ok) {
        const data = await res.json()
        setPokemons([
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
          },
        ])
      } else {
        setPokemons([])
        setError('Not found')
      }
    } catch {
      setPokemons([])
      setError('Error fetching data')
    }
    setLoading(false)
  }

  // Clear handler
  const handleClear = () => {
    reset(initialPokemons)
  }

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      {loading && <div className="my-4">Loading...</div>}
      {error && <div className="my-4 text-red-500">{error}</div>}
      {!loading && !error && (
        <PokemonTable
          pokemons={pokemons}
          page={page}
          pageSize={pageSize}
          total={total}
          filterName={search}
        />
      )}
      <div className="h-[1px] bg-gray-200 my-4 mt-8 w-full" />
      <EvolutionTable />
    </div>
  )
}
