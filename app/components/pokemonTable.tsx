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
import Modal from './Modal'

type Pokemon = { name: string; url: string }
type PokemonType = { type: { name: string } }

type PokemonDetail = {
  id: number
  abilities: { ability: { name: string } }[]
  base_experience: number
  name: string
  height: number
  weight: number
  sprites: { front_default: string }
  types: { type: { name: string } }[]
}

const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => (
      <span className="capitalize">{info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'url',
    header: 'Ability Detail Data',
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
  const [modalTitle, setModalTitle] = React.useState('')

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
    setModalTitle(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

    if (res.ok) {
      setModalData(await res.json())
    } else {
      setModalData(null)
    }
    setLoading(false)
  }

  function getStars(baseExp: number) {
    if (baseExp >= 200) return 5
    if (baseExp >= 150) return 4
    if (baseExp >= 100) return 3
    if (baseExp >= 50) return 2
    return 1
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-6 py-3 text-left text-sm font-bold text-gray-600 bg-gray-50"
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
                className="hover:bg-gray-50 transition-colors"
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
        <div className="flex items-center justify-between mt-6 px-2">
          {/* Previous */}
          <Link
            href={`/?page=${Math.max(page - 1, 1)}`}
            className={`px-6 py-2 border-2 border-gray-300 rounded-lg font-bold uppercase text-sm mr-2 transition ${
              page === 1
                ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
          >
            Previous
          </Link>
          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {pageNumbers.map((num, idx) => {
              if (num === 1 || num === pageCount || Math.abs(num - page) <= 1) {
                return (
                  <Link
                    key={`${idx}-${num}`}
                    href={`/?page=${num}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-base font-medium transition ${
                      num === page
                        ? 'font-bold bg-[#1a7bbd] text-white'
                        : 'bg-white text-gray-700 hover:border-black'
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
                  <span
                    key={num}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 select-none"
                  >
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>
          {/* Next */}
          <Link
            href={`/?page=${Math.min(page + 1, pageCount)}`}
            className={`px-6 py-2 border-2 border-gray-300 rounded-lg font-bold uppercase text-sm ml-2 transition ${
              page === pageCount
                ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            aria-disabled={page === pageCount}
            tabIndex={page === pageCount ? -1 : 0}
          >
            Next
          </Link>
        </div>
      )}

      {/* Modal */}
      <Modal
        open={modalOpen}
        title={modalTitle}
        onCancel={() => setModalOpen(false)}
      >
        {loading ? (
          <div>Loading...</div>
        ) : modalData ? (
          <div className="flex flex-col items-center text-center p-4">
            {/* Avatar */}
            <Image
              src={modalData.sprites.front_default}
              alt={modalData.name}
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-200 mb-2"
              unoptimized
            />
            {/* Stars as base experience */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 text-xl">
                {'★'.repeat(getStars(modalData.base_experience))}
                {'☆'.repeat(5 - getStars(modalData.base_experience))}
              </span>
            </div>
            {/* Tag */}
            <div className="text-xs text-gray-500 font-semibold mb-2">
              #{modalData.id} &nbsp;|&nbsp;{' '}
              {modalData.types.map((t: PokemonType) => t.type.name).join(' / ')}
            </div>
            {/* Introduction */}
            <div className="text-gray-700 text-sm italic mb-2">
              {`This Pokémon is a ${modalData.types
                .map((t: PokemonType) => t.type.name)
                .join('/')} type. 
              It has base experience ${modalData.base_experience}, height ${
                modalData.height
              }, and weight ${modalData.weight}.`}
            </div>
            {/* Abilities */}
            <div className="text-xs text-gray-500">
              Abilities:{' '}
              {modalData.abilities
                ?.map((a: { ability: { name: string } }) => a.ability.name)
                .join(', ')}
            </div>
          </div>
        ) : (
          <div>Not found.</div>
        )}
      </Modal>
    </div>
  )
}
