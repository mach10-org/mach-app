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

    // const { time } = await req.json()
    // const mTime = dayjs.utc(time)
    let mTime = dayjs.utc('2023-09-12 03:15:53.091')
    mTime = mTime.subtract(minutesBeforeSchedule, 'minute')

    const day = mTime.isoWeekday()
    const clock = mTime.format('HH:mm:00')
    console.log(day, clock)

    const { data: schedules, error: schedulesError } = await supabaseClient.from('schedule').select().eq('day', day).eq('start', clock)
    console.log(schedules)

    if (schedulesError) { throw schedulesError }

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
    console.log(users)

    if (schedulesError) { throw usersError }

    // TODO send emails

    return new Response(JSON.stringify({ message: 'ok' }), {
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
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU' \
//   --header 'Content-Type: application/json' \
//   --data '{"time":"Functions"}'
