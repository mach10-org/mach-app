---
title: 構造体
description: 構造体を使用して、複数のフィールドを1つのグループにまとめる方法を学びましょう。
lastmod: 2023-05-26T02:58:00.225Z
---

# 構造体

この章では、構造体について学びます。構造体は、多くのフィールドを保持することができる複雑なデータ型です。また、振る舞いを持たせることもできます。

## 導入

この章では以下の内容をカバーします:

- 構造体の宣言と検査
- 構造体の中に別の構造体を埋め込む
- 構造体に実装を追加する

## 構造体の必要性

まずは簡単なシナリオから始めましょう。口座残高を持っているとします。以下のように変数に格納することができます:

```go
accountBalance int32
```

これは素晴らしいですが、銀行口座のようなより複雑なものを表現したい場合はどうでしょうか？銀行口座にはID、残高、口座所有者などのさまざまな情報が含まれます。以下のようにそれぞれのプロパティを整数で表現することもできます:

```go
var accountBalance int32
var owner string
var id int
```

しかし、複数の銀行口座で操作する必要がある場合はどうでしょうか？以下のように格納しようとすることもできます:

```go
var accountBalance int32
var owner string
var id int

var accountBalance2 int32
var owner2 string
var id2 int
```

しかし、これではスケーリングができません。必要なのは、このような情報をまとめるためのより複雑な型、つまり `struct` です:

```go
type Account struct {
  accountBalance int32
  owner string
  id int
}
```

## 構造体の定義

さて、なぜ構造体が必要なのか、関連する情報をまとめるために必要なのは理解できました。そして、これまでに `Account` という1つの例を見てきました。しかし、パーツを分解して構造体を定義する方法を見てみましょう。構造体の定義方法は以下のようになります:

```go
type <構造体の名前> struct {
  ... フィールド
}
```

別の例を示しますが、今度は住所のための構造体を作成してみましょう:

```go
type Address struct {
 city   string
 street string
 postal string
}
```

### 構造体のインスタンスを作成する

構造体からインスタンスを作成するには、2つの方法があります:

- **変数を定義**し、変数宣言後にフィールドを設定する方法:

  ```go
  var address Address
  address.city = "ロンドン"
  address.street = "バッキンガム宮殿"
  address.postal = "SW1"
  ```

- **一度にすべてを定義**し、一度にすべての値を設定する方法:

  ```go
  address2 := Address{"ニューヨーク", "セントラルパーク", "111"}
  ```

## 構造体の埋め込み

構造体を別の構造体に埋め込むこともできます。例えば、`Address` 構造体があり、住所は `Person` のような上位の構造体で使用されるものとします。以下にその例を示します:

```go
type Person struct {
 name    string
 address Address
}
```

このコードでは、`Person` 構造体に `Address` 型の `address` フィールドがあります。

構造体のインスタンスを作成するには、次のようにします:

```go
person := Person{
  name: "クリス",
  address: Address{
   city: "ストックホルム",
  },
 }
```

### デフォルトの命名に依存する

`address` というフィールドを作成したことに注意してください。次のように定義することで、いくつかの文字を省略することができます:

```go
type Employee struct {
 Address
 company string
}
```

フィールドの名前を省略し、`Address` とだけ記述することで、フィールド名とフィールドの型が同じになります。それに基づいてインスタンスを作成する方法も似ています:

```go
employee := Employee{
  Address: Address{
   city: "LA",
  },
  company: "Microsoft",
 }
```

## 構造体に実装を追加する

構造体は、その性質上、単に複雑なものを表すデータフィールドです。しかし、構造体に対して関数を作成することで、振る舞いを追加することもできます。以下に例を示します:

```go
func (a Address) string() string {
 return fmt.Sprintf("都市: %s, 通り: %s, 郵便番号: %s", a.city, a.street, a.postal)
}
```

`string()` メソッドを追加しました。このメソッドは `Address` に属しており、`func` キーワードの後に `(...)` が続き、`a Address` を受け取ることで `Address` に属していることがわかります。実装の残りは `Sprintf()` を使用してフォーマットされた文字列を返します。以下のコードを考えてみましょう:

```go
var address Address
address.city = "ロンドン"
address.street = "バッキンガム宮殿"
address.postal = "SW1"
fmt.Println(address.string())
```

`string()` を呼び出すと、次のような出力が得られます:

```
都市: ロンドン, 通り: バッキンガム宮殿, 郵便番号: SW1
```

## 課題 - 構造体の定義

eコマースストアのショッピングバスケットの行を表す構造体を定義してください。

以下は例です:

```
タイトル, 説明, 数量, 単価, 合計
LEGOセット, 4000ピース, 1, 600GBP, 600GBP
```

### ショッピングバスケットを表すプログラムを作成する

ショッピングバスケットを繰り返し処理し、合計を計算するプログラムを作成してください:

```
タイトル, 説明, 数量, 単価, 合計
LEGOセット, 4000ピース, 1, 600GBP, 600GBP
ぬいぐるみ, ぬいぐるみ, 3, 5 GBP, 15GBP

合計: 615 GBP
```

## 解答

パートI

```go
package main

import (
 "fmt"
)

type Row struct {
 Title       string
 Description string
 Quantity    int
 UnitPrice   float32
}

func main() {
 row := Row{
  Title:       "LEGOセット",
  Description: "4000ピース",
  Quantity:    1,
  UnitPrice:   600,
 }
 fmt.Println(row)
}
```

パートII

```go
package main

import (
 "fmt"
)

type Row struct {
 Title       string
 Description string
 Quantity    int
 UnitPrice   float32
}

func main() {
 row := Row{
  Title:       "LEGOセット",
  Description: "4000ピース",
  Quantity:    1,
  UnitPrice:   600,
 }
 row2 := Row{
  Title:       "ぬいぐるみ",
  Description: "ぬいぐるみ",
  Quantity:    3,
  UnitPrice:   5,
 }

 basket := make([]Row, 0)
 basket = append(basket, row)
 basket = append(basket, row2)

 var sum int = 0
 for i := 0; i < len(basket); i++ {
  current := basket[i]
  fmt.Println(current)
  sum += current.Quantity * int(current.UnitPrice)
 }
 fmt.Println("合計", sum)
}

```