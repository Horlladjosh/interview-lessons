'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const CHAR_LIMIT = 1000

export default function SubmitPage() {
  const [lessonText, setLessonText] = useState('')
  const [isGeneral, setIsGeneral] = useState(false)
  const [company, setCompany] = useState('')
  const [roleTag, setRoleTag] = useState('')
  const [stage, setStage] = useState('phone_screen')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [flagged, setFlagged] = useState(false)
  const [flagReason, setFlagReason] = useState('')
  const pendingSubmitRef = useRef(false)

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitting(true)
  setMessage('')

  // Run the moderation check first
  const modRes = await fetch('/api/moderate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lessonText }),
  })
  const modResult = await modRes.json()

  if (modResult.flagged && !pendingSubmitRef.current) {
    // Flagged, and user hasn't chosen "submit anyway" yet — stop and show the message
    setFlagged(true)
    setFlagReason(modResult.reason)
    setSubmitting(false)
    return
  }

  // Either not flagged, or user chose "submit anyway"
  const { error } = await supabase.from('lessons').insert({
    lesson_text: lessonText,
    company: isGeneral ? null : company,
    is_general: isGeneral,
    role_industry_tag: roleTag,
    interview_stage: stage,
    status: modResult.flagged ? 'pending_review' : 'published',
    flag_reason: modResult.flagged ? modResult.reason : null,
  })

  setSubmitting(false)

  if (error) {
    setMessage('Something went wrong: ' + error.message)
  } else {
    setMessage(
      modResult.flagged
        ? 'Submitted — this will be visible after review.'
        : 'Lesson submitted!'
    )
    setLessonText('')
    setCompany('')
    setRoleTag('')
    setIsGeneral(false)
    setStage('phone_screen')
    setFlagged(false)
    setFlagReason('')
    pendingSubmitRef.current = false
  }
}

const handleSubmitAnyway = () => {
  pendingSubmitRef.current = true
  const form = document.getElementById('lesson-form') as HTMLFormElement
  form.requestSubmit()
}

const handleEdit = () => {
  setFlagged(false)
  setFlagReason('')
}

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: 24 }}>
        Share a lesson
      </h1>

      <form id="lesson-form" onSubmit={handleSubmit}>
        <textarea
          value={lessonText}
          onChange={(e) => setLessonText(e.target.value.slice(0, CHAR_LIMIT))}
          placeholder="What's one thing you learned from an interview?"
          rows={6}
          style={{ width: '100%', padding: 12, fontSize: '1rem' }}
        />
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#8A8A85' }}>
          {lessonText.length}/{CHAR_LIMIT}
        </div>

        <label style={{ display: 'block', marginTop: 16 }}>
          <input
            type="checkbox"
            checked={isGeneral}
            onChange={(e) => setIsGeneral(e.target.checked)}
          />
          {' '}This isn't tied to a specific company
        </label>

        {!isGeneral && (
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            style={{ width: '100%', padding: 12, marginTop: 12, fontSize: '1rem' }}
          />
        )}

        <input
          type="text"
          value={roleTag}
          onChange={(e) => setRoleTag(e.target.value)}
          placeholder="Role / industry (e.g. Product Marketing)"
          style={{ width: '100%', padding: 12, marginTop: 12, fontSize: '1rem' }}
        />

        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          style={{ width: '100%', padding: 12, marginTop: 12, fontSize: '1rem' }}
        >
          <option value="phone_screen">Phone screen</option>
          <option value="technical_round">Technical round</option>
          <option value="final_onsite">Final / onsite</option>
          <option value="offer_stage">Offer stage</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          disabled={submitting || lessonText.length === 0}
          style={{ marginTop: 24, padding: '12px 24px', fontSize: '0.9rem' }}
        >
          {submitting ? 'Submitting...' : 'Submit lesson'}
        </button>

        {message && <p style={{ marginTop: 16 }}>{message}</p>}
      </form>
      
      {flagged && (
  <div style={{ marginTop: 16, padding: 12, background: '#F5F5F0', fontSize: '0.9rem' }}>
    <p>This reads more like a complaint than a lesson: {flagReason}</p>
    <p style={{ marginTop: 8 }}>
      <button onClick={handleEdit} type="button" style={{ marginRight: 12 }}>
        Edit
      </button>
      <button onClick={handleSubmitAnyway} type="button">
        Submit anyway
      </button>
    </p>
  </div>
)}
    </main>
  )
}