import { headers } from 'next/headers'
import PokemonPage from './components/PokemonPage'

export default async function Home() {
  const headersList = await headers()
  const url = headersList.get('x-url') || ''
  const pageFromQuery = new URL(url, 'http://localhost').searchParams.get(
    'page',
  )
  const page = Number(pageFromQuery) || 1
  const pageSize = 20
  const offset = (page - 1) * pageSize

  // SSR fetch paginated list
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`,
    { cache: 'no-store' },
  )
  const data = await res.json()

  return (
    <div className="max-w-3xl mx-auto p-8">
      <PokemonPage
        initialPokemons={data.results}
        page={page}
        pageSize={pageSize}
        total={data.count}
      />
    </div>
  )
}
