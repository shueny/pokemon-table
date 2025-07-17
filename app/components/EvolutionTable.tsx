'use client'

import * as React from 'react'

type EvolutionTrigger = {
  name: string
  url: string
}

export default function EvolutionTable() {
  const [data, setData] = React.useState<EvolutionTrigger[]>([])
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState(0)

  const limit = 5
  const offset = (page - 1) * limit

  React.useEffect(() => {
    setLoading(true)
    fetch(
      `https://pokeapi.co/api/v2/evolution-trigger?limit=${limit}&offset=${offset}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.results)
        setCount(json.count)
        setLoading(false)
      })
  }, [page])

  const pageCount = Math.ceil(count / limit)

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Evolution Triggers</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 bg-gray-50">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 bg-gray-50">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 bg-gray-50">
                  URL
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={item.name}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100">
                    {offset + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100 capitalize">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          className="px-6 py-2 border-2 border-gray-300 rounded-lg font-bold uppercase text-sm mr-2 transition disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600 px-2 pt-1">
          Page {page} / {pageCount}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
          disabled={page >= pageCount}
          className="px-6 py-2 border-2 border-gray-300 rounded-lg font-bold uppercase text-sm ml-2 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
