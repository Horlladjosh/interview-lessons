import LessonForm from '../LessonForm'

export default function SubmitPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Share a lesson</h1>
      <p className="text-[#8A8A85] mb-8">One takeaway. Someone else needs to hear it.</p>
      <LessonForm />
    </main>
  )
}