'use client'

import LessonForm from './LessonForm'

export default function SubmitModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#1A1A1A]">Share a lesson</h2>
          <button onClick={onClose} className="text-[#8A8A85] text-2xl leading-none cursor-pointer hover:text-[#1A1A1A] transition-colors">
  &times;
</button>
        </div>
        <LessonForm onSuccess={onClose} />
      </div>
    </div>
  )
}