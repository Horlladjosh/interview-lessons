'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Lesson = {
  id: string
  lesson_text: string
  company: string | null
  is_general: boolean
  role_industry_tag: string
  interview_stage: string
  flag_reason: string | null
  created_at: string
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput }),
    })
    if (res.ok) {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Wrong password')
    }
  }

  const loadPending = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('status', 'pending_review')
      .order('created_at', { ascending: false })
    setLessons(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (authed) loadPending()
  }, [authed])

  const handleApprove = async (id: string) => {
  const { error } = await supabase.from('lessons').update({ status: 'published' }).eq('id', id)
  if (error) {
    console.error('Failed to approve:', error.message)
    alert('Failed to approve: ' + error.message)
    return
  }
  setLessons((prev) => prev.filter((l) => l.id !== id))
}

  const handleRemove = async (id: string) => {
  const { error } = await supabase.from('lessons').update({ status: 'removed' }).eq('id', id)
  if (error) {
    console.error('Failed to remove:', error.message)
    alert('Failed to remove: ' + error.message)
    return
  }
  setLessons((prev) => prev.filter((l) => l.id !== id))
}

  if (!authed) {
    return (
      <main style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Admin login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', padding: 12, fontSize: '1rem' }}
          />
          <button type="submit" style={{ marginTop: 12, padding: '10px 20px' }}>
            Log in
          </button>
          {authError && <p style={{ color: 'red', marginTop: 8 }}>{authError}</p>}
        </form>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: 24 }}>
        Review queue
      </h1>

      {loading && <p>Loading...</p>}
      {!loading && lessons.length === 0 && <p>Nothing pending review.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{ border: '1px solid #E5E5E0', borderRadius: 10, padding: 24 }}
          >
            <div style={{ fontSize: '0.8rem', color: '#8A8A85', marginBottom: 8 }}>
              {lesson.is_general ? 'General' : lesson.company} ·{' '}
              {lesson.role_industry_tag} · {lesson.interview_stage}
            </div>
            <p style={{ marginBottom: 12 }}>{lesson.lesson_text}</p>
            <p style={{ fontSize: '0.85rem', color: '#B85C3D', marginBottom: 12 }}>
              Flagged: {lesson.flag_reason}
            </p>
            <button onClick={() => handleApprove(lesson.id)} style={{ marginRight: 12, padding: '8px 16px' }}>
              Approve
            </button>
            <button onClick={() => handleRemove(lesson.id)} style={{ padding: '8px 16px' }}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}