// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.2'
import dayjs from 'https://esm.sh/dayjs@1.11.9'
import 'https://esm.sh/dayjs@1.11.9/locale/ja'
import utc from 'https://esm.sh/dayjs@1.11.9/plugin/utc'
import isoWeek from 'https://esm.sh/dayjs@1.11.9/plugin/isoWeek'
import customParseFormat from 'https://esm.sh/dayjs@1.11.9/plugin/customParseFormat'
import { I18n } from 'https://esm.sh/i18n-js@4.3.2'
import { corsHeaders } from '../_shared/cors.ts'
import { Database } from '../../../types/database.types.ts'
import senderInfos from '../_shared/sender-infos.ts'
import enTranslations from '../_locales/en.json' assert { type: 'json' }
import jaTranslations from '../_locales/ja.json' assert { type: 'json' }

dayjs.extend(isoWeek)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

const i18n = new I18n({ en: enTranslations, ja: jaTranslations })
const locale = Deno.env.get('LOCALE') || 'ja'
i18n.locale = locale
dayjs.locale(locale)

const quotes = i18n.t('quotes') as Array<{ text: string, author: string }>

const hoursMissed = 2

serve(async (req) => {
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
    mTime = mTime.subtract(hoursMissed, 'hours')

    const day = mTime.isoWeekday()
    const clock = mTime.format('HH:mm:00')

    // Select people that had an end schedule after `hoursMissed` hours
    const { data, error } = await supabaseClient.from('last_url_per_schedule').select('id, full_name, email, updated_at, start, end, day_start').eq('day_end', day).eq('end', clock)

    if (error) { throw error }

    let emailSent = 0

    for await (const user of data) {
      const start = dayjs.utc(user.start, 'HH:mm:00')
      const startDate = mTime.clone().isoWeekday(user.day_start!).hour(start.hour()).minute(start.minute()).second(start.second())

      const lastUrl = dayjs(user.updated_at)

      // If the last url is before the startDate (with 1 hour delta), it means the user didn't connect, so we send the email
      if (lastUrl.isBefore(startDate.subtract(1, 'hour'))) {
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
              to: [{ email: user.email, name: user.email }],
              subject: i18n.t('missedSession.subject', { name: user.full_name, url }),
              textContent: i18n.t('missedSession.text', { name: user.full_name, url, quote: quote.text, author: quote.author }),
              htmlContent: i18n.t('missedSession.html', { name: user.full_name, url, quote: quote.text, author: quote.author }),
            }),
          })

          emailSent++
        } catch (error) {
          console.error(error)
        }
      }
    }

    console.info(`${emailSent} email(s) sent`)

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
// curl -i --location --request POST 'http://localhost:54321/functions/v1/missed-session' \
//   --header 'Authorization: Bearer SERVICE_TOKEN' \
//   --header 'Content-Type: application/json' \
//   --data '{"time":"2023-09-12 03:15:53.091"}'
