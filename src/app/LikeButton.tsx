'use client'

import { useState, useEffect } from 'react'
import { getAnonId, getLikedLessons, addLikedLesson } from '@/lib/session'

export default function LikeButton({
  lessonId,
  initialCount,
}: {
  lessonId: string
  initialCount: number
}) {
  const [count, setCount] = useState(initialCount)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const likedLessons = getLikedLessons()
    if (likedLessons.includes(lessonId)) {
      setLiked(true)
    }
  }, [lessonId])

  const handleLike = async () => {
    if (liked) return

    // Optimistic update, happens instantly
    setLiked(true)
    setCount((c) => c + 1)
    addLikedLesson(lessonId)

    const anonId = getAnonId()
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, anonId }),
    })

    if (!res.ok && res.status !== 409) {
      // Roll back only on a real failure, not "already liked"
      setLiked(false)
      setCount((c) => c - 1)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className="flex items-center gap-1.5 text-sm font-medium disabled:cursor-default"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={liked ? '#D9534F' : 'none'}
        stroke={liked ? '#D9534F' : '#8A8A85'}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className={liked ? 'text-[#D9534F]' : 'text-[#8A8A85]'}>{count}</span>
    </button>
  )
}