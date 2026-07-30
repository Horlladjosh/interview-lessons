'use client'

import { useState, useRef, useEffect } from 'react'

type Option = { value: string; label: string }

export default function Dropdown({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: Option[]
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find((o) => o.value === value)?.label || options[0].label

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 px-3 text-sm border border-[#E5E5E0] rounded-lg bg-white cursor-pointer hover:border-[#C9860A] transition-colors"
      >
        <span className="text-[#1A1A1A]">{selectedLabel}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8A85" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E5E0] rounded-lg shadow-sm z-10 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#C9860A]/[0.06] transition-colors ${
                opt.value === value ? 'text-[#C9860A] bg-[#C9860A]/[0.06]' : 'text-[#1A1A1A]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}