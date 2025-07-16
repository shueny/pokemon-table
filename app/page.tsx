export const dynamic = 'force-dynamic'

import PokemonTable from './components/pokemonTable'

type SearchParams = {
  page?: string
  name?: string
}

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const params = await searchParams
  const pageSize = 20
  const page = Number(params?.page ?? '1')
  const name = params?.name?.toString().trim().toLowerCase() ?? ''

  let pokemons: { name: string; url: string }[] = []
  let count = 0

  if (name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      pokemons = [
        {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
        },
      ]
      count = 1
    }
  } else {
    const offset = (page - 1) * pageSize
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`,
      { cache: 'no-store' },
    )
    if (res.ok) {
      const data = await res.json()
      pokemons = data.results
      count = data.count
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Pokémon List</h1>
      <PokemonTable
        pokemons={pokemons}
        page={page}
        pageSize={pageSize}
        total={count}
        filterName={name}
      />
    </div>
  )
}
