export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E0] mt-16 py-6">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-[#8A8A85]">© 2026 OneLesson</p>
        <a
          href="https://twitter.com/horllad_josh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8A8A85] hover:text-[#3D5A4C] transition-colors"
        >
          Built by Horlladjosh
        </a>
      </div>
    </footer>
  )
}