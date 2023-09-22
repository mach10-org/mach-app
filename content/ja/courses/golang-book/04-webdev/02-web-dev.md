---
title: ウェブアプリを作成する
description: 多くの異なる形式を提供できるウェブアプリを作成する方法を学びましょう
lastmod: 2023-05-26T03:11:22.593Z
---

# ウェブAPIを作成する

ウェブAPIは、データをサービスやクライアントに提供するために対話するものです。クライアントはウェブページまたはcurlのようなツールの場合があります。この章では、HTTP経由でリクエストを処理するウェブAPIの作成方法を学びます。

## はじめに

この章では、以下の内容を学びます：

- ウェブAPIとは何か。
- `net/http`ライブラリとその高レベルの機能。
- リクエストへの応答。
- ルーターやクエリパラメータ、ボディなどのリクエストデータの操作。
- ServeMuxの使用と、なぜそれが選択肢となるのか。

## ウェブAPI

ウェブサービスの一般的な責任は、次のようなリクエストに応答することです：

- データを要求し、JSON、XML、画像、CSS、HTMLなどのデータを提供する
- リソースを作成、更新、削除するためのリクエストを要求する。

## `net/http`ライブラリ

ウェブサーバーを構築するための`net/http`ライブラリがあります。このライブラリを使用してウェブサーバーを構築するには、次の手順が必要です：

- サーバーインスタンスを作成する。
- ルートのリクエストとその応答方法を定義する。
- サーバーインスタンスを開始し、特定のアドレスとポートでアクセス可能にする。

### サーバーインスタンスの作成

`net/http`では、`http`がサービスインスタンスを表します。

```go
import (
 "fmt"
 "net/http"
)

func main() {
  // `http`を使って何かを行う
}
```

### ルートの定義

ルートは、アプリケーションを`products`、`orders`などの論理的なセクションに分割するための定義です。

ルートを定義するには、ルートパターンとそのルートがヒットしたときに呼び出される関数を定義します：

```go
func hello(w http.ResponseWriter, req *http.Request) {
  fmt.Fprintf(w, "hello\n")
}

func main(){
  http.HandleFunc("/hello", hello)
}
```

上記のコードでは、文字列`"/hello"`はルートパターンであり、"/hello"へのすべてのウェブリクエストは`hello()`関数で処理されることを示しています。

### 応答とリクエスト

`hello()`関数を詳しく調べると、`ResponseWriter`と`Request`を受け取ることがわかります：

```go
func hello(w http.ResponseWriter, req *http.Request) {
  fmt.c(w, "hello\n")
}
```

期待されるのは、`req`オブジェクト、つまりリクエストを調べて返すデータを決定するためのデータを調べることです。そして、`w`を使用して応答を生成することです。この場合、`w`を`Fprintf()`に渡すことで文字列を返しています。`FPrintf()`はライターを受け取ります。ライターはIOなので、例えばファイルに書き込むこともできますし、この場合のようにHTTPレスポンスストリームに書き込むこともできます。

### サーバーの開始

さて、ルートや応答の作成について説明しましたが、このサーバーをアクティブ化してリクエストに応答するにはどうすればよいでしょうか？

ポートを指定して`ListenAndServe()`関数を使用します。

```go
http.ListenAndServe(":8090", nil)
```

## リクエストへの応答

受信したリクエストは、/productsや/ordersなどの特定のルートを要求する場合もあれば、画像やテキストファイル、CSSなどの特定の静的ファイルを要求する場合もあります。リクエスト自体は、データの要求元の論理ドメイン（例：注文や製品）だけでなく、データの種類を示すヒントや認証のための資格情報などのヒントを提供します。このヒントはヘッダーとして知られています。

### ヘッダー

ヘッダーという概念があります。ヘッダーは、コンテンツの種類やコンテンツのサイズなどを示す情報を提供します。また、認証のためのトークンとしても使用できます。

ヘッダーは、受信したリクエストおよび応答の両方に存在する場合があります。

### 異なる種類のコンテンツの提供

異なる種類のコンテンツを提供するということは、応答に取り組んでいることを意味します。さまざまなコンテンツタイプを提供するためには、応答にコンテンツのタイプを指示する必要があります。これにより、消費クライアントがそれを解釈する方法を知ることができます（一部の場合、Webブラウザなどのクライアントは、コンテンツスニッフィングと呼ばれるプロセスを通じてそれを自動的に判断できる場合もあります）。

特定のコンテンツタイプを提供するには、次の2つのことを行う必要があります：

- **コンテンツタイプを設定する**。コンテンツタイプは、次のように呼び出すことで設定します：

  ```go
  w.Header().Set("Content-Type", "image/jpeg")
  ```

  ここでは、コンテンツタイプはjpegのサブタイプの画像です。プレーンテキスト、CSS、JSON、XMLなど、設定することができるコンテンツタイプは多数あります。

- **応答を生成する**。応答を生成するとは、応答ストリームに書き込むことを意味します。これは、ルートを処理する際に渡される`ResponseWriter`インスタンスの`Write()`メソッドを呼び出すことで行うことができます。他のメソッドでも同様にストリームに書き込むことができます。

### 画像データの提供

画像を提供するには、メモリに読み込み、コンテンツタイプを設定し、それを応答ストリームに書き込む必要があります。以下のコードのように行います：

```go
func GetImage(w http.ResponseWriter, r *http.Request) {
    f, _ := os.Open("/image.jpg")

    // JPGファイル全体をメモリに読み込む
    reader := bufio.NewReader(f)
    content, _ := ioutil.ReadAll(reader)

    // コンテンツタイプヘッダーを設定する
    w.Header().Set("Content-Type", "image/jpeg")

    // 画像を応答に書き込む
    w.Write(content)
}
```

- まず、画像を開きます：

  ```go
  f, _ := os.Open("/image.jpg")
  ```

- 次に、ファイルをメモリに読み込みます：

  ```go
  reader := bufio.NewReader(f)
  content, _ := ioutil.ReadAll(reader)
  ```

- その後、`Content-Type`ヘッダーを設定し、JPEG画像であることを示します（値は"image/jpeg"です）：

  ```go
  w.Header().Set("Content-Type", "image/jpeg")
  ```

- 最後に、コンテンツを応答に書き込みます：

  ```go
  w.Write(content)
  ```

### JSONデータの提供

画像の提供と同様に、正しいコンテンツタイプヘッダーの設定と応答の構築が必要です。以下にコードを示します：

```go
package main

import (
  "encoding/json"
)

type Person struct {
  Id int
  Name string
}

func ReturnJson(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")

  p := Person {
    Id: 1
    Name: "a person"
  }

  json.NewEncoder(w).Encode(p)
}

func main() {
  http.HandleFunc("/json", ReturnJson)
}
```

- まず、次のようにコンテンツタイプを設定します（値は"application/json"です）：

  ```go
  w.Header().Set("Content-Type", "application/json")
  ```

- 次に、送信するデータを構築します：

  ```go
  p := Person {
   Id: 1
   Name: "a person"
  }
  ```

- 最後に、データをJSONとしてエンコードし、応答ストリームに書き込みます：

  ```go
  json.NewEncoder(w).Encode(p)
  ```

また、`json.NewEncoder()`の代わりに`Marshal()`関数を使用することもできます：

```go
data, err := json.Marshal(p)
w.Write(data)
```

## リクエストの操作

ヘッダー以外にも、サーバープログラムに対して指示するためのさまざまな方法があります：

- **HTTPメソッド**：HTTPメソッドは意図を表します。POSTメソッドはリソースを作成することを意味し、GETメソッドはデータを読み取るだけであることを意味します。この章の後で詳しく説明する多くのHTTPメソッドがあります。以下の2つのリクエストは異なる意味を持ちます：

  ```
  GET /products # 製品のリストを取得する
  POST /products # 新しい製品リソースを作成する
  ```

- **ボディ**：ボディには、通常はリソースを作成または更新するために使用するペイロードデータが含まれる場合があります。以下に例を示します：

  ```json
  {
    "name": "a new product"
  }
  ```

- **ルーターパラメータ**：ルートリクエストの一部として、意味を持つパラメータを持つことができます。クライアントがルート`/products/5`を要求した場合、5は一意の識別子が5である特定の製品を要求していることを意味するかもしれません。
- **クエリパラメータ**：ルートの末尾にはクエリセクションがあります。そのセクションは、返されるデータのサイズを縮小するための追加の指示を提供できます。クエリ部分は、疑問符で始まり、アンパサンド`&`で区切られたキーと値のペアで構成されます。次のようになります：`/products?page=1&pageSize=20`

### ボディの解析

リクエストには`Body`プロパティがあります。ボディの内容に応じて、デコードする必要がある場合があります。以下のコードは、JSONの一部をデコードし、それを応答ストリームに書き込んでいます：

```go
package main

import (
  "fmt"
  "encoding/json"
)

type Person struct {
  Id int
  Name string
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
  var p Person

  json.NewDecoder(r.Body).Decode(&p)
  // 人物を保存する

  fmt.Fprintf(w)
}

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/person/", handleRequest)

  err := http.ListenAndServe(":4000", mux)
}
```

### ルートパラメータの読み取り

組み込みの方法でルートパラメータにアクセスする方法はないため、次のように解析する必要があります：

```go
tokens := strings.Split(r.URL.Path, "/")
// 各部分をチェックする
```

または、正規表現を使用してパーツを解析することもできます。

もう1つの選択肢は、次のようなライブラリを使用することです：

- [httprouter](https://github.com/julienschmidt/httprouter)
- [Gorilla Mux](http://www.gorillatoolkit.org/pkg/mux)

`httprouter`を使用した例を以下に示します：

```go
func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    fmt.Fprintf(w, "The id us, %s!\n", ps.ByName("id"))
}

func main() {
    router := httprouter.New()
    router.GET("/products/:id", Hello)

    log.Fatal(http.ListenAndServe(":8080", router))
}
```

### クエリパラメータの読み取り

ルートのクエリ部分は、リクエストの`URL`プロパティの`Query()`関数を使用してアクセスできます：

```go
r.URL // /products?page=3&pageSize=20
r.URL.Query() // ?page=3&pageSize=20
```

特定のパラメータにアクセスするには、`Query()`関数が`Values`マップを返すことを知っておく必要があります。

```go
r.URL.Query()["page"] // 3
```

1つのパラメータしかない場合には、`Get()`関数を呼び出すこともできます。

```go
r.URL.Query().Get("page")
```

### HTTPメソッド

メソッドには異なる意味があり、異なる方法で処理する必要があります。リクエストメソッドにアクセスするには、リクエストの`Method`プロパティ`r`があります。

```go
r.Method
```

また、`http`には`MethodGet`、`MethodPost`などの定義済みの定数もありますので、次のようにコードを書くこともできます。

```go
func handleRoute(w http.ResponseWriter, r *http.Request) {
  if r.Method == http.MethodGet {
    fmt.Println("It's a GET request")
  }
}
```

## ServeMux、より良い方法

これまで、ポート引数とnilを指定して`ListenAndServe()`を呼び出すことでHTTPサーバーを作成しました。しかし、別の方法もあります。それがServeMuxを使用する方法です。ServeMuxはルーターとしても知られています。`http`を直接使用してルートを追加する代わりに、ServeMuxにそれらのルートを追加します。以下にコードを示します：

```go
mux := http.NewServeMux()
mux.Handle("/hello", handleHello)
http.ListenAndServe(":8090", mux)
```

上記のコードでは、`NewServeMux()`を呼び出してServeMuxをインスタンス化します。次に、`Handle()`を呼び出してルートとそのハンドラーを設定します。最後に、`ListenAndServe()`を呼び出しますが、この場合は`nil`の代わりに`mux`インスタンスを渡します。

では、これまでの方法と比べてどう良いのでしょうか？最初に学んだ方法では、`DefaultServeMux`を使用しているため、プロファイリングエンドポイントが公開される可能性があります。もう1つの理由は、ルートを直接`http`に接続することで、グローバルな状態が変更されるため、一般的にGoでは好ましくありません。

## 課題 - 最初のウェブアプリを作成する

ウェブアプリには少なくとも1つのルートが必要です。そのルートは応答ストリームに書き込む必要があります。ウェブアプリは特定のポートで開始する必要があります。例えば、5500です。

## 解決策

```go
package main

import (
  "fmt"
  "net/http"
)

func handleRequest(w http.ResponseWrite, r *http.Request) {
  fmt.Fprintf(w, "Hi there")
}

func main() {
  http.HandleFunc("/hello", handleRequest)
  http.ListenAndServe(":8090", nil)
}
```

## チャレンジ

- ルートの詳細（ルート、使用された動詞、クエリパラメータなど）をリクエストに表示する。
- JSONや画像など、さまざまな種類のデータを提供できるかどうかを確認してください。