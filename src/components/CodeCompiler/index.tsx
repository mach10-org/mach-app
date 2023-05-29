import React, { useEffect, useRef, useState } from 'react';
import GlotAPI from 'glot-api';
import { editor } from 'monaco-editor';
// import { Editor } from '@monaco-editor/react';
import { Editor, DiffEditor, useMonaco, loader, OnMount } from '@monaco-editor/react';
//https://github.com/enkidevs/glot-api
const token = 'f2c16827-22c0-4cdf-8bec-5b3ee5c4eb37'; // If you are logged in you will find your token here:  https://glot.io/account/token
const glot = new GlotAPI(token);
export interface Langages {
  url: string;
  name: string;
}
let langages: Langages[] | null = null;

/*
try {
  // const response = await glot.run('javascript', gloTdata);
  // console.log('response', response);
} catch (error) {
  console.log('error', error);
}
*/
const CodeCompiler = () => {
  const editorRef = useRef<editor.ICodeEditor>();
  const [langages, setLangages] = useState<Langages[]>();

  useEffect(() => {
    // declare the data fetching function
    const getLangages = async () => {
      const res = await glot.languages({ limit: 200 }); // handle pagination automatically
      setLangages[res];
    };
    // call the function
    getLangages().catch((error) => {
      console.log('error', error);
    });
  }, []);

  const handleEditorChange = (value, event) => {
    // here is the current value
    console.log('handleEditorChange', value, event);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  };

  const handleEditorWillMount = (monaco) => {
    console.log('beforeMount: the monaco instance:', monaco);
  };

  const handleEditorValidation = (markers) => {
    console.log('handleEditorValidation', markers);
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  };

  const showValue = async () => {
    const content = editorRef?.current?.getValue();
    console.log('content', content);
    const gloTdata = { files: [{ name: 'main.js', content }], stdin: '', command: '' };

    try {
      const response = await glot.run('javascript', gloTdata);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };
  // return <Editor height='90vh' defaultLanguage='javascript' defaultValue='' />;
  return (
    <>
      <div>
        <h3>Langages availables</h3>
        {langages?.length === 0 && <p>Aucun</p>}
        {langages?.map((langage) => (
          <>
            <span>{langage.name}</span>,
          </>
        ))}
      </div>
      <button onClick={showValue}>Run code</button>
      <Editor
        height='40vh'
        defaultLanguage='javascript'
        defaultValue={'console.log("test");'}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
    </>
  );
};

const defaultValue = `<?php
// The next line contains a syntax error:
if () {
	return "The parser recovers from this type of syntax error";
}
?>
<html>
<head>
	<title>Example page</title>
</head>

<body>

<script type="text/javascript">
	// Some PHP embedded inside JS
	// Generated <?=date('l, F jS, Y')?>
	
	var server_token = <?=rand(5, 10000)?>
	if (typeof server_token === 'number') {
		alert('token: ' + server_token);
	}
</script>

<div>
Hello
<? if (isset($user)) { ?>
	<b><?=$user?></b>
<? } else { ?>
	<i>guest</i>
<? } ?>
!
</div>

<?php

	/* Example PHP file
	multiline comment
	*/

	$cards = array("ah", "ac", "ad", "as",
		"2h", "2c", "2d", "2s",
		"3h", "3c", "3d", "3s",
		"4h", "4c", "4d", "4s",
		"5h", "5c", "5d", "5s",
		"6h", "6c", "6d", "6s",
		"7h", "7c", "7d", "7s",
		"8h", "8c", "8d", "8s",
		"9h", "9c", "9d", "9s",
		"th", "tc", "td", "ts",
		"jh", "jc", "jd", "js",
		"qh", "qc", "qd", "qs",
		"kh", "kc", "kd", "ks");

	srand(time());

	for($i = 0; $i < 52; $i++) {
		$count = count($cards);
		$random = (rand()%$count);

		if($cards[$random] == "") {
			$i--;
		} else {
			$deck[] = $cards[$random];
			$cards[$random] = "";
		}
	}

	srand(time());
	$starting_point = (rand()%51);
	print("Starting point for cut cards is: $starting_point<p>");

	// display shuffled cards (EXAMPLE ONLY)
	for ($index = 0; $index < 52; $index++) {
		if ($starting_point == 52) { $starting_point = 0; }
		print("Uncut Point: <strong>$deck[$index]</strong> ");
		print("Starting Point: <strong>$deck[$starting_point]</strong><br>");
		$starting_point++;
	}
?>

</body>
</html>`;

export default CodeCompiler;
