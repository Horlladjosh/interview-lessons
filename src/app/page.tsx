import { supabase } from '@/lib/supabase'
import LessonBrowser from './LessonBrowser'

export const revalidate = 0

export default async function HomePage() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: 8 }}>
        Interview Lessons
      </h1>
      <p style={{ color: '#8A8A85', marginBottom: 32 }}>
        One lesson at a time, from real interviews.
      </p>

      <a
        href="/submit"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          background: '#3D5A4C',
          color: 'white',
          borderRadius: 8,
          textDecoration: 'none',
          marginBottom: 32,
          fontSize: '0.85rem',
        }}
      >
        Share a lesson
      </a>

      {error && <p>Something went wrong loading lessons.</p>}

      <LessonBrowser lessons={lessons || []} />
    </main>
  )
}