'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const CHAR_LIMIT = 1000

export default function LessonForm({ onSuccess }: { onSuccess?: () => void }) {
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

    const modRes = await fetch('/api/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonText }),
    })
    const modResult = await modRes.json()

    if (modResult.flagged && !pendingSubmitRef.current) {
      setFlagged(true)
      setFlagReason(modResult.reason)
      setSubmitting(false)
      return
    }

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
          ? 'Submitted, this will be visible after review.'
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
      onSuccess?.()
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
    <form id="lesson-form" onSubmit={handleSubmit} className="w-full">
      <textarea
        value={lessonText}
        onChange={(e) => setLessonText(e.target.value.slice(0, CHAR_LIMIT))}
        placeholder="What's one thing you learned from an interview?"
        rows={6}
        className="w-full p-3 text-base border border-[#E5E5E0] rounded-lg focus:outline-none focus:border-[#3D5A4C]"
      />
      <div className="text-right text-xs text-[#8A8A85] mb-4">
        {lessonText.length}/{CHAR_LIMIT}
      </div>

      <label className="flex items-center gap-2 text-sm text-[#1A1A1A] mb-3">
        <input
          type="checkbox"
          checked={isGeneral}
          onChange={(e) => setIsGeneral(e.target.checked)}
        />
        This isn&apos;t tied to a specific company
      </label>

      {!isGeneral && (
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className="w-full p-3 text-base border border-[#E5E5E0] rounded-lg mb-3 focus:outline-none focus:border-[#3D5A4C]"
        />
      )}

      <input
        type="text"
        value={roleTag}
        onChange={(e) => setRoleTag(e.target.value)}
        placeholder="Role / industry (e.g. Product Marketing)"
        className="w-full p-3 text-base border border-[#E5E5E0] rounded-lg mb-3 focus:outline-none focus:border-[#3D5A4C]"
      />

      <select
        value={stage}
        onChange={(e) => setStage(e.target.value)}
        className="w-full p-3 text-base border border-[#E5E5E0] rounded-lg mb-4 bg-white focus:outline-none focus:border-[#3D5A4C]"
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
        className="px-6 py-3 text-sm font-semibold rounded-lg bg-[#3D5A4C] text-white disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit lesson'}
      </button>

      {message && <p className="mt-4 text-sm text-[#1A1A1A]">{message}</p>}

      {flagged && (
        <div className="mt-4 p-3 bg-[#F5F5F0] rounded-lg text-sm">
          <p>This reads more like a complaint than a lesson: {flagReason}</p>
          <p className="mt-2 flex gap-4">
            <button onClick={handleEdit} type="button" className="underline">
              Edit
            </button>
            <button onClick={handleSubmitAnyway} type="button" className="underline">
              Submit anyway
            </button>
          </p>
        </div>
      )}
    </form>
  )
}