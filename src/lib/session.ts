export function getAnonId(): string {
  if (typeof window === 'undefined') return ''

  let anonId = localStorage.getItem('anon_id')
  if (!anonId) {
    anonId = crypto.randomUUID()
    localStorage.setItem('anon_id', anonId)
  }
  return anonId
}

export function getLikedLessons(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('liked_lessons')
  return stored ? JSON.parse(stored) : []
}

export function addLikedLesson(lessonId: string) {
  const liked = getLikedLessons()
  liked.push(lessonId)
  localStorage.setItem('liked_lessons', JSON.stringify(liked))
}