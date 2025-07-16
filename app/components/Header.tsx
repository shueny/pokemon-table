// app/components/Header.tsx
import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex items-center gap-4 bg-[#1a2740] px-6 py-4">
      <Image
        src="/pokemon.webp"
        alt="Pokemon Logo"
        width={80}
        height={40}
        priority
        style={{ height: 'auto' }}
      />
      <h1 className="text-white text-2xl font-bold tracking-wide">
        Pokemon List
      </h1>
    </header>
  )
}
