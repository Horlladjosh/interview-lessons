import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const seedLessons = [
  {
    lesson_text: "They gave me a graph traversal problem and I went straight for DFS because that's my default. Halfway through, the interviewer asked what happens with a graph that has a million nodes and a shallow depth. My DFS would've blown the stack. I hadn't thought about input size at all until he asked. Now the first thing I say out loud in any coding round is 'what's the realistic scale here' before I pick an approach.",
    company: 'Google', is_general: false, role_industry_tag: 'Software Engineering', interview_stage: 'technical_round',
  },
  {
    lesson_text: "Got the offer, base was solid but the sign-on bonus was split oddly, half at 6 months and half at 18. I asked if it could be front-loaded since I was walking away from unvested equity at my current job. They moved it to a 60/40 split without blinking. I almost didn't ask because the number on paper looked fine at first glance.",
    company: 'Amazon', is_general: false, role_industry_tag: 'Product Management', interview_stage: 'offer_stage',
  },
  {
    lesson_text: "Recruiter asked what campaigns I'd run in the last year and I listed five of them fast, thinking breadth would impress her. She stopped me and asked for the actual conversion lift on just one. I didn't have the number memorized and it clearly cost me. Now I keep three campaigns with real metrics ready, not a list of everything I've touched.",
    company: null, is_general: true, role_industry_tag: 'Marketing', interview_stage: 'phone_screen',
  },
  {
    lesson_text: "The relocation package covered the move itself but I never asked about tax equalization on the relocation bonus, since it gets taxed as income. Found out during my first paycheck that almost a third of it was gone to taxes I hadn't budgeted for. Should've asked HR directly about the net amount before accepting, not the gross number in the offer letter.",
    company: 'Microsoft', is_general: false, role_industry_tag: 'Data Analytics', interview_stage: 'offer_stage',
  },
  {
    lesson_text: "Whiteboard exercise, design a checkout flow. I drew the happy path in about four minutes and felt good about it. Interviewer then asked what happens when the payment fails halfway through. I had nothing, no error states, no retry logic sketched at all. Now I sketch the failure paths before the happy path, since that's apparently what they're actually testing for.",
    company: null, is_general: true, role_industry_tag: 'Product Design', interview_stage: 'technical_round',
  },
  {
    lesson_text: "Signed fast because the base number was great. Nobody mentioned the visa transfer would take four months of unpaid gap between my current job ending and the new one starting, since my old visa was tied to my previous employer. Should have asked legal/immigration directly about the timeline before resigning from my old job, not assumed HR's general timeline applied to my specific visa type.",
    company: 'Meta', is_general: false, role_industry_tag: 'Software Engineering', interview_stage: 'offer_stage',
  },
  {
    lesson_text: "Was asked directly why I was leaving my current firm. I said 'looking for growth,' which is the answer everyone gives. One panelist just said 'okay but really, why.' I panicked for a second then told the truth, that I'd been passed over for a promotion twice. She nodded and moved on, and I got the offer. I think the vague answer would've actually hurt me more than the honest one.",
    company: null, is_general: true, role_industry_tag: 'Finance', interview_stage: 'final_onsite',
  },
  {
    lesson_text: "Take-home was a churn prediction model. I got decent accuracy but never explained my feature selection reasoning in the writeup, just the results. In the follow-up call they spent the whole time asking why I picked those specific features over others I'd left out. I didn't have good answers because I hadn't actually thought hard about that part, I'd just thrown a bunch of features into a random forest.",
    company: 'Netflix', is_general: false, role_industry_tag: 'Data Science', interview_stage: 'technical_round',
  },
  {
    lesson_text: "Asked to describe managing someone through a layoff. I gave a careful, generic answer about being 'compassionate and transparent.' The panel asked what I actually said to the person, word for word if I could remember. I couldn't, because I'd avoided thinking about the actual conversation and jumped straight to the values-speak version. Now I rehearse the literal words I'd use, not just the intention behind them.",
    company: null, is_general: true, role_industry_tag: 'Engineering Management', interview_stage: 'final_onsite',
  },
  {
    lesson_text: "Presented a campaign concept for one of their regional brands. Got asked what the media budget split would be across TV versus digital for that specific market. I said 'mostly digital' with no number. One panelist pushed for an actual percentage and I made one up on the spot, badly. Should have come with at least a rough split memorized for whichever region they'd likely ask about.",
    company: 'Coca-Cola', is_general: false, role_industry_tag: 'Marketing', interview_stage: 'final_onsite',
  },
  {
    lesson_text: "Negotiated base up by a small amount but completely skipped asking about the vesting cliff on equity. Found out later it was a full 12-month cliff with nothing vesting before that. If I'd known, I would've negotiated a signing bonus instead to cover that gap, since I ended up needing cash in month 8 and had zero equity to show for it yet.",
    company: null, is_general: true, role_industry_tag: 'Software Engineering', interview_stage: 'offer_stage',
  },
  {
    lesson_text: "Case was about a retailer losing market share. I opened with a full profitability framework, revenue minus costs, before even asking what specific problem the client cared about. Interviewer let me go for two minutes then asked 'do you know if this is even a profitability issue.' It wasn't, it was a customer churn issue, and I'd wasted half the case on the wrong tree entirely.",
    company: 'Deloitte', is_general: false, role_industry_tag: 'Consulting', interview_stage: 'technical_round',
  },
  {
    lesson_text: "Asked what kind of team environment I work best in. I said 'collaborative and fast-paced' on autopilot. Recruiter followed up asking what that actually looks like day to day for me. I fumbled because I'd never actually defined it for myself, just repeated the phrase from a job posting I'd read. Sat down after that call and actually wrote out three specific things I need from a team, and my answers got way sharper after.",
    company: null, is_general: true, role_industry_tag: 'Customer Success', interview_stage: 'phone_screen',
  },
  {
    lesson_text: "Given a scenario where a feature's engagement dropped 15% post-launch. I jumped straight into three fixes. Interviewer asked what I'd want to check first before touching anything, specifically whether it was a measurement issue versus a real behavior change. I hadn't considered that the drop itself might be a tracking bug. Now the first thing I say in any 'metric went down' question is how I'd verify the metric is even being measured correctly.",
    company: 'Spotify', is_general: false, role_industry_tag: 'Product Management', interview_stage: 'final_onsite',
  },
  {
    lesson_text: "Accepted an offer with a relocation stipend that I assumed covered temporary housing since that's standard everywhere I'd worked before. It didn't, it was strictly a moving-company reimbursement. Found out three weeks before my move date when I asked HR to confirm hotel costs would be covered. Ask for the exact line items the stipend covers, don't assume it matches what a previous employer did.",
    company: null, is_general: true, role_industry_tag: 'Software Engineering', interview_stage: 'offer_stage',
  },
  {
    lesson_text: "Walked through a process improvement I'd led, focused entirely on the before-and-after metrics. Interviewer stopped me and asked how I got the warehouse team to actually adopt the new process, since change like that usually meets resistance. I hadn't prepped that part at all because I'd assumed the metrics would speak for themselves. They wanted the messy adoption story, not just the clean result.",
    company: null, is_general: true, role_industry_tag: 'Operations', interview_stage: 'technical_round',
  },
  {
    lesson_text: "Asked how I'd handle a disagreement with an engineer who thought a feature was technically infeasible in the timeline. I described a general compromise approach. Follow-up question was what I'd actually do if the engineer still said no after that conversation, specifically who I'd escalate to and how I'd frame it. I hadn't thought past the first conversation, and it was obvious I didn't have an answer for when things don't resolve nicely.",
    company: 'Airbnb', is_general: false, role_industry_tag: 'Product Design', interview_stage: 'final_onsite',
  },
]

async function seed() {
  console.log(`Seeding ${seedLessons.length} lessons...`)

  for (const lesson of seedLessons) {
    const { error } = await supabase.from('lessons').insert({
      ...lesson,
      status: 'published',
      flag_reason: null,
      like_count: 0,
    })

    if (error) {
      console.error('Failed to insert:', lesson.lesson_text.slice(0, 40), error.message)
    } else {
      console.log('Inserted:', lesson.lesson_text.slice(0, 40) + '...')
    }
  }

  console.log('Done seeding.')
}

seed()