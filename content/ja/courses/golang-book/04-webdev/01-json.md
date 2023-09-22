---
title: JSON
description: JSON形式での作業方法を学ぶ
lastmod: 2023-05-26T03:11:06.952Z
---

# JSONの操作

この章では、JSONデータ形式での作業方法について学びます。

## はじめに

この章では、以下の内容を学びます。

- JSONデータ形式について
- JSONデータを読み込んでGoの既存の構造体にマッピングする方法
- JSONを作成し、ファイルに保存する方法

## JSON

JSONは、データを格納および転送するための軽量なデータ形式です。この頭字語は、**J**ava**S**cript **O**bject **n**otationの略です。

この形式は、Webサービスでよく使用されます。通常、データはJSONとしてエンコードされ、HTTP経由で送信されます。クライアント（たとえばWebブラウザ）はJSONデータを消費し、HTMLとCSSの助けを借りてフロントエンドをレンダリングするために使用します。JSONは、サービス間の通信にもよく使用されます。

以下は、この形式の例です：

```json
{
  "products": [
    {
      "id": 1,
      "name": "a product"
    },
    {
      "id": 2,
      "name": "another product"
    }
  ]
}
```

上記は製品のリストを示しています。各キーは引用符で囲まれ、値は数値、文字列、ブール値などのプリミティブから配列やオブジェクトなどのより複雑な型まで、あらゆるものにすることができます。

この形式は何であり、どのようなコンテキストで使用されるのでしょうか。

## JSONの読み込み

JSONを扱うためには、`encoding/json`ライブラリを使用する必要があります。これにより、JSONデータの読み取りと書き込みの両方が可能になります。

JSONデータを読み取るには、まずGoのコードでJSONデータにマッピングするための構造体を用意する必要があります。次のようなJSONデータがあると想像してみてください：

```json
{
  "products": [
    {
      "id": 1,
      "name": "some product"
    }
  ]
}
```

これをGoでマッピングするには、次のような構造体が必要です：

```go
type Product struct {
  Id int
  Name string
}

type Response struct {
  Products []Product
}
```

### アノテーション

最初のステップは、JSONデータにマッチするために必要な構造体を作成することです。ただし、もう1つのことも行う必要があります。それは、アノテーションを追加することです。問題として解決しようとしているのは、`Product`プロパティがJSONデータで`id`と呼ばれるのではなく、`Id`と呼ばれるということです。

> それだけでうまくいかないのですか？

残念ながら、そうではありません。

> なぜ単に構造体のプロパティを`id`と名前付けないのですか？

`encoding/json`ライブラリは、メインパッケージとは別のパッケージであるため、`encoding/json`パッケージがそれを見つけるために、メインパッケージで定義されたフィールド名を大文字にする必要があります。

つまり、上記で作成した構造体に次のようなアノテーションを追加する必要があります：

```go
type Product struct {
  Id int `json:"id"`
  Name string `json:"name"`
}

type Response struct {
  Products []Product `json:"products"`
}
```

これらのアノテーションは、JSONデータでこれらの名前のプロパティを探し、それらを次のプロパティにマッピングするように指示します。以下は、上記の例からの例です：

```go
Id int `json:"id"`
```

### データの読み取り

さて、JSONデータにマッピングするためのGoの構造体を定義しました。では、JSONソースからどのように読み取るのでしょうか？JSONは通常、次の2つの方法のいずれかで保存されます。

- 文字列リテラル（例：`{ "name": "my product", "id": 1 }`）
- JSONファイル内（例：

  ```json
  {
    "id": 1,
    "name": "my product"
  }
  ```

両方のアプローチでの作業方法を示します。

**文字列リテラルからの読み取り**

`Unmarshal()`関数を使用し、第1パラメータに文字列リテラルを、第2パラメータに結果を書き込むデータを指定します。

```go
package main

import (
  "fmt"
  "encoding/json"
)

func main() {
  str := `{ "name": "my product", "id": 1 }`
  product := Product{}
  json.Unmarshal([]byte(str), &product)
  fmt.Println(product) // オブジェクトを出力
}
```

注意点として、レスポンスをバイト配列に変換すること`[]byte(str)`と、データが2番目のパラメータの`product`インスタンスに参照として書き込まれること`&product`にも注目してください。

**ファイルからの読み取り**

ファイルから読み取るには、`io/ioutil`ライブラリとその`ReadFile()`関数を使用します。文字列リテラルと同様に、`Unmarshal()`関数を使用してデータを構造体インスタンスに書き込みます。

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
)

type Products struct {
  Products []Product `json:"products"`
}

type Product struct {
  Id       int     `json:"id"`
  Name     string  `json:"name"`
}

func main() {
  file, _ := ioutil.ReadFile("products.json")

  data := Products{}

  _ = json.Unmarshal([]byte(file), &data)

  for i := 0; i < len(data.Products); i++ {
    fmt.Println("Product Id: ", data.Products[i].Id)
    fmt.Println("Name: ", data.Products[i].Name)
  }
}
```

## JSONの書き込み

これまで、文字列リテラルまたはファイルからJSONデータを読み取る方法を見てきましたが、データの書き込みはどうでしょうか？

私たちにとって重要な2つのケースがあります：

- 構造体へのデータの書き込み。私たちは構造体で作業しているので、構造体に対して行った変更はJSONに変換する必要があります。
- データからJSONを生成する。2番目のケースでは、生の文字列リテラルや純粋なプリミティブと一緒に作業するかもしれませんが、どのように行うのでしょうか？

これらの両方のケースに共通するのは、`Marshal()`関数です。`Marshal()`メソッドは、プリミティブまたは構造体を受け取り、それをJSONに変換することができます。

```go
package main

import (
  "fmt"
  "encoding/json"
)

type Person struct {
  Id   int    `json:"id"`
  Name string `json:"name"`
}

func main() {
  aBoolean, _ := json.Marshal(true)
  aString, _ := json.Marshal("a string")
  person := Person{
    Id: 1,
    Name: "a person",
  }
  aPerson, _ := json.Marshal(&person)
  fmt.Println(string(aBoolean)) // true
  fmt.Println(string(aString))  // a string
  fmt.Println(string(aPerson))  // { "id": 1, "name": "a person" }
}
```

## 課題

以下のファイル_response.json_が与えられた場合、データを読み取り、画面に表示する方法を見つけてください：

```json
{
  "orders": [
    {
      "id": 1,
      "items": [
        { "id": 1, "quantity": 3, "total": 34.3 },
        { "id": 2, "quantity": 2, "total": 17.8 }
      ]
    },
    {
      "id": 2,
      "items": [
        { "id": 3, "quantity": 3, "total": 10.0 },
        { "id": 4, "quantity": 2, "total": 100.5 }
      ]
    }
  ]
}
```

## 解決策

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
)

type OrderItem struct {
  Id       int     `json:"id"`
  Quantity int     `json:"quantity"`
  Total    float32 `json:"total"`
}

type Order struct {
  Id    int          `json:"id"`
  Items []OrderItem  `json:"items"`
}

type Response struct {
  Orders []Order `json:"orders"`
}

func main() {
  file, _ := ioutil.ReadFile("orders.json")

  data := Response{}

  _ = json.Unmarshal([]byte(file), &data)
  fmt.Println(data)
  for i := 0; i < len(data.Orders); i++ {
    fmt.Println("Order Id: ", data.Orders[i].Id)

    for j := 0; j < len(data.Orders[i].Items); j++ {
      item := data.Orders[i].Items[j]
      fmt.Println("Item id", item.Id)
      fmt.Println("Item quantity", item.Quantity)
      fmt.Println("Item total", item.Total)
    }
  }
}
```

## 🚀 チャレンジ

JSONファイルに`products`を追加できるか試してみてください。以下はそのJSONです：

```json
"products" :[{
  "id": 1,
  "name": "product"
}]
```

どのような構造体が必要で、それらをどのように繰り返す必要があるでしょうか？

## 詳しくはこちら

<https://gobyexample.com/json>