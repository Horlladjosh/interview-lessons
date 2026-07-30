'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import LessonBrowser from './LessonBrowser'
import Footer from './Footer'
import SubmitModal from './SubmitModal'

type Lesson = {
  id: string
  lesson_text: string
  company: string | null
  is_general: boolean
  role_industry_tag: string
  interview_stage: string
  like_count: number
  created_at: string
}

export default function HomePage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [showModal, setShowModal] = useState(false)

  const loadLessons = async () => {
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    setLessons(data || [])
  }

  useEffect(() => {
    loadLessons()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
       <section className="px-6 pt-32 pb-24 text-center">
  <div className="max-w-5xl mx-auto">
    <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.95]">
      The interview ends,
      <br />
      <span className="text-[#3D5A4C]">The lesson shouldn't.</span>
    </h1>
    <p className="text-lg text-[#8A8A85] mb-10 max-w-xl mx-auto leading-relaxed">
      A searchable, anonymous record of what people actually learned from
      interviewing, the small moments that shifted how they show up next
      time. No reviews, no salary talk, just the lesson.
    </p>
    <button
      onClick={() => setShowModal(true)}
      className="inline-block px-7 py-3 bg-[#3D5A4C] text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#5C7A6A] transition-colors"
    >
      Share a lesson
    </button>
  </div>
</section>

        {/* Lessons */}
        <section className="max-w-[1400px] mx-auto px-6 pb-16">
          <LessonBrowser lessons={lessons} />
        </section>
      </main>

      <Footer />

      {showModal && <SubmitModal onClose={() => { setShowModal(false); loadLessons(); }} />}
    </div>
  )
}