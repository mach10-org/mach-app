import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { subject, email, name, message, topic } = await req.json();

    const mach10 = {
      email: 'hello@mach10.jp',
      // email: 'guillaumebartolini@gmail.com', // Test width mail sender
      name: 'Mach10'
    };

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        sender: { name: `${mach10.name} - Contact form`, email: mach10.email },
        to: [mach10],
        replyTo: { email, name },
        subject: 'test send via edge function',
        textContent: 'test send via edge function',
        htmlContent: `<html><head></head><body>
        <p><b>From:</b> ${name} - ${email}</p>
        <p><b>Topic:</b> ${topic}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></br>${message}</p>
        </body></html>`
      })
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', options);
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
