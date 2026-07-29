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
       <section className="px-6 pt-36 pb-28 text-center">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-[#1A1A1A] mb-6 leading-[1.1]">
              Interviews teach you things.
              <br />
              Someone else needs to hear them.
            </h1>
            <p className="text-lg text-[#8A8A85] mb-8">
              Anonymous, searchable lessons from real interviews. No reviews, no salary noise.
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