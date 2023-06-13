import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    // const goCode = 'package main\n\nimport "fmt";\n\nfunc main() {\n  fmt.Println("Hello, Guillaume")\n}';
    const form = new FormData();
    form.append('version', '2');
    form.append('body', code);
    const options = {
      method: 'POST',
      body: form,
      headers: new Headers({ 'User-Agent': 'mach10-app-go-compiler' })
    };

    const crudResponse = await fetch('https://go.dev/_/compile?backend=', options);
    const data = await crudResponse.json();
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
/*
curl -i --location --request POST 'https://teenfvdmlapuzevrxwtl.supabase.co/functions/v1/hello-world' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"code":"package main\n\nimport \"fmt\";\n\nfunc main() {\n  fmt.Println(\"Hello,BARTO\")\n}"}'


curl -i --location --request POST 'https://teenfvdmlapuzevrxwtl.supabase.co/functions/v1/go-compile' \  
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"code":"package main\n\nimport \"fmt\";\n\nfunc main() {\n  fmt.Println(\"Hello,BARTO\")\n}"}'
  */
