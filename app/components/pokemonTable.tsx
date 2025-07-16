'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import Image from 'next/image'

type Pokemon = { name: string; url: string }
type PokemonType = { type: { name: string } }

type PokemonDetail = {
  name: string
  height: number
  weight: number
  sprites: { front_default: string }
  types: { type: { name: string } }[]
}

const columns: ColumnDef<Pokemon>[] = [
  {
    header: '#',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => (
      <span className="capitalize">{info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell: (info) => (
      <a
        href={info.getValue() as string}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {info.getValue() as string}
      </a>
    ),
  },
]

export default function PokemonTable({
  pokemons,
  page,
  pageSize,
  total,
  filterName,
}: {
  pokemons: Pokemon[]
  page: number
  pageSize: number
  total: number
  filterName: string
}) {
  const [modalData, setModalData] = React.useState<PokemonDetail | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [search, setSearch] = React.useState(filterName)

  // Pagination
  const pageCount = Math.ceil(total / pageSize)
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1)

  // Table
  const table = useReactTable({
    data: pokemons,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  })

  // Modal
  const handleRowClick = async (pokemon: Pokemon) => {
    setLoading(true)
    setModalOpen(true)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    if (res.ok) {
      setModalData(await res.json())
    } else {
      setModalData(null)
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Search */}
      <form method="GET" className="mb-4 flex gap-2">
        <input
          name="name"
          className="border px-3 py-2 rounded w-60"
          placeholder="Filter by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase border-b border-gray-200 bg-gray-50"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!filterName && (
        <div className="flex items-center gap-2 mt-6 justify-end">
          {pageNumbers.map((num, idx) => {
            const href = `/?page=${num}${search ? `&name=${search}` : ''}`

            if (num === 1 || num === pageCount || Math.abs(num - page) <= 1) {
              return (
                <Link
                  key={num}
                  href={href}
                  className={`px-3 py-1 rounded border mx-0.5 ${
                    num === page
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {num}
                </Link>
              )
            }

            if (
              (num === page - 2 && num > 1) ||
              (num === page + 2 && num < pageCount)
            ) {
              return (
                <span key={num} className="px-2 text-gray-400 select-none">
                  ...
                </span>
              )
            }
            return null
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            {loading ? (
              <div>Loading...</div>
            ) : modalData ? (
              <div>
                <h2 className="text-xl font-bold mb-2 capitalize">
                  {modalData.name}
                </h2>
                <Image
                  src={modalData.sprites.front_default}
                  alt={modalData.name}
                  className="mb-2"
                  width={96}
                  height={96}
                  unoptimized
                />
                <div>
                  <strong>Height:</strong> {modalData.height}
                </div>
                <div>
                  <strong>Weight:</strong> {modalData.weight}
                </div>
                <div>
                  <strong>Types:</strong>{' '}
                  {modalData.types
                    .map((t: PokemonType) => t.type.name)
                    .join(', ')}
                </div>
              </div>
            ) : (
              <div>Not found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
