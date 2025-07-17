import React from 'react'

export default function Modal({
  open,
  title,
  children,
  onCancel,
}: {
  open: boolean
  title: string
  children: React.ReactNode
  onCancel: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-[#00000080] backdrop-blur-sm">
      <div className="relative m-4 p-6 w-full max-w-md rounded-lg bg-white shadow-sm">
        {/* Title + X */}
        <div className="flex items-center justify-between pb-4 text-xl font-medium text-slate-800">
          <span>{title}</span>
          <button
            onClick={onCancel}
            className="ml-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
          {children}
        </div>
      </div>
    </div>
  )
}
