'use client'

import { useState, useMemo } from 'react'
import LikeButton from './LikeButton'
import { slugify } from '@/lib/slugify'

type Lesson = {
  id: string
  lesson_text: string
  company: string | null
  is_general: boolean
  role_industry_tag: string
  interview_stage: string
  like_count: number
}

export default function LessonBrowser({ lessons }: { lessons: Lesson[] }) {
  const [searchText, setSearchText] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [showGeneralOnly, setShowGeneralOnly] = useState(false)

  const companies = useMemo(() => {
    const counts: Record<string, number> = {}
    lessons.forEach((l) => {
      if (!l.is_general && l.company) {
        counts[l.company] = (counts[l.company] || 0) + 1
      }
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([company]) => company)
  }, [lessons])

  const filtered = useMemo(() => {
  return lessons.filter((lesson) => {
    if (companyFilter === '__general__' && !lesson.is_general) return false
    if (companyFilter && companyFilter !== '__general__' && lesson.company !== companyFilter) return false
    if (stageFilter && lesson.interview_stage !== stageFilter) return false
      if (searchText) {
        const q = searchText.toLowerCase()
        const matches =
          lesson.lesson_text.toLowerCase().includes(q) ||
          (lesson.company?.toLowerCase().includes(q) ?? false) ||
          lesson.role_industry_tag.toLowerCase().includes(q)
        if (!matches) return false
      }
      return true
    })
  }, [lessons, searchText, companyFilter, stageFilter, showGeneralOnly])

  const selectClass =
  'w-full p-2.5 text-sm border border-[#E5E5E0] rounded-lg bg-white cursor-pointer hover:border-[#3D5A4C] focus:outline-none focus:border-[#3D5A4C] transition-colors'

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start">
      {/* Sidebar */}
      <aside className="w-full md:w-56 flex-shrink-0 md:sticky md:top-6">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by company or keyword..."
          className="w-full p-2.5 text-sm border border-[#E5E5E0] rounded-lg mb-4 focus:outline-none focus:border-[#3D5A4C]"
        />

        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#1A1A1A] mb-1.5">
            Company
          </label>
          <select
  value={companyFilter}
  onChange={(e) => setCompanyFilter(e.target.value)}
  className={selectClass}
>
  <option value="">All companies</option>
  <option value="__general__">General</option>
  {companies.map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#1A1A1A] mb-1.5">
            Stage
          </label>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">All stages</option>
            <option value="phone_screen">Phone screen</option>
            <option value="technical_round">Technical round</option>
            <option value="final_onsite">Final / onsite</option>
            <option value="offer_stage">Offer stage</option>
            <option value="other">Other</option>
          </select>
        </div>

      </aside>

      {/* Lessons — masonry via CSS columns */}
      <div className="flex-1 min-w-0">
        {filtered.length === 0 && (
          <p className="text-[#8A8A85]">No lessons match your filters.</p>
        )}

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {filtered.map((lesson) => (
            <div
              key={lesson.id}
              className="break-inside-avoid mb-6 border border-[#E5E5E0] rounded-xl p-6 bg-white"
            >
              <div className="flex gap-2 mb-3 flex-wrap">
  <span className={companyTagClass}>
    {lesson.is_general ? 'General' : lesson.company}
  </span>
  {lesson.role_industry_tag && (
    <span className={roleTagClass}>{lesson.role_industry_tag}</span>
  )}
  <span className={stageTagClass}>{lesson.interview_stage.replace('_', ' ')}</span>
</div>
              <p className="text-base leading-relaxed text-[#1A1A1A]">{lesson.lesson_text}</p>
              <div className="mt-3">
                <LikeButton lessonId={lesson.id} initialCount={lesson.like_count} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const companyTagClass =
  'text-xs text-[#3D5A4C] bg-[#3D5A4C]/[0.10] px-2.5 py-1 rounded-md uppercase tracking-wide'

const roleTagClass =
  'text-xs text-[#B8845C] bg-[#B8845C]/[0.10] px-2.5 py-1 rounded-md uppercase tracking-wide'

const stageTagClass =
  'text-xs text-[#8A8A85] bg-[#8A8A85]/[0.10] px-2.5 py-1 rounded-md uppercase tracking-wide'