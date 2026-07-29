import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-[#1A1A1A] no-underline">
          Interview Lessons
        </Link>
        <Link
  href="/submit"
  className="text-sm font-semibold px-4 py-2 rounded-lg border border-[#E5E5E0] text-[#1A1A1A] no-underline cursor-pointer hover:border-[#3D5A4C] hover:text-[#3D5A4C] transition-colors"
>
  Share a lesson
</Link>
      </div>
    </header>
  )
}