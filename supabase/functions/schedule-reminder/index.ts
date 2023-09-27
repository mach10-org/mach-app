// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.2'
import dayjs from 'https://esm.sh/dayjs@1.11.9'
import isoWeek from 'https://esm.sh/dayjs@1.11.9/plugin/isoWeek'
import utc from 'https://esm.sh/dayjs@1.11.9/plugin/utc'
import { I18n } from 'https://esm.sh/i18n-js@4.3.2'
import { corsHeaders } from '../_shared/cors.ts'
import { Database } from '../../../types/database.types.ts'
import senderInfos from '../_shared/sender-infos.ts'
import enTranslations from '../_locales/en.json' assert { type: 'json' }
import jaTranslations from '../_locales/ja.json' assert { type: 'json' }

dayjs.extend(isoWeek)
dayjs.extend(utc)

const i18n = new I18n({ en: enTranslations, ja: jaTranslations })
i18n.locale = Deno.env.get('LOCALE') || 'ja'

const quotes = i18n.t('quotes') as Array<{ text: string, author: string }>

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
      {
        global: {
          // Needs to be invoked with the service api key to have all the schedule
          headers: { Authorization: req.headers.get('Authorization')! },
        },
        auth: { persistSession: false },
      },
    )

    const { time } = await req.json()
    let mTime = dayjs.utc(time)
    mTime = mTime.subtract(minutesBeforeSchedule, 'minute')

    const day = mTime.isoWeekday()
    const clock = mTime.format('HH:mm:00')

    console.info(`Start reminder for day "${day}", hour "${clock}"`)

    const { data: schedules, error: schedulesError } = await supabaseClient.from('schedule').select('*, profiles(email)').eq('day', day).eq('start', clock)

    if (schedulesError) { throw schedulesError }

    console.info(`${schedules?.length} reminder(s) to send`)

    if (schedules?.length === 0) {
      return new Response(JSON.stringify({ message: 'No reminder to send' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    let reminderSent = 0

    for await (const user of schedules) {
      const quote = quotes[Math.floor(Math.random() * quotes.length)]

      const url = Deno.env.get('URL') || ''

      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': Deno.env.get('BREVO_API_KEY') || '',
          },
          body: JSON.stringify({
            sender: senderInfos,
            to: [{ email: user.profiles?.email, name: user.profiles?.email }],
            subject: i18n.t('scheduleReminder.subject', { minutes: minutesBeforeSchedule, author: quote.author }),
            textContent: i18n.t('scheduleReminder.text', { quote: quote.text, minutes: minutesBeforeSchedule, author: quote.author, url }),
            htmlContent: i18n.t('scheduleReminder.html', { quote: quote.text, minutes: minutesBeforeSchedule, author: quote.author, url }),
          }),
        })

        reminderSent++
      } catch (error) {
        console.error(error)
      }
    }

    console.info(`${reminderSent} reminder(s) sent`)

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
//   --header 'Authorization: Bearer SERVICE_TOKEN' \
//   --header 'Content-Type: application/json' \
//   --data '{"time":"2023-09-12 03:15:53.091"}'
