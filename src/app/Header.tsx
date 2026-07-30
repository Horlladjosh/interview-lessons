'use client'

import { useState } from 'react'
import Link from 'next/link'
import SubmitModal from './SubmitModal'

export default function Header() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <header className="border-b border-[#E5E5E0]">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-base font-bold text-[#1A1A1A] no-underline">
            OneLesson
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E5E5E0] text-[#1A1A1A] cursor-pointer hover:border-[#C9860A] hover:text-[#C9860A] transition-colors"
          >
            Share a lesson
          </button>
        </div>
      </header>

      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </>
  )
}