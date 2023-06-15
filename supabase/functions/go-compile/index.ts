import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code, compile, fmt } = await req.json();
    // const goCode = 'package main\n\nimport "fmt";\n\nfunc main() {\n  fmt.Println("Hello, Guillaume")\n}';
    let data = {
      events: {},
      formated: ''
    };

    if (compile) {
      const form = new FormData();
      form.append('version', '2');
      form.append('body', code);
      const options = {
        method: 'POST',
        body: form,
        headers: new Headers({ 'User-Agent': 'mach10-app-go-compiler' })
      };
      const crudResponse = await fetch('https://go.dev/_/compile?backend=', options);
      const result = await crudResponse.json();
      data.events = result;
    }

    if (fmt) {
      const headers = new Headers();
      const urlencoded = new URLSearchParams();

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      urlencoded.append('imports', 'true');
      urlencoded.append('body', code);

      const options = {
        method: 'POST',
        headers: headers,
        body: urlencoded
      };

      const crudResponse = await fetch('https://go.dev/_/fmt?backend=', options);
      const result = await crudResponse.json();
      data.formated = result;
    }

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
curl -i --location --request POST 'https://teenfvdmlapuzevrxwtl.supabase.co/functions/v1/go-compile' \
  --header 'Content-Type: application/json' \
  --data '{"code":"package main\n\nimport \"fmt\";\n\nfunc main() {\n  fmt.Println(\"Hello,BARTO\")\n}"}'


  */
