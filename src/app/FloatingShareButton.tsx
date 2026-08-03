'use client'

import { useState } from 'react'

export default function FloatingShareButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="md:hidden fixed bottom-6 right-6 z-30 flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`mr-3 px-3 py-2 rounded-lg bg-[#1A1A1A] text-white text-xs font-medium whitespace-nowrap shadow-md transition-all duration-200 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Share a lesson
      </span>

      <button
        onClick={onClick}
        className="w-12 h-12 rounded-full bg-[#C9860A] text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#DDA23D] transition-colors"
        aria-label="Share a lesson"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  )
}