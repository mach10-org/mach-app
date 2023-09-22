---
title: 正規表現
description: 正規表現を使って作業する
lastmod: 2023-05-26T03:13:38.130Z
---

# テキストの解析に正規表現を使用する

この章では、正規表現を使用してテキストを検索および置換する方法について学びます。

## 正規表現とは何か、どのように使用するか

正規表現（RegEx）は、テキストの検索と置換に使用されます。正確には、正規表現は検索パターンを指定する文字のシーケンスです。

## なぜ正規表現を使用するのか

正規表現の主な使用領域は、テキストの検索、置換、および抽出です。正規表現が行える機能を持つ文字列ライブラリも存在しますが、それらの文字列ライブラリを使用することが最善の方法である場合もあります。ただし、正規表現パターンの方が適している場合もあります。

> ただし、正規表現は正しく使うのが難しいです。正規表現の動作についてもっと学ぶことをお勧めします。なぜなら、正規表現は非常に強力なツールだからです。

この章を読んでいただくことで、正規表現が身近なものとして恐れることなく、あなたのツールボックスの中で価値のあるツールとして認識していただければと思います。

## どこで使用されているのか？

正規表現はさまざまなコンテキストで使用されます：

- **テキストエディタ、検索機能を持つプログラム**。ほとんどのテキストエディタ（例：Visual Studio Code）では、正規表現の検索パターンを使用してファイルやファイル内を検索できます。
- **コード**。多くのプログラミング言語やランタイムには、正規表現を使用するためのライブラリがあります。

## 最初の正規表現

まず、正規表現の感触をつかむために、簡単な正規表現を作成しましょう。以下がその正規表現です：

```
an
```

この検索パターン `an` を次のテキストに適用すると：

```
highlands is a part of Scotland
```

次のようにマッチします：

> highl**an**ds is a part of Scotl**an**d

特定の単語が文の中の1つ以上の場所にマッチするかどうかを調べる場合、上記のようなパターンで十分です。

### Goでの正規表現

Goで正規表現を使用するには、regexpライブラリがあります。2つのアプローチがあります：

- `regexp` を直接使用する場合、次のようになります：

  ```go
  matched, err := regexp.FindString("an", "highlands is a part of Scotland")
  ```

  ここでは、マッチがある場合にtrueを返すブール値が返されます。

- **コンパイル済み**の場合、正規表現をコンパイルしてからメソッドを呼び出します。次のようになります：

  ```go
  r, _ := regexp.Compile("an")
  matches := r.FindAllString("highlands is a part of Scotland", -1)
  ```

  上記の例では、この場合はすべてのマッチを含む文字列配列が返されます `["an", "an"]`。

  このバージョンでは、より多くの関数が利用できます。

## 文字クラス

文字クラスは、異なる種類の文字を区別することができます。異なる種類には改行、数字、文字などがあります。

以下に、よく遭遇するであろういくつかの一般的なタイプを示します：

| タイプ | 説明                                                                 |
| ---- | ---------------------------------------------------------------------- |
| .    | 改行以外の任意の文字にマッチします。                                           |
| \    | 次に続く文字をエスケープします。                                              |
| \w   | アンダースコア \_ を含むラテン文字アルファベットの任意の文字にマッチします。 |
| \d   | 任意の数字にマッチします。                                                     |
| \D   | \d の逆で、数字ではない任意の文字にマッチします。                                |
| \s   | スペース、タブ、改行などのホワイトスペース文字にマッチします。                       |

例を示します：

```go
matched, err := regexp.FindString("\d", "abc123")
```

上記の場合、123 にマッチします。ただし、"abc" には数字が含まれていないため、マッチしません。

## 繰り返し

繰り返しを表現する場合、興味深い2つの文字があります：

- `+` は、1つ以上の文字にマッチします。

  ```
  \w+
  ```

  文字列 "aaaa bab" が与えられた場合、次のようにマッチします：

  **aaaaab** **bab** 上記の例では、空白はマッチしません。

  ```go
  r, _ := regexp.Compile("\\w+")
  matches := r.FindAllString("aaaa bab", -1)
  ```

  上記の例では、正規表現を構築する方法によって `\` が追加されていることに注意してください。

- `*` は、0個以上の文字にマッチします。たとえば、"PA" で始まり、0個以上の数字を含む郵便番号にマッチする場合、次のように構築できます：

  ```
  PA*
  ```

  これにより、次の文字列にマッチします：

  ```
  PA
  PA111
  ```

  上記の例では、0個以上の文字にマッチするため、任意の数字を含まない "PA" にもマッチします。

- `?` は、貪欲またはオプションの量指定子とも呼ばれます。後方を見て、オプションとして取り、可能な場合はそれを取ります。次の例を考えてみましょう：

  ```
  http
  https
  ```

  両方にマッチさせたい場合、次のように入力します：

  ```
  https?
  ```

  別の例として：

  ```
  r, _ := regexp.Compile("an.")
  matches := r.FindAllString("and ant an", -1)
  ```

  上記の例では、**and** と **ant** にはマッチしますが、_an_ にはマッチしません。正規表現を `an.?` に変更すると、**and ant an** にマッチします。

## アンカーと境界

`^` のようなさまざまなアンカーを使用することができます。たとえば：

- `^` は、文字列の先頭を表します。次の例では、文字列が "INV" で始まることを示しています。

  ```
  ^INV
  ```

- `$` は、文字列の末尾を表します。例えば、特定のドメイン ".com" で終わる文字列にマッチさせる場合、次のようになります。

  ```
  \.com$
  ```

## グループ

グループは、文字列の一部をキャプチャし、それを返す方法です。必要な情報を解析するのに非常に便利です。次の例では、CSV行から情報を解析します：

```
Name: myarticle, Price: 114, Quantity: 3
```

必要なデータを取得するためには、コロン（:）の後ろのすべての内容を取得したいです。次のような正規表現を構築できます：

```go
\w+:\s?(\w+)
```

上記の例では、次のように定義しています：

- パーレンテーゼ（()）を使用してグループをキャプチャすることを指定していますが、そのグループは次の後に発生する必要があります：
- いくつかの文字（`\w+`）
- コロン（:）
- 0または1のスペース（`\s?`）
- グループ（`(\w+)`）：1つ以上の文字

これにより、myarticle、114、3 がキャプチャされます。

## 名前付きグループ

名前付きグループは、名前を持つグループをキャプチャする方法です。なぜそれが必要なのでしょうか？URLをいくつかの部分に分解し、それが何であるかを知りたい場合を考えてみましょう。URL "http://myapi.com/products?page=1" には次のような要素があります：

- `http`：プロトコル
- `myapi.com`：ドメイン
- `/products`：ルート
- `?page=1`：クエリパラメータ

それでは、どのように分解し、名前を付けることができるでしょうか？

分解するために、名前付きグループというものを使用します。これにより、マッチ結果を見て、それが何であるかを知ることができます。したがって、次のように表示されるのではなく：

```
http
```

次のようなキーと値が表示されます：

```
protocol: http
```

構文的には、括弧（()）の中に `?<グループ名>` を使用する必要があります。

次の構文を使用します：

```
(?<mygroup>\w+)
```

Goでは、`?` の直後に `P` を追加する必要があるため、次のようになります：

```go
r, err := regexp.Compile(`(?P<mygroup>\w+):`)
```

### URLからデータを抽出する

次に、問題に取り組んでみましょう。文字列 "http://myapi.com/products?page=1" を考えます。

- プロトコルをマッチングする：

  ```
  ^(?<protocol>\w+):
  ```

- ドメインをマッチングするために、"http://" の後ろから次の "/" までのすべてをキャプチャする必要があります：

  ```
  ^(?<protocol>\w+):\/\/(?<domain>\w+\.\w+)\/?
  ```

- ルートをマッチングするために、"http://mydomain.com" までマッチングしたので、次にルートをマッチングします。つまり、"/" の後ろに続くものです。
- クエリパラメータ

Goのコードは次のようになります：

```go
r, err := regexp.Compile(`^(?P<protocol>\w+):\/\/(?P<domain>\w+\.\w+)\/(?P<route>\w+)\/?`)
```

パターンはできましたが、解析された部分を出力する方法はどうでしょうか？

名前付きグループとその値をペアにするためには、正規表現と応答の両方から値を組み合わせる必要があります。まず、`FindStringSubmatch()` を呼び出すと、値が返されます。

```go
m := r.FindStringSubmatch("http://myapi.com/products")
```

次に、名前とこれらの値を一致させる必要があります。`r.SubexpNames()` を呼び出して、応答を反復処理する必要があります。

```go
result := make(map[string]string)
for i, name := range r.SubexpNames() {
 if i != 0 && name != "" {
  result[name] = m[i]
 }
}
```

次の行では、各名前に値が割り当てられます：

```go
result[name] = m[i]
```

最後に、値を取得するために、マップ構造になった値を出力できます：

```go
fmt.Println(result["protocol"]) // http
fmt.Println(result["domain"]) // myapi.com
fmt.Println(result["route"]) // products
```

## 課題 - URLを解析するGoプログラムを作成する

上記の名前付きグループの使用例から、URLを取り込んで解析するGoプログラムを作成してください。次のように動作する必要があります：

```
URLを入力してください：http://myapi.com/products
URLは次の要素で構成されています：
プロトコル：http
ドメイン：myapi.com
ルート：products
```

### 解答

```go
package main

import (
 "fmt"
 "log"
 "regexp"
)

func main() {
 var url string
 fmt.Println("URLを入力してください：")
 fmt.Scan(&url)

 r, err := regexp.Compile(`^(?P<protocol>\w+):\/\/(?P<domain>\w+\.\w+)\/(?P<route>\w+)\/?`)
 if err != nil {
  log.Fatal("コンパイルエラー：", err)
 }
 m := r.FindStringSubmatch(url)
 if m == nil {
  panic("マッチしませんでした")
 }
 result := make(map[string]string)
 for i, name := range r.SubexpNames() {
  if i != 0 && name != "" {
   result[name] = m[i]
  }
 }
 fmt.Println("URLは次の要素で構成されています：")
 fmt.Println(result["protocol"])
 fmt.Println(result["domain"])
 fmt.Println(result["route"])
}

```

## 置換

正規表現の一般的な使用例は、何かを別のものに置き換える場合です。

使用できるGoのメソッドは複数ありますが、コンパイル済みの正規表現オブジェクトにある `ReplaceAllString()` を使用することができます：

```go
r := regexp.MustCompile(`aa`)
s := r.ReplaceAllString("aabbcc", "cc") // s = ccbbcc
```

上記の例では、文字列 `aabbcc` のすべての `aa` を `cc` に置き換えます。

キャプチャグループを使用して、キャプチャされたグループを文字列で置き換えることもできます。次の例をご覧ください：

```go
r := regexp.MustCompile(`(\d)`)
s := r.ReplaceAllString("productid:114", "0${1}") // s = productid:0114
```

上記の例では、114 をそのまま置き換えるだけでなく、0 を前に追加しています。

### 用途例：XMLノードの置換

たとえば、XMLを使用している場合、特定の名前のノードをすべて別の名前に変更したい場合があります。

次のXMLを考えてみましょう。

```xml
<books>
    <book>
      <author>Shakespeare</author>
      <title>Romeo and Juliet</title>
      <pages>400</pages>
      <type>paperback</type>
      <cost>17</cost>
    </book>
    <book>
      <author>Shakespeare</author>
      <title>Hamlet</title>
      <pages>270</pages>
      <type>paperback</type>
      <cost>15</cost>
    </book>
</books>
```

`title` を `name` に変更したい場合、どのようにすればよいでしょうか？

`title` を `name` に置き換えるだけであれば、簡単です。ただし、次のファイルの内容を考えてみてください。

```xml
<books>
    <book>
      <author>Shakespeare</author>
      <title>The title is Romeo and Juliet</title>
      <pages>400</pages>
      <type>paperback</type>
      <cost>17</cost>
    </book>

</books>
```

`title` を `name` に置き換えるだけでなく、コンテンツも "The title is Romeo and Juliet" に置き換えられてしまいます。これは望ましくありません。

置換操作を要素のみに制限する必要があります。次のように制限することができます：

```
\<\/?(title)\>
```

上記の例では、`<title>` と `</title>` にマッチします。ただし、このXMLにこれを適用すると、ほぼ望んだ結果が得られます。

```xml
<author>Shakespeare</author>
```

が次のようになります。

```xml
nameShakespearename
```

何が起こったのでしょうか？なぜ `<>` が失われたのでしょうか？前の内容を保持し、名前を置き換える方法を表現する必要があります。それを行う方法は、`<>` と要素名のキャプチャグループを表現することです。

```
(\<\/?)(title)(\>)
```

これにより、3つのグループが得られます。これらの結果を組み合わせる必要があります。これは次のように表現できます。

```
${1}name${3}
```

- `${1}` は、`<` または `</` にマッチするキャプチャグループに対応します。
- `name` は、`title` を置き換える文字列です。
- `${3}` は、`>` にマッチするキャプチャグループに対応します。

## 課題 - コンテンツの置換

次の内容の _books.xml_ ファイルを取り込み、次のように置換してください：

- author を name に置換する
- cost を price に置換する

ヒント：置換を2回適用する必要があるかもしれません。

## 解答 II

```go
package main

import (
 "fmt"
 "regexp"
)

func main() {
 file := `<books>
    <book>
      <author>Shakespeare</author>
      <title>Romeo and Juliet</title>
      <pages>400</pages>
      <type>paperback</type>
      <cost>17</cost>
    </book>
    <book>
      <author>Shakespeare</author>
      <title>Hamlet</title>
      <pages>270</pages>
      <type>paperback</type>
      <cost>15</cost>
    </book>
</books>`

 r := regexp.MustCompile(`(\<\/?)(title)(\>)`)
 s := r.ReplaceAllString(file, "${1}name${3}")
 fmt.Println(s)

 r = regexp.MustCompile(`(\<\/?)(cost)(\>)`)
 s = r.ReplaceAllString(s, "${1}price${3}")
 fmt.Println(s)
}
```