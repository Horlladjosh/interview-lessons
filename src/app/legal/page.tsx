export default function LegalPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Terms & Privacy</h1>
      <p className="text-[#8A8A85] mb-10">Last updated July 2026</p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Terms of Use</h2>
        <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
          <p>
            OneLesson is an anonymous platform for sharing individual lessons
            learned from job interview experiences. By submitting a lesson,
            you agree to the following:
          </p>
          <p>
            <strong>1. Your submission is your own experience.</strong> You
            confirm that what you post reflects something you personally
            learned from an interview, not a secondhand account or something
            you&apos;ve fabricated.
          </p>
          <p>
            <strong>2. No confidential or proprietary material.</strong> Do
            not post specific interview questions, case study content,
            proprietary business information, or anything you agreed to keep
            confidential (including under an NDA). Focus on the lesson you
            took away, not the specific details of what was asked or
            discussed.
          </p>
          <p>
            <strong>3. No identifying individuals.</strong> Do not name or
            otherwise identify a specific interviewer, recruiter, or other
            individual in your submission.
          </p>
          <p>
            <strong>4. Moderation.</strong> Submissions are checked against
            these guidelines before or shortly after publishing. We reserve
            the right to remove any submission, at any time, for any reason,
            including content that violates these terms.
          </p>
          <p>
            <strong>5. No warranty.</strong> Lessons shared on this platform
            are personal opinions and experiences. We do not verify the
            accuracy of any submission and are not responsible for decisions
            made based on content read here.
          </p>
          <p>
            <strong>6. Limitation of liability.</strong> OneLesson and its
            operator are not liable for any damages arising from your use of
            this site or reliance on content submitted by others.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Privacy Policy</h2>
        <div className="space-y-4 text-[#1A1A1A] leading-relaxed">
          <p>
            OneLesson is built to be used anonymously. We do not require or
            collect names, email addresses, or any other personally
            identifying information to submit a lesson or use the site.
          </p>
          <p>
            <strong>What we store:</strong> a randomly generated identifier
            is stored in your browser&apos;s local storage to prevent
            duplicate likes on the same lesson. This identifier is not linked
            to any personal information and cannot be used to identify you.
          </p>
          <p>
            <strong>What we don&apos;t do:</strong> we do not sell, share, or
            use any data for advertising. We do not track you across other
            sites.
          </p>
          <p>
            <strong>Submitted content:</strong> the text of a lesson you
            submit is stored and displayed publicly once published. Do not
            include any information in your submission that you would not
            want made public, since submissions are anonymous but
            irreversible once shared.
          </p>
          <p>
            If you have questions about this policy, you can reach out via
            the contact link in the site footer.
          </p>
        </div>
      </section>
    </main>
  )
}