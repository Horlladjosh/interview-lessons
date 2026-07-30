import { supabase } from '@/lib/supabase'
import HomeContent from './HomeContent'

export const revalidate = 0

export default async function HomePage() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return <HomeContent initialLessons={lessons || []} />
}