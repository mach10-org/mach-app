// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "browser-with-cors" up and running!`);

console.log(`Function "browser-with-cors" up and running!`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name } = await req.json();
    const data = {
      message: `Hello ${name}!`
    };

    return new Response(JSON.stringify(data), {
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
/*
// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { serve } from 'std/server';

import { corsHeaders } from '../_shared/cors.js';

console.log('Hello from Functions!');
console.log(`Function "browser-with-cors" up and running!`);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // const { name } = await req.json();
  // let data = {
  //   message: `Hello ${name}!`
  // };
  const goCode = 'package main\n\nimport "fmt";\n\nfunc main() {\n  fmt.Println("Hello, Hrishi")\n}';

  try {
    const { code } = await req.json();

    let data = {};
    const form = new FormData();
    form.append('version', '2');
    form.append('body', code);
    const options = {
      method: 'POST',
      body: form,
      headers: new Headers({ 'User-Agent': 'your unique user agent' })
    };

    const crudResponse = await fetch('https://go.dev/_/compile?backend=', options);
    data = await crudResponse.json();

    return new Response(JSON.stringify(data), {
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

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/hello-world' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"code":"package main\n\nimport \"fmt\";\n\nfunc main() {\n  fmt.Println(\"Hello, Hrishi\")\n}"}'
*/
