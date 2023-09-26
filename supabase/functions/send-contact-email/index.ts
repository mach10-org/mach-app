import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import senderInfos from '../_shared/sender-infos.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { subject, email, name, message, topic } = await req.json()

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': Deno.env.get('BREVO_API_KEY') || '',
      },
      body: JSON.stringify({
        sender: senderInfos,
        to: [senderInfos],
        replyTo: { email, name },
        subject: `[Mach10 contact form] ${subject}`,
        textContent: message,
        htmlContent: `<html><head></head><body>
        <p><b>From:</b> ${name} - ${email}</p>
        <p><b>Topic:</b> ${topic}</p>
        <p><b>Message:</b></br>${message}</p>
        </body></html>`,
      }),
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', options)
    const result = await response.json()
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
