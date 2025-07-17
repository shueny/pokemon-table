import React from 'react'

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
}: {
  value: string
  onChange: (v: string) => void
  onSearch: () => void
  onClear: () => void
}) {
  return (
    <form
      className="mb-4 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
    >
      <div className="relative">
        <input
          name="name"
          className="border pl-3 pr-10 py-2 rounded-xl w-80"
          placeholder="Search by name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClear}
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>
      <button
        className="px-4 py-2 bg-[#1a7bbd] text-white rounded-xl"
        type="submit"
      >
        Search
      </button>
    </form>
  )
}
