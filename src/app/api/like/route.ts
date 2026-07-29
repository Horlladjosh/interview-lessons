import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { lessonId, anonId } = await request.json()

    if (!lessonId || !anonId) {
      return NextResponse.json({ error: 'Missing lessonId or anonId' }, { status: 400 })
    }

    // Check if this anon ID already liked this lesson
    const { data: existing } = await supabase
      .from('likes')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('session_or_anon_id', anonId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'Already liked' }, { status: 409 })
    }

    // Insert the like
    const { error: likeError } = await supabase
      .from('likes')
      .insert({ lesson_id: lessonId, session_or_anon_id: anonId })

    if (likeError) {
      return NextResponse.json({ error: likeError.message }, { status: 500 })
    }

    // Increment the like_count on the lesson
    const { error: rpcError } = await supabase.rpc('increment_like_count', {
      lesson_id_input: lessonId,
    })

    if (rpcError) {
      return NextResponse.json({ error: rpcError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}