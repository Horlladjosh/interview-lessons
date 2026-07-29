import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/slugify'
import LikeButton from '../../LikeButton'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ company: string }>
}

async function getCompanyLessons(companySlug: string) {
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('status', 'published')
    .eq('is_general', false)
    .order('created_at', { ascending: false })

  const matching = (allLessons || []).filter(
    (lesson) => lesson.company && slugify(lesson.company) === companySlug
  )

  return matching
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params
  const lessons = await getCompanyLessons(company)
  const companyName = lessons[0]?.company || company.replace(/-/g, ' ')

  return {
    title: `${companyName} Interview Lessons`,
    description: `Read anonymous lessons learned from people who interviewed at ${companyName}.`,
  }
}

export default async function CompanyPage({ params }: Props) {
  const { company } = await params
  const lessons = await getCompanyLessons(company)
  const companyName = lessons[0]?.company || company.replace(/-/g, ' ')

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: 8 }}>
        {companyName} Interview Lessons
      </h1>
      <p style={{ color: '#8A8A85', marginBottom: 32 }}>
        {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} shared
      </p>

      {lessons.length === 0 && (
        <p style={{ color: '#8A8A85' }}>No lessons yet for this company.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{ border: '1px solid #E5E5E0', borderRadius: 10, padding: 24, background: 'white' }}
          >
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span style={tagStyle}>{lesson.role_industry_tag}</span>
              <span style={tagStyle}>{lesson.interview_stage.replace('_', ' ')}</span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{lesson.lesson_text}</p>
            <div style={{ marginTop: 12 }}>
              <LikeButton lessonId={lesson.id} initialCount={lesson.like_count} />
            </div>
          </div>
        ))}
      </div>
    </main>
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