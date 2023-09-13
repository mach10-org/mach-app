// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.2'
import dayjs from 'https://esm.sh/dayjs@1.11.9'
import isoWeek from 'https://esm.sh/dayjs@1.11.9/plugin/isoWeek'
import utc from 'https://esm.sh/dayjs@1.11.9/plugin/utc'
import { corsHeaders } from '../_shared/cors.ts'
import { Database } from '../../../types/database.types.ts'
import quotes from './quotes.ts'

dayjs.extend(isoWeek)
dayjs.extend(utc)

const minutesBeforeSchedule = 15

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }, // Needs to be invoked with the service api key to have all the schedule
    )

    const { time } = await req.json()
    let mTime = dayjs.utc(time)
    mTime = mTime.subtract(minutesBeforeSchedule, 'minute')

    const day = mTime.isoWeekday()
    const clock = mTime.format('HH:mm:00')

    console.info(`Start reminder for day "${day}", hour "${clock}"`)

    const { data: schedules, error: schedulesError } = await supabaseClient.from('schedule').select().eq('day', day).eq('start', clock)

    if (schedulesError) { throw schedulesError }

    console.info(`${schedules?.length} reminder(s) to send`)

    if (schedules?.length === 0) {
      return new Response(JSON.stringify({ message: 'No reminder to send' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const { data: { users }, error: usersError } = await supabaseClient.auth.admin.listUsers({
      page: 1,
      perPage: 9999999999999,
    })

    if (schedulesError) { throw usersError }

    const usersToRemind = users.filter(user => schedules.some(schedule => schedule.user_id === user.id))

    console.info(`${usersToRemind?.length} user(s) found`)

    const mach10 = {
      email: 'hello@mach10.jp',
      name: 'Mach10',
    }

    let reminderSent = 0

    for await (const user of usersToRemind) {
      const quote = quotes[Math.floor(Math.random() * quotes.length)]

      const textContent = `${quote.text}
- ${quote.author}

See you on Mach10 in ${minutesBeforeSchedule} minutes!

Mach10 team
https://mach10.jp`

      const htmlContent = `<html><head></head><body>
<p><i>${quote.text}</i><br/>
- ${quote.author}
</p>

<p>
See you on Mach10 in ${minutesBeforeSchedule} minutes!
</p>

<p>
Mach10 team<br/>
<a href="https://mach10.jp">https://mach10.jp</a>
</p>
</body></html>`

      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': Deno.env.get('BREVO_API_KEY') || '',
          },
          body: JSON.stringify({
            sender: mach10,
            to: [{ email: user.email, name: user.email }],
            subject: `Your learning is about to start in ${minutesBeforeSchedule} minutes and a few words from ${quote.author}`,
            textContent,
            htmlContent,
          }),
        })

        reminderSent++
      } catch (error) {
        console.error(error)
      }
    }

    return new Response(JSON.stringify({ reminderSent, reminderToSend: usersToRemind.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/schedule-reminder' \
//   --header 'Authorization: Bearer SERVICE_TOKEN' \
//   --header 'Content-Type: application/json' \
//   --data '{"time":"2023-09-12 03:15:53.091"}'
