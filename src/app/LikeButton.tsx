'use client'

import { useState } from 'react'
import { getAnonId } from '@/lib/session'

export default function LikeButton({
  lessonId,
  initialCount,
}: {
  lessonId: string
  initialCount: number
}) {
  const [count, setCount] = useState(initialCount)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLike = async () => {
    if (liked || loading) return
    setLoading(true)

    const anonId = getAnonId()
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, anonId }),
    })

    if (res.ok) {
      setCount((c) => c + 1)
      setLiked(true)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      style={{
        border: 'none',
        background: 'none',
        cursor: liked ? 'default' : 'pointer',
        color: liked ? '#3D5A4C' : '#8A8A85',
        fontSize: '0.85rem',
        padding: 0,
      }}
    >
      ♥ {count}
    </button>
  )
}