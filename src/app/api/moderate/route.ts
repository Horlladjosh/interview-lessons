import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const RUBRIC_PROMPT = `You are a content moderator for an anonymous platform where people share ONE lesson learned from a job interview experience.

Flag the post if it does ANY of the following:
- Names a specific person (an interviewer, recruiter, etc. by name)
- Has no actionable takeaway (isn't shaped as a lesson someone else could learn from)
- Reads as pure venting/complaining, with no reflection or lesson
- Accuses a specific company of wrongdoing
- Accuses a specific person of wrongdoing
- Reproduces a specific interview question, case study, or technical problem in detailed, verbatim-like form, rather than describing the lesson learned from it

Respond ONLY with valid JSON, no other text, in this exact format:
{"flagged": true or false, "reason": "short specific reason if flagged, empty string if not"}

Here is the post to evaluate:
"""
{{POST_TEXT}}
"""`

export async function POST(request: Request) {
  try {
    const { lessonText } = await request.json()

    if (!lessonText || lessonText.trim().length === 0) {
      return NextResponse.json({ error: 'No lesson text provided' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })
    const prompt = RUBRIC_PROMPT.replace('{{POST_TEXT}}', lessonText)

    const result = await model.generateContent(prompt)
    const responseText = result.response.text().trim()

    // Strip markdown code fences if Gemini wraps the JSON in them
    const cleaned = responseText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json({
      flagged: Boolean(parsed.flagged),
      reason: parsed.reason || '',
    })
  } catch (error) {
    console.error('Moderation check failed:', error)
    // Fail safe: if the AI check itself errors, treat as flagged so a human reviews it
    return NextResponse.json({
      flagged: true,
      reason: 'Automatic check unavailable — sent for manual review.',
    })
  }
}