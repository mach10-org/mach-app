// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.2'
import dayjs from 'https://esm.sh/dayjs@1.11.9'
import utc from 'https://esm.sh/dayjs@1.11.9/plugin/utc'
import { corsHeaders } from '../_shared/cors.ts'
import { Database } from '../../../types/database.types.ts'
import senderInfos from '../_shared/sender-infos.ts'

dayjs.extend(utc)

const weeksMissed = 2

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

    // Select people that didn't attend sessions
    const { data, error } = await supabaseClient.from('last_url_schedule').select('id, url, title, main, full_name, course_title, email').lt('updated_at', dayjs.utc(time).subtract(weeksMissed, 'week').format('YYYY-MM-DD HH:mm:ss'))

    if (error) { throw error }

    let emailSent = 0

    for await (const user of data) {
      const completionDate = dayjs.utc(time).add(4, 'week').format('MMMM DD, YYYY')

      const textContent = `Life get busy sometimes and it’s hard to keep up. Visualizing your goal can be a great help. Think of ${completionDate}, you wake up, and you realize what you just accomplished. A new skillset, plenty of new opportunities, the ability to work for yourself or create your dream startup. You did the hardest thing ${user.full_name}, you dared to start. Most people don’t even try. Keep it up, you got this :)
Remember, struggling means learning.

Resume course: ${Deno.env.get('URL') || ''}${user.url}

Feeling down or lack motivation? Tell us more. ${Deno.env.get('URL') || ''}/feedback

Mach10 team
${Deno.env.get('URL') || ''}`

      const htmlContent = `<html><head></head><body>
<p>
Life get busy sometimes and it’s hard to keep up. Visualizing your goal can be a great help. Think of ${completionDate}, you wake up, and you realize what you just accomplished. A new skillset, plenty of new opportunities, the ability to work for yourself or create your dream startup. You did the hardest thing ${user.full_name}, you dared to start. Most people don’t even try. Keep it up, you got this :)
</p>

<p>
Remember, struggling means learning.
</p>

<p>
<a href="${Deno.env.get('URL') || ''}${user.url}">Resume course</a>
</p>

<p>
Feeling down or lack motivation? <a href="${Deno.env.get('URL') || ''}/feedback">Tell us more.</a>
</p>

<p>
Mach10 team<br/>
<a href="${Deno.env.get('URL') || ''}">${Deno.env.get('URL') || ''}</a>
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
            sender: senderInfos,
            to: [{ email: user.email, name: user.email }],
            subject: `${user.full_name} your course "${user.course_title}"`,
            textContent,
            htmlContent,
          }),
        })

        emailSent++
      } catch (error) {
        console.error(error)
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
// curl -i --location --request POST 'http://localhost:54321/functions/v1/missed-sessions' \
//   --header 'Authorization: Bearer SERVICE_TOKEN' \
//   --header 'Content-Type: application/json' \
//   --data '{"time":"2023-09-12 03:15:53.091"}'
