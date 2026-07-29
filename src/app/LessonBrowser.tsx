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
      if (showGeneralOnly && !lesson.is_general) return false
      if (companyFilter && lesson.company !== companyFilter) return false
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

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search by company or keyword..."
        style={{ width: '100%', padding: 12, fontSize: '1rem', marginBottom: 16 }}
      />

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          style={{ padding: 8, fontSize: '0.85rem' }}
        >
          <option value="">All companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          style={{ padding: 8, fontSize: '0.85rem' }}
        >
          <option value="">All stages</option>
          <option value="phone_screen">Phone screen</option>
          <option value="technical_round">Technical round</option>
          <option value="final_onsite">Final / onsite</option>
          <option value="offer_stage">Offer stage</option>
          <option value="other">Other</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
          <input
            type="checkbox"
            checked={showGeneralOnly}
            onChange={(e) => setShowGeneralOnly(e.target.checked)}
          />
          General only
        </label>
      </div>

      {filtered.length === 0 && (
        <p style={{ color: '#8A8A85' }}>No lessons match your filters.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {filtered.map((lesson) => (
          <div
            key={lesson.id}
            style={{ border: '1px solid #E5E5E0', borderRadius: 10, padding: 24, background: 'white' }}
          >
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
             {lesson.is_general ? (
            <span style={tagStyle}>General</span>
            ) : (
            <a href={`/companies/${slugify(lesson.company || '')}`} style={{ ...tagStyle, textDecoration: 'none' }}>
            {lesson.company}
            </a>
            )}
              {lesson.role_industry_tag && <span style={tagStyle}>{lesson.role_industry_tag}</span>}
              <span style={tagStyle}>{lesson.interview_stage.replace('_', ' ')}</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{lesson.lesson_text}</p>
            <div style={{ marginTop: 12 }}>
              <LikeButton lessonId={lesson.id} initialCount={lesson.like_count} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tagStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#8A8A85',
  background: 'rgba(61,90,76,0.08)',
  padding: '4px 10px',
  borderRadius: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
}